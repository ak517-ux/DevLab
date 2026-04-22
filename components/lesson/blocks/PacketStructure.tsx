"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PacketStructure() {
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  const fields = [
    { 
      id: "sender", 
      name: "ОТПРАВИТЕЛЬ", 
      value: "192.168.1.100", 
      icon: "📤", 
      color: "#4F46E5", 
      detail: "Твой домашний компьютер",
      description: "IP-адрес твоего компьютера в локальной сети. С него пакет начинает своё путешествие."
    },
    { 
      id: "receiver", 
      name: "ПОЛУЧАТЕЛЬ", 
      value: "216.58.208.46", 
      icon: "📥", 
      color: "#22C55E", 
      detail: "Сервер Google",
      description: "IP-адрес сервера Google. Это конечная точка назначения пакета."
    },
    { 
      id: "number", 
      name: "НОМЕР ПАКЕТА", 
      value: "3 из 10", 
      icon: "🔢", 
      color: "#F59E0B", 
      detail: "Третий из десяти",
      description: "Порядковый номер пакета. Всего 10 пакетов, этот — третий. Нужно, чтобы собрать данные в правильном порядке."
    },
    { 
      id: "checksum", 
      name: "КОНТРОЛЬНАЯ СУММА", 
      value: "0x7A3F", 
      icon: "✓", 
      color: "#EF4444", 
      detail: "Для проверки целостности",
      description: "Специальная математическая сумма, которая проверяет, не повредился ли пакет в пути. Если сумма не совпадает — пакет повреждён и будет запрошен повторно."
    },
    { 
      id: "ttl", 
      name: "TTL (Время жизни)", 
      value: "64 хопа", 
      icon: "⏱️", 
      color: "#8B5CF6", 
      detail: "Максимум прыжков",
      description: "Time To Live — сколько роутеров пакет может пройти. Каждый роутер уменьшает TTL на 1. При TTL=0 пакет уничтожается, чтобы не зацикливался в сети."
    },
    { 
      id: "protocol", 
      name: "ПРОТОКОЛ", 
      value: "TCP", 
      icon: "🔄", 
      color: "#06B6D4", 
      detail: "Гарантия доставки",
      description: "Указывает, какой протокол используется. TCP гарантирует доставку, UDP — быстрее, но без гарантий."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#FF6A1A]/20 rounded-xl flex items-center justify-center text-xl">
          📦
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Структура сетевого пакета</h3>
          <p className="text-xs text-slate-400">Пакет = Заголовок (конверт) + Данные (письмо)</p>
        </div>
      </div>

      <div className="relative">
        {/* Конверт (заголовок) */}
        <div className="relative bg-gradient-to-br from-amber-50/10 to-amber-100/5 border-2 border-amber-500/30 rounded-2xl overflow-hidden">
          <div className="absolute top-2 right-3">
            <div className="bg-amber-500/20 text-amber-400 text-[10px] px-2 py-0.5 rounded-full">
              ЗАГОЛОВОК (HEADER)
            </div>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <motion.div
                  key={field.id}
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={() => setHoveredField(field.id)}
                  onMouseLeave={() => setHoveredField(null)}
                  className="relative bg-black/40 rounded-xl p-3 border-l-4 cursor-help"
                  style={{ borderLeftColor: field.color }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{field.icon}</span>
                      <span className="text-xs text-slate-400">{field.name}</span>
                    </div>
                    <span className="text-[9px] text-slate-500">{field.detail}</span>
                  </div>
                  <div className="font-mono text-sm text-white font-bold">{field.value}</div>
                  
                  {/* Всплывающая подсказка - теперь внутри и не обрезается */}
                  {hoveredField === field.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 pt-2 border-t border-white/10"
                    >
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {field.description}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Линия разделения */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-8 h-8 bg-black rounded-full flex items-center justify-center border-2 border-white/20 z-10">
              <span className="text-xs">📄</span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>

          {/* Данные (письмо внутри) - РАСШИРЕННЫЕ */}
          <div className="bg-gradient-to-b from-transparent to-black/30 p-5">
            <div className="text-center mb-3">
              <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-3 py-1">
                <span className="text-sm">📄</span>
                <span className="text-xs text-slate-400">ДАННЫЕ (PAYLOAD)</span>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-4">
              <div className="space-y-3">
                {/* HTTP запрос */}
                <div>
                  <div className="text-[11px] text-cyan-400 mb-1 font-mono">HTTP Request:</div>
                  <code className="text-xs text-green-400 font-mono block whitespace-pre-wrap">
{`GET /search?q=как+работает+интернет HTTP/1.1
Host: google.com
User-Agent: DevLab/1.0
Accept: text/html,application/xhtml+xml
Accept-Language: ru-RU,ru;q=0.9
Connection: keep-alive`}
                  </code>
                </div>
                
                {/* Разделитель */}
                <div className="h-px bg-white/10" />
                
                {/* Фрагмент данных */}
                <div>
                  <div className="text-[11px] text-cyan-400 mb-1 font-mono">Фрагмент данных (data chunk):</div>
                  <code className="text-xs text-green-400 font-mono block whitespace-pre-wrap">
{`-----BEGIN DATA CHUNK-----
[Пакет №3 из 10]
Часть сообщения: "Привет! Сегодня я узнал, как работают пакеты...
Это очень интересно! Оказывается, интернет — это сложная
система маршрутизации, где каждый пакет ищет свой путь."
-----END DATA CHUNK-----
CRC32: 0x7A3F`}
                  </code>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Данные целы</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Пакет №3</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>10 всего</span>
              </div>
            </div>
          </div>
        </div>

        {/* Сноска внизу */}
        <div className="mt-6 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 bg-black/40 px-4 py-2 rounded-full">
            <span>📋 ЗАГОЛОВОК (конверт)</span>
            <span>+</span>
            <span>📄 ДАННЫЕ (письмо)</span>
            <span>=</span>
            <span className="text-[#FF6A1A] font-bold">📦 ПАКЕТ</span>
          </div>
        </div>

        <div className="flex justify-center gap-1 mt-4">
          <div className="w-1.5 h-1.5 bg-[#FF6A1A] rounded-full animate-pulse" />
          <div className="w-1.5 h-1.5 bg-[#FF6A1A] rounded-full animate-pulse delay-150" />
          <div className="w-1.5 h-1.5 bg-[#FF6A1A] rounded-full animate-pulse delay-300" />
        </div>
        
        <p className="text-center text-[10px] text-slate-500 mt-2">
          📦 Каждый пакет идёт своим маршрутом, а потом собирается в правильном порядке
        </p>
      </div>
    </div>
  );
}