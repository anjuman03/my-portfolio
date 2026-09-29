import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import ProjectCard from "../../cards/ProjectCard";
import AddButton from "@/components/admin/AddButton";
import ProjectFormModal from "@/components/admin/ProjectFormModal";
import { useAdminAuth } from "@/context/AdminAuthContext";
import Loader from "@/components/ui/Loader";
import ConfirmModal from "@/components/ui/ConfirmModal";

const Projects = () => {
  const { token, isAdmin } = useAdminAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/projects`,
      );
      setProjects(res.data.data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddClick = () => {
    setEditingProject(null);
    setShowModal(true);
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/projects/${projectToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Project deleted successfully.");

      fetchProjects();

      setShowDeleteModal(false);
      setProjectToDelete(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete project.");
    }
  };

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Projects
          </p>

          <h2 className="mt-2 text-4xl font-bold text-foreground">
            Featured Projects
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            A collection of projects that demonstrate my expertise in building
            modern, scalable, and user-friendly web applications.
          </p>
        </motion.div>

        {isAdmin && (
          <div className="mb-10 flex justify-center">
            <AddButton label="Add Project" onClick={handleAddClick} />
          </div>
        )}

        {/* Projects */}
        {loading ? (
          <Loader text="Loading projects..." />
        ) : (
          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                }}
                viewport={{ once: true }}
              >
                <ProjectCard
                  id={project._id}
                  title={project.title}
                  subtitle={project.shortDescription}
                  description={project.description}
                  image={project.coverImage?.url}
                  technologies={project.technologies}
                  github={project.githubUrl}
                  live={project.liveUrl}
                  isAdmin={isAdmin}
                  onEdit={() => handleEditClick(project)}
                  onDelete={() => {
                    setProjectToDelete(project._id);
                    setShowDeleteModal(true);
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <ProjectFormModal
          initialData={editingProject}
          onClose={() => setShowModal(false)}
          onSuccess={fetchProjects}
        />
      )}
      <ConfirmModal
        open={showDeleteModal}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setProjectToDelete(null);
        }}
      />
    </section>
  );
};

export default Projects;