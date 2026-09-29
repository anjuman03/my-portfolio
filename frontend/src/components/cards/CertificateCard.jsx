import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import AdminControls from "@/components/admin/AdminControls";

const CertificateCard = ({
  id,
  title,
  issuer,
  image,
  onEdit,
  onDelete,
  isAdmin,
}) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-lg transition-all hover:shadow-2xl dark:shadow-none dark:hover:shadow-blue-500/10"
    >
      {isAdmin && <AdminControls onEdit={onEdit} onDelete={onDelete} />}

      {/* Certificate Preview */}
      <div className="bg-slate-100 p-3 dark:bg-muted sm:p-4">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-48 w-full border border-slate-200 bg-white object-contain shadow-sm transition duration-500 hover:scale-[1.02] dark:border-border dark:shadow-none sm:h-56 lg:h-60"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-5xl font-bold text-blue-600 dark:border-border dark:bg-card dark:text-blue-400 sm:h-56 sm:text-6xl lg:h-60">
            {title?.charAt(0)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
        <h3 className="text-xl font-bold text-foreground sm:text-2xl">
          {title}
        </h3>

        <p className="mt-2 text-base text-muted-foreground sm:mt-3 sm:text-lg">
          {issuer}
        </p>

        <div className="mt-auto pt-5 sm:pt-7">
          <Link
            to={`/certificate/${id}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 sm:w-auto"
          >
            <FaEye />
            View Certificate
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificateCard;