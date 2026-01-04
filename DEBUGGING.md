# React Debugging Guide for Crux AI

This guide covers debugging tools and automated debugging approaches for the Crux AI React application.

## 🔍 Available React DevTools

### 1. React Query DevTools (Already Integrated ✅)

The project already has **@tanstack/react-query-devtools** installed and configured.

**Location:** See it in action in `src/main.tsx`:
```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

**Usage:**
- Start the dev server: `npm run dev`
- Open the app in your browser
- Look for the React Query icon in the bottom corner
- Click to open the DevTools panel to inspect queries, mutations, and cache

**Features:**
- View all active queries and their states
- Inspect query data and errors
- Manually refetch queries
- Clear cache
- Monitor query performance

### 2. React DevTools Browser Extension

**Installation:**
- **Chrome/Edge:** [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- **Firefox:** [React Developer Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

**Usage:**
1. Install the browser extension
2. Start your dev server: `npm run dev`
3. Open your browser DevTools (F12 or Cmd+Option+I)
4. You'll see two new tabs: "Components" and "Profiler"

**Components Tab:**
- Inspect React component tree
- View component props and state
- Edit props/state in real-time
- Find components in the tree
- See which component rendered

**Profiler Tab:**
- Record performance data
- See render times for each component
- Identify performance bottlenecks
- Analyze why components re-render

### 3. Vite DevTools Features

The project uses Vite which includes helpful development features:

**Hot Module Replacement (HMR):**
- Changes reflect instantly without full page reload
- Preserves application state during development

**Source Maps:**
- Debug TypeScript code directly in the browser
- Set breakpoints in your original source code

## 🤖 Automated React Debugging

### Chrome DevTools Protocol (CDP)

You can automate React debugging using Chrome DevTools Protocol with tools like Puppeteer or Playwright.

#### Setup with Puppeteer

```bash
# Install Puppeteer
npm install --save-dev puppeteer
```

#### Example: Automated Component Testing Script

```javascript
// scripts/debug-react-components.js
const puppeteer = require('puppeteer');

async function debugReactApp() {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true, // Opens DevTools automatically
  });
  
  const page = await browser.newPage();
  
  // Enable console message capture
  page.on('console', msg => {
    console.log('Browser Console:', msg.text());
  });
  
  // Enable error tracking
  page.on('pageerror', error => {
    console.error('Page Error:', error.message);
  });
  
  // Navigate to your app
  await page.goto('http://localhost:8080');
  
  // Wait for React to load
  await page.waitForSelector('#root');
  
  // Execute commands in browser context
  const componentTree = await page.evaluate(() => {
    // Access React internals (if React DevTools extension is installed)
    return document.querySelector('#root').__REACT_DEVTOOLS_GLOBAL_HOOK__ ? 'React DevTools detected' : 'Not found';
  });
  
  console.log('Component Tree:', componentTree);
  
  // Take screenshot
  await page.screenshot({ path: 'debug-screenshot.png' });
  
  // Keep browser open for manual inspection
  // await browser.close();
}

debugReactApp().catch(console.error);
```

#### Example: Query State Inspection

```javascript
// scripts/inspect-react-query.js
const puppeteer = require('puppeteer');

async function inspectQueryState() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8080');
  await page.waitForSelector('#root');
  
  // Access React Query cache via window
  const queryCache = await page.evaluate(() => {
    // This assumes you expose queryClient for debugging
    return window.__REACT_QUERY_CACHE__ || 'Cache not exposed';
  });
  
  console.log('Query Cache:', queryCache);
  
  // await browser.close();
}

inspectQueryState().catch(console.error);
```

### CLI-Based Debugging Commands

#### Development Mode with Source Maps

```bash
# Start dev server with debugging enabled (already configured)
npm run dev

# Build with source maps for debugging production builds
npm run build:dev
```

#### Browser Console Access via CLI

You can use Chrome's remote debugging to access console output:

```bash
# Start Chrome with remote debugging (Linux)
google-chrome --remote-debugging-port=9222

# macOS
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222

# Windows
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222

# Or find your Chrome executable and add the flag
chrome --remote-debugging-port=9222
```

### React DevTools Standalone

For debugging in non-browser environments or remote debugging:

```bash
# Install globally
npm install -g react-devtools

