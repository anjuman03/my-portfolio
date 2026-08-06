import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { toast } from "sonner";
import { useAdminAuth } from "@/context/AdminAuthContext";

const employmentTypes = [
  "Full Time",
  "Part Time",
  "Internship",
  "Freelance",
  "Contract",
];

const ExperienceFormModal = ({
  initialData,
  onClose,
  onSuccess,
}) => {
  const { token } = useAdminAuth();

  const isEdit = Boolean(initialData);

  const [form, setForm] = useState({
    organization: initialData?.organization || "",
    role: initialData?.role || "",
    employmentType:
      initialData?.employmentType || "Internship",
    location: initialData?.location || "",
    startDate:
      initialData?.startDate?.slice(0, 10) || "",
    endDate:
      initialData?.endDate?.slice(0, 10) || "",
    currentlyWorking:
      initialData?.currentlyWorking || false,
    description:
      initialData?.description || "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const url = isEdit
        ? `${import.meta.env.VITE_API_URL}/api/experiences/${initialData._id}`
        : `${import.meta.env.VITE_API_URL}/api/experiences`;

      const method = isEdit ? "patch" : "post";

      await axios[method](url, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(
        isEdit
          ? "Experience updated"
          : "Experience created"
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
      title={
        isEdit
          ? "Edit Experience"
          : "Add Experience"
      }
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Field
          label="Organization"
          name="organization"
          value={form.organization}
          onChange={handleChange}
          required
        />

        <Field
          label="Role / Position"
          name="role"
          value={form.role}
          onChange={handleChange}
          required
        />

        <div>
          <label className="text-sm font-medium text-slate-700">
            Employment Type
          </label>

          <select
            name="employmentType"
            value={form.employmentType}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm"
          >
            {employmentTypes.map((type) => (
              <option key={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <Field
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4">
          <Field
            type="date"
            label="Start Date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
          />

          <Field
            type="date"
            label="End Date"
            name="endDate"
            value={form.endDate}
            disabled={form.currentlyWorking}
            onChange={handleChange}
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            name="currentlyWorking"
            checked={form.currentlyWorking}
            onChange={handleChange}
          />
          Currently Working
        </label>

        <TextArea
          label="Description"
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : "Save Experience"}
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

const TextArea = ({
  label,
  ...props
}) => (
  <div>
    <label className="text-sm font-medium text-slate-700">
      {label}
    </label>

    <textarea
      {...props}
      className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm resize-none"
    />
  </div>
);

export default ExperienceFormModal;