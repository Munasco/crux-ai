/**
 * Automated React Debugging with Puppeteer
 * 
 * This script demonstrates how to automate React debugging using Puppeteer
 * and Chrome DevTools Protocol.
 * 
 * Installation:
 * npm install --save-dev puppeteer
 * 
 * Usage:
 * node scripts/debugging/automated-debug.js
 */

const puppeteer = require('puppeteer');
const http = require('http');

async function debugReactApp() {
  console.log('🚀 Starting automated React debugging...\n');

  // Launch browser with DevTools
  const browser = await puppeteer.launch({
    headless: false, // Set to true for CI/CD
    devtools: true,  // Opens DevTools automatically
    args: [
      '--auto-open-devtools-for-tabs',
      // WARNING: --disable-web-security should ONLY be used for local debugging
      // Never use this in production or on untrusted websites
      // This flag allows cross-origin requests which can be a security risk
      // '--disable-web-security',
    ],
  });

  const page = await browser.newPage();

  // Enable console message capture
  page.on('console', (msg) => {
    const type = msg.type();
    const text = msg.text();
    
    if (type === 'error') {
      console.error('❌ Browser Error:', text);
    } else if (type === 'warning') {
      console.warn('⚠️  Browser Warning:', text);
    } else {
      console.log('📝 Browser Log:', text);
    }
  });

  // Enable error tracking
  page.on('pageerror', (error) => {
    console.error('💥 Page Error:', error.message);
  });

  // Track network requests
  page.on('request', (request) => {
    console.log('🌐 Request:', request.method(), request.url());
  });

  // Track failed requests
  page.on('requestfailed', (request) => {
    console.error('❌ Request Failed:', request.url(), request.failure().errorText);
  });

  try {
    console.log('📱 Navigating to app...');
    await page.goto('http://localhost:8080', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    console.log('✅ App loaded successfully\n');

    // Wait for React to load
    await page.waitForSelector('#root', { timeout: 10000 });
    console.log('✅ React root element found\n');

    // Check for React DevTools
    const hasReactDevTools = await page.evaluate(() => {
      return typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined';
    });

    console.log('🔍 React DevTools Hook:', hasReactDevTools ? '✅ Detected' : '❌ Not found');

    // Check for React Query DevTools
    const hasReactQuery = await page.evaluate(() => {
      return document.querySelector('[class*="ReactQueryDevtools"]') !== null;
    });

    console.log('🔍 React Query DevTools:', hasReactQuery ? '✅ Available' : '❌ Not found');

    // Get React version
    const reactVersion = await page.evaluate(() => {
      try {
        // Check if React is available in window
        if (typeof window.React !== 'undefined' && window.React.version) {
          return window.React.version;
        }
        
        // Check for React 18+ (uses createRoot)
        const root = document.querySelector('#root');
        if (root) {
          // Look for React Fiber node (more reliable)
          const fiberKey = Object.keys(root).find(key => 
            key.startsWith('__reactContainer') || key.startsWith('__reactFiber')
          );
          
          if (fiberKey) {
            return 'React 18+';
          }
          
          // Fallback for older versions
          if (root._reactRootContainer) {
            return 'React 17 or earlier';
          }
        }
        
        return 'React detected but version unknown';
      } catch (e) {
        return 'Unable to detect';
      }
    });

    console.log('⚛️  React Version:', reactVersion);

    // Count React components
    const componentCount = await page.evaluate(() => {
      const root = document.querySelector('#root');
      return root ? root.querySelectorAll('*').length : 0;
    });

    console.log('🧩 DOM Elements in Root:', componentCount, '\n');

    // Take screenshot
    const screenshotPath = 'debug-screenshot.png';
    await page.screenshot({ 
      path: screenshotPath,
      fullPage: true 
    });
    console.log('📸 Screenshot saved to:', screenshotPath);

    // Measure performance
    const performanceMetrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
        domInteractive: perfData.domInteractive - perfData.fetchStart,
      };
    });

    console.log('\n⚡ Performance Metrics:');
    console.log('  DOM Content Loaded:', performanceMetrics.domContentLoaded.toFixed(2), 'ms');
    console.log('  Load Complete:', performanceMetrics.loadComplete.toFixed(2), 'ms');
    console.log('  DOM Interactive:', performanceMetrics.domInteractive.toFixed(2), 'ms');

    // Check for common issues
    console.log('\n🔍 Checking for common issues...');

    const issues = await page.evaluate(() => {
      const problems = [];

      // Check for missing alt attributes
      const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
      if (imagesWithoutAlt.length > 0) {
        problems.push(`${imagesWithoutAlt.length} images missing alt attributes`);
      }

      // Check for console errors
      // Note: This would be captured by the console event listener above

      return problems;
    });

    if (issues.length > 0) {
      console.log('⚠️  Issues found:');
      issues.forEach(issue => console.log('  -', issue));
    } else {
      console.log('✅ No common issues detected');
    }

    console.log('\n✅ Automated debugging complete!');
    console.log('🔍 Browser will remain open for manual inspection.');
    console.log('   Press Ctrl+C to close.\n');

    // Keep browser open for manual inspection
    // Uncomment the line below to close automatically
    // await browser.close();

  } catch (error) {
    console.error('\n❌ Error during debugging:', error.message);
    await browser.close();
    process.exit(1);
  }
}

// Check if dev server is running
async function checkDevServer() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:8080', (res) => {
      resolve(true);
    });
    
    req.on('error', () => {
      resolve(false);
    });
    
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function main() {
  const isServerRunning = await checkDevServer();
  
  if (!isServerRunning) {
    console.error('❌ Dev server is not running on http://localhost:8080');
    console.log('📝 Please start the dev server first:');
    console.log('   npm run dev\n');
    process.exit(1);
  }

  await debugReactApp();
}

main().catch(console.error);
