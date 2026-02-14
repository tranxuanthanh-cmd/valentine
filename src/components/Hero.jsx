import { motion } from 'framer-motion';
import { CONFIG } from '../data/config';
import { Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section className="text-center py-12 px-4 relative overflow-hidden">
      <motion.div 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="inline-block mb-4"
      >
        <Heart className="w-16 h-16 text-red-500 fill-red-500 mx-auto animate-pulse" />
      </motion.div>
      <h1 className="text-4xl md:text-5xl font-bold text-[#ff4d6d] mb-2">
        Happy Valentine
      </h1>
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
        {CONFIG.coupleName}
      </h2>
      <p className="text-gray-600 italic max-w-lg mx-auto bg-white/50 p-4 rounded-xl shadow-sm border border-pink-100">
        "{CONFIG.heroMessage}"
      </p>
    </section>
  );
}