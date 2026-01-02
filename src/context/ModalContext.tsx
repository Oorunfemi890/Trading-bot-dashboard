
// ===================================================
// FILE: src/context/ModalContext.tsx
// ===================================================

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ModalConfig {
  title?: string;
  content: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClose?: () => void;
}

interface ModalContextType {
  isOpen: boolean;
  config: ModalConfig | null;
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ModalConfig | null>(null);

  const openModal = useCallback((modalConfig: ModalConfig) => {
    setConfig(modalConfig);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    config?.onClose?.();
    // Clear config after animation
    setTimeout(() => setConfig(null), 300);
  }, [config]);

  return (
    <ModalContext.Provider value={{ isOpen, config, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
}