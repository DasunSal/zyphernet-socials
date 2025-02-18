export default function MinimalLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col">
        {/* Scrollable container with fixed positioning */}
        <div className="flex-1 overflow-y-auto">
          {/* Centered content wrapper */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[min(90%,400px)] p-4 sm:p-6 md:p-4">
            {children}
          </div>
        </div>
      </div>
    );
  }
  