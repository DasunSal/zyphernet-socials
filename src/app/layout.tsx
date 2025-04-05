import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../lib/auth';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Social App',
  description: 'A social media app with Fastify backend',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <nav className="p-4 bg-gray-800 text-white flex justify-between">
            <Link href="/" className="font-bold">Social App</Link>
            <div>
              <a href="/auth/signin" className="mr-4">Sign In</a>
              <a href="/auth/signup" className="mr-4">Sign Up</a>
              <a href="/auth/profile">Profile</a>
            </div>
          </nav>
          <main className="p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}