import { Sidebar } from './Sidebar';
import { Header } from './Header';
import type { ReactNode } from 'react';
import type { Page } from '@/App';

interface MainLayoutProps {
  children: ReactNode;
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function MainLayout({ children, currentPage, onPageChange }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0B0C0F] relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0B0C0F] via-[#0f1116] to-[#151821]" />
      
      {/* Ambient glow effects */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-[#4F6EF7]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#6B7B94]/5 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Main content */}
      <div className="relative z-10 flex h-screen p-4 gap-4">
        {/* Sidebar */}
        <Sidebar currentPage={currentPage} onPageChange={onPageChange} />
        
        {/* Main area */}
        <div className="flex-1 glass-panel flex flex-col overflow-hidden">
          <Header />
          
          {/* Page content */}
          <main className="flex-1 overflow-auto p-6">
            <div className="page-transition">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
