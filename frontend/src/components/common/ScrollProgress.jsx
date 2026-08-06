import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
className="fixed left-0 top-0 z-[9999] h-1.5 w-full origin-left rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.7)]"      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;