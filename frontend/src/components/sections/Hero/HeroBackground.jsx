import { motion } from "framer-motion";

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      {/* Base */}
      <div className="absolute inset-0 bg-[#FCFBFF]" />

      {/* Left Blob */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-44 top-0 h-[520px] w-[520px] rounded-full bg-violet-100 blur-[130px]"
      />

      {/* Right Blob */}
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-180px] top-24 h-[560px] w-[560px] rounded-full bg-violet-200/60 blur-[140px]"
      />

      {/* Tilted Panel */}
      <div
        className="
          absolute
          right-[10%]
          top-32
          h-[520px]
          w-[420px]
          rotate-6
          rounded-[60px]
          bg-gradient-to-br
          from-violet-100
          via-violet-50
          to-violet-200/60
        "
      />

      {/* Left Dots */}
      <div className="absolute left-10 top-[35%] grid grid-cols-6 gap-3 opacity-40">
        {[...Array(36)].map((_, i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-violet-300"
          />
        ))}
      </div>

      {/* Right Dots */}
      <div className="absolute bottom-20 right-10 grid grid-cols-6 gap-3 opacity-40">
        {[...Array(36)].map((_, i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-violet-300"
          />
        ))}
      </div>

      {/* Curved Line */}
      <svg
        className="absolute bottom-0 left-0 w-[520px]"
        viewBox="0 0 520 220"
        fill="none"
      >
        <path
          d="M0 30C100 170 210 190 330 120C410 80 470 150 520 120"
          stroke="#C4B5FD"
          strokeWidth="2"
        />
      </svg>

    </div>
  );
};

export default HeroBackground;