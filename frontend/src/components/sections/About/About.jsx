import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code2 } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const cardClass =
  "rounded-2xl bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-xl dark:border dark:border-border dark:shadow-none dark:hover:shadow-blue-500/10";

const iconClass = "mb-5 text-blue-600 dark:text-blue-400";

const About = () => {
  const { settings } = useSettings();

  return (
    <section id="about" className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            About Me
          </p>

          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            {settings?.headline || "Passionate Full Stack MERN Developer"}
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {settings?.about ||
              "I enjoy building beautiful, responsive, and scalable web applications. My goal is to create digital experiences that are fast, accessible, and user-friendly while continuously improving my skills in modern web development."}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Education */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            className={`${cardClass} p-6 sm:p-8`}
          >
            <motion.div whileHover={{ rotate: -10, scale: 1.15 }}>
              <GraduationCap size={32} className={iconClass} />
            </motion.div>

            <h3 className="mb-3 text-xl font-semibold text-foreground">
              Education
            </h3>

            <p className="text-muted-foreground">
              B.Tech in Information Technology with a strong foundation in
              programming, data structures, and software engineering.
            </p>
          </motion.div>

          {/* Development */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            className={`${cardClass} p-8`}
          >
            <motion.div whileHover={{ rotate: -10, scale: 1.15 }}>
              <Code2 size={32} className={iconClass} />
            </motion.div>

            <h3 className="mb-3 text-xl font-semibold text-foreground">
              Development
            </h3>

            <p className="text-muted-foreground">
              Building responsive web applications using React, Node.js,
              Express.js, MongoDB, Tailwind CSS, REST APIs, and the MERN stack.
            </p>
          </motion.div>

          {/* Goal */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            className={`${cardClass} p-8`}
          >
            <motion.div whileHover={{ rotate: -10, scale: 1.15 }}>
              <Briefcase size={32} className={iconClass} />
            </motion.div>

            <h3 className="mb-3 text-lg font-semibold text-foreground sm:text-xl">
              Goal
            </h3>

            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              Seeking opportunities as a Full Stack MERN Developer where I can
              contribute, learn from experienced developers, and build products
              that create real-world impact.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;