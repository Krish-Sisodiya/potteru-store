import { FaInstagram, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-pottery-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl font-bold mb-3">Mitti<span className="text-pottery-accent">Craft</span></h3>
            <p className="text-gray-400 max-w-sm">Handmade ceramic bowls & cups crafted with tradition, care, and natural materials. Bringing artisan pottery to your doorstep.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-pottery-accent">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-white transition">Home</a></li>
              <li><a href="#about" className="hover:text-white transition">About Us</a></li>
              <li><a href="#products" className="hover:text-white transition">Collection</a></li>
              <li><a href="#offers" className="hover:text-white transition">Offers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-pottery-accent">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2"><FaEnvelope size={16} /> hello@mitticraft.in</li>
              <li className="flex items-center gap-2"><FaPhoneAlt size={16} /> +91 98765 43210</li>
              <li className="flex gap-4 mt-4">
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-pottery-clay transition"><FaInstagram size={18} /></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} MittiCraft. All rights reserved.</p>
          <p className="text-center md:text-right">As an Amazon Associate, we earn from qualifying purchases. Prices & availability may vary.</p>
        </div>
      </div>
    </footer>
  );
}