import { Pencil, Trash2 } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

const AdminControls = ({ onEdit, onDelete }) => {
  const { isAdmin } = useAdminAuth();
  if (!isAdmin) return null;

  return (
    <div className="absolute top-3 right-3 flex gap-2 z-10">
      <button
        onClick={onEdit}
        className="p-2 rounded-lg bg-white/90 backdrop-blur border border-slate-200 shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-colors"
      >
        <Pencil size={15} className="text-blue-600" />
      </button>
      <button
        onClick={onDelete}
        className="p-2 rounded-lg bg-white/90 backdrop-blur border border-slate-200 shadow-sm hover:bg-red-50 hover:border-red-300 transition-colors"
      >
        <Trash2 size={15} className="text-red-500" />
      </button>
    </div>
  );
};

export default AdminControls;