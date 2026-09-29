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
        {/* Gradient Ring */}
        <div className="rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600 p-2 shadow-2xl dark:shadow-blue-500/25">
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            transition={{
              duration: 0.3,
            }}
            className="flex h-60 w-60 items-center justify-center overflow-hidden rounded-full bg-slate-100 dark:bg-card sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96"
          >
            {settings?.profileImage?.url ? (
              <img
                src={settings.profileImage.url}
                alt={settings.fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-6xl font-extrabold text-slate-400 dark:text-slate-500 sm:text-7xl md:text-8xl">
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
      </motion.div>
    </div>
  );
};

export default HeroImage;