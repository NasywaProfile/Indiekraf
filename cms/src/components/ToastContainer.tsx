import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X, Trash2, HelpCircle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
}

export interface ConfirmDialogOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'danger' | 'primary';
  onConfirm: () => void;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onCloseToast: (id: string) => void;
  confirmConfig: ConfirmDialogOptions | null;
  onConfirm: () => void;
  onCancelConfirm: () => void;
}

function ToastItem({ toast, onClose }: { toast: ToastMessage; onClose: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const styles = {
    success: {
      bg: 'bg-emerald-900/90 border-emerald-500/40 text-emerald-100 shadow-emerald-950/40',
      iconBg: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      icon: CheckCircle2,
      badge: 'Success',
      defaultTitle: 'Berhasil'
    },
    error: {
      bg: 'bg-rose-900/90 border-rose-500/40 text-rose-100 shadow-rose-950/40',
      iconBg: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
      icon: AlertCircle,
      badge: 'Error',
      defaultTitle: 'Gagal'
    },
    warning: {
      bg: 'bg-amber-900/90 border-amber-500/40 text-amber-100 shadow-amber-950/40',
      iconBg: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      icon: AlertTriangle,
      badge: 'Warning',
      defaultTitle: 'Peringatan'
    },
    info: {
      bg: 'bg-blue-900/90 border-blue-500/40 text-blue-100 shadow-blue-950/40',
      iconBg: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      icon: Info,
      badge: 'Info',
      defaultTitle: 'Informasi'
    }
  };

  const style = styles[toast.type];
  const IconComponent = style.icon;

  return (
    <div
      className={`flex items-start gap-3.5 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100 max-w-md w-full pointer-events-auto ${style.bg}`}
      style={{
        animation: 'toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      <div className={`p-2 rounded-xl flex-shrink-0 ${style.iconBg}`}>
        <IconComponent className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <h4 className="font-bold text-sm leading-tight text-white tracking-wide">
          {toast.title || style.defaultTitle}
        </h4>
        <p className="text-xs text-white/80 font-medium mt-1 leading-relaxed break-words">
          {toast.message}
        </p>
      </div>

      <button
        onClick={() => onClose(toast.id)}
        className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors flex-shrink-0"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function ToastContainer({
  toasts,
  onCloseToast,
  confirmConfig,
  onConfirm,
  onCancelConfirm
}: ToastContainerProps) {
  return (
    <>
      {/* Dynamic Keyframes inline style */}
      <style>{`
        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateY(-12px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes modalPop {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>

      {/* Floating Toast List (Top Right) */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onClose={onCloseToast} />
        ))}
      </div>

      {/* Custom Confirmation Modal */}
      {confirmConfig && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-opacity">
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-slate-800 overflow-hidden"
            style={{ animation: 'modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3.5 rounded-2xl flex-shrink-0 ${
                confirmConfig.confirmVariant === 'primary' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'bg-rose-50 text-rose-600'
              }`}>
                {confirmConfig.confirmVariant === 'primary' ? (
                  <HelpCircle className="w-6 h-6" />
                ) : (
                  <Trash2 className="w-6 h-6" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-extrabold text-[#0A2472] tracking-tight">
                  {confirmConfig.title || 'Konfirmasi Tindakan'}
                </h3>
                <p className="text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
                  {confirmConfig.message}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onCancelConfirm}
                className="px-4 py-2.5 rounded-xl font-bold text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all active:scale-95"
              >
                {confirmConfig.cancelText || 'Batal'}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all active:scale-95 flex items-center gap-2 ${
                  confirmConfig.confirmVariant === 'primary'
                    ? 'bg-[#0A2472] hover:bg-[#071952] shadow-blue-900/20'
                    : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                }`}
              >
                {confirmConfig.confirmVariant === 'primary' ? null : <Trash2 className="w-4 h-4" />}
                {confirmConfig.confirmText || 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
