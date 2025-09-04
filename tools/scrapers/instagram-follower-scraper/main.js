const Apify = require('apify');

Apify.main(async () => {
    console.log('Starting Instagram follower count scraper...');
    
    // Get input data from Apify platform
    const input = await Apify.getInput();
    let { urls } = input;
    
    // Handle string input (textarea format)
    if (typeof urls === 'string') {
        urls = urls.split('\n')
            .map(url => url.trim())
            .filter(url => url.length > 0);
    }
    
    if (!urls || urls.length === 0) {
        throw new Error('No Instagram URLs provided in input');
    }
    
    // Filter only Instagram URLs
    const instagramUrls = urls.filter(url => url.includes('instagram.com'));
    
    if (instagramUrls.length === 0) {
        throw new Error('No Instagram URLs found in the provided URLs');
    }
    
    console.log('Processing Instagram URLs:', instagramUrls);
    
    // Launch Puppeteer
    const browser = await Apify.launchPuppeteer({
        headless: true,
        launchOptions: {
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    });
    
    const results = [];
    
    for (const url of instagramUrls) {
        try {
            console.log(`Processing Instagram profile: ${url}`);
            const page = await browser.newPage();
            
            // Set user agent to avoid detection
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
            
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
            
            // Wait a bit for dynamic content to load
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            const instagramData = await scrapeInstagram(page);
            
            const result = {
                url,
                platform: 'instagram',
                username: instagramData.username,
                followerCount: instagramData.followers,
                scrapedAt: new Date().toISOString(),
                success: instagramData.followers !== null
            };
            
            results.push(result);
            console.log(`Result:`, result);
            
            await page.close();
            
        } catch (error) {
            console.error(`Error processing Instagram URL ${url}:`, error.message);
            results.push({
                url,
                platform: 'instagram',
                username: null,
                followerCount: null,
                error: error.message,
                scrapedAt: new Date().toISOString(),
                success: false
            });
        }
        
        // Add delay between requests to be respectful
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    await browser.close();
    
    // Save results to Apify dataset
    await Apify.pushData(results);
    
    console.log('Instagram scraping completed. Total results:', results.length);
    console.log('Successful scrapes:', results.filter(r => r.success).length);
});


async function scrapeInstagram(page) {
    try {
        // Wait for profile data to load
        await page.waitForSelector('header section ul li', { timeout: 10000 });
        
        const username = await page.evaluate(() => {
            const h2 = document.querySelector('header section h2');
            return h2 ? h2.textContent : null;
        });
        
        const followers = await page.evaluate(() => {
            const lists = document.querySelectorAll('header section ul li');
            for (const li of lists) {
                const text = li.textContent;
                if (text.includes('followers')) {
                    const match = text.match(/^([\d,.\s]+[KMB]?)/);
                    return match ? match[1].trim() : null;
                }
            }
            return null;
        });
        
        return {
            username,
            followers: parseFollowerCount(followers)
        };
    } catch (error) {
        console.error('Instagram scraping error:', error.message);
        return { username: null, followers: null };
    }
}


function parseFollowerCount(countStr) {
    if (!countStr) return null;
    
    // Remove any non-numeric characters except for K, M, B, and decimals
    let cleanStr = countStr.replace(/[^\d.,KMB]/gi, '');
    
    // Handle different formats
    let multiplier = 1;
    if (cleanStr.toUpperCase().includes('K')) {
        multiplier = 1000;
        cleanStr = cleanStr.replace(/K/gi, '');
    } else if (cleanStr.toUpperCase().includes('M')) {
        multiplier = 1000000;
        cleanStr = cleanStr.replace(/M/gi, '');
    } else if (cleanStr.toUpperCase().includes('B')) {
        multiplier = 1000000000;
        cleanStr = cleanStr.replace(/B/gi, '');
    }
    
    // Remove commas and convert to number
    const number = parseFloat(cleanStr.replace(/,/g, ''));
    
    if (isNaN(number)) return null;
    
    return Math.round(number * multiplier);
}
