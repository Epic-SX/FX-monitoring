'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { createChart } from 'lightweight-charts';
import { t } from '@/lib/i18n';
import { Header } from '@/components/Header';

export default function Dashboard() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!chartContainerRef.current) return;
    
    // Create a simple chart to display OHLC data
    const chartContainer = chartContainerRef.current;
    
    // Create the chart
    const chart = createChart(chartContainer, {
      width: chartContainer.clientWidth,
      height: 400,
      layout: {
        background: { type: 'solid', color: 'white' },
        textColor: '#333',
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: 'rgba(42, 46, 57, 0.1)' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: 'rgba(42, 46, 57, 0.2)',
      },
    });
    
    // Create a candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });
    
    // Sample data for USD/JPY
    const data = [
      { time: '2023-05-01', open: 134.12, high: 134.85, low: 133.90, close: 134.68 },
      { time: '2023-05-02', open: 134.68, high: 134.95, low: 134.10, close: 134.45 },
      { time: '2023-05-03', open: 134.45, high: 135.10, low: 134.30, close: 135.05 },
      { time: '2023-05-04', open: 135.05, high: 135.45, low: 134.80, close: 135.25 },
      { time: '2023-05-05', open: 135.25, high: 135.50, low: 134.95, close: 135.15 },
      { time: '2023-05-08', open: 135.15, high: 135.70, low: 135.10, close: 135.55 },
      { time: '2023-05-09', open: 135.55, high: 135.90, low: 135.40, close: 135.85 },
      { time: '2023-05-10', open: 135.85, high: 136.20, low: 135.75, close: 136.10 },
      { time: '2023-05-11', open: 136.10, high: 136.45, low: 136.00, close: 136.30 },
      { time: '2023-05-12', open: 136.30, high: 136.50, low: 135.90, close: 136.15 },
      { time: '2023-05-15', open: 136.15, high: 136.60, low: 136.05, close: 136.50 },
      { time: '2023-05-16', open: 136.50, high: 136.95, low: 136.40, close: 136.85 },
      { time: '2023-05-17', open: 136.85, high: 137.20, low: 136.70, close: 137.05 },
      { time: '2023-05-18', open: 137.05, high: 137.45, low: 136.90, close: 137.25 },
      { time: '2023-05-19', open: 137.25, high: 137.60, low: 137.10, close: 137.50 },
      { time: '2023-05-22', open: 137.50, high: 137.85, low: 137.30, close: 137.65 },
      { time: '2023-05-23', open: 137.65, high: 138.10, low: 137.55, close: 138.00 },
      { time: '2023-05-24', open: 138.00, high: 138.40, low: 137.85, close: 138.25 },
      { time: '2023-05-25', open: 138.25, high: 138.65, low: 138.10, close: 138.50 },
      { time: '2023-05-26', open: 138.50, high: 138.95, low: 138.35, close: 138.80 },
      { time: '2023-05-29', open: 138.80, high: 139.25, low: 138.65, close: 139.10 },
      { time: '2023-05-30', open: 139.10, high: 139.60, low: 138.95, close: 139.40 },
    ];
    
    // Set the data
    candlestickSeries.setData(data);
    
    // Fit the content
    chart.timeScale().fitContent();
    
    // Handle window resize
    const handleResize = () => {
      chart.applyOptions({ width: chartContainer.clientWidth });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">{t('USD/JPY Chart')}</h2>
              <div ref={chartContainerRef} className="w-full" />
            </div>
          </div>
          
          <div className="md:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{t('Open Positions')}</h2>
                <Link href="/reports" className="text-sm text-blue-600 hover:underline">
                  {t('View All Positions')}
                </Link>
              </div>
              
              <div className="space-y-4">
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">USD/JPY</div>
                    <div className="text-green-600 font-medium text-sm bg-green-50 px-2 py-0.5 rounded">
                      +14.5 {t('pips')}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 flex justify-between">
                    <div>
                      {t('Buy')} 0.1 {t('lot')}
                    </div>
                    <div>137.250</div>
                  </div>
                </div>
                
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">EUR/USD</div>
                    <div className="text-red-600 font-medium text-sm bg-red-50 px-2 py-0.5 rounded">
                      -5.2 {t('pips')}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 flex justify-between">
                    <div>
                      {t('Sell')} 0.2 {t('lot')}
                    </div>
                    <div>1.0785</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">{t('Quick Actions')}</h2>
              <div className="grid grid-cols-1 gap-3">
                <Button variant="outline">{t('New Order')}</Button>
                <Button variant="outline" className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50">
                  {t('Close All Positions')}
                </Button>
                <Button>{t('Refresh Data')}</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 