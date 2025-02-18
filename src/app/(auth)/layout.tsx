import React from "react";
import logo from "@/assets/logo-orignal.png";
import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-black z-50 p-4 sm:p-4 md:p-6 flex items-center justify-between border-b border-gray-800">
        <Link href="/about" className="cursor-pointer">
        <div className="relative pb-2">
          <Image
            src={logo}
            alt="Zyphernet-logo"
            placeholder="blur"
            width={120}
            height={120}
            className="h-5 sm:h-4 md:h-6 lg:h-6 xl:h-6 w-auto"
          />
        </div>
        </Link>

        <div className="flex items-center gap-4 pb-2">
          <Link 
            href="/login"
            className="text-white hover:text-gray-300 px-3 py-1.5 text-sm sm:text-base md:text-lg rounded-full transition-colors"
          >
            Login
          </Link>
          <Link 
            href="/sign-up"
            className="bg-white text-black hover:bg-gray-200 px-3 py-1.5 rounded-full text-sm sm:text-base md:text-lg transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Scrollable Main Content with Header/Footer Spacing */}
      <main className="flex-1 overflow-auto pt-[76px] pb-[76px] md:pt-[92px] md:pb-[92px]">
        <div className="flex items-center justify-center h-full p-4 sm:p-6 md:p-8">
          <div className="w-full mb-10 max-w-[min(90%,400px)] mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Fixed Footer */}
     
          <footer className="fixed bottom-0 left-0 right-0 bg-black z-50 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col gap-2 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
          <p className="text-xs sm:text-sm md:text-base">
          © 2025 Zyphernet. All rights reserved.
          </p>
          </div>
          <div className="hidden md:flex flex-col items-center gap-1 sm:gap-2 md:flex-row md:gap-4">
  <Link href="/privacy" className="text-white hover:text-gray-300 text-xs sm:text-sm md:text-base">
    Privacy
  </Link>
  <Link href="/terms" className="text-white hover:text-gray-300 text-xs sm:text-sm md:text-base">
    Terms
  </Link>
  <Link href="/contact" className="text-white hover:text-gray-300 text-xs sm:text-sm md:text-base">
    Contact
  </Link>
</div>

          </div>
          </div>
          </footer>
    </div>
  );
};

export default AuthLayout;
