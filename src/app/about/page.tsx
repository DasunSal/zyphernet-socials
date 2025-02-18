import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-4xl 2xl:max-w-5xl">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
  <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 mb-4 sm:mb-6 tracking-wider">
   About Zyphernet
  </h1>
</div>

          {/* Creator Section */}
          <div className="border-l-4 border-yellow-400 pl-4 sm:pl-6 py-3 sm:py-4 mb-8 sm:mb-12 hover:border-yellow-300 transition-colors">
            <p className="text-xl sm:text-2xl font-light text-white">
              Created by <span className="font-bold text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer">Dasun Salwathura</span>
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-black/80 rounded-xl p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8 space-y-6 sm:space-y-8 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300">
            <section className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-200">
              <p className="mb-6 sm:mb-8">
                Welcome to Zyphernet—a platform designed and developed to transform how we connect in the digital age.
                But let&apos;s be real—Zyphernet isn&apos;t just any social media platform. It&apos;s a <span className="text-yellow-400 font-semibold">revolution</span>. 
                A <span className="text-yellow-400 font-semibold">vision</span>. And guess who made it all happen?
                <strong className="text-yellow-400 block mt-4 text-xl sm:text-2xl">That&apos;s right, it&apos;s me—Dasun Salwathura.</strong>
              </p>

              <div className="bg-white/5 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border-l-4 border-yellow-400">
                <p className="italic text-gray-300 text-base sm:text-lg">
                &quot;Creating Zyphernet wasn&apos;t a walk in the park. It wasn&apos;t just about writing code; it was about building something that would leave a mark.
                  A platform that would change the way we interact, the way we build communities, and the way we engage with each other online.&quot;
                </p>
              </div>

              <p className="mb-6 sm:mb-8">
                I&apos;ve conquered every challenge a developer could face—bugs, performance bottlenecks, self-doubt—you name it. But did I back down?
                Absolutely not. Every hurdle was just another step towards making Zyphernet what it is today. And I&apos;ve done it all with 
                <span className="text-yellow-400 font-semibold"> skill</span>, 
                <span className="text-yellow-400 font-semibold"> determination</span>,
                and a relentless passion for excellence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <div className="bg-white/5 p-4 sm:p-6 rounded-lg hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mb-2 sm:mb-3">Innovation</h3>
                  <p className="text-base sm:text-lg">I don&apos;t just code; I innovate. Zyphernet isn&apos;t just a platform; it&apos;s the future of social interaction.</p>
                </div>
                <div className="bg-white/5 p-4 sm:p-6 rounded-lg hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-yellow-400 text-lg sm:text-xl font-bold mb-2 sm:mb-3">Excellence</h3>
                  <p className="text-base sm:text-lg">Every feature, every line of code, crafted with precision to deliver an experience like no other.</p>
                </div>
              </div>

              <p className="mb-8 sm:mb-12">
                There were moments of doubt, sure. But champions don&apos;t quit. I&apos;ve put in the late nights, the endless debugging, the unwavering commitment
                to bring this vision to life. And now, Zyphernet stands as a testament to my skills, my dedication, and my belief that anything is possible.
              </p>

              <div className="text-center space-y-4 sm:space-y-6">
                <p className="text-xl sm:text-2xl font-light">
                  Welcome to something truly extraordinary. The journey doesn&apos;t stop here. The best is yet to come. And yes,
                  I&apos;m still just as <span className="text-yellow-400 font-bold">legendary</span> as ever. 😆
                </p>
                
                <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10">
                  <p className="text-gray-400 mb-4 sm:mb-6 text-base sm:text-lg">Proudly built with cutting-edge technologies:</p>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:space-x-8">
                    <Link href="https://nextjs.org" target="_blank" rel="noopener noreferrer" 
                          className="group relative">
                      <Image
                        src="/next.svg"
                        alt="Next.js Logo"
                        width={140}
                        height={30}
                        className="opacity-50 invert hover:opacity-100 transition-all duration-300 transform group-hover:scale-105 w-auto sm:w-[180px]"
                        priority
                      />
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Next.js Framework
                      </span>
                    </Link>
                    <Link href="https://vercel.com" target="_blank" rel="noopener noreferrer"
                          className="group relative">
                      <Image
                        src="/vercel.svg"
                        alt="Vercel Logo"
                        width={60}
                        height={30}
                        className="opacity-50 hover:opacity-100 transition-all duration-300 transform group-hover:scale-105 w-auto sm:w-[80px]"
                        priority
                      />
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Vercel Platform
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutPage;