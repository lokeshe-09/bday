import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "motion/react";
import confetti from "canvas-confetti";
import { Heart, Stars, Sparkles, Gift, ArrowDown, Quote, PartyPopper, Zap, Music } from "lucide-react";
import Background from "./components/Background";
import IntroGift from "./components/IntroGift";
import GiftSection from "./components/GiftSection";
import PremiumCard from "./components/PremiumCard";
import BirthdayCake from "./components/BirthdayCake";
import SurpriseGenerator from "./components/SurpriseGenerator";
import SparkleOverlay from "./components/SparkleOverlay";
import MusicToggle from "./components/MusicToggle";
import Balloon from "./components/Balloon";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (showIntro) {
    return <IntroGift onComplete={() => {
      setShowIntro(false);
      setIsCelebrating(true);
      setTimeout(() => setIsCelebrating(false), 5000);
      // Trigger explosive celebration
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
        colors: ["#ffafcc", "#ffd6e8", "#d4af37", "#ffffff"]
      });
    }} />;
  }

  return (
    <div className="relative min-h-screen font-sans selection:bg-brand-rose/30 cursor-default overflow-x-hidden bg-[#fff0f3]">
      <Background />
      <SparkleOverlay celebrating={isCelebrating} />
      <MusicToggle />

      {/* Floating Balloons */}
      <Balloon color="#ffafcc" delay={0} x="10%" />
      <Balloon color="#ffd6e8" delay={2} x="30%" />
      <Balloon color="#fbc4ab" delay={4} x="50%" />
      <Balloon color="#ffafcc" delay={1} x="70%" />
      <Balloon color="#ffd6e8" delay={3} x="90%" />
      
      {/* Global Shimmer Overlay */}
      <motion.div
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="fixed inset-0 pointer-events-none z-[55] bg-gradient-to-tr from-brand-pink/20 via-transparent to-brand-lavender/20 mix-blend-overlay"
      />

      {/* Mouse Follow Glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-rose/10 blur-[80px] hidden md:block"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 150, mass: 0.5 }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-rose via-brand-gold to-brand-blush z-[100] origin-left shadow-sm"
        style={{ scaleX }}
      />

      {/* Hero Section - Dreamy Intro */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="space-y-12"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass text-brand-rose text-xs font-bold tracking-[0.4em] uppercase"
          >
            <Sparkles size={14} /> Welcome to your world
          </motion.div>
          
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold leading-tight"
            >
              <span className="text-[#2d2d2d]">Happy Birthday</span> <br />
              <span className="text-gradient">Rasagna Sister</span>
            </motion.h1>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -right-12 text-6xl opacity-40"
            >
              🌸
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-8 -left-12 text-5xl opacity-30"
            >
              ✨
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-[#c9184a] font-serif text-2xl italic font-medium">Scroll down to open your gifts...</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="text-[#c9184a]" size={24} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Gift 1: Message Cards */}
      <GiftSection title="A Box of Thoughts" icon="💌" color="bg-brand-rose">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          <PremiumCard 
            title="The Soft Note" 
            message="Some bonds don’t need labels… ours just makes sense, sister 💫" 
            style="minimal" 
          />
          <PremiumCard 
            title="A Real Thought" 
            message="You’re that one sister I never have to explain myself to 💕" 
            style="glittery" 
          />
          <PremiumCard 
            title="The Golden Truth" 
            message="Not everyone gets a sister like you… I got lucky 👑" 
            style="gold" 
          />
        </div>
      </GiftSection>

      {/* Gift 2: Interactive Cake */}
      <GiftSection title="A Sweet Celebration" icon="🎂" color="bg-brand-blush">
        <div className="max-w-2xl mx-auto">
          <BirthdayCake />
        </div>
      </GiftSection>

      {/* Gift 3: Fun Interactions */}
      <GiftSection title="A Bag of Fun" icon="🎈" color="bg-brand-lavender">
        <div className="text-center space-y-12">
          <p className="font-serif text-2xl text-brand-rose italic max-w-xl mx-auto">
            "Life got better the day you became part of it. Here's a little magic for you..."
          </p>
          <SurpriseGenerator />
        </div>
      </GiftSection>

      {/* Gift 4: Emotional Ending */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-white/30">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-3xl space-y-12"
        >
          <div className="w-20 h-20 mx-auto rounded-full glass flex items-center justify-center text-brand-rose shadow-xl">
            <Heart size={40} fill="currentColor" />
          </div>
          
          <h2 className="font-serif text-4xl md:text-6xl text-[#2d2d2d] leading-tight">
            You just exist… <br />
            <span className="italic text-[#c9184a]">and somehow everything feels lighter.</span>
          </h2>
          
          <p className="text-[#c9184a] text-2xl font-medium leading-relaxed italic">
            "I'm just really glad you were born. The world is a lot better with you in it. ✨"
          </p>
          
          <div className="pt-20 space-y-4">
            <div className="h-16 w-[1px] bg-gradient-to-b from-brand-rose to-transparent mx-auto" />
            <p className="text-brand-rose/40 font-bold tracking-[0.6em] uppercase text-[10px]">
              Happy Birthday, Rasagna.
            </p>
          </div>
        </motion.div>
      </section>

      <footer className="py-12 text-center opacity-20 text-[10px] tracking-[0.5em] uppercase text-brand-rose font-bold">
        A premium digital gift ✨ 2026
      </footer>
    </div>
  );
}
