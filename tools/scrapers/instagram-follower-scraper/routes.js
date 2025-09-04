import { createPlaywrightRouter } from "crawlee";

export const router = createPlaywrightRouter();

const getFollowersCount = async ({ page, log }) => {
  try {
    console.log(`🔍 Looking for followers count...`);
    log.info('Looking for followers count...');
    
    console.log(`🎯 Using text pattern: /[0-9,.mMkK]+ followers/`);
    const followers = await page.getByText(/[0-9,.mMkK]+ followers/);
    
    console.log(`⏳ Waiting for followers element to be visible...`);
    await followers.waitFor({ timeout: 10000 });
    
    const textContent = await followers.textContent();
    console.log(`📝 Found followers text: "${textContent}"`);
    log.info(`Found followers text: ${textContent}`);
    
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
  
  console.log(`📄 Waiting for page to load...`);
  log.info(`Title is ${await page.title()}`);
  
  // Simple check for blocking - basic version
  const title = await page.title();
  const currentUrl = page.url();
  
  console.log(`📋 Page loaded - Title: ${title}`);
  console.log(`🔗 Current URL: ${currentUrl}`);
  
  // Basic redirect check
  if (title.includes('Login') || currentUrl.includes('/accounts/login')) {
    console.log(`🚨 BLOCKED: Redirected to login page`);
    log.warning(`Detected Instagram login redirect`);
    
    await pushData({
      url: request.loadedUrl,
      username: request.loadedUrl.split('/').filter(x => x.length > 0).pop(),
      followersCount: null,
      scrapedAt: new Date().toISOString(),
      success: false,
      error: 'Instagram login required',
      redirectedTo: currentUrl
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
