import { Plus } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

const AddButton = ({ label = "Add", onClick }) => {
  const { isAdmin } = useAdminAuth();
  if (!isAdmin) return null;

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-5 py-2.5 font-medium shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition-colors"
    >
      <Plus size={18} />
      {label}
    </button>
  );
};

export default AddButton;