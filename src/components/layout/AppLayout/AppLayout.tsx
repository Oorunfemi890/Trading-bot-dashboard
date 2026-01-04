// ===================================================
// FILE: src/components/layout/AppLayout/AppLayout.tsx (UPDATED)
// ===================================================

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';

export function AppLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      
      {/* Main Content */}
      <main className="lg:ml-64 mt-16 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}