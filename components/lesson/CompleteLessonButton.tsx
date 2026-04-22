"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { completeLesson, isLessonCompleted } from "@/lib/progress";

interface CompleteLessonButtonProps {
  lessonId: string;
  moduleId: number;
  onComplete?: () => void;
}

export default function CompleteLessonButton({ lessonId, moduleId, onComplete }: CompleteLessonButtonProps) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(isLessonCompleted(lessonId));
  }, [lessonId]);

  const handleComplete = () => {
    if (!completed) {
      completeLesson(lessonId);
      setCompleted(true);
      
      // Отправляем событие обновления прогресса
      window.dispatchEvent(new CustomEvent('progress-updated'));
      
      if (onComplete) onComplete();
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleComplete}
      disabled={completed}
      className={`w-full py-3 rounded-lg font-semibold transition-all ${
        completed
          ? "bg-green-500/20 border border-green-500 text-green-400 cursor-default"
          : "bg-[#FF6A1A] hover:bg-[#ff7f3a] text-black shadow-[0_0_20px_rgba(255,106,26,0.4)]"
      }`}
    >
      {completed ? (
        <span className="flex items-center justify-center gap-2">
          ✅ Урок пройден
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          📝 Отметить как пройденный
        </span>
      )}
    </motion.button>
  );
}