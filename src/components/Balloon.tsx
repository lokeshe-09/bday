import { motion } from "motion/react";

export default function Balloon({ color, delay, x }: { color: string; delay: number; x: string }) {
  return (
    <motion.div
      initial={{ y: "110vh", opacity: 0 }}
      animate={{ 
        y: "-20vh", 
        opacity: [0, 1, 1, 0],
        x: ["0%", "5%", "-5%", "0%"]
      }}
      transition={{ 
        duration: 15, 
        delay, 
        repeat: Infinity, 
        ease: "linear",
        x: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }}
      className="fixed pointer-events-none z-[40]"
      style={{ left: x }}
    >
      <div className="relative">
        {/* Balloon Body */}
        <div 
          className="w-16 h-20 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-inner relative"
          style={{ backgroundColor: color }}
        >
          {/* Shine */}
          <div className="absolute top-3 left-4 w-4 h-6 bg-white/30 rounded-full blur-[1px]" />
        </div>
        {/* String */}
        <div className="w-[1px] h-24 bg-white/20 mx-auto" />
      </div>
    </motion.div>
  );
}
