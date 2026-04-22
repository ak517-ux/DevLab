"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SidebarProgress from "@/components/courses/SidebarProgress";
import { getModuleProgress, getUserProgress } from "@/lib/progress";

// Модули курса - ID должны совпадать с module.json
const modulesData = [
  {
    id: 1,
    title: "Как пакет нашёл дорогу",
    lessons: [
      { id: "lesson-1", title: "Что такое пакет данных?" },
      { id: "lesson-2", title: "MAC-адреса и ARP" },
      { id: "lesson-3", title: "Маршрутизация и шлюзы" },
      { id: "lesson-4", title: "Traceroute" },
      { id: "lesson-5", title: "Тест: Путь пакета" },
    ],
  },
  {
    id: 2,
    title: "Дом, где живут устройства",
    lessons: [
      { id: "2-1", title: "Что такое IP-адрес" },
      { id: "2-2", title: "IPv4 vs IPv6" },
      { id: "2-3", title: "Маски подсети" },
      { id: "2-4", title: "Публичные и частные IP" },
      { id: "2-5", title: "NAT" },
      { id: "2-6", title: "Лаборатория: Настройка IP" },
    ],
  },
  {
    id: 3,
    title: "Тайна DNS",
    lessons: [
      { id: "3-1", title: "Что такое DNS" },
      { id: "3-2", title: "Как работает DNS-запрос" },
      { id: "3-3", title: "DNS-сервера" },
      { id: "3-4", title: "DNS-кэширование" },
      { id: "3-5", title: "Тест: DNS" },
    ],
  },
  {
    id: 4,
    title: "Протоколы — правила игры",
    lessons: [
      { id: "4-1", title: "Что такое протокол" },
      { id: "4-2", title: "TCP vs UDP" },
      { id: "4-3", title: "HTTP и HTTPS" },
      { id: "4-4", title: "Порты" },
      { id: "4-5", title: "Тест: Протоколы" },
    ],
  },
  {
    id: 5,
    title: "Маленькая лаборатория хакера",
    lessons: [
      { id: "5-1", title: "Лаборатория: ping" },
      { id: "5-2", title: "Лаборатория: traceroute" },
      { id: "5-3", title: "Лаборатория: nslookup" },
      { id: "5-4", title: "Лаборатория: netstat" },
    ],
  },
  {
    id: 6,
    title: "Интерактивный тест",
    lessons: [
      { id: "6-1", title: "Настройка роутера" },
    ],
  },
  {
    id: 7,
    title: "Финальный квест",
    lessons: [
      { id: "7-1", title: "Задание 1: Найди путь" },
      { id: "7-2", title: "Задание 2: Настрой сеть" },
      { id: "7-3", title: "Задание 3: Поймай пакет" },
    ],
  },
];

function CertificatePreview() {
  return (
    <div className="relative w-full max-w-xl aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.7)]">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <div className="text-5xl mb-4">🌐</div>
        <h3 className="text-xl font-bold text-white mb-2">Сертификат DevLab</h3>
        <p className="text-slate-400 text-sm">За успешное прохождение курса</p>
        <p className="text-slate-500 text-xs mt-4">"Сети: Основы"</p>
        <div className="mt-6 w-32 h-0.5 bg-gradient-to-r from-transparent via-[#FF6A1A] to-transparent" />
      </div>
    </div>
  );
}

