import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import ModuleProgress from "@/components/courses/ModuleProgress";

interface Lesson {
  id: string;
  title: string;
}

interface ModuleData {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

export default async function ModulePage({ params }: { params: { slug: string; moduleId: string } }) {
  const { slug, moduleId } = await params;
  
  // Путь к файлу модуля
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
  
  // Получаем информацию о курсе для навигации
  const coursePath = path.join(process.cwd(), "courses", slug, "course.json");
  let courseTitle = slug;
  let courseIcon = "📚";
  try {
    const courseContent = fs.readFileSync(coursePath, "utf-8");
    const courseData = JSON.parse(courseContent);
    courseTitle = courseData.title;
    courseIcon = courseData.icon || "📚";
  } catch {
    // Используем значения по умолчанию
  }
  
  // Проверяем, есть ли следующий модуль
  const nextModuleId = parseInt(moduleId) + 1;
  const nextModulePath = path.join(
    process.cwd(),
    "courses",
    slug,
    "lessons",
    `module-${nextModuleId}`,
    "module.json"
  );
  let hasNextModule = false;
  try {
    await fs.promises.access(nextModulePath);
    hasNextModule = true;
  } catch {
    hasNextModule = false;
  }
  
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Фоновая сетка */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,106,26,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        {/* Навигация назад к курсу */}
        <Link 
          href={`/courses/${slug}`}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-6 group"
        >
          <span className="group-hover:-translate-x-1 transition">←</span>
          Назад к курсу: <span className="text-[#FF6A1A]">{courseTitle}</span>
        </Link>
        
        {/* Заголовок модуля с иконкой */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">{courseIcon}</span>
          <h1 className="text-3xl md:text-5xl font-bold">
            Модуль {moduleId}: {moduleData.title}
          </h1>
        </div>
        <p className="text-slate-400 text-lg mb-8 border-l-2 border-[#FF6A1A] pl-4">
          {moduleData.description}
        </p>
        
        {/* Прогресс модуля */}
        <div className="mb-8">
          <ModuleProgress moduleId={parseInt(moduleId)} lessons={moduleData.lessons} />
        </div>
        
        {/* Список уроков */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">📖</span>
            Уроки модуля
          </h2>
          {moduleData.lessons.map((lesson, idx) => (
            <Link
              key={lesson.id}
              href={`/courses/${slug}/${moduleId}/${lesson.id}`}
              className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#FF6A1A]/50 transition-all group hover:bg-white/10"
            >
              <div className="flex items-center gap-4">
                <span className="text-slate-500 text-sm w-8 font-mono">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-white group-hover:text-[#FF6A1A] transition">
                  {lesson.title}
                </span>
              </div>
              <span className="text-slate-500 group-hover:text-[#FF6A1A] transition group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>
        
        {/* Навигация к следующему модулю */}
        <div className="mt-8 pt-8 border-t border-white/10 flex justify-between">
          <div />
          {hasNextModule && (
            <Link
              href={`/courses/${slug}/${nextModuleId}`}
              className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition text-sm inline-flex items-center gap-2 group"
            >
              Следующий модуль
              <span className="group-hover:translate-x-1 transition">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}