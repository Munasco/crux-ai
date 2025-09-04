import { createPlaywrightRouter } from "crawlee";

export const router = createPlaywrightRouter();

const getFollowersCount = async ({ page, log }) => {
  try {
    console.log(`🔍 Looking for followers count...`);
    log.info('Looking for followers count...');
    
    console.log(`🎯 Using text pattern: /[0-9,.mMkK]+ followers/`);
    const followers = await page.getByText(/[0-9,.mMkK]+ followers/);
    
    console.log(`⏳ Waiting for followers element (15 sec timeout)...`);
    await followers.waitFor({ timeout: 15000 }); // Give Instagram time to load content
    
    const textContent = await followers.textContent();
    console.log(`📝 Found followers text: "${textContent}"`);
    log.info(`Found followers text: ${textContent}`);
    
    if (!textContent || !textContent.includes('followers')) {
      throw new Error('Invalid followers text format');
    }
    
    const followersCount = textContent.split(" ")[0];
    console.log(`🔢 Extracted followers count: "${followersCount}"`);
    log.info(`Extracted followers count: ${followersCount}`);
    
    return { followersCount };
  } catch (error) {
    console.log(`❌ Error getting followers count: ${error.message}`);
    log.error(`Error getting followers count: ${error.message}`);
    return { followersCount: 0 };
  }
};

const profileHandler = async({ request, page, log, pushData}) => {
  console.log(`🚀 Starting: Processing profile: ${request.loadedUrl}`);
  log.info(`Processing profile: ${request.loadedUrl}`);
  
  try {
    // Set reasonable page timeouts for Instagram
    page.setDefaultTimeout(30000); // 30 second default timeout
    page.setDefaultNavigationTimeout(60000); // 60 second navigation timeout
    
    console.log(`📄 Checking page status...`);
    
    // Quick check for blocking - get title and URL immediately
    const title = await page.title();
    const currentUrl = page.url();
    
    console.log(`📋 Page loaded - Title: ${title}`);
    console.log(`🔗 Current URL: ${currentUrl}`);
    
    // Enhanced blocking detection
    const isBlocked = title.includes('Login') || 
                     title.includes('Sign up') ||
                     title.includes('Please wait') ||
                     title.includes('Just a moment') ||
                     currentUrl.includes('/accounts/login') ||
                     currentUrl.includes('/challenge');
    
    if (isBlocked) {
      console.log(`🚨 BLOCKED: Instagram blocking detected`);
      console.log(`🚨 Block reason: Title="${title}", URL="${currentUrl}"`);
      log.warning(`Detected Instagram blocking: ${title}`);
      
      await pushData({
        url: request.loadedUrl,
        username: request.loadedUrl.split('/').filter(x => x.length > 0).pop(),
        followersCount: null,
        scrapedAt: new Date().toISOString(),
        success: false,
        error: `Instagram blocked: ${title}`,
        redirectedTo: currentUrl
      });
      return;
    }
  } catch (error) {
    console.log(`❌ Error during initial page check: ${error.message}`);
    log.error(`Page check error: ${error.message}`);
    
    await pushData({
      url: request.loadedUrl,
      username: request.loadedUrl.split('/').filter(x => x.length > 0).pop(),
      followersCount: null,
      scrapedAt: new Date().toISOString(),
      success: false,
      error: `Page load error: ${error.message}`
    });
    return;
  }

  const username = request.loadedUrl
    .split("/")
    .filter((x) => x.length > 0)
    .pop();

  console.log(`👤 Extracted username: ${username}`);
  console.log(`🔍 Looking for followers count...`);
  
  const { followersCount } = await getFollowersCount({ page, log });

  const result = {
    url: request.loadedUrl,
    username,
    followersCount,
    scrapedAt: new Date().toISOString(),
    success: followersCount !== 0
  };

  console.log(`✅ Final result:`, result);
  log.info(`Final result:`, result);
  await pushData(result);
};

router.addDefaultHandler(profileHandler);
