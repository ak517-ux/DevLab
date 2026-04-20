import fs from "fs";
import path from "path";
import SidebarLessons from "@/components/SidebarLessons";
import LessonNavigation from "@/components/LessonNavigation";
import { notFound } from "next/navigation";

type Lesson = {
  id: string;
  title: string;
};

type ModuleData = {
  lessons: Lesson[];
};

type LessonSection = {
  title: string;
  content: string;
};

type LessonData = {
  title: string;
  sections?: LessonSection[];
};

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = await params;

  const modulePath = path.join(
    process.cwd(),
    "courses",
    "docker-basics",
    "lessons",
    `module-${moduleId}`,
    "module.json"
  );

  const lessonPath = path.join(
    process.cwd(),
    "courses",
    "docker-basics",
    "lessons",
    `module-${moduleId}`,
    `${lessonId}.json`
  );

  if (!fs.existsSync(modulePath) || !fs.existsSync(lessonPath)) {
    notFound();
  }

  const moduleData = JSON.parse(fs.readFileSync(modulePath, "utf8")) as ModuleData;
  const lessonData = JSON.parse(fs.readFileSync(lessonPath, "utf8")) as LessonData;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
        <SidebarLessons moduleId={moduleId} lessons={moduleData.lessons} />

        <main className="space-y-10">
          <h1 className="text-3xl md:text-5xl font-bold">{lessonData.title}</h1>

          {lessonData.sections?.map((s, i: number) => (
            <section key={i}>
              <h2 className="text-2xl font-semibold text-[#FF6A1A] mb-2">
                {s.title}
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                {s.content}
              </p>
            </section>
          ))}

          <LessonNavigation
            moduleId={moduleId}
            lessons={moduleData.lessons}
            currentLessonId={lessonId}
          />
        </main>
      </div>
    </div>
  );
}