# Start standalone DevTools
react-devtools
```

Then add to your `src/main.tsx` (before other imports):
```typescript
// Only in development
if (import.meta.env.DEV) {
  import('react-devtools');
}
```

### Testing Library Debugging

For component testing, use React Testing Library's debug utilities:

```javascript
import { render, screen } from '@testing-library/react';
import { debug } from '@testing-library/react';

// In your tests
const { debug } = render(<YourComponent />);
debug(); // Prints DOM tree to console
```

## 🛠️ Debugging Configuration

### Vite Config for Enhanced Debugging

The current `vite.config.ts` is already set up well. Here's what helps with debugging:

```typescript
export default defineConfig(({ mode }) => ({
  // Dev server config
  server: {
    host: "::",
    port: 8080,
  },
  
  // Source maps are enabled by default in dev mode
  // For production debugging, you can add:
  build: {
    sourcemap: mode === 'development' ? true : false,
  },
  
  plugins: [
    react(), // Enables React Fast Refresh
    mode === 'development' && componentTagger(), // Component identification
  ].filter(Boolean),
}));
```

### VS Code Launch Configuration

Create `.vscode/launch.json` for debugging in VS Code:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug React App in Chrome",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "cwd": "${workspaceFolder}/backend",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 9229,
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

## 📊 Performance Profiling

### React Profiler API

Use the built-in Profiler component for performance monitoring:

```tsx
import { Profiler } from 'react';

function onRenderCallback(
  id: string,
  phase: "mount" | "update",
  actualDuration: number,
) {
  console.log(`${id}'s ${phase} phase took ${actualDuration}ms`);
}

<Profiler id="Dashboard" onRender={onRenderCallback}>
  <Dashboard />
</Profiler>
```

### Chrome Performance Tab

1. Open Chrome DevTools (F12)
2. Go to Performance tab
3. Click Record
4. Interact with your app
5. Stop recording
6. Analyze the flame graph for bottlenecks

## 🔧 Common Debugging Scenarios

### Debugging State Issues

```tsx
// Add temporary logging
useEffect(() => {
  console.log('State changed:', { currentState });
}, [currentState]);

// Or use React DevTools to inspect component state live
```

### Debugging API Calls

The React Query DevTools shows all API calls automatically. You can also:

```tsx
// Add logging to query functions
const { data } = useQuery({
  queryKey: ['videos'],
  queryFn: async () => {
    console.log('Fetching videos...');
    const result = await fetchVideos();
    console.log('Videos fetched:', result);
    return result;
  },
});
```

### Debugging Rendering Issues

```tsx
// Use why-did-you-render (optional package)
npm install --save-dev @welldone-software/why-did-you-render

// In your component file
if (import.meta.env.DEV) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
```

## 📝 Debugging Checklist

- [ ] Open React Query DevTools to inspect data fetching
- [ ] Install React DevTools browser extension
- [ ] Check browser console for errors and warnings
- [ ] Use Components tab to inspect props and state
- [ ] Use Profiler tab to identify performance issues
- [ ] Enable source maps for debugging bundled code
- [ ] Use breakpoints in browser DevTools
- [ ] Check Network tab for API call issues
- [ ] Use React error boundaries for catching errors
- [ ] Monitor re-renders with React DevTools Profiler

## 🚀 Quick Start Debugging

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Open the app:** Navigate to `http://localhost:8080`

3. **Open DevTools:** Press F12 (or Cmd+Option+I on Mac)

4. **Access React DevTools:**
   - Components tab: Inspect component tree
   - Profiler tab: Record and analyze performance
   - React Query icon: View query cache and states

5. **Set breakpoints:** Click line numbers in the Sources tab

6. **Monitor network:** Check Network tab for API issues

## 📚 Additional Resources

- [React DevTools Documentation](https://react.dev/learn/react-developer-tools)
- [React Query DevTools Guide](https://tanstack.com/query/latest/docs/react/devtools)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [Vite Debugging Guide](https://vitejs.dev/guide/debugging.html)
- [Puppeteer Documentation](https://pptr.dev/)
- [VS Code Debugging](https://code.visualstudio.com/docs/editor/debugging)

## 🆘 Need Help?

If you encounter issues while debugging:
1. Check the browser console first
2. Verify all dependencies are installed: `npm install`
3. Clear browser cache and restart dev server
4. Check if React DevTools extension is enabled
5. Try incognito/private mode to rule out extension conflicts
