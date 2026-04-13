import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Music, Volume2, VolumeX } from "lucide-react";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3");
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked. User interaction required.");
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="w-14 h-14 rounded-full glass flex items-center justify-center text-brand-rose shadow-xl border-2 border-brand-pink/50 relative overflow-hidden group"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
            >
              <Volume2 size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
            >
              <VolumeX size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Animated Rings */}
        {isPlaying && (
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 border-2 border-brand-rose rounded-full"
          />
        )}
      </motion.button>
    </div>
  );
}
