import fs from "fs";
import path from "path";
import Link from "next/link";

export default async function ModulePage({ params }: { params: { moduleId: string } }) {
  const { moduleId } = params;

  const modulePath = path.join(
    process.cwd(),
    "courses",
    "docker-basics",
    "lessons",
    `module-${moduleId}`,
    "module.json"
  );

  const moduleData = JSON.parse(fs.readFileSync(modulePath, "utf8"));

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            {moduleData.title}
          </h1>
          <p className="text-slate-300 text-lg">{moduleData.description}</p>
        </div>

        <div className="space-y-4">
          {moduleData.lessons.map((lesson: any, i: number) => (
            <Link
              key={lesson.id}
              href={`/courses/docker-basics/${moduleId}/${lesson.id}`}
              className="block bg-black/40 border border-white/10 rounded-xl p-5 hover:border-[#FF6A1A]/60 hover:shadow-[0_0_20px_rgba(255,106,26,0.3)] transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">
                    {i + 1}. {lesson.title}
                  </h3>
                </div>
                <span className="text-[#FF6A1A] font-medium">Перейти →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
