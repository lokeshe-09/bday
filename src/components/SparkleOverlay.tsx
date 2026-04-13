import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export default function SparkleOverlay({ celebrating = false }: { celebrating?: boolean }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const createSparkle = () => {
      const id = Date.now() + Math.random();
      const newSparkle: Sparkle = {
        id,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 2,
      };

      setSparkles((prev) => [...prev.slice(celebrating ? -50 : -20), newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
      }, 2000);
    };

    const interval = setInterval(createSparkle, celebrating ? 100 : 300);
    return () => clearInterval(interval);
  }, [celebrating]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1, 0],
              rotate: [0, 180]
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute text-brand-pink/40"
            style={{ 
              left: `${sparkle.x}%`, 
              top: `${sparkle.y}%`,
              width: sparkle.size,
              height: sparkle.size
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
