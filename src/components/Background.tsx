import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

export default function Background() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-brand-peach via-brand-pink to-white">
      {/* Soft Clouds */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0.3
          }}
          animate={{
            x: ["-10%", "110%"],
          }}
          transition={{
            duration: 40 + Math.random() * 40,
            repeat: Infinity,
            ease: "linear",
            delay: -Math.random() * 40
          }}
          className="absolute w-[400px] h-[200px] bg-white blur-[100px] rounded-full"
        />
      ))}

      {/* Primary Atmospheric Glows */}
      <motion.div
        style={{ x: springX, y: springY }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[20%] -left-[10%] h-[70%] w-[70%] rounded-full bg-brand-rose/20 blur-[120px]"
      />
      
      {/* Floating Particles (Glitter) */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: ["-10%", "110%"],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
            className="absolute h-1 w-1 rounded-full bg-white shadow-[0_0_10px_white] blur-[0.5px]"
          />
        ))}
      </div>

      {/* Shimmering Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.5, 0.8],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
            className="absolute text-brand-gold/40 text-xs"
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
