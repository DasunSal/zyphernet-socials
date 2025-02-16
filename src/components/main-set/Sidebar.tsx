'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/assets/logo-orignal.png";
import logoSmall from "@/assets/logo-small.png";
import { desktopNavigationItems } from '@/lib/navlinks/navigation';

export default function DesktopLayout() {
  const pathname = usePathname(); // Get the current pathname

  // Helper function to check if the link is active
  const isActiveLink = (href: string): boolean => {
    if (pathname === href) return true; // Exact match
    // Handle dynamic routes (like /post/[id])
    const dynamicRegex = new RegExp(`^${href.replace(/\[([^\]]+)\]/g, '([^/]+)')}$`);
    return dynamicRegex.test(pathname);
  };

  return (
    <div className="flex xl:pr-44 min-h-screen">
      <aside className="fixed h-screen w-[80px] xl:w-64 transition-all duration-100 border-r border-gray-800 bg-black">
        {/* Logo/Brand */}
        <Link href='/about'>
          <div className="p-4 mb-8 flex border-b border-gray-800 items-center pt-5 justify-center">
            {/* Large Logo (visible on xl and up) */}
            <Image 
              src={logo} 
              alt="Zyphernet-logo" 
              placeholder="blur"
              width={150}
              height={150}
              className="hidden xl:block h-auto w-auto"
            />
            {/* Small Logo (visible on smaller screens) */}
            <Image 
              src={logoSmall}
              alt="Zyphernet-logo (small)"
              placeholder="blur"
              width={90}
              height={90}
              className="xl:hidden h-auto w-auto"
            />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2 px-2 xl:pl-12 pl-2">
            {desktopNavigationItems.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className={`flex items-center w-full p-4 rounded-lg transition-colors
                    ${isActiveLink(href) ? 'text-white' : 'text-gray-500'}`} // Conditionally apply active class
                >
                  <div className="min-w-[24px] flex justify-center">
                    <Icon size={22} />
                  </div>
                  <span className="ml-3 capitalize xl:block hidden">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="border-t xl:pl-12 pl- border-gray-800 p-4 mt-auto">
          <button className="flex items-center w-full p-3 rounded-lg hover:bg-gray-800 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gray-700 xl:mr-3"></div>
            <div className="hidden xl:block text-left">
              <p className="text-sm font-medium text-white">User Name</p>
              <p className="text-xs text-gray-400">@username</p>
            </div>
          </button>
        </div>
      </aside>
    </div>
  );
}