import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAdminAuth } from "@/context/AdminAuthContext";

import SettingsCard from "@/components/admin/SettingsCard";
import { toast } from "sonner";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { token } = useAdminAuth();

  const [settings, setSettings] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingAbout, setSavingAbout] = useState(false);
  const [savingSocial, setSavingSocial] = useState(false);
  const [savingResume, setSavingResume] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  const [editingAbout, setEditingAbout] = useState(false);

  const [editingSocial, setEditingSocial] = useState(false);

  const [socialForm, setSocialForm] = useState({
    github: "",
    linkedin: "",
    leetcode: "",
    hackerrank: "",
    codechef: "",
    codeforces: "",
  });

  const [aboutForm, setAboutForm] = useState({
    about: "",
  });

  const [editingResume, setEditingResume] = useState(false);

  const [resumeFile, setResumeFile] = useState(null);

  const [resumeForm, setResumeForm] = useState({
    resumeButtonText: "",
  });

  const fetchSettings = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/settings`,
      );

      setSettings(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (!settings) return;

    setProfileForm({
      portfolioName: settings.portfolioName || "",
      fullName: settings.fullName || "",
      role: settings.role || "",
      headline: settings.headline || "",
      email: settings.email || "",
      phone: settings.phone || "",
      location: settings.location || "",
    });

    setSocialForm({
      github: settings.github || "",
      linkedin: settings.linkedin || "",
      leetcode: settings.leetcode || "",
      hackerrank: settings.hackerrank || "",
      codechef: settings.codechef || "",
      codeforces: settings.codeforces || "",
    });

    setResumeForm({
      resumeButtonText: settings.resumeButtonText || "Download Resume",
    });
  }, [settings]);

  const handleProfileSave = async () => {
    console.log(token);
    if (profileImage) {
      const imageData = new FormData();

      imageData.append("profileImage", profileImage);

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/settings/profile-image`,
        imageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }

    try {
      setSavingProfile(true);
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/settings`,
        profileForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchSettings();

      setEditingProfile(false);

      toast.success("Profile updated successfully.");
    } catch (err) {
      console.error(err);

      console.log("Status:", err.response?.status);
      console.log("Response:", err.response?.data);

      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAboutSave = async () => {
    try {
      setSavingAbout(true);
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/settings`,
        {
          about: aboutForm.about,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchSettings();

      setEditingAbout(false);

      toast.success("About updated successfully.");
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data?.message || "Failed to update About.");
    } finally {
      setSavingAbout(false);
    }
  };

  const handleSocialSave = async () => {
    try {
      setSavingSocial(true);
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/settings`,
        socialForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchSettings();

      setEditingSocial(false);

      toast.success("Social links updated successfully.");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message || "Failed to update social links.",
      );
    } finally {
      setSavingSocial(false);
    }
  };

  const handleResumeSave = async () => {
    try {
      setSavingResume(true);
      // Upload PDF if selected
      if (resumeFile) {
        const formData = new FormData();

        formData.append("resume", resumeFile);

        await axios.patch(
          `${import.meta.env.VITE_API_URL}/api/settings/resume`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
      }

      // Save button text
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/settings`,
        {
          resumeButtonText: resumeForm.resumeButtonText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchSettings();

      setResumeFile(null);
      setEditingResume(false);

      toast.success("Resume updated successfully.");
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data?.message || "Failed to update resume.");
    } finally {
      setSavingResume(false);
    }
  };

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/?section=home")}
            className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            <FaArrowLeft />
            Back to Portfolio
          </button>

          <h1 className="text-4xl font-bold text-slate-900">
            Portfolio Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all your portfolio information from one place.
          </p>
        </div>

        {/* Profile */}
        <SettingsCard
          title="Profile Information"
          editing={editingProfile}
          onEdit={() => setEditingProfile(true)}
          onCancel={() => setEditingProfile(false)}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {editingProfile ? (
              <>
                {/* Profile Image */}
                <div className="md:col-span-2">
                  <label className="mb-2 block font-medium text-slate-700">
                    Profile Image
                  </label>

                  <div className="flex items-center gap-6">
                    <img
                      src={
                        profileImage
                          ? URL.createObjectURL(profileImage)
                          : settings?.profileImage?.url ||
                            "https://placehold.co/120x120?text=Profile"
                      }
                      alt="Profile"
                      className="h-24 w-24 rounded-full border object-cover"
                    />

                    <label className="cursor-pointer rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                      Choose Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                      />
                    </label>

                    <span className="text-sm text-slate-500">
                      {profileImage ? profileImage.name : "No file selected"}
                    </span>
                  </div>
                </div>

                <input
                  value={profileForm.fullName}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      fullName: e.target.value,
                    })
                  }
                  placeholder="Full Name"
                  className="rounded-xl border border-slate-300 p-3"
                />

                <input
                  value={profileForm.headline}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      headline: e.target.value,
                    })
                  }
                  placeholder="Headline"
                  className="rounded-xl border border-slate-300 p-3"
                />

                <input
                  value={profileForm.email}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      email: e.target.value,
                    })
                  }
                  placeholder="Email"
                  className="rounded-xl border border-slate-300 p-3"
                />

                <input
                  value={profileForm.phone}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Phone"
                  className="rounded-xl border border-slate-300 p-3"
                />

                <input
                  value={profileForm.location}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      location: e.target.value,
                    })
                  }
                  placeholder="Location"
                  className="rounded-xl border border-slate-300 p-3"
                />

                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="button"
                    disabled={savingProfile}
                    onClick={handleProfileSave}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {savingProfile ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="md:col-span-2 flex items-center gap-6 rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <img
                    src={
                      settings?.profileImage?.url ||
                      "https://placehold.co/120x120?text=Profile"
                    }
                    alt="Profile"
                    className="h-24 w-24 rounded-full border object-cover"
                  />

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {settings?.fullName}
                    </h3>

                    <p className="text-slate-500">{settings?.headline}</p>
                  </div>
                </div>

                <Info label="Full Name" value={settings?.fullName} />
                <Info label="Headline" value={settings?.headline} />
                <Info label="Email" value={settings?.email} />
                <Info label="Phone" value={settings?.phone} />
                <Info label="Location" value={settings?.location} />
              </>
            )}
          </div>
        </SettingsCard>

        {/* About */}
        <div className="mt-8">
          <SettingsCard
            title="About"
            editing={editingAbout}
            onEdit={() => setEditingAbout(true)}
            onCancel={() => setEditingAbout(false)}
          >
            {editingAbout ? (
              <>
                <textarea
                  rows={6}
                  value={aboutForm.about}
                  onChange={(e) =>
                    setAboutForm({
                      about: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-500"
                />

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={handleAboutSave}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </>
            ) : (
              <p className="leading-8 text-slate-600">
                {settings?.about || "-"}
              </p>
            )}
          </SettingsCard>
        </div>

        {/* Social Links */}
        <div className="mt-8">
          <SettingsCard
            title="Social Links"
            editing={editingSocial}
            onEdit={() => setEditingSocial(true)}
            onCancel={() => setEditingSocial(false)}
          >
            {editingSocial ? (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={socialForm.github}
                    onChange={(e) =>
                      setSocialForm({
                        ...socialForm,
                        github: e.target.value,
                      })
                    }
                    placeholder="GitHub URL"
                    className="rounded-xl border border-slate-300 p-3"
                  />

                  <input
                    value={socialForm.linkedin}
                    onChange={(e) =>
                      setSocialForm({
                        ...socialForm,
                        linkedin: e.target.value,
                      })
                    }
                    placeholder="LinkedIn URL"
                    className="rounded-xl border border-slate-300 p-3"
                  />

                  <input
                    value={socialForm.leetcode}
                    onChange={(e) =>
                      setSocialForm({
                        ...socialForm,
                        leetcode: e.target.value,
                      })
                    }
                    placeholder="LeetCode URL"
                    className="rounded-xl border border-slate-300 p-3"
                  />

                  <input
                    value={socialForm.hackerrank}
                    onChange={(e) =>
                      setSocialForm({
                        ...socialForm,
                        hackerrank: e.target.value,
                      })
                    }
                    placeholder="HackerRank URL"
                    className="rounded-xl border border-slate-300 p-3"
                  />

                  <input
                    value={socialForm.codechef}
                    onChange={(e) =>
                      setSocialForm({
                        ...socialForm,
                        codechef: e.target.value,
                      })
                    }
                    placeholder="CodeChef URL"
                    className="rounded-xl border border-slate-300 p-3"
                  />

                  <input
                    value={socialForm.codeforces}
                    onChange={(e) =>
                      setSocialForm({
                        ...socialForm,
                        codeforces: e.target.value,
                      })
                    }
                    placeholder="Codeforces URL"
                    className="rounded-xl border border-slate-300 p-3"
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    disabled={savingSocial}
                    onClick={handleSocialSave}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {savingSocial ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                <Info label="GitHub" value={settings?.github} />
                <Info label="LinkedIn" value={settings?.linkedin} />
                <Info label="LeetCode" value={settings?.leetcode} />
                <Info label="HackerRank" value={settings?.hackerrank} />
                <Info label="CodeChef" value={settings?.codechef} />
                <Info label="Codeforces" value={settings?.codeforces} />
              </div>
            )}
          </SettingsCard>
        </div>

        {/* Resume */}
        <div className="mt-8">
          <SettingsCard
            title="Resume"
            editing={editingResume}
            onEdit={() => setEditingResume(true)}
            onCancel={() => setEditingResume(false)}
          >
            {editingResume ? (
              <div className="space-y-6">
                <div>
                  <label className="mb-3 block font-medium text-slate-700">
                    Resume (PDF)
                  </label>

                  <div className="rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 p-6 transition hover:border-blue-500">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
                        📄
                      </div>

                      <p className="text-lg font-semibold text-slate-800">
                        {resumeFile
                          ? resumeFile.name
                          : settings?.resume?.url
                            ? "Resume Uploaded"
                            : "No Resume Uploaded"}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        Upload a PDF resume for recruiters to download.
                      </p>

                      <label className="mt-5 cursor-pointer rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
                        {resumeFile ? "Change Resume" : "Choose Resume"}

                        <input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => setResumeFile(e.target.files[0])}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Button Text
                  </label>

                  <input
                    value={resumeForm.resumeButtonText}
                    onChange={(e) =>
                      setResumeForm({
                        resumeButtonText: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-300 p-3"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={savingResume}
                    onClick={handleResumeSave}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {savingResume ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Info
                  label="Resume"
                  value={
                    settings?.resume?.url ? "Uploaded" : "No Resume Uploaded"
                  }
                />

                <Info label="Button Text" value={settings?.resumeButtonText} />
              </>
            )}
          </SettingsCard>
        </div>
      </div>
    </section>
  );
};

const Info = ({ label, value }) => (
  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
    <p className="text-sm font-semibold text-slate-500">{label}</p>

    <p className="mt-2 font-medium text-slate-900 break-all">{value || "-"}</p>
  </div>
);

export default SettingsPage;
