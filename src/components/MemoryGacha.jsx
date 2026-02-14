import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEMORIES } from '../data/memories';
import { CONFIG } from '../data/config';
import { Gift, Star, Image as ImageIcon, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MemoryGacha() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [reward, setReward] = useState(null);
  const [collection, setCollection] = useState([]);

  const spin = () => {
    setIsSpinning(true);
    // Giả lập quay số
    setTimeout(() => {
      const rand = Math.random();
      let rarity = 'common';
      if (rand > 1 - CONFIG.rarityRates.legendary) rarity = 'legendary';
      else if (rand > 1 - CONFIG.rarityRates.legendary - CONFIG.rarityRates.rare) rarity = 'rare';

      // Lọc memory theo độ hiếm
      const pool = MEMORIES.filter(m => m.rarity === rarity);
      const selected = pool.length > 0 
        ? pool[Math.floor(Math.random() * pool.length)] 
        : MEMORIES[Math.floor(Math.random() * MEMORIES.length)]; // Fallback

      setReward(selected);
      
      // Lưu vào collection nếu chưa có
      setCollection(prev => {
        if (!prev.find(i => i.id === selected.id)) return [...prev, selected];
        return prev;
      });

      setIsSpinning(false);
      
      if(rarity === 'legendary') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }, 1500); // 1.5s animation
  };

  const getRarityColor = (rarity) => {
    if (rarity === 'legendary') return 'border-yellow-400 bg-yellow-50 text-yellow-700 shadow-[0_0_15px_rgba(250,204,21,0.5)]';
    if (rarity === 'rare') return 'border-purple-400 bg-purple-50 text-purple-700';
    return 'border-gray-200 bg-white text-gray-700';
  };

  return (
    <section className="my-12 px-4 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-center text-pink-600 mb-6 flex items-center justify-center gap-2">
        <Gift /> Hộp Kỉ Niệm
      </h3>

      {/* Máy Gacha */}
      <div className="bg-pink-100 rounded-3xl p-8 text-center relative overflow-hidden border-4 border-pink-300 shadow-inner">
        <motion.div
          animate={isSpinning ? { y: [0, -10, 0], rotate: [0, -5, 5, 0] } : {}}
          transition={{ duration: 0.5, repeat: isSpinning ? Infinity : 0 }}
          className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-lg"
        >
          <Gift size={48} className="text-pink-400" />
        </motion.div>
        
        <button 
          onClick={spin} 
          disabled={isSpinning}
          className="btn-primary text-lg px-8 py-3 shadow-lg disabled:opacity-50"
        >
          {isSpinning ? 'Đang quay...' : 'Quay Kỉ Niệm ✨'}
        </button>

        {/* Collection Count */}
        <div className="mt-4 text-sm text-pink-800">
          Đã sưu tập: {collection.length} / {MEMORIES.length}
        </div>
      </div>

      {/* Modal Reward */}
      <AnimatePresence>
        {reward && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }}
              className={`relative w-full max-w-md rounded-2xl p-6 border-4 ${getRarityColor(reward.rarity)}`}
            >
              <button onClick={() => setReward(null)} className="absolute top-2 right-2 p-2 bg-black/10 rounded-full hover:bg-black/20">
                <X size={20}/>
              </button>
              
              <div className="text-center mb-4">
                <span className="uppercase text-xs font-bold tracking-widest px-2 py-1 rounded bg-black/10">
                  {reward.rarity}
                </span>
              </div>

              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4 relative group">
                <img 
                  src={reward.imageUrl} 
                  alt={reward.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {e.target.src = "https://via.placeholder.com/400x300?text=No+Image"}}
                />
              </div>

              <h4 className="text-xl font-bold mb-1">{reward.title}</h4>
              <p className="text-xs opacity-75 mb-3">{reward.dateLabel}</p>
              <p className="italic">{reward.description}</p>
              
              <div className="mt-6 flex gap-2">
                <button onClick={spin} className="flex-1 btn-primary py-2 text-sm">Quay tiếp</button>
                <button onClick={() => setReward(null)} className="flex-1 bg-gray-200 text-gray-700 font-bold py-2 rounded-2xl text-sm">Lưu lại</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Collection View */}
      {collection.length > 0 && (
        <div className="mt-8 flex gap-2 overflow-x-auto pb-4 px-2 snap-x">
          {collection.map(item => (
            <div key={item.id} onClick={() => setReward(item)} className="snap-start flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-pink-200 cursor-pointer relative">
               <img src={item.imageUrl} className="w-full h-full object-cover" />
               {item.rarity === 'legendary' && <Star size={12} className="absolute top-1 right-1 text-yellow-400 fill-yellow-400"/>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}