"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LessonProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      const progressValue = height > 0 ? scrollTop / height : 0;
      setProgress(progressValue);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
      <motion.div
        className="h-full bg-[#FF6A1A]"
        style={{ scaleX: progress, transformOrigin: "0%" }}
        animate={{ scaleX: progress }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}