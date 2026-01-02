import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { WebSocketProvider } from '@/context/WebSocketContext';
import { router } from '@/routes';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WebSocketProvider>
          <RouterProvider router={router} />
          <Toaster 
            position="top-right" 
            richColors 
            closeButton 
            duration={4000}
          />
        </WebSocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}