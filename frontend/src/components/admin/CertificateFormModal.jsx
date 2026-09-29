import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { toast } from "sonner";
import { labelClass, inputClass, fileClass } from "./formStyles";

const CertificateFormModal = ({ initialData, onClose, onSuccess }) => {
  const { token } = useAdminAuth();

  const [form, setForm] = useState({
    title: "",
    issuer: "",
    issueDate: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        issuer: initialData.issuer || "",
        issueDate: initialData.issueDate
          ? initialData.issueDate.substring(0, 10)
          : "",
      });

      setPreview(initialData.image?.url || "");
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("issuer", form.issuer);
      formData.append("issueDate", form.issueDate);

      if (image) {
        formData.append("image", image);
      }

      const url = initialData
        ? `${import.meta.env.VITE_API_URL}/api/certificates/${initialData._id}`
        : `${import.meta.env.VITE_API_URL}/api/certificates`;

      const method = initialData ? "patch" : "post";

      await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save certificate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={initialData ? "Edit Certificate" : "Add Certificate"}
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
          label="Issuer"
          name="issuer"
          value={form.issuer}
          onChange={handleChange}
          required
        />

        <div>
          <label className={labelClass}>Issue Date</label>

          <input
            type="date"
            name="issueDate"
            value={form.issueDate}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Certificate Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className={fileClass}
          />
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full rounded-2xl border border-slate-200 object-contain dark:border-border"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : initialData
              ? "Update Certificate"
              : "Save Certificate"}
        </button>
      </form>
    </Modal>
  );
};

const Field = ({ label, ...props }) => (
  <div>
    <label className={labelClass}>{label}</label>

    <input {...props} className={inputClass} />
  </div>
);

export default CertificateFormModal;