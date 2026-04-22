"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function PacketVisualization() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [packetPosition, setPacketPosition] = useState(0);

  const startAnimation = () => {
    setIsAnimating(true);
    setPacketPosition(0);
    
    let pos = 0;
    const interval = setInterval(() => {
      pos += 10;
      setPacketPosition(pos);
      if (pos >= 100) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 100);
  };

  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">🚀 Путешествие пакета</h3>
      
      {/* Схема сети */}
      <div className="relative h-40 mb-6">
        {/* Компьютер отправителя */}
        <div className="absolute left-0 bottom-0 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-2xl">
            💻
          </div>
          <span className="text-xs text-slate-400 mt-1 block">Твой компьютер</span>
        </div>
        
        {/* Роутер 1 */}
        <div className="absolute left-1/4 bottom-0 text-center" style={{ left: '25%' }}>
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl">
            📡
          </div>
          <span className="text-xs text-slate-400 mt-1 block">Роутер</span>
        </div>
        
        {/* Роутер 2 */}
        <div className="absolute left-1/2 bottom-0 text-center" style={{ left: '50%' }}>
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl">
            📡
          </div>
          <span className="text-xs text-slate-400 mt-1 block">Интернет</span>
        </div>
        
        {/* Сервер */}
        <div className="absolute right-0 bottom-0 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-2xl">
            🖥️
          </div>
          <span className="text-xs text-slate-400 mt-1 block">Сервер</span>
        </div>
        
        {/* Анимированный пакет */}
        {isAnimating && (
          <motion.div
            className="absolute -top-2 w-6 h-6 bg-[#FF6A1A] rounded-full shadow-[0_0_10px_rgba(255,106,26,0.8)] flex items-center justify-center text-xs"
            style={{ left: `${packetPosition}%` }}
            animate={{ 
              left: `${packetPosition}%`,
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 0.1 }}
          >
            📦
          </motion.div>
        )}
      </div>
      
      {/* Линии соединения */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: 0, left: 0 }}>
        <line x1="8%" y1="65%" x2="25%" y2="65%" stroke="#333" strokeWidth="2" strokeDasharray="5,5" />
        <line x1="31%" y1="65%" x2="50%" y2="65%" stroke="#333" strokeWidth="2" strokeDasharray="5,5" />
        <line x1="56%" y1="65%" x2="84%" y2="65%" stroke="#333" strokeWidth="2" strokeDasharray="5,5" />
      </svg>
      
      <button
        onClick={startAnimation}
        disabled={isAnimating}
        className="w-full mt-4 py-2 bg-[#FF6A1A] rounded-lg hover:bg-[#ff7f3a] transition font-semibold disabled:opacity-50"
      >
        {isAnimating ? "📦 Пакет в пути..." : "🚀 Отправить пакет"}
      </button>
      
      <p className="text-slate-400 text-sm mt-3 text-center">
        Пакет проходит через роутеры, пока не достигнет сервера
      </p>
    </div>
  );
}