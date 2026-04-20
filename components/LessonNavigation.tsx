"use client";

import Link from "next/link";

export default function LessonNavigation({
  moduleId,
  lessons,
  currentLessonId,
}: {
  moduleId: string;
  lessons: { id: string; title: string }[];
  currentLessonId: string;
}) {
  const index = lessons.findIndex((l) => l.id === currentLessonId);

  const prev = index > 0 ? lessons[index - 1] : null;
  const next = index < lessons.length - 1 ? lessons[index + 1] : null;

  return (
    <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
      {prev ? (
        <Link
          href={`/courses/docker-basics/${moduleId}/${prev.id}`}
          className="px-4 py-2 bg-white/10 rounded-lg hover:bg:white/20 transition"
        >
          ← {prev.title}
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/courses/docker-basics/${moduleId}/${next.id}`}
          className="px-4 py-2 bg-[#FF6A1A] text-black font-semibold rounded-lg hover:bg-[#ff7f3a] transition"
        >
          {next.title} →
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
