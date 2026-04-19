import Link from "next/link";
import fs from "fs";
import path from "path";

export default function CoursesPage() {
  const coursesDir = path.join(process.cwd(), "courses");
  const courseFolders = fs.readdirSync(coursesDir);

  const courses = courseFolders.map((folder) => {
    const jsonPath = path.join(coursesDir, folder, "course.json");
    const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    return { ...data, slug: folder };
  });

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-8">Курсы</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Link
            key={course.slug}
            href={`/courses/${course.slug}`}
            className="block p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-orange-500 transition"
          >
            <h2 className="text-xl font-medium mb-2">{course.title}</h2>
            <p className="text-slate-400 text-sm">{course.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
