import * as admin from "firebase-admin"; // Import for secure verification

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  const serviceAccountBase64 = process.env.FIREBASE_ADMIN_SDK;

  if (!serviceAccountBase64) {
    throw new Error("FIREBASE_ADMIN_SDK environment variable is not set.");
  }

  const serviceAccount = JSON.parse(
    Buffer.from(serviceAccountBase64, "base64").toString("utf-8")
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Export initialized Firebase Admin services
export const adminAuth = admin.auth();
export const adminFirestore = admin.firestore();