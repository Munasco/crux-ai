const puppeteer = require('puppeteer');

/**
 * Real-time React API Debugger
 * 
 * Provides GDB-like programmatic access to React application state
 * 
 * Install:
 *   npm install --save-dev puppeteer express
 * 
 * Usage:
 *   node scripts/debugging/realtime-react-debugger.js
 * 
 * API Endpoints:
 *   GET http://localhost:3030/api/react-state - Get current React state
 *   GET http://localhost:3030/api/components - List all components
 *   GET http://localhost:3030/api/queries - Get React Query state
 */

const express = require('express');
const app = express();

// Configuration
const MAX_FIBER_DEPTH = 50; // Maximum depth to traverse React Fiber tree
const POLL_INTERVAL_MS = 2000; // Polling interval in milliseconds

let currentState = {
  components: [],
  queries: [],
  timestamp: null,
};

// Enable CORS for API access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// API endpoint to get full React state
app.get('/api/react-state', (req, res) => {
  res.json(currentState);
});

// API endpoint to get just components
app.get('/api/components', (req, res) => {
  res.json(currentState.components);
});

// API endpoint to get just queries
app.get('/api/queries', (req, res) => {
  res.json(currentState.queries);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', monitoring: true });
});

// Start API server
const server = app.listen(3030, () => {
  console.log('🚀 React Debug API Server started');
  console.log('📡 API available at: http://localhost:3030');
  console.log('');
  console.log('Available endpoints:');
  console.log('  GET /api/react-state  - Full React application state');
  console.log('  GET /api/components   - List of React components');
  console.log('  GET /api/queries      - React Query cache state');
  console.log('  GET /health           - Health check');
  console.log('');
  console.log('Example usage:');
  console.log('  curl http://localhost:3030/api/react-state | jq');
  console.log('  curl http://localhost:3030/api/components');
  console.log('  curl http://localhost:3030/api/queries');
  console.log('');
});

// Monitor React app
async function monitor() {
  console.log('🔍 Connecting to React application...');
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:8080', { 
      waitUntil: 'networkidle2',
      timeout: 10000 
    });
    
    console.log('✅ Connected to React app at http://localhost:8080');
    
    await page.waitForSelector('#root', { timeout: 5000 });
    
    // Inject helper functions
    await page.evaluate(() => {
      window.__DEBUG_HELPERS_INJECTED__ = true;
    });
    
    console.log('✅ Debug helpers injected');
    console.log('🔄 Monitoring started (polling every 2 seconds)');
    console.log('');
    
    // Poll React state every 2 seconds
    setInterval(async () => {
      try {
        const state = await page.evaluate(() => {
          const result = {
            components: [],
            queries: [],
            timestamp: new Date().toISOString(),
          };
          
          // Get React components via DevTools Hook
          const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
          
          if (hook && hook.getFiberRoots) {
            try {
              const roots = hook.getFiberRoots(1);
              const fiber = roots.size > 0 ? Array.from(roots)[0] : null;
              
              function walk(node, depth = 0) {
                if (!node || depth > maxDepth) return; // Prevent infinite loops
                
                try {
                  const typeName = node.type?.name || node.type?.displayName;
                  
                  if (typeName && typeof typeName === 'string') {
                    result.components.push({
                      name: typeName,
                      key: node.key,
                      hasProps: !!node.memoizedProps && Object.keys(node.memoizedProps).length > 0,
                      hasState: !!node.memoizedState,
                      propsCount: node.memoizedProps ? Object.keys(node.memoizedProps).length : 0,
                    });
                  }
                  
                  if (node.child) walk(node.child, depth + 1);
                  if (node.sibling) walk(node.sibling, depth + 1);
                } catch (e) {
                  // Skip problematic nodes
                }
              }
              
              if (fiber && fiber.current) {
                walk(fiber.current);
              }
            } catch (e) {
              result.components.push({ error: 'Failed to walk fiber tree: ' + e.message });
            }
          }
          
          // Get React Query state
          if (window.__REACT_QUERY_CLIENT__) {
            try {
              const cache = window.__REACT_QUERY_CLIENT__.getQueryCache();
              const allQueries = cache.getAll();
              
              allQueries.forEach(q => {
                result.queries.push({
                  key: q.queryKey,
                  status: q.state.status,
                  dataUpdatedAt: q.state.dataUpdatedAt,
                  errorUpdatedAt: q.state.errorUpdatedAt,
                  isFetching: q.state.fetchStatus === 'fetching',
                  isStale: q.isStale(),
                  hasError: !!q.state.error,
                  errorMessage: q.state.error?.message,
                });
              });
            } catch (e) {
              result.queries.push({ error: 'Failed to get queries: ' + e.message });
            }
          }
          
          return result;
        }, MAX_FIBER_DEPTH);
        
        currentState = state;
        
        const componentCount = state.components.length;
        const queryCount = state.queries.length;
        const queriesFetching = state.queries.filter(q => q.isFetching).length;
        
        console.log(
          `[${new Date().toLocaleTimeString()}] ` +
          `Components: ${componentCount}, ` +
          `Queries: ${queryCount}` +
          (queriesFetching > 0 ? ` (${queriesFetching} fetching)` : '')
        );
        
      } catch (error) {
        console.error('Error polling state:', error.message);
      }
    }, POLL_INTERVAL_MS);
    
  } catch (error) {
    console.error('❌ Failed to connect to React app:', error.message);
    console.error('   Make sure the dev server is running on http://localhost:8080');
    console.error('   Run: npm run dev');
    process.exit(1);
  }
}

// Handle shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down React Debug API...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

// Start monitoring
monitor().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
