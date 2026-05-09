import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, LayoutGroup } from 'framer-motion';
import { FaBars, FaTimes, FaShoppingBag } from 'react-icons/fa';
import { GiClayBrick } from 'react-icons/gi';

// ===================== CLAY PARTICLE COMPONENT =====================
interface ClayParticleProps {
  delay?: number;
  size?: string;
  top: string;
  left: string;
}

const ClayParticle = ({ delay = 0, size = "w-2 h-2", top, left }: ClayParticleProps) => (
  <motion.div
    className={`absolute ${size} bg-pottery-clay/30 rounded-full blur-[1px] pointer-events-none`}
    style={{ top, left }}
    animate={{
      y: [0, -15, 0],
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

// ===================== NAVBAR COMPONENT =====================
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  // Scroll-based transformations
  const bgOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.95]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Collection', href: '#products' },
    { name: 'Offers', href: '#offers' },
  ];

  return (
    <LayoutGroup>
      <motion.nav
        style={{ backgroundColor: `rgba(253, 248, 243, ${bgOpacity})` }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-pottery-clay/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Decorative clay particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ClayParticle top="20%" left="10%" delay={0} />
          <ClayParticle top="60%" left="95%" delay={1} size="w-1.5 h-1.5" />
          <ClayParticle top="40%" left="5%" delay={2} size="w-1 h-1" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-16">
            
            {/* ========== LOGO ========== */}
            <motion.a
              href="#home"
              style={{ scale: logoScale }}
              className="flex items-center gap-2 font-serif text-2xl font-bold text-pottery-dark tracking-wide"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
                className="text-2xl"
                aria-hidden="true"
              >
                🏺
              </motion.div>
              <span className="relative">
                Mitti
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-pottery-clay origin-left" 
                  initial={{ scaleX: 0 }} 
                  whileHover={{ scaleX: 1 }} 
                  transition={{ duration: 0.3 }} 
                />
              </span>
              <span className="text-pottery-clay relative">
                Craft
                <motion.div 
                  className="absolute -top-1 -right-3 text-pottery-accent" 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden="true"
                >
                  <GiClayBrick size={14} />
                </motion.div>
              </span>
            </motion.a>

            {/* ========== DESKTOP NAV ========== */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.a 
                  key={link.name} 
                  href={link.href} 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.2 + index * 0.1, 
                    type: "spring", 
                    stiffness: 300,
                    damping: 20 
                  }}
                  className="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-pottery-clay transition-colors group"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {link.name}
                  <motion.span 
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-pottery-clay rounded-full group-hover:w-full group-hover:left-0 transition-all duration-300"
                  />
                </motion.a>
              ))}
              
              {/* Amazon CTA Button */}
              <motion.a
                href="https://www.amazon.in"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(194, 123, 92, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 flex items-center gap-2 bg-gradient-to-r from-pottery-dark to-pottery-clay text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all"
              >
                <motion.span 
                  animate={{ rotate: [0, 5, -5, 0] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden="true"
                >
                  <FaShoppingBag size={16} />
                </motion.span>
                Amazon Store
                <motion.span 
                  className="text-pottery-accent" 
                  animate={{ x: [0, 3, 0] }} 
                  transition={{ duration: 1.5, repeat: Infinity }}
                  aria-hidden="true"
                >
                  →
                </motion.span>
              </motion.a>
            </div>

            {/* ========== MOBILE TOGGLE BUTTON ========== */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 text-pottery-dark hover:bg-pottery-clay/10 rounded-xl transition-all relative z-10 focus:outline-none focus:ring-2 focus:ring-pottery-clay"
              whileTap={{ scale: 0.9 }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div 
                    key="close" 
                    initial={{ rotate: -90, opacity: 0 }} 
                    animate={{ rotate: 0, opacity: 1 }} 
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <FaTimes size={22} />
                  </motion.div>
                ) : (
                  <motion.div 
                    key="menu" 
                    initial={{ rotate: 90, opacity: 0 }} 
                    animate={{ rotate: 0, opacity: 1 }} 
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <FaBars size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* ========== MOBILE MENU - FIXED: No variants, using layout + inline animations ========== */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              // ✅ KEY FIX: Removed variants, using layout + direct animate props
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden bg-pottery-base/95 backdrop-blur-sm border-t border-pottery-clay/10 overflow-hidden"
            >
              <motion.div 
                className="px-4 py-5 space-y-2"
                initial="hidden"
                animate="visible"
              >
                {navLinks.map((link, idx) => (
                  <motion.a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    // ✅ Stagger animation using inline props
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, type: "spring", stiffness: 300 }}
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-pottery-clay hover:bg-pottery-clay/5 rounded-xl transition-all"
                  >
                    {link.name}
                  </motion.a>
                ))}
                
                <motion.a 
                  href="https://www.amazon.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, type: "spring", stiffness: 300 }}
                  whileTap={{ scale: 0.98 }} 
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-pottery-dark to-pottery-clay text-white px-5 py-3.5 rounded-xl font-medium mt-4 shadow-lg"
                >
                  <FaShoppingBag size={18} /> 
                  Shop on Amazon
                </motion.a>
              </motion.div>
              <div className="h-2 bg-gradient-to-r from-transparent via-pottery-clay/20 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </LayoutGroup>
  );
}