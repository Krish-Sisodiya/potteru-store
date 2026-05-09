import { motion } from 'framer-motion';
import { FaLeaf, FaShoppingBag, FaArrowRight, FaStar, FaCheckCircle } from 'react-icons/fa';

// ===================== TYPE DEFINITIONS =====================
interface ClayParticleProps {
  delay?: number;
  size?: string;
  top: string;
  left: string;
  duration?: number;
}

interface FloatingEmojiProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// ===================== PRE-COMPUTE PARTICLE DATA (SSR-Safe) =====================
// Generate once at module level - no re-renders, no SSR mismatch
const generateParticleData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `particle-${i}`,
    top: `${Math.floor(Math.random() * 100)}%`,
    left: `${Math.floor(Math.random() * 100)}%`,
    delay: i * 0.4,
    size: i % 3 === 0 ? "w-3 h-3" : i % 3 === 1 ? "w-1.5 h-1.5" : "w-1 h-1",
    duration: 4 + Math.random() * 2,
  }));
};

const PARTICLE_DATA = generateParticleData(10);

// ===================== CLAY PARTICLE COMPONENT =====================
const ClayParticle: React.FC<ClayParticleProps> = ({ 
  delay = 0, 
  size = "w-2 h-2", 
  top, 
  left, 
  duration = 4 
}) => (
  <motion.div
    className={`absolute ${size} bg-pottery-clay/20 rounded-full blur-[2px]`}
    style={{ top, left }}
    animate={{
      y: [0, -20, 0],
      // eslint-disable-next-line react-hooks/purity
      x: [0, Math.random() * 10 - 5, 0], // OK here - animation values don't affect SSR
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.3, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut" as const,
    }}
    aria-hidden="true"
  />
);

