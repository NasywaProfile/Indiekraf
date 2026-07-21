import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const modalJSX = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10" id="modal-container">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md cursor-pointer"
            id="modal-backdrop"
          />

          {/* Modal Content Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-white w-full max-w-5xl rounded-[10px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10 border border-slate-100"
            id="modal-content-wrapper"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 md:px-8 md:py-5 border-b border-slate-100 shrink-0 bg-white" id="modal-header">
              <h3 className="font-sans font-extrabold text-[#0A2472] text-lg sm:text-xl">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-[10px] transition-all duration-200 cursor-pointer"
                id="modal-close-btn"
              >
                <X className="w-5 h-5 sm:w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-12 bg-slate-50/50" id="modal-body">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalJSX, document.body);
}
