'use client';

import React, { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, FileDown, Filter } from 'lucide-react';
import { t } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { formatDate, formatNumber } from '@/lib/utils';

// Type for trade data
type Trade = {
  id: number;
  clientId: string;
  pair: string;
  direction: 'BUY' | 'SELL';
  lots: number;
  entryPrice: number;
  exitPrice: number | null;
  profitLoss: number | null;
  profitLossPips: number | null;
  openTime: string;
  closeTime: string | null;
  status: 'OPEN' | 'CLOSED';
};

// Sample trade data
const sampleTrades: Trade[] = [
  {
    id: 1,
    clientId: 'client1',
    pair: 'USD/JPY',
    direction: 'BUY',
    lots: 0.1,
    entryPrice: 137.250,
    exitPrice: 137.650,
    profitLoss: 4000,
    profitLossPips: 40.0,
    openTime: '2023-06-01T09:30:00',
    closeTime: '2023-06-01T14:45:00',
    status: 'CLOSED',
  },
  {
    id: 2,
    clientId: 'client2',
    pair: 'EUR/USD',
    direction: 'SELL',
    lots: 0.2,
    entryPrice: 1.0865,
    exitPrice: 1.0845,
    profitLoss: 2976,
    profitLossPips: 20.0,
    openTime: '2023-06-01T10:15:00',
    closeTime: '2023-06-01T15:30:00',
    status: 'CLOSED',
  },
  {
    id: 3,
    clientId: 'client1',
    pair: 'GBP/JPY',
    direction: 'BUY',
    lots: 0.1,
    entryPrice: 172.450,
    exitPrice: 172.150,
    profitLoss: -3000,
    profitLossPips: -30.0,
    openTime: '2023-06-02T08:45:00',
    closeTime: '2023-06-02T13:15:00',
    status: 'CLOSED',
  },
  {
    id: 4,
    clientId: 'client3',
    pair: 'AUD/USD',
    direction: 'SELL',
    lots: 0.3,
    entryPrice: 0.6615,
    exitPrice: 0.6655,
    profitLoss: -8940,
    profitLossPips: -40.0,
    openTime: '2023-06-02T11:20:00',
    closeTime: '2023-06-02T16:45:00',
    status: 'CLOSED',
  },
  {
    id: 5,
    clientId: 'client2',
    pair: 'USD/JPY',
    direction: 'SELL',
    lots: 0.2,
    entryPrice: 138.750,
    exitPrice: 138.250,
    profitLoss: 10000,
    profitLossPips: 50.0,
    openTime: '2023-06-03T09:10:00',
    closeTime: '2023-06-03T14:25:00',
    status: 'CLOSED',
  },
  {
    id: 6,
    clientId: 'client1',
    pair: 'EUR/JPY',
    direction: 'BUY',
    lots: 0.3,
    entryPrice: 150.250,
    exitPrice: null,
    profitLoss: null,
    profitLossPips: null,
    openTime: '2023-06-03T10:50:00',
    closeTime: null,
    status: 'OPEN',
  },
  {
    id: 7,
    clientId: 'client3',
    pair: 'USD/JPY',
    direction: 'BUY',
    lots: 0.1,
    entryPrice: 137.850,
    exitPrice: null,
    profitLoss: null,
    profitLossPips: null,
    openTime: '2023-06-03T11:30:00',
    closeTime: null,
    status: 'OPEN',
  },
];

