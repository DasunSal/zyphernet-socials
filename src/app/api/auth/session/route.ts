import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin-sdk';

const THREE_DAYS_IN_SECONDS = 7 * 24 * 60 * 60; // 3 days in seconds
const SESSION_TIMEOUT = 100000; // Timeout set to 100 seconds (100,000 milliseconds)

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ message: 'ID token is required' }, { status: 400 });
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken).catch((error) => {
      console.error('Token verification error:', error);
      throw new Error('Invalid ID token.');
    });

    // Check email verification status
    if (!decodedToken.email_verified) {
      return NextResponse.json(
        { message: 'This email is not verified' },
        { status: 401 }
      );
    }

    // Handle username requirement
    if (decodedToken.needsUsername) {
      return NextResponse.json(
        { 
          message: 'Account creation is not complete',
          needsUsername: true
        }, 
        { status: 400 }
      );
    }

    // Utility function to create a timeout promise
    const createTimeout = (ms: number): Promise<never> =>
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Session cookie creation timed out. Please try again.")), ms)
      );

    // Create session cookie with timeout logic
    const sessionCookie = await Promise.race([
      adminAuth.createSessionCookie(idToken, { expiresIn: THREE_DAYS_IN_SECONDS * 1000 }), // The main task (creating session)
      createTimeout(SESSION_TIMEOUT) // The timeout task (reject after 100 seconds)
    ]);

    const response = NextResponse.json(
      { 
        message: 'Login successful',
        uid: decodedToken.uid,
        needsUsername: false
      }, 
      { status: 200 }
    );

    const secure = process.env.COOKIE_SECURE === 'true';
    const sameSite = process.env.COOKIE_SAMESITE || 'Lax';

    response.cookies.set('session', sessionCookie, {
      httpOnly: true,
      secure,
      sameSite,
      path: '/',
      maxAge: THREE_DAYS_IN_SECONDS,
    });

    return response;

  } catch (error: unknown) {
    if (error instanceof Error) {
      // Check for timeout error
      if (error.message.includes('timed out')) {
        return NextResponse.json(
          { message: error.message || 'Login failed due to timeout' },
          { status: 504 } // Gateway Timeout
        );
      }

      return NextResponse.json(
        { message: error.message || 'Authentication failed' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
