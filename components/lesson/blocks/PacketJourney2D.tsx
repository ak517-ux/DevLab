"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Planet {
  id: number;
  name: string;
  x: number;
  y: number;
  icon: string;
  color: string;
  description: string;
  fullDescription: string;
  order: number;
}

const planets: Planet[] = [
  { 
    id: 0, name: "КОМПЬЮТЕР", x: 50, y: 250, icon: "💻", color: "#4F46E5", order: 0,
    description: "📤 СТАРТ",
    fullDescription: "Твой компьютер. Здесь создаются пакеты данных."
  },
  { 
    id: 1, name: "РОУТЕР", x: 200, y: 180, icon: "📡", color: "#3B82F6", order: 1,
    description: "🎯 ВЫБОР МАРШРУТА",
    fullDescription: "Пакет прибыл на роутер! Он смотрит на IP-адрес получателя и решает, куда отправить пакет дальше."
  },
  { 
    id: 2, name: "ПРОВАЙДЕР", x: 400, y: 120, icon: "🏢", color: "#06B6D4", order: 2,
    description: "🌍 МАГИСТРАЛЬНАЯ СЕТЬ",
    fullDescription: "Пакет попадает в сеть провайдера! Здесь он смешивается с миллионами других пакетов."
  },
  { 
    id: 3, name: "ДАТА-ЦЕНТР", x: 600, y: 180, icon: "📊", color: "#A855F7", order: 3,
    description: "🏢 ПОИСК СЕРВЕРА",
    fullDescription: "Пакет достигает дата-центра! Тысячи серверов обрабатывают запросы со всего мира."
  },
  { 
    id: 4, name: "СЕРВЕР", x: 750, y: 250, icon: "🖥️", color: "#22C55E", order: 4,
    description: "✅ ФИНИШ",
    fullDescription: "ПАКЕТ ДОСТАВЛЕН! Сервер получает запрос, обрабатывает его и отправляет ответ обратно."
  }
];

// Фиксированные позиции звёзд
const starPositions = [
  { left: "10%", top: "15%", width: "2px", height: "2px", delay: "0s" },
  { left: "20%", top: "30%", width: "1.5px", height: "1.5px", delay: "0.5s" },
  { left: "35%", top: "10%", width: "2px", height: "2px", delay: "1s" },
  { left: "50%", top: "45%", width: "1px", height: "1px", delay: "0.3s" },
  { left: "65%", top: "20%", width: "2.5px", height: "2.5px", delay: "0.8s" },
  { left: "75%", top: "55%", width: "1.5px", height: "1.5px", delay: "1.2s" },
  { left: "85%", top: "15%", width: "2px", height: "2px", delay: "0.2s" },
  { left: "15%", top: "70%", width: "1px", height: "1px", delay: "0.7s" },
  { left: "30%", top: "80%", width: "2px", height: "2px", delay: "1.5s" },
  { left: "45%", top: "65%", width: "1.5px", height: "1.5px", delay: "0.4s" },
  { left: "60%", top: "85%", width: "2px", height: "2px", delay: "0.9s" },
  { left: "80%", top: "75%", width: "1px", height: "1px", delay: "1.1s" },
  { left: "95%", top: "35%", width: "2px", height: "2px", delay: "0.6s" },
  { left: "5%", top: "45%", width: "1.5px", height: "1.5px", delay: "1.3s" },
  { left: "55%", top: "50%", width: "1px", height: "1px", delay: "0.1s" },
  { left: "70%", top: "30%", width: "2px", height: "2px", delay: "0.8s" },
  { left: "25%", top: "55%", width: "1.5px", height: "1.5px", delay: "1.4s" },
  { left: "40%", top: "35%", width: "2px", height: "2px", delay: "0.5s" },
  { left: "90%", top: "60%", width: "1px", height: "1px", delay: "1s" },
  { left: "12%", top: "85%", width: "2px", height: "2px", delay: "0.3s" },
  { left: "48%", top: "15%", width: "1.5px", height: "1.5px", delay: "0.7s" },
  { left: "72%", top: "50%", width: "2px", height: "2px", delay: "1.2s" },
  { left: "33%", top: "25%", width: "1px", height: "1px", delay: "0.4s" },
  { left: "88%", top: "80%", width: "2px", height: "2px", delay: "0.9s" },
  { left: "18%", top: "40%", width: "1.5px", height: "1.5px", delay: "1.1s" },
  { left: "62%", top: "70%", width: "2px", height: "2px", delay: "0.2s" },
  { left: "78%", top: "10%", width: "1px", height: "1px", delay: "1.5s" },
];

