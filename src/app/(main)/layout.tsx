import type { Metadata } from "next"; // Import the Metadata type
import MainLayout from "./MainLayout"; // Client-side layout
import { metadata as siteMetadata } from "./metadata";
 // Import metadata from metadata.ts

// ✅ Use the imported metadata in the layout
export const metadata: Metadata = siteMetadata; // Use imported metadata and ensure proper typing

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}