const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} = require("@google/genai");
const axios = require("axios");
const tmp = require("tmp");
const fs = require("fs");
const path = require("path");
const { scrapeInstagram } = require("./crawl.js");
const { analyzeVideo } = require("./videoAnalysis.js");
const { getFollowersCount } = require("./followerScraper.js");
const { db } = require("./firebase.js");
const {
  generateDashboardData,
  getJobStatus,
  cleanupJob,
} = require("./dashboardGenerator.js");

const app = express();
const port = process.env.PORT || 8080;

// A more robust CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:8081",
]; // Add your frontend origins if they are different

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// --- API Endpoints ---
app.get("/", (req, res) => {
  res.json({
    PORT: "8080 (default)",
  });
});

app.post("/api/analyze-video", async (req, res) => {
  const { video_url, prompt } = req.body;

  if (!video_url) {
    return res.status(400).json({ error: "video_url is required" });
  }

  // Default prompt if none provided
  const defaultPrompt = `
    Analyze the provided video and identify potential reasons for underperformance. 
    Focus on the following areas:
    1.  **Hook (First 3-5 seconds):** Is it engaging? Does it create curiosity?
    2.  **Pacing and Editing:** Is the editing dynamic? Are there slow parts that might cause viewers to drop off?
    3.  **Content Clarity:** Is the video's message or story easy to understand?
    5.  **Audience Engagement:** Does the content encourage comments, likes, or shares?

    Provide a structured analysis with actionable feedback for each of these points.
  `;

  const customPrompt = prompt || defaultPrompt;
  const result = await analyzeVideo(video_url, customPrompt);

  if (result.error) {
    return res.status(500).json({ error: result.error });
  }

  res.json(result);
});

app.post("/api/scrape-instagram", async (req, res) => {
  const { url } = req.body;
  const result = await scrapeInstagram(url);
  if (result.error) {
    return res.status(500).json({ error: result.error });
  }
  res.json(result);
});

app.post("/api/get-followers-count", async (req, res) => {
  const { username } = req.body;
  const result = await getFollowersCount(username);
  if (result.error) {
    return res.status(500).json({ error: result.error });
  }
  res.json(result);
});

// --- User Data Endpoints ---

// Get all dashboard data for a user
app.get("/api/users/:userId/dashboardInfo", async (req, res) => {
  try {
    const { userId } = req.params;
    const doc = await db.collection("users").doc(userId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ success: true, data: doc.data() });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// Get a single data point for a user
app.get("/api/users/:userId/dashboardInfo/:dataPoint", async (req, res) => {
  try {
    const { userId, dataPoint } = req.params;
    const doc = await db.collection("users").doc(userId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const data = doc.data();
    if (!data || !data.hasOwnProperty(dataPoint)) {
      return res
        .status(404)
        .json({ error: `Data point "${dataPoint}" not found for user` });
    }

    res.status(200).json({ success: true, [dataPoint]: data[dataPoint] });
  } catch (error) {
    console.error("Error fetching data point:", error);
    res.status(500).json({ error: "Failed to fetch data point" });
  }
});

// Update/set dashboard data for a user
app.post("/api/users/:userId/updateDashboard", async (req, res) => {
  try {
    const { userId } = req.params;
    const data = req.body;

    if (!data) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    await db.collection("users").doc(userId).set(data, { merge: true });

    res.status(200).json({
      success: true,
      message: `Dashboard data saved for user ${userId}`,
    });
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ error: "Failed to save user data" });
  }
});

app.post("/api/users/:userId/data", async (req, res) => {
  try {
    const { userId } = req.params;
    const data = req.body;

    if (!data) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    await db.collection("users").doc(userId).set(data, { merge: true });

    res
      .status(200)
      .json({ success: true, message: `Data saved for user ${userId}` });
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ error: "Failed to save user data" });
  }
});

app.get("/api/users/:userId/data", async (req, res) => {
  try {
    const { userId } = req.params;
    const doc = await db.collection("users").doc(userId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ success: true, data: doc.data() });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

app.post("/api/generate-dashboard", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ error: "username is required in the request body" });
    }

    // Generate a unique job ID
    const jobId = `dashboard_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Start the generation process asynchronously. The saving is now handled inside.
    generateDashboardData(username, jobId, db);

    // Return the job ID immediately
    res.status(202).json({
      success: true,
      message: "Dashboard generation started",
      jobId: jobId,
    });
  } catch (error) {
    console.error("Error in generate-dashboard endpoint:", error);
    res.status(500).json({ error: "Failed to start dashboard generation" });
  }
});

app.get("/api/generate-dashboard/status/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const status = getJobStatus(jobId);

    if (!status) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json({
      success: true,
      jobId: jobId,
      ...status,
    });

    // Clean up completed jobs
    if (status.status === "completed" || status.status === "error") {
      setTimeout(() => cleanupJob(jobId), 60000); // Clean up after 1 minute
    }
  } catch (error) {
    console.error("Error getting job status:", error);
    res.status(500).json({ error: "Failed to get job status" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
