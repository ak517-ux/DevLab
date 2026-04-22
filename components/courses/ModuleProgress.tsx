"use client";

import { useEffect, useState } from "react";
import { getModuleProgress } from "@/lib/progress";

interface ModuleProgressProps {
  moduleId: number;
  lessons: { id: string; title: string }[];
}

export default function ModuleProgress({ moduleId, lessons }: ModuleProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const newProgress = getModuleProgress(moduleId, lessons);
      setProgress(newProgress);
    };
    
    updateProgress();
    
    // Слушаем событие обновления прогресса
    window.addEventListener('progress-updated', updateProgress);
    
    return () => window.removeEventListener('progress-updated', updateProgress);
  }, [moduleId, lessons]);

  const completedCount = Math.round((progress / 100) * lessons.length);
  const isCompleted = progress === 100;

  return (
    <div className="bg-white/5 rounded-xl p-4">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-400">
          Прогресс модуля: {completedCount} из {lessons.length} уроков
        </span>
        <span className="text-[#FF6A1A]">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#FF6A1A] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      {isCompleted && (
        <div className="mt-3 text-green-400 text-sm flex items-center gap-2">
          ✅ Модуль полностью пройден!
        </div>
      )}
    </div>
  );
}