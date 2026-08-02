import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { ReportEntry } from '@/data/types';

interface AppState {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  reportModalOpen: boolean;
  openReportModal: () => void;
  closeReportModal: () => void;
  reports: ReportEntry[];
  addReport: (machine: string, category: string, description: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be inside AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reports, setReports] = useState<ReportEntry[]>([]);

  const openReportModal = useCallback(() => setReportModalOpen(true), []);
  const closeReportModal = useCallback(() => setReportModalOpen(false), []);

  const addReport = useCallback((machine: string, category: string, description: string) => {
    setReports(prev => [
      {
        id: Date.now(),
        machine,
        category,
        description,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      },
      ...prev,
    ]);
  }, []);

  return (
    <AppContext.Provider value={{
      searchQuery, setSearchQuery,
      reportModalOpen, openReportModal, closeReportModal,
      reports, addReport,
    }}>
      {children}
    </AppContext.Provider>
  );
}
