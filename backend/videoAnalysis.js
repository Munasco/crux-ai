const {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} = require("@google/genai");
const axios = require("axios");
const tmp = require("tmp");
const fs = require("fs");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Analyze video using Gemini AI with custom prompt
 * @param {string} videoUrl - URL of the video to analyze
 * @param {string} customPrompt - Custom prompt for analysis
 * @returns {Promise<{analysis: string}|{error: string}>}
 */
async function analyzeVideo(videoUrl, customPrompt) {
  if (!videoUrl) {
    return { error: "video_url is required" };
  }

  if (!process.env.GEMINI_API_KEY) {
    return { error: "GEMINI_API_KEY environment variable not set." };
  }

  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  let tempFile;

  try {
    console.log("[1/6] Downloading video from URL...");
    // 1. Download the video to a temporary file
    const response = await axios({
      method: "get",
      url: videoUrl,
      responseType: "stream",
    });

    tempFile = tmp.fileSync({ postfix: ".mp4" });
    const writer = fs.createWriteStream(tempFile.name);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
    console.log("[2/6] Video downloaded locally to:", tempFile.name);

    // 2. Upload the local file to Gemini
    console.log("[3/6] Uploading file to Gemini API...");
    const file = await genAI.files.upload({
      file: tempFile.name,
      config: {
        mimeType: "video/mp4",
      },
    });
    console.log("[4/6] File uploaded successfully. Name:", file.name);

    // 3. Poll for active state
    console.log("[5/6] Waiting for file to be processed by Gemini...");
    let processedFile = await genAI.files.get({ name: file.name });
    while (processedFile.state === "PROCESSING") {
      process.stdout.write("."); // Print a dot to show progress without spamming logs
      await sleep(5000);
      processedFile = await genAI.files.get({ name: file.name });
    }

    if (processedFile.state !== "ACTIVE") {
      const errorMsg = `\nFile processing failed. Final state: ${processedFile.state}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    console.log("\n[5/6] File processed and active.");

    // 4. Make the generative model request
    console.log("[6/6] Sending prompt to generative model...");
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-pro",
      contents: createUserContent([
        customPrompt,
        createPartFromUri(processedFile.uri, processedFile.mimeType),
      ]),
    });
    const analysis = result.text;

    // 5. Send the analysis back to the client
    console.log("Analysis complete. Sending response.");
    return { analysis };
  } catch (error) {
    console.error("ERROR during video analysis:", error.message);
    return { error: "Failed to analyze video" };
  } finally {
    // 6. Clean up the temporary file
    if (tempFile) {
      console.log("Cleaning up temporary file.");
      tempFile.removeCallback();
    }
  }
}

module.exports = { analyzeVideo };
