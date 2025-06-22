const { PlaywrightCrawler } = require("crawlee");

/**
 * Gets the follower count for a given Instagram username.
 * @param {string} username - The Instagram username to scrape.
 * @returns {Promise<{followersCount: string}|{error: string}>}
 */
async function getFollowersCount(username) {
  if (!username) {
    return { error: "A username is required." };
  }

  let followersCount = "0";

  const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page }) => {
      try {
        await page.goto(`https://www.instagram.com/${username}/`);

        // Use the selector logic you provided.
        const followersLocator = page.getByText(/[0-9,.mMkK]+ followers/);

        // Wait for the element to be visible
        await followersLocator.waitFor({ state: "visible", timeout: 10000 });

        const textContent = await followersLocator.textContent();
        if (textContent) {
          followersCount = textContent.split(" ")[0];
        }
      } catch (e) {
        console.error(
          `Failed to scrape followers for ${username}: ${e.message}`
        );
      }
    },
    maxRequestsPerCrawl: 1,
    headless: true,
  });

  await crawler.run([`https://www.instagram.com/${username}/`]);

  return { followersCount };
}

module.exports = { getFollowersCount };
