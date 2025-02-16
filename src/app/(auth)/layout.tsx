"use client";

import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="fixed inset-0 bg-black overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-[min(90%,400px)] mx-auto">
            {children}
          </div>
        </div>
      </div>
  );
};

export default AuthLayout;
