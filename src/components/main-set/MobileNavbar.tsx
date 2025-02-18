'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { mobileNavigationItems } from '@/lib/navlinks/navigation';
import { MessageCircleMore } from 'lucide-react';
import logo from "@/assets/logo-orignal.png";
import Image from 'next/image';

export default function MobileLayout() { // Removed { children }
  const pathname = usePathname();

  // Check if we're on the profile page
  const isProfilePage = pathname === '/profile';

  return (
    <div className="min-h-screen bg-black">
      {/* Top Navbar (Hidden on Profile Page) */}
      {!isProfilePage && (
        <nav className="block md:hidden fixed top-0 left-0 right-0 bg-black border-b border-gray-800 z-50">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Logo */}
            <Link href="/about" className="flex items-center">
              <Image 
                src={logo} 
                alt="Zyphernet-logo" 
                width={100}  
                height={100}
              />
            </Link>

            {/* Messages Icon */}
            <Link href="/messages">
              <MessageCircleMore className='text-gray-400' />
            </Link>
          </div>
        </nav>
      )}

<nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
        <div className="flex items-center justify-around h-16">
          {mobileNavigationItems.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className={`flex flex-col items-center justify-center w-full h-full
                ${pathname === href ? 'text-white' : 'text-gray-400'}`}
            >
              <Icon size={16} />
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}