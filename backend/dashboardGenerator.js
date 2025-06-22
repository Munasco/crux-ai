const { GoogleGenAI } = require("@google/genai");
const { scrapeInstagram } = require("./crawl.js");
const { getFollowersCount } = require("./followerScraper.js");

// In-memory storage for job status (in production, use Redis or database)
const jobStatus = new Map();

/**
 * Orchestrates scraping, AI analysis, and saving dashboard data.
 * @param {string} username The Instagram username.
 * @param {string} jobId Unique identifier for tracking progress.
 * @param {FirebaseFirestore.Firestore} db The Firestore database instance.
 * @returns {Promise<{success: boolean, data: object}|{error: string}>}
 */
async function generateDashboardData(username, jobId, db) {
  if (!username) {
    return { error: "A username is required." };
  }
  if (!process.env.GEMINI_API_KEY) {
    return { error: "GEMINI_API_KEY environment variable not set." };
  }
  if (!db) {
    return { error: "Firestore database instance is required." };
  }

  try {
    // Initialize job status
    jobStatus.set(jobId, {
      status: "starting",
      progress: 0,
      message: "Initializing dashboard generation...",
      timestamp: new Date().toISOString(),
    });

    console.log(`[1/5] Starting analysis for ${username}...`);
    jobStatus.set(jobId, {
      status: "scraping_instagram",
      progress: 25,
      message: "Scraping Instagram profile data...",
      timestamp: new Date().toISOString(),
    });

    const instagramUrl = `https://www.instagram.com/${username}/`;
    const postsData = await scrapeInstagram(instagramUrl);
    if (postsData.error)
      throw new Error(`Failed to scrape Instagram posts: ${postsData.error}`);

    console.log(`[2/5] Instagram data scraped successfully.`);
    jobStatus.set(jobId, {
      status: "getting_followers",
      progress: 50,
      message: "Getting follower count...",
      timestamp: new Date().toISOString(),
    });

    const followersData = await getFollowersCount(username);
    if (followersData.error)
      throw new Error(`Failed to get follower count: ${followersData.error}`);

    console.log(`[3/5] Follower data retrieved.`);
    jobStatus.set(jobId, {
      status: "analyzing",
      progress: 75,
      message: "Analyzing data with AI...",
      timestamp: new Date().toISOString(),
    });

    const prompt = `
            Given the data for Instagram user "${username}" who has ${
      followersData.followersCount
    } followers, and the following recent video post data:
            ${JSON.stringify(
              postsData.results
                .slice(0, 10)
                .filter((post) => post.type === "Video"),
              null,
              2
            )}

            Please analyze this data to generate a JSON object with the following metrics:
            - "avgEngagement": Calculate the average engagement rate as a string (e.g., "4.7%"). Engagement is ((likes + comments) / followers) * 100.
            - "highestViewCount": Find the max view count from video posts as a string (e.g., "2.1K").
            - "videoContentPieces": ${
              postsData.results.filter((post) => post.type === "Video").length
            }
            - "strengths": An array of 2-3 objects with "name", "score" (1-100), and "description" for strengths like 'Audience Retention' or 'Community Building'.
            - "improvements": An array of 2-3 objects with "name", "score" (1-100), "description", and "suggestion" for weaknesses.
            
            Return ONLY the raw JSON object based on the example structure below, without any extra text or markdown.
            {
              "avgEngagement": "4.7%",
              "highestViewCount": "2.1K",
              "strengths": [],
              "improvements": []
            }
        `;

    console.log(`[4/5] Generating analysis with AI...`);
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
    });
    const responseText = result.text;
    console.log("AI analysis has ended.");

    const jsonString = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const dashboardData = JSON.parse(jsonString);

    dashboardData.totalFollowers = followersData.followersCount;
    dashboardData.username = username;
    dashboardData.videoContentPieces = postsData.results.filter(
      (post) => post.type === "Video"
    ).length;
    dashboardData.generatedAt = new Date().toISOString();

    // --- Step 5: Save to Firestore ---
    jobStatus.set(jobId, {
      status: "saving",
      progress: 95,
      message: "Saving analysis results...",
      timestamp: new Date().toISOString(),
    });
    console.log(`[5/5] Saving data to Firestore for user: ${username}`);
    const userRef = db.collection("users").doc(username);
    const userDoc = await userRef.get();

    const dataToSave = {
      ...dashboardData,
      lastUpdated: new Date().toISOString(),
    };

    if (userDoc.exists) {
      await userRef.update(dataToSave);
    } else {
      const initialData = {
        ...dataToSave,
        username: username, // ensure username is set on creation
        createdAt: new Date().toISOString(),
      };
      await userRef.set(initialData);
    }
    console.log("Data saved to Firestore successfully.");
    // ---------------------------------

    // Update final status
    jobStatus.set(jobId, {
      status: "completed",
      progress: 100,
      message: "Dashboard generation completed successfully!",
      timestamp: new Date().toISOString(),
      data: dashboardData,
    });

    return { success: true, data: dashboardData, jobId };
  } catch (error) {
    console.error("Error generating dashboard data:", error);

    // Update error status
    jobStatus.set(jobId, {
      status: "error",
      progress: 0,
      message: error.message || "Failed to generate dashboard data",
      timestamp: new Date().toISOString(),
    });

    return { error: error.message || "Failed to generate dashboard data" };
  }
}

/**
 * Get the status of a dashboard generation job
 * @param {string} jobId The job identifier
 * @returns {object|null} The job status or null if not found
 */
function getJobStatus(jobId) {
  return jobStatus.get(jobId) || null;
}

/**
 * Clean up completed jobs (optional - to prevent memory leaks)
 * @param {string} jobId The job identifier
 */
function cleanupJob(jobId) {
  jobStatus.delete(jobId);
}

module.exports = { generateDashboardData, getJobStatus, cleanupJob };
