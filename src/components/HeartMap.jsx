import { useState } from 'react';
import { HEART_MAP } from '../data/heartMap';
import { Heart, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeartMap() {
  const [unlocked, setUnlocked] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => {
    setSelected(item);
    if (!unlocked.includes(item.id)) {
      setUnlocked([...unlocked, item.id]);
    }
  };

  const isCompleted = unlocked.length === HEART_MAP.length;

  return (
    <section className="my-12 px-4">
      <h3 className="text-2xl font-bold text-center text-pink-600 mb-2">Bản Đồ Trái Tim</h3>
      <p className="text-center text-sm text-gray-500 mb-8">Khám phá từng góc nhỏ của chúng mình ({unlocked.length}/{HEART_MAP.length})</p>

      {/* Grid Layout giả lập hình trái tim (đơn giản hoá cho responsive) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {HEART_MAP.map((item) => {
          const isUnlocked = unlocked.includes(item.id);
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(item)}
              className={`
                aspect-square rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300
                ${isUnlocked 
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' 
                  : 'bg-white border-2 border-dashed border-pink-200 text-pink-300 hover:border-pink-400'}
              `}
            >
              <Heart className={isUnlocked ? 'fill-white' : ''} size={32} />
              <span className="mt-2 text-sm font-bold text-center">{item.title}</span>
            </motion.div>
          );
        })}
      </div>

      {isCompleted && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center bg-gradient-to-r from-pink-100 to-red-50 p-6 rounded-xl border border-pink-200"
        >
          <p className="text-lg font-bold text-pink-700 mb-2">💗 17 ngày chỉ là khởi đầu...</p>
          <p className="text-sm text-gray-600">Cảm ơn em đã khám phá hết những điều nhỏ bé này.</p>
        </motion.div>
      )}

      {/* Modal Detail */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full relative"
            onClick={e => e.stopPropagation()}
          >
             <h4 className="text-xl font-bold text-pink-600 mb-3 flex items-center gap-2">
               {selected.title} <CheckCircle size={16} className="text-green-500"/>
             </h4>
             <p className="text-gray-700 leading-relaxed mb-4">{selected.content}</p>
             <button className="btn-primary w-full text-sm" onClick={() => setSelected(null)}>Đóng lại</button>
          </motion.div>
        </div>
      )}
    </section>
  );
}