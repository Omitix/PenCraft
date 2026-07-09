import type { ReactNode } from "react";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  confirmVariant?: "error" | "warning" | "primary";
  icon?: ReactNode;
  loading?: boolean;
}

export const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Delete",
  confirmVariant = "error",
  icon,
  loading = false,
}: ConfirmModalProps) => {
  if (!open) return null;

  const variantClass = {
    error: "btn-error",
    warning: "btn-warning",
    primary: "btn-primary",
  }[confirmVariant];

  const defaultIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="card bg-base-100 shadow-xl w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="card-body p-6 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mb-3">
            {icon || defaultIcon}
          </div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm text-base-content/60 mt-1">{message}</p>
          <div className="card-actions justify-center gap-2 mt-4">
            <button className="btn btn-ghost btn-sm" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button className={`btn btn-sm ${variantClass}`} onClick={onConfirm} disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                confirmLabel
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};