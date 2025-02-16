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

export async function POST(
  request: Request
): Promise<NextResponse<ErrorResponse | SuccessResponse>> {
  try {
    const { idToken } = await request.json();

    if (!idToken || typeof idToken !== 'string') {
      return NextResponse.json(
        { error: 'Missing ID token', emailVerified: false },
        { status: 400 }
      );
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    if (!decodedToken.email_verified) {
      return NextResponse.json(
        { error: 'Email not verified', emailVerified: false },
        { status: 403 }
      );
    }

    if (decodedToken.firebase.sign_in_provider !== 'password') {
      return NextResponse.json(
        { error: 'Invalid authentication provider', emailVerified: false },
        { status: 403 }
      );
    }

    // Ensure that decodedToken.email is defined
    if (!decodedToken.email) {
      return NextResponse.json(
        { error: 'Email not found in token', emailVerified: false },
        { status: 403 }
      );
    }

    // Set custom claim to the ID token indicating needsUsername
    await adminAuth.setCustomUserClaims(decodedToken.uid, {
      needsUsername: true,
    });

    // Create allowSetUsername token (JWT)
    const allowSetUsernameToken = await new SignJWT({
      purpose: 'username_update',
      uid: decodedToken.uid,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('3m')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

    // Prepare the response
    const response = NextResponse.json<SuccessResponse>({
      success: true,
      emailVerified: true,
      uid: decodedToken.uid,
      email: decodedToken.email,
    });

    // Set the allowSetUsername cookie
    response.cookies.set({
      name: 'allowSetUsername',
      value: allowSetUsernameToken,
      maxAge:  15 * 60,
      httpOnly: process.env.TEMP_COOKIE_HTTP_ONLY === 'true',
      secure: process.env.TEMP_COOKIE_SECURE === 'true',
      sameSite: 'lax',
      path: '/',
      priority: 'high',
    });

    return response;

  } catch (error: unknown) {
    let errorMessage = 'Invalid token';
    let errorCode = 'auth/invalid-token';

    if (typeof error === 'object' && error !== null) {
      const firebaseError = error as FirebaseError;
      if ('code' in firebaseError) {
        errorCode = firebaseError.code;
        errorMessage = firebaseError.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        emailVerified: false,
        code: errorCode,
      },
      { status: 401 }
    );
  }
}