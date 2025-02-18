import { NextResponse } from 'next/server';
import type { FirebaseError } from 'firebase-admin/app';
import { adminAuth } from '@/lib/firebase/admin-sdk';
import { SignJWT } from 'jose';

interface ErrorResponse {
  error: string;
  emailVerified: boolean;
  code?: string;
}

interface SuccessResponse {
  success: boolean;
  emailVerified: boolean;
  uid: string;
  email: string;
}

const FIREBASE_OPERATION_TIMEOUT = 5000; // 5 seconds
const ENV_VARS = ['JWT_SECRET', 'TEMP_COOKIE_HTTP_ONLY', 'TEMP_COOKIE_SECURE'] as const;

function createTimeoutPromise(ms: number): Promise<never> {
  return new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Operation timed out')), ms)
  );
}

function validateEnvironmentVariables(): void {
  ENV_VARS.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(`Missing environment variable: ${varName}`);
    }
  });
}

export async function POST(
  request: Request
): Promise<NextResponse<ErrorResponse | SuccessResponse>> {
  try {
    validateEnvironmentVariables();

    const { idToken } = await request.json().catch(() => {
      throw new Error('Invalid JSON payload');
    });

    if (!idToken || typeof idToken !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid ID token', emailVerified: false },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // Add timeout for Firebase operations
    const decodedToken = await Promise.race([
      adminAuth.verifyIdToken(idToken),
      createTimeoutPromise(FIREBASE_OPERATION_TIMEOUT)
    ]);

    if (!decodedToken.email_verified) {
      return NextResponse.json(
        { error: 'Email not verified', emailVerified: false },
        { status: 403, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    if (decodedToken.firebase.sign_in_provider !== 'password') {
      return NextResponse.json(
        { error: 'Invalid authentication provider', emailVerified: false },
        { status: 403, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    if (!decodedToken.email) {
      return NextResponse.json(
        { error: 'Email not found in token', emailVerified: false },
        { status: 403, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // Set custom claims with timeout
    await Promise.race([
      adminAuth.setCustomUserClaims(decodedToken.uid, { needsUsername: true }),
      createTimeoutPromise(FIREBASE_OPERATION_TIMEOUT)
    ]);

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not configured');
    }

    const allowSetUsernameToken = await new SignJWT({
      purpose: 'username_update',
      uid: decodedToken.uid,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('3m')
      .sign(new TextEncoder().encode(jwtSecret));

    const response = NextResponse.json<SuccessResponse>(
      {
        success: true,
        emailVerified: true,
        uid: decodedToken.uid,
        email: decodedToken.email,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );

    response.cookies.set({
      name: 'allowSetUsername',
      value: allowSetUsernameToken,
      maxAge: 15 * 60, // 15 minutes
      httpOnly: process.env.TEMP_COOKIE_HTTP_ONLY === 'true',
      secure: process.env.TEMP_COOKIE_SECURE === 'true',
      sameSite: 'lax',
      path: '/',
      priority: 'high',
    });

    return response;

  } catch (error: unknown) {
    console.error('API Route Error:', error);

    let statusCode = 500;
    let errorMessage = 'Internal server error';
    let errorCode = 'server-error';
    let emailVerified = false;

    if (error instanceof Error) {
      errorMessage = error.message;
      
      if (error.message.includes('Firebase')) {
        statusCode = 503;
        errorCode = 'service-unavailable';
      }
      
      if (error instanceof TypeError) {
        statusCode = 400;
        errorCode = 'bad-request';
      }
    }

    if (typeof error === 'object' && error !== null) {
      const firebaseError = error as FirebaseError;
      if (firebaseError.code?.startsWith('auth/')) {
        statusCode = 401;
        errorCode = firebaseError.code;
        errorMessage = firebaseError.message;
        emailVerified = firebaseError.code !== 'auth/unverified-email';
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        emailVerified,
        code: errorCode,
      },
      { 
        status: statusCode,
        headers: { 'Cache-Control': 'no-store' } 
      }
    );
  }
}
