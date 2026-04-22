import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Lesson {
  id: string;
  title: string;
}

interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  // Путь к папке курса
  const courseDir = path.join(process.cwd(), "courses", slug);
  const courseJsonPath = path.join(courseDir, "course.json");
  const lessonsDir = path.join(courseDir, "lessons");
  
  // Проверяем существование курса
  let courseData;
  try {
    const content = fs.readFileSync(courseJsonPath, "utf-8");
    courseData = JSON.parse(content);
  } catch {
    notFound();
  }
  
  // Получаем все модули
  const modules: Module[] = [];
  try {
    const moduleFolders = fs.readdirSync(lessonsDir);
    
    for (const folder of moduleFolders) {
      const moduleJsonPath = path.join(lessonsDir, folder, "module.json");
      try {
        const moduleContent = fs.readFileSync(moduleJsonPath, "utf-8");
        const moduleData = JSON.parse(moduleContent);
        modules.push(moduleData);
      } catch {
        // Пропускаем, если нет module.json
      }
    }
    
    // Сортируем модули по id
    modules.sort((a, b) => a.id - b.id);
  } catch {
    // Папки lessons нет
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero секция */}
      <div className="relative h-80 overflow-hidden">
        {courseData.previewImage && (
          <div className="absolute inset-0">
            <img 
              src={courseData.previewImage} 
              alt={courseData.title}
              className="w-full h-full object-cover brightness-50"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">{courseData.icon || "📚"}</span>
            <h1 className="text-3xl md:text-5xl font-bold">{courseData.title}</h1>
          </div>
          <p className="text-slate-300 text-lg max-w-3xl">{courseData.description}</p>
        </div>
      </div>
      
      {/* Список модулей */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-8">Содержание курса</h2>
        
        {modules.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p>Модули в разработке</p>
          </div>
        ) : (
          <div className="space-y-6">
            {modules.map((module) => (
              <div key={module.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-xl font-semibold text-white">
                    Модуль {module.id}: {module.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">{module.description}</p>
                </div>
                
                <div className="divide-y divide-white/5">
                  {module.lessons.map((lesson, idx) => (
                    <Link
                      key={lesson.id}
                      href={`/courses/${slug}/${module.id}/${lesson.id}`}
                      className="flex items-center justify-between p-4 hover:bg-white/5 transition group"
                    >
                      <div className="flex items-center gap-3">
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}