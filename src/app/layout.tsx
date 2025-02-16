import "@/styles/globals.css";
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500', '700'] });


export const metadata = {
  title: "Zyphernet",
  description: "global",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        <title>Zyphernet</title>
        <meta
          name="description"
          content="Zyphernet is the ultimate platform for connecting and engaging with your community."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Zyphernet - Your Ultimate Platform" />
        <meta
          property="og:description"
          content="Zyphernet is the ultimate platform for connecting and engaging with your community."
        />
        <meta property="og:image" content="/assets/og-image.png" />
        <meta property="og:url" content="https://zyphernet.com" />
        <meta property="og:type" content="website" />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zyphernet - Your Ultimate Platform" />
        <meta
          name="twitter:description"
          content="Zyphernet is the ultimate platform for connecting and engaging with your community."
        />
        <meta name="twitter:image" content="/assets/twitter-image.png" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Zyphernet",
              url: "https://zyphernet.com",
              logo: "https://zyphernet.com/assets/logo-desktop.png",
              sameAs: [
                "https://www.facebook.com/zyphernet",
                "https://www.twitter.com/zyphernet",
                "https://www.instagram.com/zyphernet",
              ],
            }),
          }}
        />
      </head>
      <body className={`${roboto.className} antialiased text-base sm:text-lg md:text-xl lg:text-2xl`}>
        {children}
      </body>
    </html>
  );
}