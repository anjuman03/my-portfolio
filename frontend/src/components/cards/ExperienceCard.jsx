import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  Code2,
  Briefcase,
  Award,
  Sparkles,
} from "lucide-react";
import AdminControls from "@/components/admin/AdminControls";

const CATEGORY_ICONS = {
  education: GraduationCap,
  leadership: Users,
  technical: Code2,
  work: Briefcase,
  certification: Award,
};

const ExperienceCard = ({
  organization,
  role,
  employmentType,
  location,
  startDate,
  endDate,
  currentlyWorking,
  description,
  category,
  onEdit,
  onDelete,
  isAdmin,
}) => {
  const CategoryIcon =
    CATEGORY_ICONS[category?.toLowerCase()] || Sparkles;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="relative flex h-full flex-col rounded-3xl border border-border bg-card p-5 text-card-foreground shadow-lg hover:shadow-2xl dark:shadow-none dark:hover:shadow-blue-500/10 sm:p-6"
    >
      {isAdmin && (
        <AdminControls
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}

      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-blue-50 text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 sm:h-14 sm:w-14">
        <CategoryIcon size={22} />
      </div>

      {/* Content */}
      <div className="mt-4 flex-1">
        <h3 className="text-lg font-bold leading-tight text-foreground sm:text-xl">
          {role}
        </h3>

        {organization && (
          <p className="mt-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 sm:text-base">
            {organization}
          </p>
        )}

        <div className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 sm:text-sm">
          <span>{employmentType}</span>

          {location && (
            <>
              <span className="hidden sm:inline">•</span>
              <span>{location}</span>
            </>
          )}

          <span className="hidden sm:inline">•</span>

          <span>
            {new Date(startDate).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}

            {" - "}

            {currentlyWorking
              ? "Present"
              : endDate
                ? new Date(endDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })
                : "Present"}
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;