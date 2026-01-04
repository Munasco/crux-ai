const puppeteer = require('puppeteer');
const repl = require('repl');
const util = require('util');

// Configuration
const MAX_FIBER_DEPTH = 50; // Maximum depth to traverse React Fiber tree

/**
 * Interactive React REPL Debugger
 * 
 * Provides a GDB-like REPL interface to debug React applications
 * 
 * Install:
 *   npm install --save-dev puppeteer
 * 
 * Usage:
 *   node scripts/debugging/react-repl.js
 * 
 * Commands:
 *   components()          - List all React components
 *   queries()             - List React Query cache
 *   getComponent(name)    - Get component details by name
 *   getQuery(key)         - Get query details by key
 *   refetch(key)          - Refetch a query
 *   invalidate(key)       - Invalidate a query
 *   clearCache()          - Clear all React Query cache
 *   eval(code)            - Evaluate JavaScript in page context
 */

let page = null;
let browser = null;

async function startREPL() {
  console.log('🚀 Starting React REPL Debugger...\n');
  
  browser = await puppeteer.launch({ 
    headless: false, 
    devtools: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  page = await browser.newPage();
  
  try {
    console.log('📱 Connecting to http://localhost:8080...');
    await page.goto('http://localhost:8080', { 
      waitUntil: 'networkidle2',
      timeout: 10000 
    });
    
    await page.waitForSelector('#root', { timeout: 5000 });
    
    console.log('✅ Connected to React application\n');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('  React REPL Debugger - GDB-like interface for React');
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log('Available commands:\n');
    console.log('  components()          - List all React components');
    console.log('  queries()             - List React Query cache state');
    console.log('  getComponent(name)    - Get component details by name');
    console.log('  getQuery(key)         - Get query details by key');
    console.log('  refetch(key)          - Refetch a React Query');
    console.log('  invalidate(key)       - Invalidate a query cache');
    console.log('  clearCache()          - Clear all React Query cache');
    console.log('  eval(code)            - Evaluate JavaScript in browser');
    console.log('  .exit                 - Exit REPL\n');
    console.log('═══════════════════════════════════════════════════════════\n');
    
    const replServer = repl.start({
      prompt: 'react> ',
      useColors: true,
      writer: (output) => {
        return util.inspect(output, { colors: true, depth: 3 });
      }
    });
    
    // Command: List all components
    replServer.context.components = async () => {
      return await page.evaluate((maxDepth) => {
        const result = [];
        const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
        
        if (!hook || !hook.getFiberRoots) {
          return { error: 'React DevTools Hook not found' };
        }
        
        const roots = hook.getFiberRoots(1);
        const fiber = roots.size > 0 ? Array.from(roots)[0] : null;
        
        function walk(node, depth = 0) {
          if (!node || depth > maxDepth) return;
          
          const typeName = node.type?.name || node.type?.displayName;
          
          if (typeName && typeof typeName === 'string') {
            result.push({
              name: typeName,
              key: node.key,
              props: node.memoizedProps ? Object.keys(node.memoizedProps) : [],
              hasState: !!node.memoizedState,
            });
          }
          
          if (node.child) walk(node.child, depth + 1);
          if (node.sibling) walk(node.sibling, depth + 1);
        }
        
        if (fiber && fiber.current) {
          walk(fiber.current);
        }
        
        return result;
      }, MAX_FIBER_DEPTH);
    };
    
    // Command: List all queries
    replServer.context.queries = async () => {
      return await page.evaluate(() => {
        if (!window.__REACT_QUERY_CLIENT__) {
          return { error: 'React Query Client not found. Add to window in queryClient.ts' };
        }
        
        const cache = window.__REACT_QUERY_CLIENT__.getQueryCache();
        return cache.getAll().map(q => ({
          key: q.queryKey,
          status: q.state.status,
          isFetching: q.state.fetchStatus === 'fetching',
          isStale: q.isStale(),
          dataUpdatedAt: new Date(q.state.dataUpdatedAt).toISOString(),
          hasError: !!q.state.error,
          errorMessage: q.state.error?.message,
        }));
      });
    };
    
    // Command: Get specific component
    replServer.context.getComponent = async (name) => {
      return await page.evaluate((name, maxDepth) => {
        const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
        
        if (!hook || !hook.getFiberRoots) {
          return { error: 'React DevTools Hook not found' };
        }
        
        const roots = hook.getFiberRoots(1);
        const fiber = roots.size > 0 ? Array.from(roots)[0] : null;
        
        function find(node, depth = 0) {
          if (!node || depth > maxDepth) return null;
          
          const typeName = node.type?.name || node.type?.displayName;
          
          if (typeName === name) {
            return {
              name: typeName,
              key: node.key,
              props: node.memoizedProps,
              state: node.memoizedState,
              type: node.type,
            };
          }
          
          if (node.child) {
            const result = find(node.child, depth + 1);
            if (result) return result;
          }
          
          if (node.sibling) {
            return find(node.sibling, depth + 1);
          }
          
          return null;
        }
        
        if (fiber && fiber.current) {
          return find(fiber.current);
        }
        
        return { error: `Component "${name}" not found` };
      }, name, MAX_FIBER_DEPTH);
    };
    
    // Command: Get specific query
    replServer.context.getQuery = async (key) => {
      return await page.evaluate((key) => {
        if (!window.__REACT_QUERY_CLIENT__) {
          return { error: 'React Query Client not found' };
        }
        
        const data = window.__REACT_QUERY_CLIENT__.getQueryData([key]);
        const state = window.__REACT_QUERY_CLIENT__.getQueryState([key]);
        
        return {
          key: [key],
          data: data,
          state: state,
        };
      }, key);
    };
    
    // Command: Refetch query
    replServer.context.refetch = async (key) => {
      return await page.evaluate((key) => {
        if (!window.__REACT_QUERY_CLIENT__) {
          return { error: 'React Query Client not found' };
        }
        
        window.__REACT_QUERY_CLIENT__.refetchQueries({ queryKey: [key] });
        return { success: true, message: `Refetched query: ${key}` };
      }, key);
    };
    
    // Command: Invalidate query
    replServer.context.invalidate = async (key) => {
      return await page.evaluate((key) => {
        if (!window.__REACT_QUERY_CLIENT__) {
          return { error: 'React Query Client not found' };
        }
        
        window.__REACT_QUERY_CLIENT__.invalidateQueries({ queryKey: [key] });
        return { success: true, message: `Invalidated query: ${key}` };
      }, key);
    };
    
    // Command: Clear cache
    replServer.context.clearCache = async () => {
      return await page.evaluate(() => {
        if (!window.__REACT_QUERY_CLIENT__) {
          return { error: 'React Query Client not found' };
        }
        
        window.__REACT_QUERY_CLIENT__.clear();
        return { success: true, message: 'Cache cleared' };
      });
    };
    
    // Command: Evaluate custom code
    // WARNING: This uses eval() which can be dangerous. Only use in development
    // and with trusted code. Never expose this to production or untrusted users.
    replServer.context.eval = async (code) => {
      return await page.evaluate((code) => {
        try {
          // Wrapped in function to provide safer scope
          return (function() {
            return eval(code);
          })();
        } catch (e) {
          return { error: e.message };
        }
      }, code);
    };
    
    // Handle exit
    replServer.on('exit', () => {
      console.log('\n👋 Closing React REPL...');
      if (browser) {
        browser.close();
      }
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Failed to connect to React app:', error.message);
    console.error('\n💡 Make sure:');
    console.error('   1. Dev server is running: npm run dev');
    console.error('   2. App is accessible at http://localhost:8080\n');
    
    if (browser) {
      await browser.close();
    }
    process.exit(1);
  }
}

// Handle Ctrl+C
process.on('SIGINT', async () => {
  console.log('\n\n👋 Shutting down...');
  if (browser) {
    await browser.close();
  }
  process.exit(0);
});

startREPL().catch(async (error) => {
  console.error('Fatal error:', error);
  if (browser) {
    await browser.close();
  }
  process.exit(1);
});
