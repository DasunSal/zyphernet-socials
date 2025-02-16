import { NextResponse } from 'next/server';

export async function POST(): Promise<NextResponse> {
  try {
    const response = NextResponse.json({ success: true }, { status: 200 });

    // Set the session cookie to expire immediately using max-age: 0
    response.cookies.set({
      name: 'session',
      value: '',          // Clear the cookie value
      maxAge: 0,          // Expire the cookie immediately
      path: '/',          // Cookie is available across the entire site
      httpOnly: true,     // Prevent the cookie from being accessed via JavaScript
      secure: process.env.COOKIE_SECURE === 'true',  // Ensure secure cookie if necessary
      sameSite: process.env.COOKIE_SAMESITE as 'strict' | 'lax' | 'none' || 'lax', // Cookie SameSite policy
    });

    return response;
  } catch (error: unknown) {
    console.error('Error during logout:', error);

    const errorMessage = error instanceof Error
      ? error.message
      : 'Internal server error';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
