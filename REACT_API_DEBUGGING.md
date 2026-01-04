# React Debugging API - Programmatic Access

This guide shows how to programmatically access React's internals for debugging, similar to how GDB provides an API for debugging native applications.

## 🔌 React DevTools Backend API

React DevTools exposes a backend API that you can use programmatically to inspect React applications.

### Installing the Standalone React DevTools

```bash
npm install --save-dev react-devtools-core
```

### Connecting Your App to DevTools Programmatically

Add to your `src/main.tsx` (development only):

```typescript
if (import.meta.env.DEV) {
  // Connect to standalone DevTools
  import('react-devtools-core').then(({ connectToDevTools }) => {
    connectToDevTools({
      host: 'localhost',
      port: 8097, // Default DevTools port
    });
  });
}
```

### Starting the DevTools Server

```bash
# Install globally
npm install -g react-devtools

# Start the server
react-devtools
```

Now you have a programmatic connection to inspect React components!

## 🎯 React DevTools Hook API

React exposes a global hook that DevTools uses. You can access it programmatically.

### Accessing the Hook

```javascript
// Access React DevTools Hook
const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

if (hook) {
  console.log('React DevTools Hook available!');
  
  // Get React Renderer
  const renderer = hook.renderers.get(1); // Usually ID 1
  
  // Access React Fiber tree
  const fiber = hook.getFiberRoots(1);
  
  console.log('Fiber roots:', fiber);
}
```

### Inspecting Component State Programmatically

```javascript
/**
 * Get component instance and state by searching the React Fiber tree
 */
function findReactComponent(element) {
  // Get React internal instance from DOM node
  for (let key in element) {
    if (key.startsWith('__reactInternalInstance$') || 
        key.startsWith('__reactFiber$')) {
      const fiberNode = element[key];
      return fiberNode;
    }
  }
  return null;
}

// Example usage
const domElement = document.querySelector('[data-component="Dashboard"]');
const fiber = findReactComponent(domElement);

if (fiber) {
  console.log('Component:', fiber.type.name);
  console.log('Props:', fiber.memoizedProps);
  console.log('State:', fiber.memoizedState);
}
```

## 🔧 React Reconciler API

For deep inspection, you can access React's reconciler directly.

### Getting Component State

```javascript
/**
 * Walk the React Fiber tree and collect component information
 */
function inspectReactTree(fiber, depth = 0) {
  if (!fiber) return;
  
  const info = {
    depth,
    name: fiber.type?.name || fiber.type || 'Unknown',
    props: fiber.memoizedProps,
    state: fiber.memoizedState,
    key: fiber.key,
  };
  
  console.log('  '.repeat(depth), info.name, info);
  
  // Traverse children
  let child = fiber.child;
  while (child) {
    inspectReactTree(child, depth + 1);
    child = child.sibling;
  }
}

// Get root fiber
const rootElement = document.getElementById('root');
const rootFiber = rootElement._reactRootContainer?._internalRoot?.current || 
                  rootElement._reactRootContainer?.current;

if (rootFiber) {
  inspectReactTree(rootFiber);
}
```

## 📡 React Query DevTools API

Access React Query cache programmatically.

### Exposing Query Client for Debugging

Update `src/lib/queryClient.ts`:

```typescript
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Expose for debugging in development
if (import.meta.env.DEV) {
  (window as any).__REACT_QUERY_CLIENT__ = queryClient;
}

export default queryClient;
```

### Programmatic Query Inspection

```javascript
// Access query client
const queryClient = window.__REACT_QUERY_CLIENT__;

if (queryClient) {
  // Get all queries
  const cache = queryClient.getQueryCache();
  const queries = cache.getAll();
  
  queries.forEach(query => {
    console.log('Query Key:', query.queryKey);
    console.log('State:', query.state);
    console.log('Data:', query.state.data);
    console.log('Status:', query.state.status);
    console.log('Error:', query.state.error);
    console.log('---');
  });
  
  // Get specific query
  const videoQuery = queryClient.getQueryData(['videos']);
  console.log('Videos:', videoQuery);
  
  // Invalidate query
  queryClient.invalidateQueries({ queryKey: ['videos'] });
  
  // Refetch query
  queryClient.refetchQueries({ queryKey: ['videos'] });
  
  // Clear all queries
  queryClient.clear();
}
```

## 🤖 Puppeteer with React DevTools Protocol

Automate React debugging using Puppeteer with access to React internals.

### Advanced React Inspection Script

Create `scripts/debugging/react-api-debug.js`:

