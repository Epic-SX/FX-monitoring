'use client';

import { ReactNode, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';

interface I18nProviderProps {
  children: ReactNode;
}

/**
 * This provider ensures that the i18n system is properly initialized on the client side.
 * The useI18n hook will automatically handle loading the language from localStorage.
 */
export function I18nProvider({ children }: I18nProviderProps) {
  // Access locale and updateCount to force re-renders when the language changes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { locale, updateCount } = useI18n();
  
  // Initialize locale from localStorage on mount
  useEffect(() => {
    // No need for additional initialization - the store already loads from localStorage
    // This effect will re-run when updateCount changes, ensuring all components update
  }, [updateCount]);
  
  return <>{children}</>;
} 