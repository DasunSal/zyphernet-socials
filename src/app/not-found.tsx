import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-black bg-gradient-to-b from-black via-gray-900 to-black">
            <div className="relative">
                <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse
                    text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[6rem]">
                    404
                </h1>
                <div className="absolute -inset-1 blur-xl bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20"></div>
            </div>

            <h2 className="mt-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse
                text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
                ZYPHERNET
            </h2>

            <p className="text-gray-200 mt-6 max-w-md px-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                The digital pathway you&apos;re seeking appears to be lost in the cyber void.
            </p>

            <Link 
                href="/home" 
                className="mt-8 px-5 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
                          bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg 
                          hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 
                          shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40
                          border border-cyan-500/20"
            >
                Return to Zyphernet
            </Link>
        </div>
    );
}
