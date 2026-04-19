import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

type CourseLesson = {
  id: string;
  title: string;
  type?: string;
};

type Course = {
  id: string;
  title: string;
  description?: string;
  lessons: CourseLesson[];
};

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;

  if (!courseSlug) notFound();

  const coursePath = path.join(process.cwd(), "courses", courseSlug, "course.json");

  if (!fs.existsSync(coursePath)) notFound();

  const course = JSON.parse(fs.readFileSync(coursePath, "utf8")) as Course;

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
