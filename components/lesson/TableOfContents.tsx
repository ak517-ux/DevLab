"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: string;
  title: string;
  level: number;
  type: string;
}

interface TableOfContentsProps {
  blocks: any[];
}

// Функция для создания ID из заголовка (должна совпадать с той, что в LessonRenderer)
function generateIdFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-zа-яё0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

export default function TableOfContents({ blocks }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [sections, setSections] = useState<Section[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const extractedSections: Section[] = [];
    
    blocks.forEach((block, index) => {
      let title = "";
      let level = 2;
      let type = block.type;
      let id = "";
      
      if (block.type === "intro") {
        title = "📖 Введение";
        level = 2;
        id = "vvedenie";
      } else if (block.type === "text" && block.content) {
        const h2Match = block.content.match(/^## (.+)$/m);
        if (h2Match) {
          title = h2Match[1];
          level = 2;
          id = generateIdFromTitle(title);
        }
      } else if (block.type === "visual" && block.title) {
        title = block.title;
        level = 2;
        id = generateIdFromTitle(title);
      } else if (block.type === "terminal" && block.title) {
        title = block.title;
        level = 2;
        id = generateIdFromTitle(title);
      } else if (block.type === "quiz") {
        title = "📝 Тест";
        level = 2;
        id = `quiz-section-${index}`;
      }
      
      if (title && id) {
        extractedSections.push({ id, title, level, type });
      }
    });
    
    setSections(extractedSections);
    
    // Наблюдатель за секциями для подсветки активной
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -80px 0px" }
    );
    
    setTimeout(() => {
      extractedSections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.observe(element);
          console.log(`Найден элемент: ${section.id}`); // Для отладки
        } else {
          console.log(`Элемент НЕ найден: ${section.id}`); // Для отладки
        }
      });
    }, 500); // Увеличил задержку для полной загрузки DOM
    
    return () => observer.disconnect();
  }, [blocks]);
  
  const scrollToSection = (id: string) => {
    console.log(`Пытаемся скроллить к: ${id}`);
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      console.log(`Скролл к ${id} выполнен`);
    } else {
      console.log(`Элемент с id ${id} не найден на странице`);
    }
  };
  
  if (sections.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed top-20 left-6 z-30 hidden xl:block">
      {/* Кнопка-иконка в свёрнутом состоянии */}
      <AnimatePresence mode="wait">
        {!isExpanded && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsExpanded(true)}
            className="group relative bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-3 hover:border-[#FF6A1A]/50 transition-all duration-300 cursor-pointer"
          >
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF6A1A] rounded-full animate-pulse" />
            <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
              📑
            </div>
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md rounded-lg px-2 py-1 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Показать содержание
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Развёрнутое окно */}
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl w-72"
          >
            {/* Заголовок окна */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-[#FF6A1A]/10 to-transparent">
              <div className="flex items-center gap-2">
                <span className="text-sm">📑</span>
                <span className="text-xs font-medium text-white">Содержание урока</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition text-slate-400 hover:text-white"
                  title="Наверх"
                >
                  ↑
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition text-slate-400 hover:text-white"
                  title="Свернуть"
                >
                  ◀
                </button>
              </div>
            </div>
            
            {/* Список разделов */}
            <div 
              className="overflow-y-auto"
              style={{ 
                maxHeight: "60vh",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255, 106, 26, 0.5) rgba(255, 255, 255, 0.05)"
              }}
            >
              <div className="p-2 space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`group relative w-full text-left px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                      activeSection === section.id
                        ? "bg-gradient-to-r from-[#FF6A1A]/20 to-transparent text-[#FF6A1A] border-l-2 border-[#FF6A1A]"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                    style={{ paddingLeft: section.level === 3 ? "28px" : "12px" }}
                  >
                    <div className="flex items-center gap-2">
                      {activeSection === section.id && (
                        <div className="w-1.5 h-1.5 bg-[#FF6A1A] rounded-full" />
                      )}
                      <span className="text-xs truncate flex-1">
                        {section.level === 3 && "  • "}
                        {section.title}
                      </span>
                      {section.type === "quiz" && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-white/10 rounded-full text-slate-400">
                          ❓
                        </span>
                      )}
                      {section.type === "terminal" && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-white/10 rounded-full text-slate-400">
                          💻
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Футер окна */}
            <div className="px-3 py-2 border-t border-white/10 bg-black/40">
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>{sections.length} разделов</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span>Авто-подсветка</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          margin: 8px 0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 106, 26, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 106, 26, 0.8);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 106, 26, 0.5) rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
}