```javascript
const puppeteer = require('puppeteer');

async function debugReactAPI() {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
  });
  
  const page = await browser.newPage();
  await page.goto('http://localhost:8080');
  await page.waitForSelector('#root');
  
  // Inject React inspection functions
  await page.addScriptTag({
    content: `
      window.getReactComponent = function(selector) {
        const element = document.querySelector(selector);
        if (!element) return null;
        
        for (let key in element) {
          if (key.startsWith('__reactInternalInstance$') || 
              key.startsWith('__reactFiber$')) {
            const fiber = element[key];
            return {
              name: fiber.type?.name || fiber.type,
              props: fiber.memoizedProps,
              state: fiber.memoizedState,
              key: fiber.key,
            };
          }
        }
        return null;
      };
      
      window.getAllReactComponents = function() {
        const components = [];
        const visited = new Set();
        
        function walk(fiber) {
          if (!fiber || visited.has(fiber)) return;
          visited.add(fiber);
          
          if (fiber.type?.name) {
            components.push({
              name: fiber.type.name,
              props: fiber.memoizedProps,
              state: fiber.memoizedState,
            });
          }
          
          if (fiber.child) walk(fiber.child);
          if (fiber.sibling) walk(fiber.sibling);
        }
        
        const root = document.getElementById('root');
        const rootFiber = root?._reactRootContainer?._internalRoot?.current;
        if (rootFiber) walk(rootFiber);
        
        return components;
      };
      
      window.getReactQueryState = function() {
        if (!window.__REACT_QUERY_CLIENT__) return null;
        
        const cache = window.__REACT_QUERY_CLIENT__.getQueryCache();
        return cache.getAll().map(q => ({
          key: q.queryKey,
          status: q.state.status,
          dataUpdatedAt: q.state.dataUpdatedAt,
          error: q.state.error?.message,
        }));
      };
    `
  });
  
  // Now use the API
  const components = await page.evaluate(() => {
    return window.getAllReactComponents();
  });
  
  console.log('React Components:', components);
  
  // Get specific component
  const dashboard = await page.evaluate(() => {
    return window.getReactComponent('[data-component="Dashboard"]');
  });
  
  console.log('Dashboard Component:', dashboard);
  
  // Get React Query state
  const queryState = await page.evaluate(() => {
    return window.getReactQueryState();
  });
  
  console.log('React Query State:', queryState);
  
  // Monitor component updates
  await page.exposeFunction('onComponentUpdate', (data) => {
    console.log('Component Updated:', data);
  });
  
  await page.evaluate(() => {
    // Hook into React updates
    const originalUseState = React.useState;
    React.useState = function(...args) {
      const result = originalUseState(...args);
      window.onComponentUpdate({ 
        type: 'useState',
        value: result[0] 
      });
      return result;
    };
  });
  
  // Keep running
  console.log('Monitoring React components...');
}

debugReactAPI().catch(console.error);
```

## 🔍 Chrome DevTools Protocol for React

Use CDP to access React debugging features.

### CDP React Debugging Script

```javascript
const CDP = require('chrome-remote-interface');

async function debugReactWithCDP() {
  const client = await CDP();
  const { Runtime, Page } = client;
  
  await Page.enable();
  await Runtime.enable();
  
  await Page.navigate({ url: 'http://localhost:8080' });
  await Page.loadEventFired();
  
  // Evaluate React code
  const result = await Runtime.evaluate({
    expression: `
      (function() {
        const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!hook) return { error: 'DevTools hook not found' };
        
        const fiber = Array.from(hook.getFiberRoots(1))[0];
        
        // Walk fiber tree
        const components = [];
        function walk(node) {
          if (!node) return;
          if (node.type?.name) {
            components.push({
              name: node.type.name,
              props: Object.keys(node.memoizedProps || {}),
              hasState: !!node.memoizedState,
            });
          }
          if (node.child) walk(node.child);
          if (node.sibling) walk(node.sibling);
        }
        
        walk(fiber.current);
        return components;
      })()
    `,
    returnByValue: true,
  });
  
  console.log('React Components:', result.result.value);
  
  await client.close();
}

debugReactWithCDP().catch(console.error);
```

## 🧪 Testing API - React Testing Library

For automated testing with API access:

