import { X } from "lucide-react";

const Modal = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <h2 className="text-2xl font-bold text-slate-900">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[calc(90vh-80px)] overflow-y-auto px-6 py-6">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;