// Internationalization (i18n) support for the FX Trading Synchronization System
import { create } from 'zustand';

// Type definitions
export type Locale = 'en' | 'ja';

// Translations object with English and Japanese versions
const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Common
    'FX Trading Synchronization System': 'FX Trading Synchronization System',
    'Back to Home': 'Back to Home',
    'Home': 'Home', 
    'Dashboard': 'Dashboard',
    'Reports': 'Reports',
    'System Status': 'System Status',
    'View Status': 'View Status',

    // Home page
    'Trading Dashboard': 'Trading Dashboard',
    'Monitor and manage your FX trading operations in real-time.': 'Monitor and manage your FX trading operations in real-time.',
    'Go to Dashboard': 'Go to Dashboard',
    'Trading Reports': 'Trading Reports',
    'View detailed trading reports and analyze performance.': 'View detailed trading reports and analyze performance.',
    'View Reports': 'View Reports',
    'Check the status of the FX Trading Synchronization System components.': 'Check the status of the FX Trading Synchronization System components.',
    
    // Dashboard page
    'USD/JPY Chart': 'USD/JPY Chart',
    'Open Positions': 'Open Positions',
    'Buy': 'Buy',
    'Sell': 'Sell',
    'lot': 'lot',
    'pips': 'pips',
    'View All Positions': 'View All Positions',
    'Quick Actions': 'Quick Actions',
    'New Order': 'New Order',
    'Close All Positions': 'Close All Positions',
    'Refresh Data': 'Refresh Data',
    
    // Reports page
    'Recent Trades': 'Recent Trades',
    'Export CSV': 'Export CSV',
    'Filter': 'Filter',
    'ID': 'ID',
    'Client': 'Client',
    'Pair': 'Pair',
    'Direction': 'Direction',
    'BUY': 'BUY',
    'SELL': 'SELL',
    'Lots': 'Lots',
    'Entry Price': 'Entry Price',
    'Exit Price': 'Exit Price',
    'P/L (¥)': 'P/L (¥)',
    'P/L (pips)': 'P/L (pips)',
    'Open Time': 'Open Time',
    'Close Time': 'Close Time',
    'Status': 'Status',
    'OPEN': 'OPEN',
    'CLOSED': 'CLOSED',
    'Previous': 'Previous',
    'Next': 'Next',
    'Showing': 'Showing',
    'to': 'to',
    'of': 'of',
    'trades': 'trades',
    'Performance Summary': 'Performance Summary',
    'Total Trades': 'Total Trades',
    'Win Rate': 'Win Rate',
    'Total Profit/Loss': 'Total Profit/Loss',
    'Average Trade Profit': 'Average Trade Profit',
    'Currency Pair Performance': 'Currency Pair Performance',
    'View Detailed Analysis': 'View Detailed Analysis',
    
    // Status page
    'Last updated': 'Last updated',
    'Refresh': 'Refresh',
    'Server Components': 'Server Components',
    'Name': 'Name',
    'Version': 'Version',
    'Uptime': 'Uptime',
    'Last Update': 'Last Update',
    'Main Terminal': 'Main Terminal',
    'Broker': 'Broker',
    'Positions': 'Positions',
    'Client Terminals': 'Client Terminals',
    'Client ID': 'Client ID',
    'System Actions': 'System Actions',
    'Restart Server': 'Restart Server',
    'Restart Main Terminal': 'Restart Main Terminal',
    'Restart All Clients': 'Restart All Clients',
    'Main Server': 'Main Server',
    'GMO Client': 'GMO Client',
    'Gaitame Client': 'Gaitame Client',
    'Test Client': 'Test Client',
    'online': 'online',
    'offline': 'offline',
    'warning': 'warning',
    
    // Language switcher
    'English': 'English',
    'Japanese': '日本語',
    'Language': 'Language',
  },
  ja: {
    // Common
    'FX Trading Synchronization System': 'FX取引同期システム',
    'Back to Home': 'ホームに戻る',
    'Home': 'ホーム',
    'Dashboard': 'ダッシュボード',
    'Reports': 'レポート',
    'System Status': 'システム状態',
    'View Status': 'システム状態を表示',
    
    // Home page
    'Trading Dashboard': '取引ダッシュボード',
    'Monitor and manage your FX trading operations in real-time.': 'FX取引操作をリアルタイムで監視・管理します。',
    'Go to Dashboard': 'ダッシュボードへ',
    'Trading Reports': '取引レポート',
    'View detailed trading reports and analyze performance.': '詳細な取引レポートを表示し、パフォーマンスを分析します。',
    'View Reports': 'レポートを表示',
    'Check the status of the FX Trading Synchronization System components.': 'FX取引同期システムコンポーネントの状態を確認します。',
    
    // Dashboard page
    'USD/JPY Chart': 'USD/JPY チャート',
    'Open Positions': 'オープンポジション',
    'Buy': '買い',
    'Sell': '売り',
    'lot': 'ロット',
    'pips': 'pips',
    'View All Positions': '全ポジションを表示',
    'Quick Actions': 'クイックアクション',
    'New Order': '新規注文',
    'Close All Positions': '全ポジションを決済',
    'Refresh Data': 'データを更新',
    
    // Reports page
    'Recent Trades': '最近の取引',
    'Export CSV': 'CSVエクスポート',
    'Filter': 'フィルター',
    'ID': 'ID',
    'Client': 'クライアント',
    'Pair': '通貨ペア',
    'Direction': '方向',
    'BUY': '買い',
    'SELL': '売り',
    'Lots': 'ロット数',
    'Entry Price': 'エントリー価格',
    'Exit Price': '決済価格',
    'P/L (¥)': '損益 (¥)',
    'P/L (pips)': '損益 (pips)',
    'Open Time': 'オープン時間',
    'Close Time': '決済時間',
    'Status': '状態',
    'OPEN': 'オープン',
    'CLOSED': '決済済み',
    'Previous': '前へ',
    'Next': '次へ',
    'Showing': '表示中',
    'to': 'から',
    'of': '件中',
    'trades': '取引',
    'Performance Summary': 'パフォーマンス概要',
    'Total Trades': '総取引数',
    'Win Rate': '勝率',
    'Total Profit/Loss': '総損益',
    'Average Trade Profit': '平均取引利益',
    'Currency Pair Performance': '通貨ペアパフォーマンス',
    'View Detailed Analysis': '詳細分析を表示',
    
    // Status page
    'Last updated': '最終更新',
    'Refresh': '更新',
    'Server Components': 'サーバーコンポーネント',
    'Name': '名前',
    'Version': 'バージョン',
    'Uptime': '稼働時間',
    'Last Update': '最終更新',
    'Main Terminal': 'メインターミナル',
    'Broker': 'ブローカー',
    'Positions': 'ポジション',
    'Client Terminals': 'クライアントターミナル',
    'Client ID': 'クライアントID',
    'System Actions': 'システムアクション',
    'Restart Server': 'サーバーを再起動',
    'Restart Main Terminal': 'メインターミナルを再起動',
    'Restart All Clients': '全クライアントを再起動',
    'Main Server': 'メインサーバー',
    'GMO Client': 'GMOクライアント',
    'Gaitame Client': 'ゲイタメクライアント',
    'Test Client': 'テストクライアント',
    'online': 'オンライン',
    'offline': 'オフライン',
    'warning': '警告',
    
    // Language switcher
    'English': 'English',
    'Japanese': '日本語',
    'Language': '言語',
  }
};

