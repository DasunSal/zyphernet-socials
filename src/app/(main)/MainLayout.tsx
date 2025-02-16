"use client";

import { useMediaQuery } from "@/hooks/useMedia";
import Sidebar from "@/components/main-set/Sidebar";
import MobileNavbar from "@/components/main-set/MobileNavbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screens

  return (
    <div className="bg-black text-white min-h-screen flex">
      {isMobile ? <MobileNavbar /> : <Sidebar />}
      <main
        className={`flex-1 p-6 ${
          isMobile ? "pb-20 pt-16" : "pl-[100px] pr-10"
        }`}
      >
        {children}
      </main>
    </div>
  );
}