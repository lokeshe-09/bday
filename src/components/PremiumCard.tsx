import { motion } from "motion/react";

interface CardProps {
  title: string;
  message: string;
  style: "minimal" | "glittery" | "gold" | "pastel";
}

export default function PremiumCard({ title, message, style }: CardProps) {
  const styles = {
    minimal: "bg-white/60 border-brand-pink/30",
    glittery: "bg-gradient-to-br from-brand-pink/80 to-brand-rose/80 border-white/40 shadow-[0_0_20px_rgba(255,175,204,0.4)]",
    gold: "bg-white/80 border-brand-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.2)]",
    pastel: "bg-gradient-to-br from-brand-lavender/60 to-brand-peach/60 border-white/30"
  };

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="perspective-1000 w-full max-w-sm h-96 group cursor-pointer"
    >
      <motion.div
        className={`relative w-full h-full preserve-3d transition-transform duration-700 group-hover:rotate-y-180`}
      >
        {/* Front */}
        <div className={`absolute inset-0 backface-hidden glass rounded-[2rem] flex flex-col items-center justify-center p-8 text-center border-2 ${styles[style]}`}>
          <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center mb-6 shadow-inner">
            {style === 'minimal' && "🌸"}
            {style === 'glittery' && "✨"}
            {style === 'gold' && "👑"}
            {style === 'pastel' && "☁️"}
          </div>
          <h3 className="font-serif text-2xl font-bold text-brand-rose mb-2">{title}</h3>
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-brand-rose/40">Open Card</p>
          
          {style === 'gold' && (
            <div className="absolute inset-4 border border-brand-gold/20 rounded-[1.5rem] pointer-events-none" />
          )}
        </div>

        {/* Back */}
        <div className={`absolute inset-0 backface-hidden rotate-y-180 glass rounded-[2rem] flex flex-col items-center justify-center p-10 text-center border-2 ${styles[style]}`}>
          <p className="font-serif text-xl leading-relaxed text-[#1a1a1a] italic font-medium">
            "{message}"
          </p>
          <div className="mt-8 h-[1px] w-12 bg-brand-rose/50" />
        </div>
      </motion.div>
    </motion.div>
  );
}
