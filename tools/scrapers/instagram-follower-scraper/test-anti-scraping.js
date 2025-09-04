#!/usr/bin/env node

import { Actor } from 'apify';
import { PlaywrightCrawler } from 'crawlee';
import randomUA from 'modern-random-ua';

// Test different Instagram profiles with various protection levels
const testProfiles = [
    'https://www.instagram.com/humansofny/',      // Known working from article
    'https://www.instagram.com/cristiano/',      // High-profile, might be more protected  
    'https://www.instagram.com/selenagomez/',    // Another high-profile test
    'https://www.instagram.com/natgeo/',         // Business account test
];

console.log('🔬 Testing Anti-Scraping Bypass Measures');
console.log('==========================================\n');

await Actor.init();

const proxyConfiguration = await Actor.createProxyConfiguration();

// Test each profile with enhanced anti-detection
for (const url of testProfiles) {
    console.log(`🎯 Testing: ${url}`);
    
    const crawler = new PlaywrightCrawler({
        proxyConfiguration,
        launchContext: {
            launchOptions: {
                headless: false,
                channel: 'chrome',
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-blink-features=AutomationControlled',
                    '--exclude-switches=enable-automation',
                    '--disable-default-apps'
                ]
            },
            useIncognitoPages: true,
        },
        autoscaledPoolOptions: {
            minConcurrency: 1,
            maxConcurrency: 1,
        },
        requestHandlerTimeoutSecs: 90,
        
        preNavigationHooks: [
            async (crawlingContext, gotoOptions) => {
                const { page } = crawlingContext;
                
                // Anti-tracking setup
                await page.setRequestInterception(true);
                page.on('request', (request) => {
                    const url = request.url();
                    
                    if (url.includes('analytics') || 
                        url.includes('tracking') || 
                        url.includes('metrics')) {
                        console.log(`🚫 Blocked tracking request: ${url.substring(0, 80)}...`);
                        request.abort();
                        return;
                    }
                    request.continue();
                });
                
                // Randomize fingerprint
                await page.setViewport({
                    width: 1024 + Math.floor(Math.random() * 200),
                    height: 768 + Math.floor(Math.random() * 200),
                });
                
                await page.setUserAgent(randomUA.generate());
                
                // Clear cookies
                const cookies = await page.cookies();
                if (cookies.length > 0) {
                    await page.deleteCookie(...cookies);
                    console.log(`🍪 Cleared ${cookies.length} cookies`);
                }
                
                // Remove automation indicators
                await page.evaluateOnNewDocument(() => {
                    Object.defineProperty(navigator, 'webdriver', {
                        get: () => undefined,
                    });
                    
                    window.chrome = { runtime: {} };
                    
                    Object.defineProperty(navigator, 'plugins', {
                        get: () => [1, 2, 3, 4, 5],
                    });
                });
                
                console.log('🥷 Stealth measures activated');
            }
        ],
        
        async requestHandler({ request, page, log, pushData }) {
            console.log(`📄 Loading: ${request.loadedUrl}`);
            
            try {
                // Wait for full load
                await page.waitForLoadState('networkidle', { timeout: 15000 });
                
                const currentUrl = page.url();
                const title = await page.title();
                
                console.log(`📋 Title: ${title}`);
                console.log(`🔗 Final URL: ${currentUrl}`);
                
                // Check for blocks/redirects
                if (title.includes('Login') || 
                    title.includes('Sign up') || 
                    currentUrl.includes('/accounts/login')) {
                    console.log('🚨 BLOCKED: Redirected to login page');
                    return;
                }
                
                if (title.includes('Please wait') || 
                    title.includes('Just a moment') ||
                    title.includes('Security check')) {
                    console.log('🚨 BLOCKED: Security challenge detected');
                    return;
                }
                
                // Simulate human behavior
                await page.mouse.move(Math.random() * 1000, Math.random() * 500);
                await page.evaluate(() => window.scrollBy(0, Math.random() * 200));
                await page.waitForTimeout(Math.random() * 2000 + 1000);
                
                // Try to extract follower count
                console.log('🔍 Looking for followers count...');
                
                try {
                    const followers = await page.getByText(/[0-9,.mMkK]+ followers/);
                    if (followers) {
                        const textContent = await followers.textContent();
                        const followersCount = textContent.split(' ')[0];
                        console.log(`✅ SUCCESS: Found ${followersCount} followers`);
                        console.log(`📊 Full text: "${textContent}"`);
                    } else {
                        console.log('⚠️  No followers element found');
                    }
                } catch (error) {
                    console.log(`❌ Extraction failed: ${error.message}`);
                }
                
                console.log('⏱️  Adding human-like delay...');
                await page.waitForTimeout(Math.random() * 5000 + 3000);
                
            } catch (error) {
                console.log(`💥 Error: ${error.message}`);
            }
        }
    });
    
    try {
        await crawler.run([url]);
        console.log(`✅ Completed test for ${url}\n`);
    } catch (error) {
        console.log(`❌ Test failed for ${url}: ${error.message}\n`);
    }
}

const summary = `
🎯 Anti-Scraping Test Summary
============================

✅ Implemented bypass techniques:
   🥷 Stealth mode with automation indicator removal
   🎭 Dynamic user agent rotation  
   🖼️  Randomized viewport fingerprinting
   🍪 Cookie clearing between requests
   🚫 Tracking request blocking
   🎬 Human-like mouse/scroll simulation
   ⏰ Random delays between actions
   🔄 IP rotation with proxy configuration

📊 Results analysis:
   - SUCCESS = Follower count extracted
   - BLOCKED = Redirect to login/security page  
   - ERROR = Technical/network issues

💡 Next steps if still blocked:
   1. Use residential proxies for better IP reputation
   2. Add session persistence with realistic cookies
   3. Implement more sophisticated behavioral simulation
   4. Consider using Instagram's official API for business use
`;

console.log(summary);

await Actor.exit();
