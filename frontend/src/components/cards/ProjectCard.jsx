import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink, FiArrowRight } from "react-icons/fi";
import AdminControls from "@/components/admin/AdminControls";

const ProjectCard = ({
  id,
  title,
  description,
  image,
  technologies = [],
  github,
  live,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl"
    >
      {isAdmin && <AdminControls onEdit={onEdit} onDelete={onDelete} />}
      <div className="grid lg:grid-cols-2 lg:min-h-[380px]">
        {/* Image */}
        <div className="relative min-h-[300px] overflow-hidden bg-slate-100 lg:min-h-[380px]">
          {image && image.trim() !== "" ? (
            <motion.img
              src={image}
              alt={title}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <span className="text-8xl font-bold text-blue-600">
                {title?.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-6 lg:p-7">
          <motion.h3
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-slate-900 lg:text-3xl"
          >
            {title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-3 line-clamp-3 leading-7 text-slate-600"
          >
            {description}
          </motion.p>

          {technologies.length > 0 && (
            <div className="mt-5">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Tech Stack
              </h4>

              <div className="flex flex-wrap gap-2">
                {technologies.slice(0, 6).map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.25,
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -2,
                      scale: 1.05,
                    }}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100"
                  >
                    {tech}
                  </motion.span>
                ))}

                {technologies.length > 6 && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    +{technologies.length - 6} more
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {github && (
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 font-semibold text-white"
              >
                <FaGithub />
                GitHub
              </motion.a>
            )}

            {live && (
              <motion.a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
              >
                <FiExternalLink />
                Live Demo
              </motion.a>
            )}

            <Link
              to={`/project/${id}`}
              className="flex items-center gap-2 rounded-xl border border-blue-600 px-5 py-2.5 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              Details
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
