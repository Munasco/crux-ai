const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
// In Cloud Run, we'll use Application Default Credentials or service account from secrets
let app;

// Use dedicated FIRESTORE_PROJECT_ID for cross-project Firestore access
const firestoreProjectId = process.env.FIRESTORE_PROJECT_ID || 'crux-ai-a2e0d';

try {
  if (process.env.NODE_ENV === 'production') {
    // In production (Cloud Run), use Application Default Credentials with explicit project ID
    app = admin.initializeApp({
      projectId: firestoreProjectId,
    });
  } else {
    // In development, use service account key
    const serviceAccount = require("./serviceAccountKey.json");
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: firestoreProjectId,
    });
  }
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error.message);
  
  // Fallback to Application Default Credentials
  try {
    app = admin.initializeApp({
      projectId: firestoreProjectId,
    });
    console.log('Firebase fallback initialization successful');
  } catch (fallbackError) {
    console.error('Firebase fallback initialization failed:', fallbackError.message);
    throw fallbackError;
  }
}

const db = admin.firestore(app);

module.exports = { db };
