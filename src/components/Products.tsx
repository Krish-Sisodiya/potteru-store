/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion, useMotionValue, useAnimation, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { 
  FaShoppingCart, FaTag, FaStar, FaFire, FaTruck, 
  FaArrowRight, FaChevronLeft, FaChevronRight, FaHeart 
} from 'react-icons/fa';
import { PRODUCTS, type Product } from '../data/products';

// ===================== CONSTANTS =====================
const TOP_PRODUCTS = PRODUCTS.slice(0, 3);
const SCROLL_PRODUCTS = PRODUCTS.slice(3);
const FEATURED_PRODUCT = PRODUCTS[0];

// ===================== MAIN COMPONENT =====================
export default function Products() {
  return (
    <section id="products" className="py-16 md:py-24 bg-pottery-base overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========== Section Header ========== */}
        <SectionHeader />

        {/* ========== TOP: Carousel (Mobile) / Grid (Desktop) ========== */}
        <FeaturedPicksSection />

        {/* ========== FEATURED AD SECTION ========== */}
        <FeaturedAdSection product={FEATURED_PRODUCT} />

        {/* ========== INFINITE SCROLL ROW ========== */}
        <MoreProductsSection />

      </div>
    </section>
  );
}

// ===================== SECTION HEADER =====================
function SectionHeader() {
  return (
    <motion.div 
      className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.span 
        className="inline-block px-4 py-1.5 bg-pottery-clay/10 text-pottery-clay rounded-full text-xs font-semibold tracking-wide mb-4 border border-pottery-clay/20 backdrop-blur-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
      >
        ✨ Handcrafted with Love
      </motion.span>
      
      <motion.h2 
        className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-pottery-dark mb-4 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Explore Our Pottery Collection
      </motion.h2>
      
      <motion.p 
        className="text-gray-600 text-sm md:text-base max-w-lg mx-auto px-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        {PRODUCTS.length}+ unique handmade pieces, delivered via Amazon
      </motion.p>
    </motion.div>
  );
}

