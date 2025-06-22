const { ApifyClient } = require("apify-client");

// Expects APIFY_API_TOKEN in environment
const apifyClient = new ApifyClient({
  token: process.env.APIFY_API_TOKEN,
});

/**
 * Scrape Instagram posts using Apify
 * @param {string} url - Instagram profile URL
 * @returns {Promise<{success: boolean, count: number, results: any[]}|{error: string}>}
 */
async function scrapeInstagram(url) {
  if (!url) {
    return { error: "url is required" };
  }
  try {
    // Prepare Actor input
    const input = {
      directUrls: [url],
      resultsType: "posts",
      resultsLimit: 200,
      searchType: "hashtag",
      searchLimit: 1,
      addParentData: false,
    };
    // Run the Actor and wait for it to finish
    const run = await apifyClient.actor("RB9HEZitC8hIUXAha").call(input);
    // Fetch Actor results from the run's dataset
    const { items } = await apifyClient
      .dataset(run.defaultDatasetId)
      .listItems();
    return {
      success: true,
      count: items.length,
      results: items,
    };
  } catch (error) {
    return { error: error.message || "Failed to scrape Instagram" };
  }
}

module.exports = { scrapeInstagram };
