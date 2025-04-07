'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { t, useI18n } from '@/lib/i18n';
import { Header } from '@/components/Header';

export default function Home() {
  // Use the hook directly to make sure this component re-renders when the language changes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { locale, updateCount } = useI18n();
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <section className="max-w-5xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            {t('FX Trading Synchronization System')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('Monitor and manage your FX trading operations in real-time.')}
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-3">{t('Trading Dashboard')}</h2>
            <p className="text-gray-600 mb-6 flex-grow">
              {t('Monitor and manage your FX trading operations in real-time.')}
            </p>
            <Button asChild className="w-full">
              <Link href="/dashboard">{t('Go to Dashboard')}</Link>
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-3">{t('Trading Reports')}</h2>
            <p className="text-gray-600 mb-6 flex-grow">
              {t('View detailed trading reports and analyze performance.')}
            </p>
            <Button asChild className="w-full">
              <Link href="/reports">{t('View Reports')}</Link>
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-3">{t('System Status')}</h2>
            <p className="text-gray-600 mb-6 flex-grow">
              {t('Check the status of the FX Trading Synchronization System components.')}
            </p>
            <Button asChild className="w-full">
              <Link href="/status">{t('View Status')}</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