// ===================== FEATURED PICKS SECTION =====================
function FeaturedPicksSection() {
  return (
    <motion.div 
      className="mb-12 md:mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-5 px-1">
        <h3 className="font-serif text-xl font-semibold text-pottery-dark flex items-center gap-2">
          <span className="w-2 h-2 bg-pottery-clay rounded-full animate-pulse" />
          Featured Picks
        </h3>
      </div>
      
      {/* Mobile Carousel */}
      <div className="md:hidden">
        <TopCarousel products={TOP_PRODUCTS} />
      </div>
      
      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-6">
        {TOP_PRODUCTS.map((product, idx) => (
          <motion.div
            key={`top-${product.id}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              delay: 0.4 + idx * 0.1, 
              type: "spring", 
              stiffness: 120,
              damping: 15 
            }}
          >
            <ProductCard product={product} variant="large" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ===================== MOBILE CAROUSEL (Top 3) - FIXED =====================
function TopCarousel({ products }: { products: Product[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = products.length;
  const touchStartX = useRef<number>(0);

  const next = useCallback(() => {
    setCurrentIndex((prev: number) => {
      const nextIndex = (prev + 1) % total;
      return nextIndex;
    });
  }, [total]);

  const prev = useCallback(() => {
    setCurrentIndex((prev: number) => {
      const prevIndex = (prev - 1 + total) % total;
      return prevIndex;
    });
  }, [total]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff: number = touchStartX.current - touchEndX;
    
    // ✅ FIXED: Explicit return type for ternary
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prev, next]);

  return (
    <div className="relative px-2" role="region" aria-label="Featured products carousel">
      <div 
        className="overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 35, mass: 0.8 }}
          className="flex"
        >
          {products.map((product) => (
            <div key={product.id} className="w-full flex-shrink-0 px-1">
              <ProductCard product={product} variant="large" mobile />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={prev} 
        aria-label="Previous product"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-pottery-dark hover:bg-pottery-clay hover:text-white transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-pottery-clay focus:ring-offset-2"
      >
        <FaChevronLeft size={18} />
      </button>
      <button 
        onClick={next} 
        aria-label="Next product"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-pottery-dark hover:bg-pottery-clay hover:text-white transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-pottery-clay focus:ring-offset-2"
      >
        <FaChevronRight size={18} />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Carousel navigation">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            role="tab"
            aria-selected={idx === currentIndex}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pottery-clay ${
              idx === currentIndex 
                ? 'bg-pottery-clay w-6' 
                : 'bg-gray-300 w-2 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ===================== PRODUCT CARD (Memoized) =====================
interface ProductCardProps {
  product: Product;
  variant?: 'small' | 'large' | 'scroll';
  mobile?: boolean;
}

const ProductCard = memo(function ProductCard({ 
  product, 
  variant = 'small', 
  mobile = false 
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const paddingClass = mobile || variant === 'large' ? 'p-5' : 'p-4';
  const titleSize = variant === 'large' ? 'text-lg' : 'text-base';

  return (
    <a 
      href={product.amazonLink} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block bg-white rounded-2xl overflow-hidden border border-pottery-clay/10 shadow-lg hover:shadow-2xl transition-all duration-500 group h-full focus:outline-none focus:ring-2 focus:ring-pottery-clay"
      aria-label={`View ${product.title} on Amazon`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        <img 
          src={product.image} 
          alt={product.title} 
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            imageLoaded ? 'group-hover:scale-110' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Badge */}
        {product.badge && (
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-3 left-3 bg-gradient-to-r from-pottery-dark to-pottery-clay text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap z-10"
          >
            {product.badge}
          </motion.span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform z-10 focus:outline-none focus:ring-2 focus:ring-pottery-clay"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FaHeart 
            size={14} 
            className={`transition-colors ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} 
          />
        </button>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className={paddingClass}>
        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
          {product.category}
        </span>
        
        <h4 className={`font-serif font-semibold text-pottery-dark mt-1.5 mb-2 line-clamp-1 ${titleSize}`}>
          {product.title}
        </h4>
        
        <p className="text-gray-500 line-clamp-2 mb-3 text-xs md:text-sm leading-relaxed">
          {product.description}
        </p>
        
        {/* Price & Button */}
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-pottery-clay text-lg md:text-xl">
            {product.price}
          </span>
          
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 12px 35px rgba(194, 123, 92, 0.35)" 
            }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-2 bg-gradient-to-r from-pottery-dark to-pottery-clay text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pottery-clay ${
              mobile ? 'px-4 py-2.5 text-xs' : 'px-4 py-2.5 md:px-5 md:py-3 text-xs md:text-sm'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <FaShoppingCart size={14} />
            Buy Now
          </motion.button>
        </div>
      </div>
    </a>
  );
});

// ===================== ✅ INFINITE PRODUCT ROW - COMPLETELY REWRITTEN =====================
function InfiniteProductRow({ products }: { products: Product[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  
  // ✅ FIXED: Use number type explicitly for motion values
  const x = useMotionValue<number>(0);
  const controls = useAnimation();
  
  // Smooth spring physics for drag
  const springX = useSpring(x, { stiffness: 180, damping: 25, mass: 0.12 });

  // Calculate dimensions on mount + resize
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      
      const firstItem = containerRef.current.firstElementChild as HTMLElement;
      if (!firstItem) return;
      
      // Get computed gap from container
      const computedStyle = window.getComputedStyle(containerRef.current);
      const gap = parseFloat(computedStyle.gap) || 16;
      
      setItemWidth(firstItem.offsetWidth + gap);
      setContainerWidth(containerRef.current.offsetWidth);
    };

    // Initial calc + font load
    updateDimensions();
    document.fonts?.ready?.then(updateDimensions);
    
    // Resize listener with debounce
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateDimensions, 150);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Create looped array for seamless infinite scroll (3 copies)
  const looped = [...products, ...products, ...products];
  const singleSetCount = products.length;
  
  // ✅ FIXED: Safe calculation with fallback
  const singleSetWidth = itemWidth > 0 ? itemWidth * singleSetCount : 0;

  // ✅ FIXED: Drag end handler with proper types + seamless loop logic
  const handleDragEnd = useCallback(() => {
    if (singleSetWidth <= 0) return;
    
    // ✅ FIXED: Explicit number type for motion value
    const currentX: number = x.get();
    
    // Find which "virtual set" we're currently in (0, 1, or 2)
    const normalizedPosition = ((-currentX % singleSetWidth) + singleSetWidth) % singleSetWidth;
    const setCurrent = Math.floor(-currentX / singleSetWidth);
    
    // If we're near the edge of the middle set, seamlessly jump
    const threshold = singleSetWidth * 0.25;
    
    if (normalizedPosition < threshold && setCurrent > 0) {
      // Jump left: from set 2 → set 1, or set 1 → set 0
      controls.start({
        x: -(setCurrent - 1) * singleSetWidth - normalizedPosition,
        transition: { duration: 0 } // Instant jump, no animation
      });
    } else if (normalizedPosition > singleSetWidth - threshold && setCurrent < 2) {
      // Jump right: from set 0 → set 1, or set 1 → set 2
      controls.start({
        x: -(setCurrent + 1) * singleSetWidth - normalizedPosition,
        transition: { duration: 0 }
      });
    }
  }, [x, controls, singleSetWidth]);

  // Drag hint animation based on scroll position
  const hintOpacity = useTransform(springX, (val: number) => {
    if (singleSetWidth <= 0) return 0.7;
    const progress = Math.abs(val) / singleSetWidth;
    return 0.7 + Math.sin(progress * Math.PI * 6) * 0.15;
  });

  return (
    <div className="relative" role="region" aria-label="Browse more products">
      {/* Gradient Edge Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-pottery-base to-transparent z-10 pointer-events-none" aria-hidden="true" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-pottery-base to-transparent z-10 pointer-events-none" aria-hidden="true" />
      
      {/* Draggable Track */}
      <motion.div
        ref={containerRef}
        style={{ x: springX }}
        drag="x"
        dragElastic={0.1}
        dragMomentum={true}
        onDragEnd={handleDragEnd}
        className="flex gap-4 py-3 cursor-grab active:cursor-grabbing select-none will-change-transform"
        aria-roledescription="carousel"
      >
        {looped.map((product, idx) => (
          <motion.div
            key={`${product.id}-${idx}`}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            // ✅ Responsive widths: 1 mobile, 2 tablet, 4 desktop
            className="flex-shrink-0 w-[85vw] max-w-[280px] sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]"
          >
            <ProductCard product={product} variant="scroll" />
          </motion.div>
        ))}
      </motion.div>

      {/* Subtle Drag Hint (Desktop Only) */}
      <motion.div 
        className="hidden md:flex absolute right-28 top-1/2 -translate-y-1/2 items-center gap-2 text-gray-400 text-xs pointer-events-none"
        style={{ opacity: hintOpacity }}
        aria-hidden="true"
      >
        <span className="opacity-70">Drag</span>
        <motion.span 
          animate={{ x: [0, 8, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-pottery-clay"
        >
          ↔
        </motion.span>
      </motion.div>

      {/* Progress Dots Indicator (Desktop) */}
      <div className="hidden md:flex justify-center mt-4 gap-1.5" role="tablist" aria-label="Scroll progress">
        {[0, 1, 2].map((setIndex) => {
          const isActive = singleSetWidth > 0 && Math.floor((-x.get() / singleSetWidth) % 3 + 3) % 3 === setIndex;
          return (
            <motion.button
              key={setIndex}
              onClick={() => {
                if (singleSetWidth > 0) {
                  controls.start({ x: -setIndex * singleSetWidth, transition: { type: "spring", stiffness: 200 } });
                }
              }}
              className={`h-1.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-pottery-clay ${
                isActive ? 'bg-pottery-clay w-5' : 'bg-gray-300 w-1.5 hover:bg-gray-400'
              }`}
              aria-label={`Go to section ${setIndex + 1}`}
              aria-selected={isActive}
              role="tab"
            />
          );
        })}
      </div>
    </div>
  );
}

// ===================== MORE PRODUCTS SECTION =====================
function MoreProductsSection() {
  return (
    <motion.div 
      className="mt-12 md:mt-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-5 px-1">
        <h3 className="font-serif text-xl font-semibold text-pottery-dark flex items-center gap-2">
          <span className="w-2 h-2 bg-pottery-accent rounded-full animate-pulse" />
          More Handmade Gems
        </h3>
        <span className="text-xs text-gray-400 hidden md:block">↔ Swipe to explore</span>
      </div>
      
      <InfiniteProductRow products={SCROLL_PRODUCTS} />
    </motion.div>
  );
}

// ===================== FEATURED AD SECTION (Enhanced) =====================
function FeaturedAdSection({ product }: { product: Product }) {
  // ✅ FIXED: Safe price parsing with fallback
  const parsePrice = (priceStr: string): number => {
    const numeric = priceStr.replace(/[^0-9]/g, '');
    return numeric ? parseInt(numeric, 10) : 0;
  };
  
  const originalPrice = parsePrice(product.price);
  const discountedPrice = Math.round(originalPrice * 0.7);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, type: "spring", damping: 20 }}
      className="my-8 md:my-12 relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-pottery-dark via-pottery-clay to-pottery-accent text-white shadow-2xl"
    >
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Floating Pot Icon */}
      <motion.div 
        className="absolute top-4 right-4 text-3xl opacity-20 hidden md:block" 
        animate={{ 
          rotate: [0, 8, -8, 0], 
          y: [0, -12, 0],
          scale: [1, 1.05, 1]
        }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        🏺
      </motion.div>

      <div className="relative p-5 md:p-8 lg:p-10">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          
          {/* Product Image */}
          <motion.div 
            className="relative aspect-square md:aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden shadow-xl border-2 md:border-4 border-white/20"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover" 
              loading="eager" 
              width={800}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Hot Badge */}
            <motion.div 
              className="absolute top-3 left-3 bg-white text-pottery-dark px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] md:text-xs font-bold shadow-lg"
              animate={{ scale: [1, 1.08, 1] }} 
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <FaFire className="text-orange-500" size={12} aria-hidden="true" /> 
              <span className="hidden sm:inline">HOT DEAL</span>
              <span className="sm:hidden">🔥</span>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="text-center md:text-left">
            <span className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] md:text-xs font-semibold mb-4 border border-white/30">
              ⭐ Featured Product
            </span>
            
            <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold mb-3 leading-tight">
              {product.title}
            </h3>
            
            <p className="text-white/90 text-sm mb-5 leading-relaxed px-1 md:px-0">
              {product.description}
            </p>

            {/* Price Block */}
            <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
              <div className="text-left">
                <span className="text-3xl md:text-4xl font-bold text-white">
                  ₹{discountedPrice.toLocaleString('en-IN')}
                </span>
                {originalPrice > 0 && (
                  <span className="block text-[10px] md:text-xs text-white/70 line-through mt-1">
                    ₹{originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <span className="bg-red-500 text-white px-4 py-2 rounded-full text-[10px] md:text-xs font-bold animate-pulse shadow-lg">
                SAVE 30%
              </span>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6 text-[10px] md:text-xs">
              {[
                { icon: FaTruck, text: "Free Delivery", color: "text-white/90" },
                { icon: FaStar, text: "4.8★ Rating", color: "text-yellow-300" },
                { icon: FaTag, text: "Easy Returns", color: "text-white/90" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <item.icon className={item.color} size={14} aria-hidden="true" />
                  <span className="text-white/95 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a 
              href={product.amazonLink} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.04, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)" 
              }} 
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2.5 bg-white text-pottery-dark px-7 py-4 md:px-9 md:py-4.5 rounded-xl font-bold text-sm md:text-base hover:bg-pottery-base transition-all shadow-xl w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pottery-clay"
            >
              <FaTag className="text-pottery-clay" size={16} aria-hidden="true" />
              Grab Offer on Amazon
              <motion.span 
                animate={{ x: [0, 5, 0] }} 
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                <FaArrowRight size={16} />
              </motion.span>
            </motion.a>

            {/* Urgency Text */}
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.6 }}
              className="mt-5 text-[10px] md:text-xs text-white/85 flex items-center justify-center md:justify-start gap-2"
            >
              <motion.span 
                animate={{ scale: [1, 1.3, 1] }} 
                transition={{ duration: 1.2, repeat: Infinity }} 
                className="text-red-300"
                aria-hidden="true"
              >
                ⏰
              </motion.span>
              <span>Limited stock! Offer ends soon</span>
            </motion.p>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-pottery-base to-transparent pointer-events-none" aria-hidden="true" />
    </motion.div>
  );
}