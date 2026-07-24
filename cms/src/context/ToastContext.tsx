import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastContainer, { ToastMessage, ConfirmDialogOptions } from '../components/ToastContainer';

interface ToastContextType {
  toast: {
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
    warning: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
  };
  confirmDialog: (options: ConfirmDialogOptions) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [confirmConfig, setConfirmConfig] = useState<ConfirmDialogOptions | null>(null);

  const addToast = useCallback((type: 'success' | 'error' | 'warning' | 'info', message: string, title?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, type, message, title }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (message: string, title?: string) => addToast('success', message, title || 'Berhasil'),
    error: (message: string, title?: string) => addToast('error', message, title || 'Gagal'),
    warning: (message: string, title?: string) => addToast('warning', message, title || 'Peringatan'),
    info: (message: string, title?: string) => addToast('info', message, title || 'Informasi'),
  };

  const confirmDialog = useCallback((options: ConfirmDialogOptions) => {
    setConfirmConfig(options);
  }, []);

  const handleCloseConfirm = useCallback(() => {
    setConfirmConfig(null);
  }, []);

  const handleConfirmAction = useCallback(() => {
    if (confirmConfig?.onConfirm) {
      confirmConfig.onConfirm();
    }
    setConfirmConfig(null);
  }, [confirmConfig]);

  return (
    <ToastContext.Provider value={{ toast, confirmDialog }}>
      {children}
      <ToastContainer
        toasts={toasts}
        onCloseToast={removeToast}
        confirmConfig={confirmConfig}
        onConfirm={handleConfirmAction}
        onCancelConfirm={handleCloseConfirm}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
