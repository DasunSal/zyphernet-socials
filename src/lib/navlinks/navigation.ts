// lib/navigation.ts
import { Home, Search, PlusSquare, Heart, User, Settings } from 'lucide-react';

export const mobileNavigationItems = [
  { icon: Home, label: 'home', href: '/home' },
  { icon: Search, label: 'search', href: '/search' },
  { icon: PlusSquare, label: 'create', href: '/create' },
  { icon: Heart, label: 'activity', href: '/activity' },
  { icon: User, label: 'profile', href: '/profile' },
] as const;

export const desktopNavigationItems = [
  ...mobileNavigationItems,
  { icon: Settings, label: 'settings', href: '/settings' },
] as const;