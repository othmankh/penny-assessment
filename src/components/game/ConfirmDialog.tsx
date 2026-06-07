export function ConfirmDialog({
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}: {
  readonly title: string;
  readonly message: string;
  readonly confirmLabel: string;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-penny-navy/40 px-6 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="w-full max-w-md rounded-3xl border border-penny-teal/20 bg-white p-6 shadow-card"
      >
        <h2 id="confirm-dialog-title" className="text-xl font-black text-penny-navy">
          {title}
        </h2>
        <p className="mt-3 text-penny-navy-muted">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-xl border border-penny-teal/25 px-5 py-3 font-bold text-penny-navy transition hover:bg-penny-teal-soft"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl bg-penny-teal px-5 py-3 font-bold text-white transition hover:bg-penny-teal-dark"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
