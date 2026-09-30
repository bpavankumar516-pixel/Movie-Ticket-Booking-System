import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertCircle, Trash2, CheckCircle2 } from 'lucide-react';

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger', // 'danger' or 'primary'
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="space-y-5 text-left py-1">
        <div className="flex items-start gap-3.5 p-4 bg-[var(--input-bg)] border border-[var(--border)] rounded-2xl">
          <div className={`p-2 rounded-xl shrink-0 ${variant === 'danger' ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30' : 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'}`}>
            {variant === 'danger' ? <Trash2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-black uppercase tracking-wider text-[var(--text-heading)]">
              {variant === 'danger' ? 'Permanent Action Warning' : 'Confirmation Needed'}
            </h4>
            <p className="text-xs text-[var(--text-body)] leading-relaxed font-normal">{message}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[var(--border)]">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'emerald'}
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
            className="flex items-center gap-1.5 font-bold px-5 py-2"
          >
            {variant === 'danger' ? <Trash2 className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
