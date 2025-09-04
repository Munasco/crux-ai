const { ApifyClient } = require("apify-client");

/**
 * Gets the follower count for a given Instagram username using Apify actor.
 * @param {string} username - The Instagram username to scrape.
 * @param {string} apiToken - The Apify API token.
 * @returns {Promise<{followersCount: string}|{error: string}>}
 */
async function getFollowersCount(username, apiToken) {
  if (!username) {
    return { error: "A username is required." };
  }

  // Use the provided token or fall back to the environment variable
  const token = apiToken || process.env.APIFY_API_TOKEN;
  if (!token) {
    return {
      error:
        "An Apify API token is required (set APIFY_API_TOKEN env variable).",
    };
  }

  const client = new ApifyClient({
    token,
  });

  const input = {
    instagramUsernames: [username],
  };

  try {
    // Run the Actor and wait for it to finish
    const run = await client.actor("YJDdYs3nbTpedTT5n").call(input);

    // Fetch Actor results from the run's dataset (if any)
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    if (items && items.length > 0) {
      const result = items[0];
      if (result.followers !== undefined && result.followers !== null) {
        return {
          followersCount: String(result.followers),
          username: result.username,
          success: result.success,
        };
      } else {
        return {
          error: result.error || "No follower count found in actor results.",
        };
      }
    } else {
      return { error: "No results returned from the scraper." };
    }
  } catch (e) {
    return { error: `Failed to fetch followers: ${e.message}` };
  }
}

module.exports = { getFollowersCount };
