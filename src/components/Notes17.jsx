import { useState } from 'react';
import { NOTES_17 } from '../data/notes17';
import { CONFIG } from '../data/config';
import Modal from './Modal'; // Tận dụng lại component Modal xịn xò
import { Download, Heart, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Notes17() {
  // State lưu nội dung lời nhắn đang được chọn
  const [activeNote, setActiveNote] = useState(null);

  // Hàm tải toàn bộ lời nhắn về máy (Giữ lại tính năng này)
  const downloadNotes = () => {
    const content = `GỬI ${CONFIG.coupleName.toUpperCase()}\n\n` + 
      NOTES_17.map((note, i) => `Ngày ${i + 1}: ${note}`).join('\n') + 
      `\n\n--- Happy 17 Days Anniversary ---`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '17-loi-nhan-yeu-thuong.txt';
    a.click();
  };

  return (
    <section className="my-16 px-4 max-w-4xl mx-auto">
      {/* Header của phần Notes */}
      <div className="flex justify-between items-end mb-8 border-b-2 border-pink-100 pb-2">
         <div className="flex items-center gap-2 text-pink-600">
            <Mail className="w-6 h-6 animate-bounce" />
            <h3 className="text-2xl font-bold">17 Thông Điệp Bí Mật</h3>
         </div>
         <button 
            onClick={downloadNotes} 
            className="text-xs flex items-center gap-1 text-gray-400 hover:text-pink-500 transition-colors bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm"
         >
           <Download size={14} /> Lưu kỷ niệm
         </button>
      </div>
      
      {/* Lưới hiển thị 17 lá thư */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {NOTES_17.map((note, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveNote({ id: index + 1, content: note })}
            className="cursor-pointer group relative"
          >
            {/* Hình dáng phong bì thư */}
            <div className="bg-white border-2 border-pink-100 rounded-xl p-4 h-28 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:border-pink-300 transition-all">
               <span className="text-3xl mb-1 opacity-50 group-hover:scale-110 transition-transform">💌</span>
               <span className="text-pink-400 font-bold text-lg">#{index + 1}</span>
               
               {/* Icon trái tim nhỏ xíu ở góc */}
               <Heart size={12} className="absolute top-2 right-2 text-pink-200 fill-pink-100" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- POPUP HIỂN THỊ LỜI NHẮN --- */}
      <Modal 
        isOpen={!!activeNote} 
        onClose={() => setActiveNote(null)} 
        title={`Lời nhắn số #${activeNote?.id}`}
      >
        <div className="text-center py-4">
           {/* Icon trang trí trong popup */}
           <div className="mb-4 flex justify-center">
             <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center">
               <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" />
             </div>
           </div>
           
           {/* Nội dung chính */}
           <p className="text-xl text-gray-700 font-medium leading-relaxed italic px-4">
             "{activeNote?.content}"
           </p>

           <div className="mt-6 border-t border-dashed border-gray-200 pt-4">
             <p className="text-xs text-gray-400 uppercase tracking-widest">
               Gửi đến {CONFIG.coupleName}
             </p>
           </div>
        </div>
      </Modal>

    </section>
  );
}