export default function PacketJourney2D() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTargetOrder, setCurrentTargetOrder] = useState(1);
  const [satelliteX, setSatelliteX] = useState(50);
  const [satelliteY, setSatelliteY] = useState(250);
  const [currentPlanetId, setCurrentPlanetId] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
  const [completed, setCompleted] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [showTooltip, setShowTooltip] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [animationTarget, setAnimationTarget] = useState<Planet | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const flyToPlanet = (targetPlanet: Planet) => {
    setIsAnimating(true);
    setAnimationTarget(targetPlanet);
    setAnimationProgress(0);
    
    const startX = satelliteX;
    const startY = satelliteY;
    const targetX = targetPlanet.x;
    const targetY = targetPlanet.y;
    
    const duration = 2000; // Медленный полёт 2 секунды
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const newX = startX + (targetX - startX) * easeProgress;
      const newY = startY + (targetY - startY) * easeProgress;
      
      setSatelliteX(newX);
      setSatelliteY(newY);
      setAnimationProgress(progress * 100);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setCurrentPlanetId(targetPlanet.id);
        
        setMessageTitle(targetPlanet.description);
        setMessageText(targetPlanet.fullDescription);
        setMessageType("success");
        setShowMessage(true);
        
        setTimeout(() => setShowMessage(false), 3000);
        
        if (targetPlanet.order === 4) {
          setTimeout(() => {
            setCompleted(true);
            setTimeout(() => setShowFinal(true), 500);
          }, 1000);
        }
      }
    };
    
    requestAnimationFrame(animate);
  };

  const handlePlanetClick = (planet: Planet) => {
    if (isAnimating) {
      setMessageTitle("⏳ ПОДОЖДИТЕ");
      setMessageText("Спутник уже в пути! Дождитесь прибытия.");
      setMessageType("error");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1500);
      return;
    }
    
    if (completed) return;
    
    if (!isPlaying) {
      setMessageTitle("🚀 НАЧНИ ПУТЕШЕСТВИЕ");
      setMessageText("Нажми кнопку «НАЧАТЬ» внизу экрана, чтобы запустить спутник!");
      setMessageType("error");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
      return;
    }
    
    if (planet.order === currentTargetOrder) {
      setScore(score + 1);
      if (planet.order === 4) {
        flyToPlanet(planet);
      } else {
        flyToPlanet(planet);
        setCurrentTargetOrder(currentTargetOrder + 1);
      }
    } else {
      setMistakes(mistakes + 1);
      setMessageTitle("❌ НЕПРАВИЛЬНЫЙ МАРШРУТ!");
      setMessageText(`Сейчас нужно отправить пакет на ${planets.find(p => p.order === currentTargetOrder)?.name || "следующую планету"}! Попробуй ещё раз.`);
      setMessageType("error");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2500);
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setCurrentTargetOrder(1);
    setCurrentPlanetId(0);
    setScore(0);
    setMistakes(0);
    setCompleted(false);
    setShowFinal(false);
    setSatelliteX(50);
    setSatelliteY(250);
    setAnimationProgress(0);
    
    setMessageTitle("🎮 ИГРА НАЧАЛАСЬ!");
    setMessageText("Кликай на планеты в правильном порядке: РОУТЕР → ПРОВАЙДЕР → ДАТА-ЦЕНТР → СЕРВЕР");
    setMessageType("success");
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setCurrentTargetOrder(1);
    setCurrentPlanetId(0);
    setScore(0);
    setMistakes(0);
    setCompleted(false);
    setShowFinal(false);
    setSatelliteX(50);
    setSatelliteY(250);
    setAnimationProgress(0);
    setShowMessage(false);
  };

  if (!mounted) {
    return <div className="w-full h-[550px] bg-gradient-to-b from-slate-950 via-purple-950 to-black rounded-2xl" />;
  }

  const nextTargetPlanet = planets.find(p => p.order === currentTargetOrder);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-950 via-purple-950 to-black border border-white/10 min-h-[550px]">
      {/* Фоновые звёзды */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {starPositions.map((star, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: star.width,
              height: star.height,
              left: star.left,
              top: star.top,
              opacity: 0.5,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>
      
      {/* Орбитальные линии */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path
          d="M 80 250 Q 200 150 400 120 Q 600 150 720 250"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
          strokeDasharray="6,6"
        />
      </svg>
      
      {/* Планеты */}
      {planets.map((planet) => {
        const isNextTarget = planet.order === currentTargetOrder && isPlaying && !completed;
        const isVisited = planet.order < currentTargetOrder && isPlaying;
        const isStart = planet.order === 0;
        
        return (
          <div
            key={planet.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${
              !isStart && isPlaying && !completed && planet.order !== 0 ? "cursor-pointer hover:scale-110" : ""
            } ${isNextTarget ? "animate-pulse" : ""}`}
            style={{ left: planet.x, top: planet.y }}
            onClick={() => {
              if (planet.order !== 0 && isPlaying && !completed) {
                handlePlanetClick(planet);
              }
            }}
            onMouseEnter={() => setShowTooltip(planet.id)}
            onMouseLeave={() => setShowTooltip(null)}
          >
            {isNextTarget && (
              <div
                className="absolute rounded-full"
                style={{
                  width: "90px",
                  height: "90px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  background: `radial-gradient(circle, ${planet.color}40 0%, transparent 70%)`,
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            )}
            
            {isVisited && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-green-400 text-sm">
                ✓
              </div>
            )}
            
            <div
              className="relative w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all duration-300"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${planet.color}cc, ${planet.color}66)`,
                boxShadow: isNextTarget ? `0 0 30px ${planet.color}` : `0 0 20px ${planet.color}80`,
                border: isNextTarget ? `2px solid ${planet.color}` : "none",
              }}
            >
              {planet.icon}
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className={`text-[10px] font-medium tracking-wider ${
                isVisited ? "text-green-400" : isNextTarget ? "text-[#FF6A1A]" : "text-white/60"
              }`}>
                {planet.name}
                {isVisited && " ✓"}
                {isNextTarget && " ← ЦЕЛЬ"}
              </span>
            </div>
            
            {showTooltip === planet.id && (
              <div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-md rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap border border-white/10 z-20"
                style={{ borderLeftColor: planet.color, borderLeftWidth: "3px" }}
              >
                {planet.fullDescription.substring(0, 60)}...
              </div>
            )}
          </div>
        );
      })}
      
      {/* Спутник */}
      <motion.div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
        style={{ left: satelliteX, top: satelliteY }}
      >
        <div className="relative">
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex gap-0.5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-0.5 h-0.5 bg-[#FF6A1A] rounded-full animate-ping"
                style={{ animationDelay: `${i * 0.15}s`, opacity: 0.4 - i * 0.1 }}
              />
            ))}
          </div>
          <div className="relative w-5 h-5">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-2.5 h-2 bg-[#60A5FA] rounded-sm opacity-70" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-2.5 h-2 bg-[#60A5FA] rounded-sm opacity-70" />
            <div className="w-4 h-4 bg-[#FF6A1A] rounded-md rotate-45 shadow-md shadow-[#FF6A1A]/40" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1.5 w-0.5 h-1.5 bg-[#FFD700]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-1 h-1 bg-[#FFD700] rounded-full animate-pulse" />
          </div>
        </div>
      </motion.div>
      
      {/* Индикатор прогресса */}
      {isPlaying && !completed && (
        <div className="absolute top-4 left-4 right-4 bg-black/70 backdrop-blur-md rounded-full px-4 py-2 z-30 border border-white/10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60">🎯 ЦЕЛЬ:</span>
              <span className="text-xs font-bold text-[#FF6A1A]">{nextTargetPlanet?.name || "ФИНИШ"}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-green-400">✅ {score}/4</span>
              <span className="text-xs text-red-400">❌ {mistakes}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Анимированный прогресс-бар полёта */}
      {isAnimating && (
        <div className="absolute bottom-20 left-6 right-6 z-30">
          <div className="bg-black/40 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF6A1A] to-[#FFD700] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${animationProgress}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>
          <div className="text-center text-[10px] text-white/40 mt-1">
            🛰️ ПОЛЁТ...
          </div>
        </div>
      )}
      
      {/* Сообщение */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className={`absolute bottom-28 left-4 right-4 bg-black/90 backdrop-blur-md rounded-2xl px-5 py-3 z-30 border-l-4 shadow-xl ${
              messageType === "error" ? "border-red-500" : "border-[#FF6A1A]"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{messageType === "error" ? "⚠️" : "🛸"}</div>
              <div className="flex-1">
                <div className={`text-sm font-bold mb-0.5 ${messageType === "error" ? "text-red-400" : "text-[#FF6A1A]"}`}>
                  {messageTitle}
                </div>
                <p className="text-xs text-white/80 leading-relaxed">{messageText}</p>
              </div>
              <button 
                onClick={() => setShowMessage(false)}
                className="text-white/40 hover:text-white/80 text-xs px-1"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Финальное окно */}
      <AnimatePresence>
        {showFinal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-40"
          >
            <div className="text-center p-6">
              <div className="text-7xl mb-4 animate-bounce">🎉</div>
              <h3 className="text-2xl font-bold text-green-400 mb-3">ПАКЕТ ДОСТАВЛЕН!</h3>
              <p className="text-slate-300 text-sm mb-4 max-w-md">
                Ты успешно провёл пакет через всю сеть!
              </p>
              <div className="flex justify-center gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{score}/4</div>
                  <div className="text-xs text-white/50">ПРАВИЛЬНО</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{mistakes}</div>
                  <div className="text-xs text-white/50">ОШИБОК</div>
                </div>
              </div>
              <button
                onClick={resetGame}
                className="px-6 py-2 bg-gradient-to-r from-[#FF6A1A] to-[#FF8C42] rounded-full font-medium hover:shadow-lg transition-all"
              >
                🔄 ИГРАТЬ ЗАНОВО
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Кнопки управления */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-30">
        <div className="text-[9px] text-white/30 bg-black/30 px-2 py-0.5 rounded-full">
          💡 НАВЕДИ НА ПЛАНЕТЫ
        </div>
        {!isPlaying && !completed && (
          <button
            onClick={startGame}
            className="px-5 py-2 bg-gradient-to-r from-[#FF6A1A] to-[#FF8C42] rounded-full text-sm font-medium hover:shadow-lg transition-all shadow-[0_0_15px_rgba(255,106,26,0.3)]"
          >
            🚀 НАЧАТЬ ИГРУ
          </button>
        )}
        {isPlaying && !completed && !isAnimating && (
          <button
            onClick={resetGame}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-all"
          >
            🔄 СБРОС
          </button>
        )}
      </div>
      
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.6; }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}