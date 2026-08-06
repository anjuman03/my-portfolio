import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

const HeroButtons = () => {
  const { settings } = useSettings();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="mt-10 flex flex-wrap items-center gap-4"
    >
      {/* View Projects */}
      <motion.a
        href="#projects"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="
          group
          inline-flex
          items-center
          gap-3
          rounded-2xl
          bg-violet-600
          px-7
          py-4
          font-semibold
          text-white
          shadow-[0_15px_40px_rgba(139,92,246,.25)]
          transition-all
          duration-300
          hover:bg-violet-700
        "
      >
        View Projects

        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </motion.a>

      {/* Resume */}
      <motion.a
        href={`${import.meta.env.VITE_API_URL}/api/settings/resume/download`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="
          inline-flex
          items-center
          gap-3
          rounded-2xl
          border
          border-violet-200
          bg-white
          px-7
          py-4
          font-semibold
          text-slate-700
          transition-all
          duration-300
          hover:border-violet-400
          hover:text-violet-700
          hover:shadow-lg
        "
      >
        <Download size={18} />

        {settings?.resumeButtonText || "Resume"}
      </motion.a>
    </motion.div>
  );
};

export default HeroButtons;