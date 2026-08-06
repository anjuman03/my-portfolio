import { motion } from "framer-motion";
import { useSettings } from "@/context/SettingsContext";

const HeroImage = () => {
  const { settings } = useSettings();
  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -12, 0],
        }}
        transition={{
          opacity: { duration: 0.8 },
          scale: { duration: 0.8 },
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative"
      >
        {/* Background Glow */}
{/* <div className="absolute inset-0 rounded-full bg-slate-300/20 blur-3xl" /> */}

        {/* Gradient Ring */}
        <div className="rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600 p-2 shadow-2xl">
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            transition={{
              duration: 0.3,
            }}
            className="flex h-60 w-60 items-center justify-center overflow-hidden rounded-full bg-slate-100 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96"
          >
            {settings?.profileImage?.url ? (
              <img
                src={settings.profileImage.url}
                alt={settings.fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-6xl font-extrabold text-slate-400 sm:text-7xl md:text-8xl">
                {settings?.fullName
                  ? settings.fullName
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()
                  : "PA"}
              </span>
            )}
          </motion.div>
        </div>

        {/* React Badge */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-2 top-4 rounded-xl bg-white px-3 py-2 shadow-xl sm:-left-4 sm:top-6 md:-left-8 md:top-8"
        >
          <p className="text-xs font-semibold text-slate-700 sm:text-sm">
            ⚛ React
          </p>
        </motion.div>

        {/* MERN Badge */}
        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-2 top-20 rounded-xl bg-white px-3 py-2 shadow-xl sm:-right-4 sm:top-24 md:-right-8 md:top-28"
        >
          <p className="text-xs font-semibold text-slate-700 sm:text-sm">
            🚀 MERN
          </p>
        </motion.div>

        {/* Frontend Badge */}
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-2 -left-2 rounded-xl bg-white px-3 py-2 shadow-xl sm:bottom-4 sm:-left-4 md:bottom-6 md:-left-10"
        >
          <p className="text-xs font-semibold text-slate-700 sm:text-sm">
            💻 Frontend
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroImage;
