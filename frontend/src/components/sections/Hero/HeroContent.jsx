import { motion } from "framer-motion";
import { useSettings } from "@/context/SettingsContext";
import { Download } from "lucide-react";

const languages = [
  {
    name: "English",
    color:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30",
  },
  {
    name: "German",
    color:
      "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/30",
  },
  {
    name: "Hindi",
    color:
      "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-500/30",
  },
  {
    name: "Telugu",
    color:
      "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/30",
  },
];

const HeroContent = () => {
  const { settings } = useSettings();
  return (
    <div className="flex-1 text-center lg:text-left w-full
max-w-full
min-w-0
mx-auto
overflow-hidden">
      {/* Greeting */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 text-base text-blue-600 dark:text-blue-400 sm:text-lg"
      >
        Hello, I'm
      </motion.p>
      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-5 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:mb-6 lg:text-7xl"
      >
        {settings?.fullName || "Patan Anjuman"}{" "}
      </motion.h1>
      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mb-6 max-w-xl text-base leading-7 text-gray-400 dark:text-muted-foreground sm:text-lg"
      >
        {settings?.headline ||
          "Full Stack MERN Developer passionate about building scalable, responsive and modern web applications."}
      </motion.p>
      {/* Languages */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mb-8 text-center lg:text-left"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-muted-foreground">
          Spoken Languages
        </p>

        <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
          {languages.map((language) => (
            <span
              key={language.name}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${language.color}`}
            >
              {language.name}
            </span>
          ))}
        </div>
      </motion.div>
      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
      >
        <motion.a
          href="#projects"
          whileHover={{
            scale: 1.05,
            y: -3,
          }}
          whileTap={{
            scale: 0.97,
          }}
          transition={{ duration: 0.2 }}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 text-center text-white shadow-lg dark:shadow-blue-500/20 sm:w-auto"
        >
          View Projects
        </motion.a>

        <motion.a
          href="#contact"
          whileHover={{
            scale: 1.05,
            y: -3,
          }}
          whileTap={{
            scale: 0.97,
          }}
          transition={{ duration: 0.2 }}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 text-center text-white shadow-lg dark:shadow-blue-500/20 sm:w-auto"
        >
          Contact Me
        </motion.a>
        <motion.a
          href={`${import.meta.env.VITE_API_URL}/api/settings/resume/download`}
          download={`${(settings?.fullName || "Resume")
            .trim()
            .replace(/\s+/g, "_")}_Resume.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.05,
            y: -3,
          }}
          whileTap={{
            scale: 0.97,
          }}
          transition={{ duration: 0.2 }}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white sm:w-auto"
        >
          <Download size={18} />
          {settings?.resumeButtonText || "Download Resume"}
        </motion.a>
      </motion.div>
    </div>
  );
};

export default HeroContent;