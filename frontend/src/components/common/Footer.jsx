import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

import { useSettings } from "@/context/SettingsContext";

const Footer = () => {
  const { settings } = useSettings();

  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-10 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-5xl flex-col items-center rounded-2xl border border-slate-100 bg-white/70 px-5 py-8 text-center shadow-sm backdrop-blur-md sm:px-8 sm:py-10"
        >
          {/* Name */}
          <h2 className="break-words text-2xl font-bold text-slate-900 sm:text-3xl">
            {settings?.fullName?.toUpperCase() ||
              "PATAN ANJUMAN"}
          </h2>

          {/* Role */}
          <p className="mt-2 text-base font-medium text-blue-600 sm:text-lg">
            {settings?.headline ||
              "Full Stack MERN Developer"}
          </p>

          {/* About */}
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {settings?.about ||
              "Building scalable, responsive, and modern web applications."}
          </p>

          {/* Social Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <motion.a
              href={settings?.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-700 shadow-sm transition-all duration-300 hover:bg-blue-600 hover:text-white"
            >
              <FaGithub size={20} />
            </motion.a>

            <motion.a
              href={settings?.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-700 shadow-sm transition-all duration-300 hover:bg-blue-600 hover:text-white"
            >
              <FaLinkedin size={20} />
            </motion.a>

            <motion.a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${
                settings?.email || ""
              }`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-700 shadow-sm transition-all duration-300 hover:bg-blue-600 hover:text-white"
            >
              <FaEnvelope size={20} />
            </motion.a>
          </div>

          {/* Divider */}
          <div className="my-8 h-px w-full max-w-4xl bg-slate-200 sm:my-10" />

          {/* Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex w-full flex-col items-center justify-center gap-3 text-center text-sm text-slate-500 md:flex-row md:justify-between"
          >
            <p className="break-words">
              © {new Date().getFullYear()}{" "}
              {settings?.fullName || "Patan Anjuman"}. All
              rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;