export default function Reports() {
  const [sorting, setSorting] = useState<SortingState>([]);
  
  // Define the columns with proper types
  const columns: ColumnDef<Trade>[] = [
    {
      accessorKey: 'id',
      header: () => <div>{t('ID')}</div>,
      cell: ({ row }) => <div className="font-medium">{row.original.id}</div>,
    },
    {
      accessorKey: 'clientId',
      header: () => <div>{t('Client')}</div>,
      cell: ({ row }) => <div>{row.original.clientId}</div>,
    },
    {
      accessorKey: 'pair',
      header: () => <div>{t('Pair')}</div>,
      cell: ({ row }) => <div>{row.original.pair}</div>,
    },
    {
      accessorKey: 'direction',
      header: () => <div>{t('Direction')}</div>,
      cell: ({ row }) => (
        <div className={row.original.direction === 'BUY' ? 'text-green-600' : 'text-red-600'}>
          {t(row.original.direction)}
        </div>
      ),
    },
    {
      accessorKey: 'lots',
      header: () => <div>{t('Lots')}</div>,
      cell: ({ row }) => <div>{formatNumber(row.original.lots, 1)}</div>,
    },
    {
      accessorKey: 'entryPrice',
      header: () => <div>{t('Entry Price')}</div>,
      cell: ({ row }) => <div>{formatNumber(row.original.entryPrice, 3)}</div>,
    },
    {
      accessorKey: 'exitPrice',
      header: () => <div>{t('Exit Price')}</div>,
      cell: ({ row }) => (
        <div>{row.original.exitPrice ? formatNumber(row.original.exitPrice, 3) : '-'}</div>
      ),
    },
    {
      accessorKey: 'profitLoss',
      header: ({ column }) => (
        <div className="flex items-center cursor-pointer" onClick={() => column.toggleSorting()}>
          {t('P/L (¥)')}
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => (
        <div className={
          row.original.profitLoss === null ? 'text-gray-500' :
          row.original.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
        }>
          {row.original.profitLoss ? formatNumber(row.original.profitLoss, 0) : '-'}
        </div>
      ),
    },
    {
      accessorKey: 'profitLossPips',
      header: ({ column }) => (
        <div className="flex items-center cursor-pointer" onClick={() => column.toggleSorting()}>
          {t('P/L (pips)')}
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => (
        <div className={
          row.original.profitLossPips === null ? 'text-gray-500' :
          row.original.profitLossPips >= 0 ? 'text-green-600' : 'text-red-600'
        }>
          {row.original.profitLossPips ? formatNumber(row.original.profitLossPips, 1) : '-'}
        </div>
      ),
    },
    {
      accessorKey: 'openTime',
      header: () => <div>{t('Open Time')}</div>,
      cell: ({ row }) => <div>{formatDate(row.original.openTime)}</div>,
    },
    {
      accessorKey: 'closeTime',
      header: () => <div>{t('Close Time')}</div>,
      cell: ({ row }) => (
        <div>{row.original.closeTime ? formatDate(row.original.closeTime) : '-'}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: () => <div>{t('Status')}</div>,
      cell: ({ row }) => (
        <div className={`px-2 py-1 rounded text-xs inline-block ${
          row.original.status === 'OPEN' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {t(row.original.status)}
        </div>
      ),
    },
  ];
  
  // Create the table instance
  const table = useReactTable({
    data: sampleTrades,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  
  // Summary data
  const totalTrades = sampleTrades.length;
  const closedTrades = sampleTrades.filter(t => t.status === 'CLOSED');
  const winningTrades = closedTrades.filter(t => t.profitLoss && t.profitLoss > 0);
  const winRate = closedTrades.length > 0 ? winningTrades.length / closedTrades.length : 0;
  const totalProfitLoss = closedTrades.reduce((sum, trade) => sum + (trade.profitLoss || 0), 0);
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-2xl font-bold mb-2 sm:mb-0">{t('Recent Trades')}</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <FileDown className="mr-1 h-4 w-4" />
                  {t('Export CSV')}
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="mr-1 h-4 w-4" />
                  {t('Filter')}
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className="bg-gray-50">
                      {headerGroup.headers.map(header => (
                        <th 
                          key={header.id} 
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr 
                      key={row.id}
                      className="border-b hover:bg-gray-50"
                    >
                      {row.getVisibleCells().map(cell => (
                        <td 
                          key={cell.id}
                          className="px-4 py-3 text-sm text-gray-800"
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
              <div>
                {t('Showing')} 1 {t('to')} {sampleTrades.length} {t('of')} {sampleTrades.length} {t('trades')}
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" disabled>{t('Previous')}</Button>
                <Button size="sm" variant="outline" disabled>{t('Next')}</Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">{t('Performance Summary')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 border rounded-lg">
                <div className="text-gray-500 text-sm mb-1">{t('Total Trades')}</div>
                <div className="text-2xl font-bold">{totalTrades}</div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="text-gray-500 text-sm mb-1">{t('Win Rate')}</div>
                <div className="text-2xl font-bold">{(winRate * 100).toFixed(1)}%</div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="text-gray-500 text-sm mb-1">{t('Total Profit/Loss')}</div>
                <div className={`text-2xl font-bold ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ¥{totalProfitLoss.toLocaleString()}
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="text-gray-500 text-sm mb-1">{t('Average Trade Profit')}</div>
                <div className="text-2xl font-bold">
                  ¥{closedTrades.length > 0 
                    ? (totalProfitLoss / closedTrades.length).toFixed(0) 
                    : 0}
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">{t('Currency Pair Performance')}</h3>
              
              <div className="mt-4 flex justify-center">
                <Button className="mt-4">
                  {t('View Detailed Analysis')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 