import { Pencil, X } from "lucide-react";

const SettingsCard = ({
  title,
  editing = false,
  onEdit,
  onCancel,
  children,
}) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          {title}
        </h2>

        {editing ? (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            <X size={16} />
            Cancel
          </button>
        ) : (
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
          >
            <Pencil size={16} />
            Edit
          </button>
        )}
      </div>

      {children}
    </div>
  );
};

export default SettingsCard;