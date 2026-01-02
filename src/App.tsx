// ===================================================
// FILE: src/App.tsx (COMPLETE FINAL VERSION)
// ===================================================

import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { WebSocketProvider } from '@/context/WebSocketContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { ModalProvider } from '@/context/ModalContext';
import { ErrorBoundary } from '@/components/common/ErrorBoundary/ErrorBoundary';
import { AppRoutes } from '@/routes/AppRoutes';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <WebSocketProvider>
              <NotificationProvider>
                <ModalProvider>
                  <AppRoutes />
                  <Toaster 
                    position="top-right" 
                    richColors 
                    closeButton 
                    duration={4000}
                    expand={false}
                  />
                </ModalProvider>
              </NotificationProvider>
            </WebSocketProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}