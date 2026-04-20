"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLessons({
  moduleId,
  lessons,
}: {
  moduleId: string;
  lessons: { id: string; title: string }[];
}) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col gap-4 sticky top-10 h-fit bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md w-64">
      <h3 className="text-lg font-semibold mb-2">Уроки модуля</h3>

      <ul className="space-y-2">
        {lessons.map((lesson, i) => {
          const url = `/courses/docker-basics/${moduleId}/${lesson.id}`;
          const isActive = pathname === url;

          return (
            <li key={lesson.id}>
              <Link
                href={url}
                className={`block px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-[#FF6A1A] text-black font-semibold"
                    : "text-slate-300 hover:bg-white/10"
                }`}
              >
                {i + 1}. {lesson.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
