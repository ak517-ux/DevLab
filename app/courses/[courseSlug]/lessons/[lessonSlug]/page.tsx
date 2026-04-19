import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { LessonRenderer } from "@/components/lesson/LessonRenderer";

type Lesson = {
  id: string;
  title: string;
  type: "theory" | "lab" | string;
  engine?: string;
  content?: Array<{ type: string; value?: string }>;
  steps?: Array<{
    id: string;
    title: string;
    description?: string;
    terminal?: { expected?: string; hint?: string };
    visualization?: unknown;
  }>;
};

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = await params;

  if (!courseSlug || !lessonSlug) notFound();

  const lessonPath = path.join(
    process.cwd(),
    "courses",
    courseSlug,
    "lessons",
    `${lessonSlug}.json`
  );

  if (!fs.existsSync(lessonPath)) notFound();

  const lesson = JSON.parse(fs.readFileSync(lessonPath, "utf8")) as Lesson;

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-8">{lesson.title}</h1>
      <LessonRenderer lesson={lesson} />
    </main>
  );
}