// Get initial locale from localStorage or default to 'ja'
const getInitialLocale = (): Locale => {
  if (typeof window !== 'undefined') {
    const savedLocale = window.localStorage.getItem('fx-trading-locale') as Locale | null;
    if (savedLocale && ['en', 'ja'].includes(savedLocale)) {
      return savedLocale;
    }
  }
  return 'ja'; // Default to Japanese
};

// Global variable for tracking current locale (to avoid hydration issues)
let globalLocale: Locale = typeof window !== 'undefined' ? getInitialLocale() : 'ja';

// Zustand store for i18n state management
interface I18nStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  forceUpdate: () => void;
  updateCount: number;
}

export const useI18n = create<I18nStore>((set) => ({
  locale: globalLocale,
  updateCount: 0,
  forceUpdate: () => set(state => ({ updateCount: state.updateCount + 1 })),
  setLocale: (locale) => {
    // Update global variable
    globalLocale = locale;
    
    // Save to localStorage immediately when changing
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('fx-trading-locale', locale);
    }
    
    // Update the store state and increment update counter to force components to re-render
    set(state => ({ locale, updateCount: state.updateCount + 1 }));
  },
}));

// Function to translate text
export function translate(text: string): string {
  // Use global variable first, fallback to zustand state if needed
  const locale = globalLocale || useI18n.getState().locale;
  return translations[locale]?.[text] || text;
}

// Shorthand function for translation
export const t = translate;

export default translations; 