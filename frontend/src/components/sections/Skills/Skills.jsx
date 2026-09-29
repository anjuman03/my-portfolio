import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";

import SkillCard from "@/components/cards/SkillCard";
import SkillFormModal from "@/components/admin/SkillFormModal";
import AddButton from "@/components/admin/AddButton";
import { useAdminAuth } from "@/context/AdminAuthContext";

import Loader from "@/components/ui/Loader";
import ConfirmModal from "@/components/ui/ConfirmModal";

const categoryOrder = [
  "Programming",
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "Cloud",
  "Other",
];

const Skills = () => {
  const { token, isAdmin } = useAdminAuth();

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);

  const fetchSkills = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/skills`);

      setSkills(res.data.data);
    } catch (err) {
      console.error("Failed to fetch skills", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDelete = async () => {
    if (!skillToDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/skills/${skillToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Skill deleted successfully.");

      fetchSkills();

      setShowDeleteModal(false);
      setSkillToDelete(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete skill.");
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }

    acc[skill.category].push(skill);

    return acc;
  }, {});

  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Skills
          </p>

          <h2 className="mt-2 text-5xl font-bold text-foreground">
            Technologies I Work With
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            I build modern, scalable web applications using the MERN stack,
            programming fundamentals, and industry-standard development tools.
          </p>
        </motion.div>

        {/* Add Button */}
        {isAdmin && (
          <div className="mb-12 flex justify-center">
            <AddButton
              label="Add Skill"
              onClick={() => {
                setEditingSkill(null);
                setShowModal(true);
              }}
            />
          </div>
        )}

        {/* Skills */}
        {loading ? (
          <Loader text="Loading skills..." />
        ) : (
          categoryOrder.map((category) => {
            const categorySkills = groupedSkills[category];

            if (!categorySkills?.length) return null;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12 rounded-3xl border border-slate-100 bg-card p-8 shadow-lg dark:border-border dark:shadow-none"
              >
                <h3 className="mb-8 text-3xl font-bold text-foreground">
                  {category}
                </h3>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {categorySkills.map((skill) => (
                    <SkillCard
                      key={skill._id}
                      name={skill.name}
                      onEdit={() => {
                        setEditingSkill(skill);
                        setShowModal(true);
                      }}
                      onDelete={() => {
                        setSkillToDelete(skill._id);
                        setShowDeleteModal(true);
                      }}
                      isAdmin={isAdmin}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {showModal && (
        <SkillFormModal
          initialData={editingSkill}
          onClose={() => setShowModal(false)}
          onSuccess={fetchSkills}
        />
      )}
      <ConfirmModal
        open={showDeleteModal}
        title="Delete Skill"
        message="Are you sure you want to delete this skill? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setSkillToDelete(null);
        }}
      />
    </section>
  );
};

export default Skills;