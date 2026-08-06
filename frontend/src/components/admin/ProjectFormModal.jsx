import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { toast } from "sonner";
import { useAdminAuth } from "@/context/AdminAuthContext";

const categories = [
  "Full Stack",
  "Frontend",
  "Backend",
  "AI/ML",
  "Mobile",
  "Other",
];

const ProjectFormModal = ({ initialData, onClose, onSuccess }) => {
  const { token } = useAdminAuth();
  const isEdit = Boolean(initialData);

  const [form, setForm] = useState({
    title: initialData?.title || "",
    shortDescription: initialData?.shortDescription || "",
    description: initialData?.description || "",
    technologies: initialData?.technologies?.join(", ") || "",
    category: initialData?.category || "Full Stack",
    githubUrl: initialData?.githubUrl || "",
    liveUrl: initialData?.liveUrl || "",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();

    Object.entries({
      ...form,
      technologies: form.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
    }).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) =>
          formData.append("technologies", item)
        );
      } else {
        formData.append(key, value);
      }
    });

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      const url = isEdit
        ? `${import.meta.env.VITE_API_URL}/api/projects/${initialData._id}`
        : `${import.meta.env.VITE_API_URL}/api/projects`;

      const method = isEdit ? "patch" : "post";

      await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        isEdit ? "Project updated" : "Project created"
      );

      onSuccess();
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title={isEdit ? "Edit Project" : "Add Project"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <Field
          label="Short Description"
          name="shortDescription"
          value={form.shortDescription}
          onChange={handleChange}
          required
        />

        <TextArea
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <Field
          label="Technologies"
          name="technologies"
          value={form.technologies}
          onChange={handleChange}
          placeholder="React, Node.js, Express.js, MongoDB..."
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
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Cover Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setCoverImage(e.target.files[0])
              }
              className="mt-1.5 w-full text-sm text-slate-600 file:mr-2 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-medium file:text-blue-600 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field
            label="GitHub URL"
            name="githubUrl"
            value={form.githubUrl}
            onChange={handleChange}
          />

          <Field
            label="Live URL"
            name="liveUrl"
            value={form.liveUrl}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-2 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Project"}
        </button>
      </form>
    </Modal>
  );
};

const Field = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-slate-700">
      {label}
    </label>

    <input
      {...props}
      className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
    />
  </div>
);

const TextArea = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-slate-700">
      {label}
    </label>

    <textarea
      {...props}
      rows={3}
      className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
    />
  </div>
);

export default ProjectFormModal;