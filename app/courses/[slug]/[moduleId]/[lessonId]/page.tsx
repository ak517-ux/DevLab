import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { LessonRenderer } from "@/components/lesson/LessonRenderer";
import LessonProgressBar from "@/components/lesson/LessonProgressBar";
import CompleteLessonButton from "@/components/lesson/CompleteLessonButton";
import Link from "next/link";

interface LessonData {
  title: string;
  description?: string;
  blocks: any[];
}

interface ModuleData {
  id: number;
  title: string;
  description: string;
  lessons: { id: string; title: string }[];
}

export default async function LessonPage({ params }: { params: { slug: string; moduleId: string; lessonId: string } }) {
  const { slug, moduleId, lessonId } = await params;
  
  const lessonPath = path.join(
    process.cwd(),
    "courses",
    slug,
    "lessons",
    `module-${moduleId}`,
    `${lessonId}.json`
  );
  
  const modulePath = path.join(
    process.cwd(),
    "courses",
    slug,
    "lessons",
    `module-${moduleId}`,
    "module.json"
  );
  
  let lessonData: LessonData;
  let moduleData: ModuleData;
  
  try {
    const lessonContent = fs.readFileSync(lessonPath, "utf-8");
    lessonData = JSON.parse(lessonContent);
  } catch {
    notFound();
  }
  
  try {
    const moduleContent = fs.readFileSync(modulePath, "utf-8");
    moduleData = JSON.parse(moduleContent);
  } catch {
    moduleData = {
      id: parseInt(moduleId),
      title: `Модуль ${moduleId}`,
      description: "",
      lessons: [{ id: lessonId, title: lessonData.title }]
    };
  }
  
  const coursePath = path.join(process.cwd(), "courses", slug, "course.json");
  let courseIcon = "📚";
  try {
    const courseContent = fs.readFileSync(coursePath, "utf-8");
    const courseData = JSON.parse(courseContent);
    courseIcon = courseData.icon || "📚";
  } catch {
    // Используем значение по умолчанию
  }
  
  const currentIndex = moduleData.lessons.findIndex((l: { id: string }) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? moduleData.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < moduleData.lessons.length - 1 ? moduleData.lessons[currentIndex + 1] : null;
  
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Фоновая сетка */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,106,26,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      <LessonProgressBar />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        {/* Навигация назад к модулю */}
        <Link 
          href={`/courses/${slug}/${moduleId}`}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-6 group"
        >
          <span className="group-hover:-translate-x-1 transition">←</span>
          Назад к модулю {moduleId}: <span className="text-[#FF6A1A]">{moduleData.title}</span>
        </Link>
        
        {/* Заголовок урока с иконкой курса */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{courseIcon}</span>
          <h1 className="text-3xl md:text-5xl font-bold">{lessonData.title}</h1>
        </div>
        {lessonData.description && (
          <p className="text-slate-400 text-lg mb-8 border-l-2 border-[#FF6A1A] pl-4">
            {lessonData.description}
          </p>
        )}
        
        {/* Содержание урока */}
        <LessonRenderer lesson={lessonData} />
        
        {/* Кнопка завершения урока */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <CompleteLessonButton 
            lessonId={lessonId} 
            moduleId={parseInt(moduleId)}
          />
        </div>
        
        {/* Навигация между уроками - ИСПРАВЛЕНО */}
        <div className="flex justify-between items-center gap-4 mt-12 pt-8 border-t border-white/10">
          {prevLesson ? (
            <Link
              href={`/courses/${slug}/${moduleId}/${prevLesson.id}`}
              className="px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all group flex items-center gap-2"
            >
              <span className="group-hover:-translate-x-1 transition">←</span>
              <span className="hidden sm:inline">{prevLesson.title}</span>
              <span className="sm:hidden">Назад</span>
            </Link>
          ) : (
            <div className="w-32 opacity-0 pointer-events-none" />
          )}
          
          <div className="text-center text-slate-500 text-sm">
            {currentIndex + 1} / {moduleData.lessons.length}
          </div>
          
          {nextLesson ? (
            <Link
              href={`/courses/${slug}/${moduleId}/${nextLesson.id}`}
              className="px-6 py-3 bg-[#FF6A1A] rounded-xl hover:bg-[#ff7f3a] transition-all group flex items-center gap-2 font-semibold"
            >
              <span className="hidden sm:inline">{nextLesson.title}</span>
              <span className="sm:hidden">Далее</span>
              <span className="group-hover:translate-x-1 transition">→</span>
            </Link>
          ) : (
            <Link
              href={`/courses/${slug}/${moduleId}`}
              className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 rounded-xl transition-all group flex items-center gap-2"
            >
              <span>Завершить модуль</span>
              <span className="group-hover:translate-x-1 transition">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}