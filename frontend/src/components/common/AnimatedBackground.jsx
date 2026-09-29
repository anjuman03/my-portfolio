import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const particles = Array.from({ length: 16 }).map((_, i) => ({
  id: i,
  size: Math.random() * 5 + 3,
  top: Math.random() * 100,
  left: Math.random() * 100,
  duration: Math.random() * 10 + 12,
  delay: Math.random() * 4,
}));

const AnimatedBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  const rotateX = useTransform(springY, [-1, 1], [3, -3]);
  const rotateY = useTransform(springX, [-1, 1], [-3, 3]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-background"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Blob 1 - blue, continuous orbit + depth pulse */}
        <motion.div
          className="absolute left-[10%] top-[10%] h-[500px] w-[500px] rounded-full blur-[110px]"
          style={{ translateZ: 60 }}
          animate={{
            x: [0, 80, -40, 0],
            y: [0, 50, -60, 0],
            translateZ: [60, 140, 60],
            backgroundColor: ["#60a5fa33", "#818cf833", "#60a5fa33"],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Blob 2 - purple, continuous orbit + depth pulse, opposite phase */}
        <motion.div
          className="absolute right-[5%] top-[30%] h-[550px] w-[550px] rounded-full blur-[120px]"
          style={{ translateZ: -40 }}
          animate={{
            x: [0, -70, 50, 0],
            y: [0, 60, -30, 0],
            translateZ: [-40, -120, -40],
            backgroundColor: ["#c084fc33", "#f472b633", "#c084fc33"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Blob 3 - cyan, continuous orbit + depth pulse */}
        <motion.div
          className="absolute -left-10 bottom-[5%] h-[450px] w-[450px] rounded-full blur-[110px]"
          style={{ translateZ: 100 }}
          animate={{
            x: [0, 50, -60, 0],
            y: [0, -60, 40, 0],
            translateZ: [100, 30, 100],
            backgroundColor: ["#67e8f933", "#60a5fa33", "#67e8f933"],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-blue-400/25 dark:bg-blue-300/30"
            style={{ width: p.size, height: p.size, top: `${p.top}%`, left: `${p.left}%` }}
            animate={{ y: [0, -40, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.div>

      {/* Faint grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
    </div>
  );
};

export default AnimatedBackground;