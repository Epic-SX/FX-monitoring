'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { create } from 'zustand';
import { t } from '@/lib/i18n';
import { Header } from '@/components/Header';

type Component = {
  id: string;
  name: string;
  type: 'server' | 'main' | 'client';
  status: 'online' | 'offline' | 'warning';
  lastUpdated: Date;
  details?: {
    clientId?: string;
    brokerType?: string;
    version?: string;
    uptime?: number;
    positionCount?: number;
  };
};

// Zustand store for system status
interface StatusStore {
  components: Component[];
  loading: boolean;
  lastUpdated: Date | null;
  updateComponents: (components: Component[]) => void;
  setLoading: (loading: boolean) => void;
  refreshData: () => void;
}

const useStatusStore = create<StatusStore>((set) => ({
  components: [],
  loading: true,
  lastUpdated: null,
  updateComponents: (components) => set({ components, lastUpdated: new Date() }),
  setLoading: (loading) => set({ loading }),
  refreshData: async () => {
    set({ loading: true });
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Sample data (replace with actual API call)
      const mockComponents: Component[] = [
        {
          id: '1',
          name: t('Main Server'),
          type: 'server',
          status: 'online',
          lastUpdated: new Date(),
          details: {
            version: '1.0.0',
            uptime: 86400 * 3 + 3600 * 5 + 60 * 23, // 3 days, 5 hours, 23 minutes
          },
        },
        {
          id: '2',
          name: t('Main Terminal'),
          type: 'main',
          status: 'online',
          lastUpdated: new Date(),
          details: {
            brokerType: 'gmo',
            uptime: 3600 * 12 + 60 * 45, // 12 hours, 45 minutes
            positionCount: 3,
          },
        },
        {
          id: '3',
          name: t('GMO Client'),
          type: 'client',
          status: 'online',
          lastUpdated: new Date(),
          details: {
            clientId: 'client1',
            brokerType: 'gmo',
            uptime: 3600 * 8 + 60 * 15, // 8 hours, 15 minutes
            positionCount: 2,
          },
        },
        {
          id: '4',
          name: t('Gaitame Client'),
          type: 'client',
          status: 'warning',
          lastUpdated: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
          details: {
            clientId: 'client2',
            brokerType: 'gaitame',
            positionCount: 1,
          },
        },
        {
          id: '5',
          name: t('Test Client'),
          type: 'client',
          status: 'offline',
          lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          details: {
            clientId: 'client3',
            brokerType: 'gmo',
          },
        },
      ];
      
      set({ components: mockComponents, loading: false, lastUpdated: new Date() });
    }, 1000);
  },
}));

// Function to format uptime
function formatUptime(seconds?: number): string {
  if (!seconds) return 'N/A';
  
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  
  return parts.join(' ');
}

// Status indicator component
function StatusIndicator({ status }: { status: 'online' | 'offline' | 'warning' }) {
  if (status === 'online') {
    return <CheckCircle className="w-5 h-5 text-green-500" title={t('online')} />;
  } else if (status === 'offline') {
    return <XCircle className="w-5 h-5 text-red-500" title={t('offline')} />;
  } else {
    return <AlertTriangle className="w-5 h-5 text-amber-500" title={t('warning')} />;
  }
}

export default function Status() {
  const { components, loading, lastUpdated, refreshData } = useStatusStore();
  
  // Load data on mount
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-semibold">{t('FX Trading Synchronization System')}</h2>
            <div className="flex items-center gap-2">
              {lastUpdated && (
                <span className="text-sm text-gray-500">
                  {t('Last updated')}: {formatDistanceToNow(lastUpdated, { addSuffix: true })}
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={refreshData}
                disabled={loading}
                className="flex items-center gap-1"
              >
                <RefreshCw className="w-4 h-4" />
                {t('Refresh')}
              </Button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">{t('Server Components')}</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Status')}</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Name')}</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Version')}</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Uptime')}</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Last Update')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {components
                        .filter(comp => comp.type === 'server')
                        .map(comp => (
                          <tr key={comp.id} className="border-t">
                            <td className="px-4 py-3 text-sm">
                              <StatusIndicator status={comp.status} />
                            </td>
                            <td className="px-4 py-3 text-sm">{comp.name}</td>
                            <td className="px-4 py-3 text-sm">{comp.details?.version || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm">{formatUptime(comp.details?.uptime)}</td>
                            <td className="px-4 py-3 text-sm">
                              {formatDistanceToNow(comp.lastUpdated, { addSuffix: true })}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">{t('Main Terminal')}</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Status')}</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Name')}</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Broker')}</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Positions')}</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Uptime')}</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Last Update')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {components
                        .filter(comp => comp.type === 'main')
                        .map(comp => (
                          <tr key={comp.id} className="border-t">
                            <td className="px-4 py-3 text-sm">
                              <StatusIndicator status={comp.status} />
                            </td>
                            <td className="px-4 py-3 text-sm">{comp.name}</td>
                            <td className="px-4 py-3 text-sm">{comp.details?.brokerType?.toUpperCase() || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm">{comp.details?.positionCount || 0}</td>
                            <td className="px-4 py-3 text-sm">{formatUptime(comp.details?.uptime)}</td>
                            <td className="px-4 py-3 text-sm">
                              {formatDistanceToNow(comp.lastUpdated, { addSuffix: true })}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">{t('Client Terminals')}</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Status')}</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Name')}</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Client ID')}</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Broker')}</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Positions')}</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Uptime')}</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t('Last Update')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {components
                        .filter(comp => comp.type === 'client')
                        .map(comp => (
                          <tr key={comp.id} className="border-t">
                            <td className="px-4 py-3 text-sm">
                              <StatusIndicator status={comp.status} />
                            </td>
                            <td className="px-4 py-3 text-sm">{comp.name}</td>
                            <td className="px-4 py-3 text-sm">{comp.details?.clientId || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm">{comp.details?.brokerType?.toUpperCase() || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm">{comp.details?.positionCount || 0}</td>
                            <td className="px-4 py-3 text-sm">{formatUptime(comp.details?.uptime)}</td>
                            <td className="px-4 py-3 text-sm">
                              {formatDistanceToNow(comp.lastUpdated, { addSuffix: true })}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{t('System Actions')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button>{t('Restart Server')}</Button>
            <Button variant="outline">{t('Restart Main Terminal')}</Button>
            <Button variant="outline">{t('Restart All Clients')}</Button>
            <Button variant="destructive">{t('Close All Positions')}</Button>
          </div>
        </div>
      </main>
    </div>
  );
} 