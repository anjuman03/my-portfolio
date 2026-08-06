import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import Loader from "@/components/ui/Loader";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ExperienceCard from "@/components/cards/ExperienceCard";
import ExperienceFormModal from "@/components/admin/ExperienceFormModal";
import AddButton from "@/components/admin/AddButton";
import { useAdminAuth } from "@/context/AdminAuthContext";

const Experience = () => {
  const { token, isAdmin } = useAdminAuth();

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState(null);

  const fetchExperiences = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/experiences`,
      );

      setExperiences(res.data.data);
    } catch (err) {
      console.error("Failed to fetch experiences", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleAddClick = () => {
    setEditingExperience(null);
    setShowModal(true);
  };

  const handleEditClick = (experience) => {
    setEditingExperience(experience);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!experienceToDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/experiences/${experienceToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Experience deleted successfully.");

      fetchExperiences();

      setShowDeleteModal(false);
      setExperienceToDelete(null);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to delete experience.",
      );
    }
  };

  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Experience
          </p>

          <h2 className="mt-3 text-5xl font-bold text-slate-900 sm:text-6xl">
            My Journey
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            My academic, leadership, and technical journey that has helped shape
            my skills and experience.
          </p>
        </motion.div>

        {isAdmin && (
          <div className="mb-10 flex justify-center">
            <AddButton label="Add Experience" onClick={handleAddClick} />
          </div>
        )}

        {loading ? (
          <Loader text="Loading experiences..." />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience._id}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                className="h-full"
              >
                <ExperienceCard
                  organization={experience.organization}
                  role={experience.role}
                  employmentType={experience.employmentType}
                  location={experience.location}
                  startDate={experience.startDate}
                  endDate={experience.endDate}
                  currentlyWorking={experience.currentlyWorking}
                  description={experience.description}
                  technologies={experience.technologies}
                  logo={experience.companyLogo?.url}
                  onEdit={() => handleEditClick(experience)}
                  onDelete={() => {
                    setExperienceToDelete(experience._id);
                    setShowDeleteModal(true);
                  }}
                  isAdmin={isAdmin}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <ExperienceFormModal
          initialData={editingExperience}
          onClose={() => setShowModal(false)}
          onSuccess={fetchExperiences}
        />
      )}
      <ConfirmModal
        open={showDeleteModal}
        title="Delete Experience"
        message="Are you sure you want to delete this experience? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setExperienceToDelete(null);
        }}
      />
    </section>
  );
};

export default Experience;