# Debugging Scripts

This directory contains automation scripts for debugging the Crux AI React application.

## Available Scripts

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
