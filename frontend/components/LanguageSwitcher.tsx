'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useI18n, t, Locale } from '@/lib/i18n';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { locale, setLocale, updateCount } = useI18n();
  
  // Local state to force re-render when language changes
  const [selectedLocale, setSelectedLocale] = React.useState(locale);

  // Keep local state in sync with global state
  React.useEffect(() => {
    setSelectedLocale(locale);
  }, [locale, updateCount]);

  const handleLocaleChange = (newLocale: Locale) => {
    // First update local state for immediate UI feedback
    setSelectedLocale(newLocale);
    
    // Then update the global state - this will trigger re-renders across the app
    setLocale(newLocale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Globe className="h-4 w-4" />
          <span>{t('Language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleLocaleChange('en')}
          className={selectedLocale === 'en' ? 'bg-gray-100' : ''}
        >
          {t('English')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLocaleChange('ja')}
          className={selectedLocale === 'ja' ? 'bg-gray-100' : ''}
        >
          {t('Japanese')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 