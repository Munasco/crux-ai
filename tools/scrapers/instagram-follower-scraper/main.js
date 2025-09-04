// For more information, see https://docs.apify.com/sdk/js
import { Actor } from 'apify';
// For more information, see https://crawlee.dev
import { PlaywrightCrawler } from 'crawlee';
// this is ESM project, and as such, it requires you to specify extensions in your relative imports
// read more about this here: https://nodejs.org/docs/latest-v18.x/api/esm.html#mandatory-file-extensions
import { router } from './routes.js';
import randomUA from 'modern-random-ua';

// Initialize the Apify SDK
await Actor.init();

// Get input from Actor platform or use default URLs
const input = await Actor.getInput() ?? {};
let { urls } = input;

// Handle string input (textarea format)
if (typeof urls === 'string') {
    urls = urls.split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);
}

// Default to some test URLs if none provided
if (!urls || urls.length === 0) {
    const usernames = [
        "humansofny",
    ];
    urls = usernames.map(
        (username) => `https://www.instagram.com/${username}/`
    );
}

// Filter only Instagram URLs
const instagramUrls = urls.filter(url => url.includes('instagram.com'));

if (instagramUrls.length === 0) {
    throw new Error('No Instagram URLs found in the provided URLs');
}

const proxyConfiguration = await Actor.createProxyConfiguration();

const crawler = new PlaywrightCrawler({
    proxyConfiguration, // Enable proxy to help avoid Instagram blocking
    requestHandler: router,
    // Simple settings to match the article
    headless: true, // Keep headless for faster execution
    maxRequestsPerCrawl: instagramUrls.length,
    requestHandlerTimeoutSecs: 120, // Give more time for Instagram to load
    navigationTimeoutSecs: 60, // More time for navigation
    autoscaledPoolOptions: {
        minConcurrency: 1,
        maxConcurrency: 1,
    },
    // Add browser stealth options to evade Instagram detection
    launchContext: {
        launchOptions: {
            args: [
                '--disable-blink-features=AutomationControlled',
                '--no-first-run',
                '--disable-default-apps',
                '--disable-dev-shm-usage',
                '--no-sandbox'
            ]
        }
    },
    // Use realistic user agent
    preNavigationHooks: [async ({ request, page }) => {
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    }]
});

await crawler.run(instagramUrls); // provides the crawler the list of starting urls

// Exit successfully
await Actor.exit();
