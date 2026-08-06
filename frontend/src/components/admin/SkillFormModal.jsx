import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { toast } from "sonner";
import { useAdminAuth } from "@/context/AdminAuthContext";

const categories = [
  "Programming",
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "Cloud",
  "Other",
];

const SkillFormModal = ({
  initialData,
  onClose,
  onSuccess,
}) => {
  const { token } = useAdminAuth();

  const isEdit = Boolean(initialData);

  const [form, setForm] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "Frontend",
    order: initialData?.order || 0,
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const url = isEdit
        ? `${import.meta.env.VITE_API_URL}/api/skills/${initialData._id}`
        : `${import.meta.env.VITE_API_URL}/api/skills`;

      const method = isEdit ? "patch" : "post";

      await axios[method](url, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(
        isEdit ? "Skill updated" : "Skill created"
      );

      onSuccess();
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title={isEdit ? "Edit Skill" : "Add Skill"}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Field
          label="Skill Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm"
            >
              {categories.map((category) => (
                <option key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <Field
            type="number"
            label="Display Order"
            name="order"
            value={form.order}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : "Save Skill"}
        </button>
      </form>
    </Modal>
  );
};

const Field = ({
  label,
  ...props
}) => (
  <div>
    <label className="text-sm font-medium text-slate-700">
      {label}
    </label>

    <input
      {...props}
      className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm"
    />
  </div>
);

export default SkillFormModal;