```javascript
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

// Get component internals
function getComponentState(component) {
  const container = render(component);
  const fiber = container.container._reactRootContainer._internalRoot.current;
  
  // Find your component in the tree
  function findComponent(fiber, name) {
    if (fiber.type?.name === name) {
      return {
        props: fiber.memoizedProps,
        state: fiber.memoizedState,
      };
    }
    
    if (fiber.child) {
      const result = findComponent(fiber.child, name);
      if (result) return result;
    }
    
    if (fiber.sibling) {
      return findComponent(fiber.sibling, name);
    }
    
    return null;
  }
  
  return findComponent(fiber, 'YourComponent');
}
```

## 📝 Complete Example: Real-time React Debugger

Create `scripts/debugging/realtime-react-debugger.js`:

```javascript
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

let currentState = {
  components: [],
  queries: [],
};

// API endpoint to get React state
app.get('/api/react-state', (req, res) => {
  res.json(currentState);
});

// Start API server
app.listen(3030, () => {
  console.log('Debug API running on http://localhost:3030');
  console.log('Access state: http://localhost:3030/api/react-state');
});

// Monitor React app
async function monitor() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8080');
  await page.waitForSelector('#root');
  
  // Poll React state every 2 seconds
  setInterval(async () => {
    const state = await page.evaluate(() => {
      // Get components
      const components = [];
      const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
      
      if (hook) {
        const fiber = Array.from(hook.getFiberRoots(1))[0];
        
        function walk(node) {
          if (!node) return;
          if (node.type?.name) {
            components.push({
              name: node.type.name,
              hasProps: !!node.memoizedProps,
              hasState: !!node.memoizedState,
            });
          }
          if (node.child) walk(node.child);
          if (node.sibling) walk(node.sibling);
        }
        
        if (fiber) walk(fiber.current);
      }
      
      // Get queries
      const queries = [];
      if (window.__REACT_QUERY_CLIENT__) {
        const cache = window.__REACT_QUERY_CLIENT__.getQueryCache();
        cache.getAll().forEach(q => {
          queries.push({
            key: q.queryKey,
            status: q.state.status,
          });
        });
      }
      
      return { components, queries };
    });
    
    currentState = state;
    console.log(`[${new Date().toISOString()}] Components: ${state.components.length}, Queries: ${state.queries.length}`);
  }, 2000);
}

monitor().catch(console.error);
```

Usage:
```bash
# Terminal 1: Start your app
npm run dev

# Terminal 2: Start the debugger API
node scripts/debugging/realtime-react-debugger.js

# Terminal 3: Query the API
curl http://localhost:3030/api/react-state | jq
```

## 🎮 Interactive React Debugger REPL

Create `scripts/debugging/react-repl.js`:

```javascript
const puppeteer = require('puppeteer');
const repl = require('repl');

async function startREPL() {
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8080');
  await page.waitForSelector('#root');
  
  console.log('React REPL started. Try these commands:');
  console.log('  components()     - List all components');
  console.log('  queries()        - List React Query state');
  console.log('  getComponent(name) - Get component by name');
  console.log('  refetch(key)     - Refetch a query');
  
  const replServer = repl.start('react> ');
  
  replServer.context.components = async () => {
    return await page.evaluate(() => {
      return window.getAllReactComponents?.() || [];
    });
  };
  
  replServer.context.queries = async () => {
    return await page.evaluate(() => {
      return window.getReactQueryState?.() || [];
    });
  };
  
  replServer.context.getComponent = async (name) => {
    return await page.evaluate((name) => {
      const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
      // Implementation here
    }, name);
  };
  
  replServer.context.refetch = async (key) => {
    return await page.evaluate((key) => {
      window.__REACT_QUERY_CLIENT__?.refetchQueries({ queryKey: [key] });
      return `Refetched ${key}`;
    }, key);
  };
  
  replServer.on('exit', () => {
    browser.close();
  });
}

startREPL().catch(console.error);
```

## 📚 Summary: React Debugging APIs

| API | Use Case | Access Method |
|-----|----------|---------------|
| **React DevTools Hook** | Component inspection | `window.__REACT_DEVTOOLS_GLOBAL_HOOK__` |
| **React Fiber** | Internal component tree | Via DOM element keys |
| **React Query Client** | Query state/cache | `window.__REACT_QUERY_CLIENT__` |
| **Puppeteer** | Remote automation | `page.evaluate()` |
| **CDP** | Low-level protocol | `chrome-remote-interface` |
| **react-devtools-core** | Standalone connection | npm package |

## 🚀 Next Steps

1. Add React Query Client to window (see example above)
2. Install Puppeteer or CDP tools
3. Use the API examples to build your debugger
4. Create custom debugging tools for your needs

This gives you **programmatic, GDB-like access** to React's internals!