// ===================== FLOATING EMOJI COMPONENT =====================
const FloatingEmoji: React.FC<FloatingEmojiProps> = ({ 
  children, 
  className, 
  delay = 0 
}) => (
  <motion.div
    className={className}
    animate={{
      y: [0, -12, 0],
      rotate: [0, 3, -3, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      delay,
      ease: "easeInOut" as const,
    }}
    aria-hidden="true"
  >
    {children}
  </motion.div>
);

// ===================== HERO COMPONENT =====================
export default function Hero() {
  // ✅ Type-safe variants with 'as const'
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  } as const;

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  } as const;

  const headline = "Crafted by Hands, Loved by Hearts".split(" ");

  return (
    <section 
      id="home" 
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-pottery-base overflow-hidden"
      aria-label="Hero section"
    >
      
      {/* ========== Background Clay Particles (Pre-computed) ========== */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {PARTICLE_DATA.map((particle) => (
          <ClayParticle
            key={particle.id}
            top={particle.top}
            left={particle.left}
            delay={particle.delay}
            size={particle.size}
            duration={particle.duration}
          />
        ))}
      </div>

      {/* ========== Decorative Floating Emojis ========== */}
      <FloatingEmoji className="absolute top-20 right-10 text-4xl opacity-60 hidden lg:block" delay={0.5}>
        🏺
      </FloatingEmoji>
      <FloatingEmoji className="absolute bottom-40 left-5 text-3xl opacity-40 hidden md:block" delay={1.2}>
        ✨
      </FloatingEmoji>
      <FloatingEmoji className="absolute top-1/3 right-5 text-2xl opacity-30 hidden xl:block" delay={2}>
        🌿
      </FloatingEmoji>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* ========== Left: Text Content ========== */}
          <motion.div className="text-center lg:text-left">
            
            {/* Badge */}
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-pottery-clay/10 text-pottery-clay rounded-full text-xs font-semibold tracking-wide mb-6 border border-pottery-clay/20"
            >
              <FaStar className="animate-pulse" aria-hidden="true" />
              100% Handcrafted with Love
            </motion.span>

            {/* Animated Headline */}
            <motion.h1 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-pottery-dark leading-tight mb-6"
            >
              {headline.map((word, idx) => (
                <motion.span 
                  key={`${word}-${idx}`} 
                  variants={wordVariants} 
                  className="inline-block mr-2"
                >
                  {word === "Loved" || word === "Hearts" ? (
                    <span className="text-pottery-clay">{word}</span>
                  ) : word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle - Responsive Text */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-gray-600 text-base md:text-lg lg:text-xl mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0"
            >
              Discover our collection of artisan ceramic bowls & cups. Every piece is{" "}
              <span className="text-pottery-dark font-medium">uniquely shaped</span>, food-safe, and designed to bring warmth to your everyday moments.
            </motion.p>

            {/* Decorative Line */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="w-24 h-1 bg-pottery-clay rounded-full mx-auto lg:mx-0 mb-8 origin-left"
            />

            {/* CTA Buttons - Responsive Layout */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {/* Primary Button */}
              <motion.a 
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 bg-pottery-dark text-white px-6 py-3.5 sm:px-7 sm:py-4 rounded-2xl font-medium hover:bg-pottery-clay transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-pottery-clay focus:ring-offset-2"
              >
                Explore Collection 
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </motion.a>

              {/* Secondary Button */}
              <motion.a 
                href="https://www.amazon.in" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 border-2 border-pottery-dark/20 text-pottery-dark px-6 py-3.5 sm:px-7 sm:py-4 rounded-2xl font-medium hover:border-pottery-clay hover:text-pottery-clay transition-all focus:outline-none focus:ring-2 focus:ring-pottery-clay focus:ring-offset-2"
              >
                <FaShoppingBag className="group-hover:rotate-6 transition-transform" aria-hidden="true" />
                <span className="whitespace-nowrap">Amazon Store</span>
              </motion.a>
            </motion.div>

            {/* Trust Badges - Responsive Wrap */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mt-8 text-xs sm:text-sm text-gray-500 px-2 sm:px-0"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-pottery-green/10 rounded-full flex items-center justify-center text-pottery-green flex-shrink-0">
                  <FaLeaf size={14} aria-hidden="true" />
                </div>
                <span className="whitespace-nowrap">Eco-Friendly</span>
              </div>
              <div className="w-1 h-1 bg-pottery-clay/30 rounded-full hidden sm:block" />
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-pottery-clay flex-shrink-0" size={16} aria-hidden="true" />
                <span className="whitespace-nowrap">Food-Safe</span>
              </div>
              <div className="w-1 h-1 bg-pottery-clay/30 rounded-full hidden sm:block" />
              <span className="whitespace-nowrap">🚚 Free Shipping</span>
            </motion.div>
          </motion.div>

          {/* ========== Right: Image Section ========== */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative order-first lg:order-last"
          >
            {/* Main Image Container - Responsive Aspect Ratio */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative aspect-[4/3] sm:aspect-[4/5] md:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white bg-gradient-to-br from-pottery-clay/10 to-pottery-accent/10"
            >
              <img 
                src="/public/assets/b5.jpeg" 
                alt="Handmade pottery bowl on wooden table" 
                className="w-full h-full object-cover" 
                loading="eager" 
                width={800}
                height={800}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-pottery-dark/10 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Floating Eco Badge - Responsive Positioning */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
              className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 md:-bottom-6 md:-left-6 bg-white/95 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl flex items-center gap-2 sm:gap-3 border border-pottery-clay/20 max-w-[180px] sm:max-w-xs"
            >
              <motion.div 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-pottery-green/20 rounded-full flex items-center justify-center text-pottery-green text-lg sm:text-2xl flex-shrink-0"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                aria-hidden="true"
              >
                🌿
              </motion.div>
              <div className="min-w-0">
                <p className="font-semibold text-xs sm:text-sm text-pottery-dark truncate">100% Natural Clay</p>
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">Lead-free, food-safe</p>
              </div>
            </motion.div>

            {/* Decorative Sparkle - Responsive */}
            <motion.div 
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 text-pottery-accent hidden md:block text-xl sm:text-2xl"
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              aria-hidden="true"
            >
              ✨
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade - Responsive Height */}
      <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-pottery-base to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
}