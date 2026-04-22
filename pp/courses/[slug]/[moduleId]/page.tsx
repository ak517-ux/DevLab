import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getModuleProgress } from "@/lib/progress";

interface ModuleData {
  id: number;
  title: string;
  description: string;
  lessons: { id: string; title: string }[];
}

export default async function ModulePage({ params }: { params: { slug: string; moduleId: string } }) {
  const { slug, moduleId } = await params;
  
  const modulePath = path.join(
    process.cwd(),
    "courses",
    slug,
    "lessons",
    `module-${moduleId}`,
    "module.json"
  );
  
  let moduleData: ModuleData;
  try {
    const content = fs.readFileSync(modulePath, "utf-8");
    moduleData = JSON.parse(content);
  } catch {
    notFound();
  }
  
  // Получаем курс для навигации
  const coursePath = path.join(process.cwd(), "courses", slug, "course.json");
  let courseTitle = slug;
  try {
    const courseContent = fs.readFileSync(coursePath, "utf-8");
    const courseData = JSON.parse(courseContent);
    courseTitle = courseData.title;
  } catch {
    // Используем slug как запасной вариант
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Навигация назад к курсу */}
        <Link 
          href={`/courses/${slug}`}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-6"
        >
          ← Назад к курсу: {courseTitle}
        </Link>
        
        {/* Заголовок модуля */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Модуль {moduleId}: {moduleData.title}
        </h1>
        <p className="text-slate-400 text-lg mb-8">{moduleData.description}</p>
        
        {/* Список уроков */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold mb-4">Уроки модуля</h2>
          {moduleData.lessons.map((lesson, idx) => (
            <Link
              key={lesson.id}
              href={`/courses/${slug}/${moduleId}/${lesson.id}`}
              className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#FF6A1A]/50 transition group"
            >
              <div className="flex items-center gap-4">
                <span className="text-slate-500 text-sm w-8">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-white group-hover:text-[#FF6A1A] transition">
                  {lesson.title}
                </span>
              </div>
              <span className="text-slate-500 group-hover:text-[#FF6A1A] transition">
                →
              </span>
            </Link>
          ))}
        </div>
        
        {/* Прогресс модуля */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Прогресс модуля</span>
              <span className="text-[#FF6A1A]" id="module-progress-text">
                Загрузка...
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                id="module-progress-bar"
                className="h-full bg-[#FF6A1A] rounded-full transition-all duration-500"
                style={{ width: '0%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}