export default function NetworkingBasicsPage() {
  const [moduleProgress, setModuleProgress] = useState<Record<number, number>>({});
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const updateProgress = () => {
      const progress: Record<number, number> = {};
      modulesData.forEach(module => {
        progress[module.id] = getModuleProgress(module.id, module.lessons);
      });
      setModuleProgress(progress);
      forceUpdate({});
    };
    
    updateProgress();
    window.addEventListener('progress-updated', updateProgress);
    
    return () => window.removeEventListener('progress-updated', updateProgress);
  }, []);

  const totalModules = modulesData.length;
  const totalCompletedModules = modulesData.filter(module => 
    moduleProgress[module.id] === 100
  ).length;

  // Для отладки - посмотрим какие уроки пройдены
  useEffect(() => {
    const progress = getUserProgress();
    console.log('Пройденные уроки:', progress.completedLessons);
  }, []);

  return (
    <div className="w-full min-h-screen text-white flex justify-center">
      <div className="w-full max-w-7xl px-4 lg:px-8 py-10">

        {/* FLOATING TOP PROGRESS BAR */}
        <div className="fixed top-0 left-0 w-full h-[4px] bg-black/40 z-40">
          <motion.div
            className="h-full bg-[#FF6A1A]"
            style={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: totalModules > 0 ? totalCompletedModules / totalModules : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-12">

          {/* LEFT SIDEBAR WITH COURSE PROGRESS */}
          <aside className="hidden lg:flex flex-col gap-6 sticky top-10 h-fit bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <SidebarProgress modules={modulesData} totalModules={totalModules} />
            
            <div className="h-px bg-white/10" />

            <div>
              <h3 className="text-lg font-semibold mb-3">Модули курса</h3>
              <div className="relative pl-3">
                <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-slate-700 rounded-full" />
                <ul className="space-y-3 text-slate-300 text-sm">
                  {modulesData.map((module, i) => {
                    const progress = moduleProgress[module.id] || 0;
                    const isCompleted = progress === 100;
                    const isInProgress = progress > 0 && progress < 100;
                    
                    return (
                      <li key={module.id} className="relative flex items-center gap-2 group">
                        <div
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            isCompleted
                              ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                              : isInProgress
                              ? "bg-[#FF6A1A] animate-pulse"
                              : "bg-slate-600"
                          }`}
                        />
                        <span
                          className={`flex-1 transition ${
                            isCompleted
                              ? "text-green-400"
                              : isInProgress
                              ? "text-white font-medium"
                              : "text-slate-400"
                          }`}
                        >
                          {i + 1}. {module.title}
                        </span>
                        {progress > 0 && progress < 100 && (
                          <span className="text-xs text-slate-500">
                            {Math.round(progress)}%
                          </span>
                        )}
                        {progress === 100 && (
                          <span className="text-xs text-green-400">✅</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="space-y-16">

            {/* HERO */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full rounded-2xl overflow-hidden"
            >
              <div className="relative w-full h-[360px] md:h-[400px]">
                <Image
                  src="/images/networking-bg.png"
                  alt="Networking Background"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
                  className="object-cover brightness-[0.45]"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                <div className="max-w-2xl">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Сети: Основы
                  </h1>
                  <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-6">
                    Пойми, как работает интернет. IP-адреса, протоколы, маршрутизация и сетевая безопасность.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Link
                    href="/courses/networking-basics/1/lesson-1"
                    className="w-full max-w-sm bg-[#FF6A1A] hover:bg-[#ff7f3a] transition-colors px-6 py-3 rounded-lg text-base md:text-lg font-semibold shadow-[0_0_24px_rgba(255,106,26,0.6)] text-center"
                  >
                    Начать обучение
                  </Link>
                  <div className="text-xs md:text-sm text-slate-300">
                    ~ 7 модулей • интерактивные задания • сертификат DevLab
                  </div>
                </div>
              </div>
            </motion.section>

            {/* MODULE CARDS */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                Модули курса
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {modulesData.map((module, i) => {
                  const progress = moduleProgress[module.id] || 0;
                  const isCompleted = progress === 100;
                  
                  return (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      whileHover={{ y: -4 }}
                      className="group bg-black/40 border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:border-[#FF6A1A]/60 hover:shadow-[0_0_30px_rgba(255,106,26,0.25)] transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold">
                          {i + 1}. {module.title}
                        </h3>
                        <span className={`text-xs ${isCompleted ? 'text-green-400' : 'text-slate-400'}`}>
                          {isCompleted ? "✅ Пройден" : `${Math.round(progress)}%`}
                        </span>
                      </div>

                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-4">
                        <motion.div
                          className="h-full bg-[#FF6A1A]"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: progress / 100 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          style={{ originX: 0 }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Link
                          href={`/courses/networking-basics/${module.id}`}
                          className="text-[#FF6A1A] hover:text-[#ff9a55] text-sm font-medium"
                        >
                          {progress === 0 ? "Начать модуль →" : progress === 100 ? "Повторить →" : "Продолжить →"}
                        </Link>
                        <span className="text-xs text-slate-400">
                          {module.lessons.length} уроков
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* CERTIFICATE BLOCK */}
            <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                  {totalCompletedModules === totalModules 
                    ? "🎉 Поздравляем! Вы прошли курс!"
                    : "Получите ваш сертификат DevLab"}
                </h2>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4">
                  {totalCompletedModules === totalModules 
                    ? "Вы успешно завершили все модули курса! Ваш сертификат готов."
                    : `После завершения всех ${totalModules} модулей ты получишь именной сертификат DevLab по курсу «Сети: Основы».`}
                </p>
                <ul className="space-y-2 text-slate-300 text-sm md:text-base mb-6">
                  <li>• именной сертификат с логотипом DevLab</li>
                  <li>• уникальный номер и дата выдачи</li>
                  <li>• подтверждение прохождения всех модулей и проекта</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    className={`w-full sm:w-auto px-6 py-3 rounded-lg text-sm md:text-base font-semibold transition-all ${
                      totalCompletedModules === totalModules
                        ? "bg-green-500 hover:bg-green-600 text-white shadow-[0_0_24px_rgba(34,197,94,0.4)]"
                        : "bg-[#FF6A1A] hover:bg-[#ff7f3a] shadow-[0_0_24px_rgba(255,106,26,0.6)] text-black"
                    }`}
                    type="button"
                  >
                    {totalCompletedModules === totalModules 
                      ? "🎓 Скачать сертификат" 
                      : `Осталось пройти ${totalModules - totalCompletedModules} модулей`}
                  </button>
                  <div className="text-xs md:text-sm text-slate-400 flex items-center">
                    Сертификат доступен после завершения курса на 100%.
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
                <CertificatePreview />
              </motion.div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}