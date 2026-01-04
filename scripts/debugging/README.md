# Debugging Scripts

This directory contains automation scripts for debugging the Crux AI React application, including **GDB-like API access** to React internals.

## Available Scripts

### `realtime-react-debugger.js` ⭐ NEW

**Real-time React API server with GDB-like programmatic access.**

Exposes a REST API that provides live access to React component state and React Query cache.

**Features:**
- REST API endpoints for React state
- Real-time monitoring of components and queries
- Programmatic access to React internals
- CORS-enabled for external access
- Health check endpoint

**Setup:**

```bash
# Install dependencies
npm install --save-dev puppeteer express
```

**Usage:**

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Start debug API
npm run debug:api
# or
node scripts/debugging/realtime-react-debugger.js
```

**API Endpoints:**

```bash
# Get full React state
curl http://localhost:3030/api/react-state | jq

# Get just components
curl http://localhost:3030/api/components | jq

# Get React Query state
curl http://localhost:3030/api/queries | jq

# Health check
curl http://localhost:3030/health
```

**Example Response:**
```json
{
  "components": [
    {
      "name": "Dashboard",
      "key": null,
      "hasProps": true,
      "hasState": true,
      "propsCount": 5
    }
  ],
  "queries": [
    {
      "key": ["videos"],
      "status": "success",
      "isFetching": false,
      "isStale": false,
      "hasError": false
    }
  ],
  "timestamp": "2026-01-04T10:15:30.123Z"
}
```

### `react-repl.js` ⭐ NEW

**Interactive REPL for debugging React applications (GDB-like interface).**

Provides an interactive command-line interface to inspect and manipulate React state in real-time.

**Setup:**

```bash
npm install --save-dev puppeteer
```

**Usage:**

```bash
npm run debug:repl
# or
node scripts/debugging/react-repl.js
```

**Available Commands:**

```javascript
react> await components()          // List all React components
react> await queries()              // List React Query cache state
react> await getComponent('Dashboard')  // Get specific component details
react> await getQuery('videos')     // Get query details
react> await refetch('videos')      // Refetch a query
react> await invalidate('videos')   // Invalidate query cache
react> await clearCache()           // Clear all query cache
react> await eval('window.location.href')  // Evaluate custom code
react> .exit                        // Exit REPL
```

**Example Session:**
```javascript
react> await components()
[
  { name: 'Dashboard', key: null, props: ['username'], hasState: true },
  { name: 'VideoList', key: null, props: ['videos'], hasState: false }
]

react> await getComponent('Dashboard')
{
  name: 'Dashboard',
  props: { username: 'john' },
  state: { isLoading: false }
}

react> await refetch('videos')
{ success: true, message: 'Refetched query: videos' }
```

### `automated-debug.js`

Automated debugging script using Puppeteer and Chrome DevTools Protocol.

**Features:**
- Captures console logs, errors, and warnings
- Tracks network requests and failures
- Checks for React DevTools presence
- Detects React Query DevTools
- Takes screenshots
- Measures performance metrics
- Identifies common accessibility issues

**Setup:**

```bash
# Install Puppeteer
npm install --save-dev puppeteer
```

**Usage:**

```bash
# Make sure dev server is running first
npm run dev

# In another terminal, run the debug script
node scripts/debugging/automated-debug.js
```

**Output:**
- Console logs from browser
- Performance metrics
- Screenshot (`debug-screenshot.png`)
- Browser stays open for manual inspection

## Creating Your Own Debug Scripts

You can create custom debug scripts based on your needs:

### Example: Test Specific Component

```javascript
const puppeteer = require('puppeteer');

async function testDashboard() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8080/dashboard/testuser');
  
  // Wait for specific component
  await page.waitForSelector('[data-testid="dashboard"]');
  
  // Check component state
  const componentData = await page.evaluate(() => {
    // Your custom logic here
    return document.querySelector('[data-testid="dashboard"]').textContent;
  });
  
  console.log('Dashboard data:', componentData);
  
  await browser.close();
}

testDashboard();
```

### Example: Monitor React Query State

```javascript
async function monitorQueries() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Expose a function to capture React Query state
  await page.exposeFunction('logQueryState', (state) => {
    console.log('Query State:', state);
  });
  
  await page.goto('http://localhost:8080');
  
  // Inject monitoring code
  await page.evaluate(() => {
    setInterval(() => {
      // This assumes you expose queryClient for debugging
      if (window.__REACT_QUERY_CLIENT__) {
        const cache = window.__REACT_QUERY_CLIENT__.getQueryCache();
        window.logQueryState(cache.getAll().map(q => ({
          key: q.queryKey,
          state: q.state,
        })));
      }
    }, 5000);
  });
  
  // Let it run for monitoring
}
```

## Best Practices

1. **Always check dev server is running** before executing scripts
2. **Use headless mode** for CI/CD pipelines
3. **Capture screenshots** for visual debugging
4. **Log performance metrics** to track improvements
5. **Clean up resources** by closing browser when done

## Integration with CI/CD

To use these scripts in CI/CD:

```yaml
# Example GitHub Actions workflow
- name: Run automated debugging
  run: |
    npm run dev &
    sleep 10
    node scripts/debugging/automated-debug.js --headless
```

## See Also

- [DEBUGGING.md](../../DEBUGGING.md) - Complete debugging guide
- [Puppeteer Documentation](https://pptr.dev/)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
