import { useEffect, useState } from "react";
import axios from "axios";

import Modal from "./Modal";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { toast } from "sonner";
import { labelClass, inputClass, fileClass } from "./formStyles";

const Field = ({ label, ...props }) => (
  <div>
    <label className={labelClass}>{label}</label>

    <input {...props} className={inputClass} />
  </div>
);

const TextArea = ({ label, ...props }) => (
  <div>
    <label className={labelClass}>{label}</label>

    <textarea
      {...props}
      rows={5}
      className={`${inputClass} resize-none`}
    />
  </div>
);

const SectionTitle = ({ children }) => (
  <div className="border-b border-border pb-2">
    <h3 className="text-lg font-semibold text-foreground">
      {children}
    </h3>
  </div>
);

const SettingFormModal = ({
  initialData,
  onClose,
  onSuccess,
}) => {
  const { token } = useAdminAuth();

  const [saving, setSaving] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [resume, setResume] = useState(null);

  const [profilePreview, setProfilePreview] = useState("");

  const [form, setForm] = useState({
    portfolioName: "",
    fullName: "",
    role: "",
    headline: "",
    about: "",

    email: "",
    phone: "",
    location: "",

    github: "",
    linkedin: "",
    instagram: "",
    twitter: "",

    leetcode: "",
    hackerrank: "",
    codechef: "",
    codeforces: "",

    resumeButtonText: "Download Resume",
  });

  useEffect(() => {
    if (!initialData) return;

    setForm({
      portfolioName: initialData.portfolioName || "",
      fullName: initialData.fullName || "",
      role: initialData.role || "",
      headline: initialData.headline || "",
      about: initialData.about || "",

      email: initialData.email || "",
      phone: initialData.phone || "",
      location: initialData.location || "",

      github: initialData.github || "",
      linkedin: initialData.linkedin || "",
      instagram: initialData.instagram || "",
      twitter: initialData.twitter || "",

      leetcode: initialData.leetcode || "",
      hackerrank: initialData.hackerrank || "",
      codechef: initialData.codechef || "",
      codeforces: initialData.codeforces || "",

      resumeButtonText:
        initialData.resumeButtonText || "Download Resume",
    });

    setProfilePreview(initialData.profileImage?.url || "");
  }, [initialData]);

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleProfileImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfileImage(file);

    setProfilePreview(URL.createObjectURL(file));
  };

  const handleResume = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/settings`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (profileImage) {
        const imageData = new FormData();

        imageData.append("profileImage", profileImage);

        await axios.patch(
          `${import.meta.env.VITE_API_URL}/api/settings/profile-image`,
          imageData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (resume) {
        const resumeData = new FormData();

        resumeData.append("resume", resume);

        await axios.patch(
          `${import.meta.env.VITE_API_URL}/api/settings/resume`,
          resumeData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      toast.success("Profile updated successfully.");

      onSuccess();
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="Edit Portfolio" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ---------------- Personal Information ---------------- */}

        <SectionTitle>Personal Information</SectionTitle>

        <div>
          <label className={labelClass}>Profile Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImage}
            className={fileClass}
          />

          {profilePreview && (
            <img
              src={profilePreview}
              alt="Profile Preview"
              className="mt-4 h-36 w-36 rounded-full border object-cover shadow-md dark:shadow-none"
            />
          )}
        </div>

        <Field
          label="Portfolio Name"
          name="portfolioName"
          value={form.portfolioName}
          onChange={handleChange}
        />

        <Field
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
        />

        <Field
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
        />

        <Field
          label="Headline"
          name="headline"
          value={form.headline}
          onChange={handleChange}
        />

        <TextArea
          label="About"
          name="about"
          value={form.about}
          onChange={handleChange}
        />

        {/* ---------------- Contact ---------------- */}

        <SectionTitle>Contact Information</SectionTitle>

        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <Field
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <Field
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
        />

        {/* ---------------- Social ---------------- */}

        <SectionTitle>Social Links</SectionTitle>

        <Field
          label="GitHub"
          name="github"
          value={form.github}
          onChange={handleChange}
        />

        <Field
          label="LinkedIn"
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
        />

        <Field
          label="Instagram"
          name="instagram"
          value={form.instagram}
          onChange={handleChange}
        />

        <Field
          label="Twitter / X"
          name="twitter"
          value={form.twitter}
          onChange={handleChange}
        />

        <Field
          label="LeetCode"
          name="leetcode"
          value={form.leetcode}
          onChange={handleChange}
        />

        <Field
          label="HackerRank"
          name="hackerrank"
          value={form.hackerrank}
          onChange={handleChange}
        />

        <Field
          label="CodeChef"
          name="codechef"
          value={form.codechef}
          onChange={handleChange}
        />

        <Field
          label="Codeforces"
          name="codeforces"
          value={form.codeforces}
          onChange={handleChange}
        />

        {/* ---------------- Resume ---------------- */}

        <SectionTitle>Resume</SectionTitle>

        <div>
          <label className={labelClass}>Upload Resume</label>

          <input
            type="file"
            accept=".pdf"
            onChange={handleResume}
            className={fileClass}
          />
        </div>

        <Field
          label="Resume Button Text"
          name="resumeButtonText"
          value={form.resumeButtonText}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </Modal>
  );
};

export default SettingFormModal;