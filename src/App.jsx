import { useState } from 'react';
import Hero from './components/Hero';
import LoveCounter from './components/LoveCounter';
import MemoryGacha from './components/MemoryGacha';
import HeartMap from './components/HeartMap';
import Notes17 from './components/Notes17';
import Modal from './components/Modal'; // Đảm bảo bạn đã có file này
import { CONFIG } from './data/config';
import { 
  Gift,       // Icon cho Gacha
  Map,        // Icon cho Bản đồ
  Mail,       // Icon cho Lời nhắn
  Ticket,     // Icon cho Voucher
  Music,      // Icon nhạc
  Heart 
} from 'lucide-react';

function App() {
  // State lưu chức năng đang mở (null = đang ở trang chủ, không mở gì)
  const [activeFeature, setActiveFeature] = useState(null);
  
  // State nhạc nền (Demo giao diện)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Danh sách các Phiếu Bé Ngoan
  const coupons = [
    { icon: "🧋", text: "1 chầu trà sữa full topping" },
    { icon: "🎬", text: "Xem phim (Em chọn phim)" },
    { icon: "🍜", text: "Đi ăn món em thích" },
    { icon: "🥺", text: "Tha lỗi vô điều kiện" }
  ];

  // Hàm đóng Modal
  const handleClose = () => setActiveFeature(null);

  return (
    <div className="min-h-screen bg-[#fff0f3] text-[#590d22] font-sans pb-12 transition-colors duration-500 overflow-x-hidden">
      
      {/* --- 1. HIỆU ỨNG NỀN (Background) --- */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-pink-50 to-white opacity-80"></div>
        {/* Các đốm màu trang trí */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
      </div>

      {/* --- 2. NÚT NHẠC (Góc phải) --- */}
      <button 
        onClick={() => setIsMusicPlaying(!isMusicPlaying)}
        className="fixed top-5 right-5 z-40 bg-white/90 backdrop-blur p-3 rounded-full shadow-lg text-pink-500 hover:scale-110 transition-transform border border-pink-100"
      >
        <Music size={20} className={isMusicPlaying ? "animate-spin-slow" : ""} />
      </button>

      <main className="container mx-auto max-w-lg px-4 pt-6 relative z-10">
        
        {/* --- 3. PHẦN CỐ ĐỊNH (Luôn hiển thị) --- */}
        <Hero />
        <LoveCounter />

        {/* --- 4. MENU CHỨC NĂNG (Dạng lưới nút bấm) --- */}
        <div className="mt-10">
          <div className="flex items-center justify-center gap-3 mb-6 opacity-60">
             <div className="h-px w-12 bg-pink-300"></div>
             <span className="text-xs font-bold tracking-widest uppercase text-pink-800">Khám phá tình yêu</span>
             <div className="h-px w-12 bg-pink-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            {/* Nút 1: Hộp Kỉ Niệm (Gacha) */}
            <button
              onClick={() => setActiveFeature('gacha')}
              className="group relative overflow-hidden bg-gradient-to-br from-purple-400 to-indigo-400 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center gap-3"
            >
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform">
                <Gift size={32} />
              </div>
              <span className="font-bold text-lg">Hộp Kỉ Niệm</span>
            </button>

            {/* Nút 2: Bản Đồ (Map) */}
            <button
              onClick={() => setActiveFeature('map')}
              className="group relative overflow-hidden bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center gap-3"
            >
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform">
                <Map size={32} />
              </div>
              <span className="font-bold text-lg">Bản Đồ Yêu</span>
            </button>

            {/* Nút 3: Lời Nhắn (Notes) */}
            <button
              onClick={() => setActiveFeature('notes')}
              className="group relative overflow-hidden bg-gradient-to-br from-orange-300 to-amber-400 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center gap-3"
            >
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform">
                <Mail size={32} />
              </div>
              <span className="font-bold text-lg">17 Lời Nhắn</span>
            </button>

            {/* Nút 4: Voucher (Coupons) */}
            <button
              onClick={() => setActiveFeature('coupon')}
              className="group relative overflow-hidden bg-gradient-to-br from-emerald-300 to-teal-400 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center gap-3"
            >
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform">
                <Ticket size={32} />
              </div>
              <span className="font-bold text-lg">Phiếu Bé Ngoan</span>
            </button>

          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 pb-8 opacity-60">
          <Heart size={16} className="mx-auto text-pink-400 mb-2 fill-pink-400" />
          <p className="text-xs font-semibold tracking-widest text-pink-800">
            MADE FOR {CONFIG.coupleName.toUpperCase()}
          </p>
        </footer>

      </main>

      {/* ======================================================== */}
      {/* KHU VỰC POP-UP (MODAL) - Chỉ hiện khi được chọn */}
      {/* ======================================================== */}

      {/* 1. Modal Hộp Kỉ Niệm */}
      <Modal 
        isOpen={activeFeature === 'gacha'} 
        onClose={handleClose}
        title="🎁 Vòng Quay Kỉ Niệm"
        className="max-w-xl"
      >
        <MemoryGacha />
      </Modal>

      {/* 2. Modal Bản Đồ */}
      <Modal 
        isOpen={activeFeature === 'map'} 
        onClose={handleClose}
        title="🗺️ Nơi Tình Yêu Bắt Đầu"
        className="max-w-3xl" // Map cần rộng hơn
      >
        <HeartMap />
      </Modal>

      {/* 3. Modal 17 Lời Nhắn */}
      <Modal 
        isOpen={activeFeature === 'notes'} 
        onClose={handleClose}
        title="💌 17 Điều Nhắn Gửi"
        className="max-w-4xl" // Notes cần rất rộng để hiển thị lưới
      >
        <Notes17 />
      </Modal>

      {/* 4. Modal Phiếu Bé Ngoan */}
      <Modal 
        isOpen={activeFeature === 'coupon'} 
        onClose={handleClose}
        title="🎟️ Kho Voucher Của Em"
        className="max-w-md"
      >
         <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {coupons.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-pink-50 border border-pink-100 rounded-xl hover:bg-white hover:shadow-md hover:border-pink-300 transition-all cursor-pointer group">
                <span className="text-3xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="font-semibold text-gray-700 group-hover:text-pink-600">{item.text}</span>
              </div>
            ))}
         </div>
         <p className="text-center text-xs text-gray-400 mt-4 italic bg-gray-50 py-2 rounded">
           *Chụp màn hình lại gửi anh để đổi quà nhé!
         </p>
      </Modal>

    </div>
  );
}

export default App;