// ===================================================
// FILE: src/components/layout/AppLayout/AppLayout.tsx
// ===================================================

import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      
      {/* Main Content */}
      <main className="lg:ml-64 mt-16 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}