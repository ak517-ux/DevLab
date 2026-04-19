import fs from "fs";
import path from "path";
import { LessonRenderer } from "@/components/lesson/LessonRenderer";

export default function LessonPage({ params }) {
  const { courseSlug, lessonSlug } = params;

  const lessonPath = path.join(
    process.cwd(),
    "courses",
    courseSlug,
    "lessons",
    `${lessonSlug}.json`
  );

  const lesson = JSON.parse(fs.readFileSync(lessonPath, "utf8"));

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-8">{lesson.title}</h1>
      <LessonRenderer lesson={lesson} />
    </main>
  );
}
