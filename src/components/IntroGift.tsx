import { motion, AnimatePresence } from "motion/react";
import { Gift } from "lucide-react";
import { useState, useEffect } from "react";

export default function IntroGift({ onComplete }: { onComplete: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 1000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-brand-pink"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="text-center"
          >
            <motion.div
              animate={isOpen ? { scale: 1.5, rotate: 360, opacity: 0 } : { y: [0, -20, 0] }}
              transition={isOpen ? { duration: 1 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
              onClick={handleOpen}
              className="cursor-pointer relative"
            >
              <div className="w-40 h-40 bg-white rounded-3xl shadow-2xl flex items-center justify-center border-4 border-brand-rose relative overflow-hidden">
                {/* Ribbon */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-brand-rose" />
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-8 bg-brand-rose" />
                <Gift size={64} className="text-brand-rose relative z-10" />
                
                {/* Internal Sparkles */}
                <motion.div
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute top-2 left-2 text-brand-rose/40"
                >
                  ✨
                </motion.div>
                <motion.div
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-2 right-2 text-brand-rose/40"
                >
                  ✨
                </motion.div>
              </div>
              
              {/* Glow */}
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-white blur-3xl -z-10 rounded-full"
              />
            </motion.div>
            
            {!isOpen && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 font-serif text-3xl text-[#c9184a] italic tracking-widest drop-shadow-sm font-medium"
              >
                Tap to open your world... sister
              </motion.p>
            )}
          </motion.div>
          
          {isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 10, opacity: 1 }}
              transition={{ duration: 1.5, ease: "circIn" }}
              className="absolute inset-0 bg-white rounded-full z-50"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
