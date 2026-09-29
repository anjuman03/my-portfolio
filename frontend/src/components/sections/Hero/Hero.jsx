import { motion } from "framer-motion";

import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroSocials from "./HeroSocials";

import { fadeLeft, fadeRight } from "../../../animations";

const Hero = () => {
  return (
    <section
      id="home"
      className="
  relative
  flex
  min-h-screen
  items-center
  overflow-hidden
  pt-24
  lg:pt-20
"
    >
      {/* Background layer */}
      <div className="absolute inset-0 -z-10">
        {/* Grid */}
        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)]
            dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]
            bg-[size:44px_44px]
          "
        />

        {/* Grid fade (follows the theme background) */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(ellipse_at_center,transparent_10%,var(--background)_75%)]
          "
        />
      </div>

      {/* Moving Blue Glow */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/4
          top-10
          h-[260px]
w-[260px]
sm:h-[380px]
sm:w-[380px]
lg:h-[500px]
lg:w-[500px]
          -translate-x-1/2
          rounded-full
          bg-blue-500/10
          dark:bg-blue-500/20
          blur-3xl
        "
      />

      {/* Moving Purple Glow */}
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -bottom-20
          -right-20
         h-[220px]
w-[220px]
sm:h-[320px]
sm:w-[320px]
lg:h-[450px]
lg:w-[450px]
          rounded-full
          bg-purple-500/[0.08]
          dark:bg-purple-500/20
          blur-[100px]
        "
      />

      {/* Hero Content */}
      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-5
sm:px-6
lg:px-10
        "
      >
        <div
          className="
            grid
items-center
gap-10
lg:gap-16
lg:grid-cols-2
          "
        >
          {/* Left Content */}
          <motion.div variants={fadeLeft} initial="hidden" animate="visible">
            <HeroContent />
          </motion.div>

          {/* Right Image */}
          <motion.div variants={fadeRight} initial="hidden" animate="visible">
            <HeroImage />
          </motion.div>
        </div>
      </div>

      <HeroSocials />
    </section>
  );
};

export default Hero;