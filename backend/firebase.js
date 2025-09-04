const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
// In Cloud Run, we'll use Application Default Credentials or service account from secrets
let app;

try {
  if (process.env.NODE_ENV === 'production') {
    // In production (Cloud Run), use Application Default Credentials
    // The service account is attached to the Cloud Run service
    app = admin.initializeApp({
      projectId: process.env.GOOGLE_CLOUD_PROJECT || 'crux-ai-a2e0d',
    });
  } else {
    // In development, try to load service account key
    const serviceAccount = require("./serviceAccountKey.json");
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
} catch (error) {
  console.error('Firebase initialization error:', error.message);
  
  // Fallback to Application Default Credentials
  try {
    app = admin.initializeApp({
      projectId: process.env.GOOGLE_CLOUD_PROJECT || 'crux-ai-a2e0d',
    });
    console.log('Using Application Default Credentials for Firebase');
  } catch (fallbackError) {
    console.error('Firebase fallback initialization failed:', fallbackError.message);
    throw fallbackError;
  }
}

const db = admin.firestore(app);

module.exports = { db };
