import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";

export default function BirthdayCake() {
  const [litCandles, setLitCandles] = useState<number[]>([]);
  const [isBlown, setIsBlown] = useState(false);

  const handleCandleClick = (index: number) => {
    if (isBlown) return;
    if (!litCandles.includes(index)) {
      setLitCandles([...litCandles, index]);
    }
  };

  const handleLightAll = () => {
    if (isBlown) return;
    setLitCandles([0, 1, 2, 3, 4]);
  };

  const handleBlow = () => {
    if (litCandles.length === 5 && !isBlown) {
      setIsBlown(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ffafcc", "#ffd6e8", "#d4af37"]
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-12 py-20">
      <div className="relative">
        {/* Cake Base */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="relative w-64 h-40 bg-brand-pink rounded-t-[40px] rounded-b-xl shadow-2xl border-b-8 border-brand-rose"
        >
          {/* Frosting Drips */}
          <div className="absolute top-0 left-0 right-0 flex justify-around">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-8 h-12 bg-white/80 rounded-full -mt-4 blur-[2px]" />
            ))}
          </div>
          
          {/* Decorations */}
          <div className="absolute inset-0 flex items-center justify-center gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-brand-rose rounded-full" />
            ))}
          </div>
        </motion.div>

        {/* Candles */}
        <div className="absolute -top-16 left-0 right-0 flex justify-center gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="relative cursor-pointer" onClick={() => handleCandleClick(i)}>
              <div className="w-3 h-16 bg-brand-gold rounded-full shadow-md" />
              <AnimatePresence>
                {litCandles.includes(i) && !isBlown && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1], y: [0, -5, 0] }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-8 bg-orange-400 rounded-full blur-[2px] shadow-[0_0_15px_orange]"
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center space-y-6">
        <h3 className="font-serif text-3xl text-[#c9184a] italic font-medium">
          {litCandles.length < 5 ? "Time to Celebrate!" : isBlown ? "Make a wish! ✨" : "Now, blow them out!"}
        </h3>
        
        <div className="flex gap-4 justify-center">
          {litCandles.length < 5 && !isBlown && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLightAll}
              className="px-8 py-3 rounded-full bg-brand-rose text-white font-bold tracking-widest uppercase shadow-lg hover:bg-brand-rose/90 transition-colors"
            >
              Light the candles 🕯️
            </motion.button>
          )}

          {litCandles.length === 5 && !isBlown && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleBlow}
              className="px-8 py-3 rounded-full bg-brand-rose text-white font-bold tracking-widest uppercase shadow-lg hover:bg-brand-rose/90 transition-colors"
            >
              Blow! 🌬️
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
