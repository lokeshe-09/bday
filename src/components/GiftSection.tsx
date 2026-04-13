import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { Gift } from "lucide-react";

interface GiftSectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  color: string;
}

export default function GiftSection({ title, icon, children, color }: GiftSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-6">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="group cursor-pointer flex flex-col items-center gap-8"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-48 h-48 ${color} rounded-3xl shadow-2xl flex items-center justify-center border-4 border-white/50 relative overflow-hidden`}
            >
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-white/30" />
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-10 bg-white/30" />
              <span className="text-6xl relative z-10">{icon}</span>
              
              {/* Sparkles */}
              <motion.div
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-4 right-4 text-white"
              >
                ✨
              </motion.div>
            </motion.div>
            
            <div className="text-center space-y-2">
              <h2 className="font-serif text-3xl text-brand-rose font-bold">{title}</h2>
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-brand-rose/40 group-hover:text-brand-rose/60 transition-colors">Click to open gift</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-6xl"
          >
            <div className="flex justify-center mb-12">
              <button 
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold tracking-[0.3em] uppercase text-[#c9184a] hover:text-[#ff4d6d] transition-colors"
              >
                ← Close Gift
              </button>
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
