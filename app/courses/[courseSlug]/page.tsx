import fs from "fs";
import path from "path";
import Link from "next/link";

export default function CoursePage({ params }) {
  const { courseSlug } = params;

  const coursePath = path.join(process.cwd(), "courses", courseSlug, "course.json");
  const course = JSON.parse(fs.readFileSync(coursePath, "utf8"));

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-8">{course.title}</h1>

      <div className="space-y-4">
        {course.lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/courses/${courseSlug}/lessons/${lesson.id}`}
            className="block p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-orange-500 transition"
          >
            <h2 className="text-xl font-medium">{lesson.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
