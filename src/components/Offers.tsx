import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';

export default function Offers() {
  return (
    <section id="offers" className="py-16 bg-gradient-to-br from-pottery-clay to-pottery-accent text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
                    className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <Tag size={16} /> Limited Time Offer
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Get 10% Off Your First Order</h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Use code <span className="bg-white text-pottery-clay px-3 py-1 rounded font-mono tracking-widest font-bold">POTTERY10</span> at checkout on Amazon. Valid for new customers only.
          </p>
          <a href="https://www.amazon.in" target="_blank" rel="noopener noreferrer"
             className="inline-block bg-white text-pottery-dark px-8 py-3 rounded-xl font-semibold hover:bg-pottery-base transition-colors shadow-lg">
            Claim Offer on Amazon →
          </a>
        </motion.div>
      </div>
    </section>
  );
}