"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getUserProgress, getCourseProgress } from "@/lib/progress";

interface SidebarProgressProps {
  modules: { id: number; lessons: { id: string }[] }[];
  totalModules: number;
}

export default function SidebarProgress({ modules, totalModules }: SidebarProgressProps) {
  const [progress, setProgress] = useState(0);
  const [completedModulesCount, setCompletedModulesCount] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    const updateProgress = () => {
      const userProgress = getUserProgress();
      setCompletedLessons(userProgress.completedLessons);
      
      // Считаем завершённые модули (модуль завершён, если все его уроки пройдены)
      let completed = 0;
      modules.forEach(module => {
        const allCompleted = module.lessons.every(lesson => 
          userProgress.completedLessons.includes(lesson.id)
        );
        if (allCompleted && module.lessons.length > 0) {
          completed++;
        }
      });
      setCompletedModulesCount(completed);
      
      // Общий прогресс курса
      const courseProgress = getCourseProgress(modules);
      setProgress(courseProgress);
    };
    
    updateProgress();
    
    // Слушаем событие обновления прогресса
    window.addEventListener('storage', updateProgress);
    window.addEventListener('progress-updated', updateProgress);
    
    return () => {
      window.removeEventListener('storage', updateProgress);
      window.removeEventListener('progress-updated', updateProgress);
    };
  }, [modules]);

  // Округляем до целого числа для отображения
  const progressPercent = Math.round(progress);
  
  // Длина окружности для кругового прогресса (2 * PI * R = 2 * 3.14 * 15.9155 ≈ 100)
  const circumference = 100;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Прогресс курса</h3>
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
            <path
              className="text-slate-700"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              className="text-[#FF6A1A]"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
            {progressPercent}%
          </div>
        </div>
        <div className="text-sm text-slate-300">
          <div className="font-medium text-white mb-1">
            {completedModulesCount} из {totalModules} модулей
          </div>
          <div className="text-slate-400">
            {progressPercent === 100 ? "Курс завершён! 🎉" : "Продолжай обучение"}
          </div>
        </div>
      </div>
    </div>
  );
}