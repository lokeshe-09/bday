import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";

const surprises = [
  "You're awesome! 🌟",
  "Sending a virtual hug... 🤗",
  "You make life brighter! ✨",
  "Best sister ever! 👩‍❤️‍👩",
  "Keep shining, Rasagna! 💎",
  "A little sparkle for you! 💖",
  "You're a legend! 🏆",
  "Stay magical! 🦄"
];

export default function SurpriseGenerator() {
  const [currentSurprise, setCurrentSurprise] = useState<string | null>(null);

  const triggerSurprise = () => {
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
    setCurrentSurprise(randomSurprise);
    
    // Mini confetti burst
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0080', '#7928ca', '#0070f3']
    });

    setTimeout(() => setCurrentSurprise(null), 3000);
  };

  return (
    <div className="relative flex flex-col items-center gap-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={triggerSurprise}
        className="px-8 py-4 rounded-full glass font-display font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-colors flex items-center gap-3"
      >
        Tap Something Fun 🎲
      </motion.button>

      <AnimatePresence>
        {currentSurprise && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="absolute -top-20 glass px-6 py-3 rounded-2xl whitespace-nowrap font-serif text-xl italic text-brand-pink text-glow"
          >
            {currentSurprise}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
