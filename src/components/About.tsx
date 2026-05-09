import { motion } from 'framer-motion';
import { Palette, Shield, Heart } from 'lucide-react';

export default function About() {
  const features = [
    { icon: Palette, title: "Handcrafted Artistry", desc: "Each piece is uniquely shaped by skilled artisans, ensuring no two items are exactly alike." },
    { icon: Shield, title: "Food-Safe & Durable", desc: "Fired at high temperatures with non-toxic glazes. Microwave & dishwasher safe." },
    { icon: Heart, title: "Ethically Made", desc: "Supporting local pottery communities. Sustainable materials & zero-waste packaging." }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-pottery-dark mb-4">The Story Behind Every Piece</h2>
          <p className="text-gray-600 text-lg">We believe everyday objects should tell a story. Our pottery is made with patience, tradition, and a deep respect for nature.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                        className="p-6 rounded-2xl bg-pottery-base border border-pottery-clay/10 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-pottery-clay/10 rounded-xl flex items-center justify-center text-pottery-clay mb-4"><item.icon size={24} /></div>
              <h3 className="font-serif text-xl font-semibold text-pottery-dark mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}