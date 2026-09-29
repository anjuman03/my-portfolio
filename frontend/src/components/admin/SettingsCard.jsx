import { Pencil, X } from "lucide-react";

const SettingsCard = ({
  title,
  editing = false,
  onEdit,
  onCancel,
  children,
}) => {
  return (
    <div className="rounded-3xl border border-border bg-card p-8 text-card-foreground shadow-sm dark:shadow-none">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          {title}
        </h2>

        {editing ? (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
          >
            <X size={16} />
            Cancel
          </button>
        ) : (
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
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