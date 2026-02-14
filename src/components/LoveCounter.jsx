import { useState, useEffect } from 'react';
import { CONFIG } from '../data/config';
import { Timer, ToggleLeft, ToggleRight } from 'lucide-react';

export default function LoveCounter() {
  const [mode, setMode] = useState('fixed'); // 'fixed' or 'real'
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (mode === 'fixed') return;

    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(CONFIG.startDate);
      const diff = now - start;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [mode]);

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-pink-200 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4 border-b border-pink-100 pb-2">
          <div className="flex items-center gap-2 text-pink-500 font-bold">
            <Timer size={20} />
            <span>Thời gian bên nhau</span>
          </div>
          <button 
            onClick={() => setMode(mode === 'fixed' ? 'real' : 'fixed')}
            className="text-gray-400 hover:text-pink-500 transition-colors"
            title="Chuyển chế độ đếm"
          >
            {mode === 'fixed' ? <ToggleLeft size={24}/> : <ToggleRight size={24}/>}
          </button>
        </div>

        <div className="text-center">
          {mode === 'fixed' ? (
            <div className="py-4">
              <span className="text-6xl font-bold text-pink-500 block">
                {CONFIG.relationshipDaysFixed}
              </span>
              <span className="text-gray-500 uppercase tracking-widest text-sm">Ngày Hạnh Phúc</span>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { val: time.days, label: 'Ngày' },
                { val: time.hours, label: 'Giờ' },
                { val: time.minutes, label: 'Phút' },
                { val: time.seconds, label: 'Giây' }
              ].map((item, idx) => (
                <div key={idx} className="bg-pink-50 rounded-lg p-2">
                  <span className="block text-2xl font-bold text-pink-600">{item.val}</span>
                  <span className="text-xs text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
