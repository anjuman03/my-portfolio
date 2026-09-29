import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import axios from "axios";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import AnimatedBackground from "@/components/common/AnimatedBackground";

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/projects/${id}`
        );

        setProject(res.data.data);
      } catch (err) {
        console.error(err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold text-foreground">Project Not Found</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />

        <div className="mx-auto max-w-7xl px-6 py-24">
          {/* Back Button */}
          <button
            onClick={() => navigate("/?section=projects")}
            className="mb-12 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            <FaArrowLeft />
            Back to Projects
          </button>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid items-center gap-16 lg:grid-cols-2"
          >
            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden rounded-3xl bg-slate-100 shadow-2xl dark:border dark:border-border dark:bg-muted dark:shadow-none"
            >
              {project.coverImage?.url &&
              project.coverImage.url.trim() !== "" ? (
                <img
                  src={project.coverImage.url}
                  alt={project.title}
                  className="w-full object-cover"
                />
              ) : (
                <div className="flex h-[420px] w-full items-center justify-center text-8xl font-bold text-blue-600 dark:text-blue-400">
                  {project.title?.charAt(0)}
                </div>
              )}
            </motion.div>

            {/* Content */}
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-blue-600 dark:text-blue-400">
                PROJECT
              </p>

              <h1 className="text-5xl font-bold text-foreground">
                {project.title}
              </h1>

              {project.shortDescription && (
                <p className="mt-4 text-xl leading-8 text-muted-foreground">
                  {project.shortDescription}
                </p>
              )}

              <p className="mt-8 text-lg leading-8 text-muted-foreground">
                {project.description}
              </p>

              {project.technologies?.length > 0 && (
                <>
                  <h3 className="mb-4 mt-10 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Tech Stack
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <div className="mt-10 flex flex-wrap gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                  >
                    <FaGithub />
                    GitHub
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-border dark:text-foreground/80 dark:hover:border-blue-400 dark:hover:text-blue-400"
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default ProjectPage;