import { motion } from "framer-motion";
import AdminControls from "@/components/admin/AdminControls";
import { skillIcons } from "@/assets/icons/skillicons";

const SkillCard = ({ name, isAdmin, onEdit, onDelete }) => {
  const Icon = skillIcons[name];

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.04,
      }}
      transition={{ duration: 0.25 }}
      className="group relative flex h-32 w-full min-w-0 flex-col items-center justify-center rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-sm transition-all hover:border-blue-500 hover:shadow-xl dark:shadow-none dark:hover:border-blue-400 dark:hover:shadow-blue-500/10 sm:h-36"
    >
      {isAdmin && <AdminControls onEdit={onEdit} onDelete={onDelete} />}

      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 dark:bg-muted sm:h-16 sm:w-16">
        {Icon ? (
          <Icon
            size={32}
            className="text-slate-700 transition-transform duration-300 group-hover:scale-110 dark:text-foreground/80"
          />
        ) : (
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 sm:text-3xl">
            {name.charAt(0)}
          </span>
        )}
      </div>

      <h3 className="text-center text-sm font-semibold text-foreground sm:text-base">
        {name}
      </h3>
    </motion.div>
  );
};

export default SkillCard;