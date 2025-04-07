'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { t, useI18n } from '@/lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const pathname = usePathname();
  // locale is used for determining the current language
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { locale } = useI18n();
  
  // Define navigation links with correct translation keys
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/reports', label: 'Reports' },
    { href: '/status', label: 'System Status' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-xl text-gray-800">
            {t('FX Trading Synchronization System')}
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t(link.label)}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
} 