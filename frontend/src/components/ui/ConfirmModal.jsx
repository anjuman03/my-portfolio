import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ConfirmModal = ({
  open,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onCancel}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-2xl"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="text-red-600" size={30} />
            </div>

            <h2 className="text-center text-2xl font-bold text-slate-900">
              {title}
            </h2>

            <p className="mt-4 text-center leading-7 text-slate-500">
              {message}
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={onCancel}
                className="flex-1 rounded-xl border border-slate-300 py-3 font-semibold transition hover:bg-slate-100"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;