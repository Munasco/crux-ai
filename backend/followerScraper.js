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
    usernames: [username],
  };

  try {
    // Run the Actor and wait for it to finish
    const run = await client.actor("7RQ4RlfRihUhflQtJ").call(input);

    // Fetch Actor results from the run's dataset (if any)
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    if (items && items.length > 0 && items[0].followersCount !== undefined) {
      return { followersCount: String(items[0].followersCount) };
    } else {
      return { error: "No follower count found in actor results." };
    }
  } catch (e) {
    return { error: `Failed to fetch followers: ${e.message}` };
  }
}

module.exports = { getFollowersCount };
