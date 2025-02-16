import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminFirestore } from '@/lib/firebase/admin-sdk';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: NextRequest) {
  try {
    const { idToken, username } = await request.json();

    // Validate input parameters
    if (!idToken || !username || typeof username !== 'string' || !/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    // Verify Firebase ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // Check custom claim
    if (!decodedToken.needsUsername) {
      return NextResponse.json(
        { error: 'Username setup not required' },
        { status: 403 }
      );
    }

    // Use transaction for atomic operations
    await adminFirestore.runTransaction(async (transaction) => {
      // Check username availability using direct document reference
      const usernameRef = adminFirestore.doc(`usernames/${username}`);
      const usernameDoc = await transaction.get(usernameRef);

      if (usernameDoc.exists) {
        throw new Error('Username already taken');
      }

      // Prepare user data
      const userData = {
        uid: decodedToken.uid,
        username,
        email: decodedToken.email,
        profilePicUrl: null,
        description: null, // Add profile picture field
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        needsUsername: false
      };

      // Create username mapping
      transaction.set(usernameRef, {
        userId: decodedToken.uid,
        createdAt: FieldValue.serverTimestamp()
      });

      // Update user document
      const userRef = adminFirestore.doc(`users/${decodedToken.uid}`);
      transaction.set(userRef, userData, { merge: true });
    });

    // Update custom claims
    await adminAuth.setCustomUserClaims(decodedToken.uid, {
      needsUsername: false,
      username // Store username in custom claims for quick access
    });

    // Create new session cookie with updated claims
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Create response and set the session cookie
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    // Set the session cookie
    response.cookies.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true', // Use COOKIE_SECURE environment variable
      sameSite: process.env.COOKIE_SAMESITE || 'Lax', // Use COOKIE_SAMESITE environment variable
      path: '/',
      maxAge: 604800 // 7 days in seconds
    });

    // Force expire the allowSetUsername cookie after a successful operation
    response.cookies.set('allowSetUsername', '', {
      httpOnly: process.env.TEMP_COOKIE_HTTP_ONLY === 'true', // Use TEMP_COOKIE_HTTP_ONLY environment variable
      secure: process.env.TEMP_COOKIE_SECURE === 'true', // Use TEMP_COOKIE_SECURE environment variable
      sameSite: 'Lax',
      path: '/',
      expires: new Date(0), // Set cookie to expire immediately
    });

    return response;

  } catch (error: unknown) {
    console.error('Username setup error:', error);

    if (error instanceof Error) {
      const statusMap: Record<string, number> = {
        'Username already taken': 409,
        'Username setup not required': 403,
        'Invalid request parameters': 400
      };

      return NextResponse.json(
        { error: error.message },
        { status: statusMap[error.message] || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
