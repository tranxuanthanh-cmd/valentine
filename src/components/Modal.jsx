import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, className = "max-w-md" }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          // Thêm className vào đây để chỉnh độ rộng linh hoạt
          className={`bg-white w-full ${className} rounded-2xl p-6 relative shadow-2xl border-4 border-pink-100 max-h-[90vh] overflow-y-auto custom-scrollbar`}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 text-gray-400 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors z-10"
          >
            <X size={20} />
          </button>
          
          {title && (
            <h3 className="text-2xl font-bold text-center text-pink-600 mb-6 border-b border-pink-100 pb-2">
              {title}
            </h3>
          )}
          
          <div>
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}