import { getCourseBySlug } from '@/lib/courses/getCourseBySlug';
import Link from 'next/link';

interface Props {
  params: {
    slug: string;
  };
}

export default function CoursePage({ params }: Props) {
  const course = getCourseBySlug(params.slug);

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-4">{course.title}</h1>

      <p className="text-slate-400 mb-8 max-w-2xl">{course.description}</p>

      <div className="mb-10">
        <span className="px-3 py-1 text-xs rounded-md bg-slate-800 text-slate-300 uppercase tracking-wide">
          {course.level}
        </span>
      </div>

      <h2 className="text-xl font-medium mb-4">Уроки</h2>

      <div className="space-y-3">
        {course.lessons.map((lesson: any) => (
          <Link
            key={lesson.id}
            href={`/lesson/${course.slug}/${lesson.id}`}
            className="block border border-slate-800 rounded-lg p-4 bg-slate-950/40 hover:bg-slate-900/40 transition"
          >
            <div className="font-medium">{lesson.title}</div>
            <div className="text-xs text-slate-500 mt-1">{lesson.type}</div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href={`/lesson/${course.slug}/${course.lessons[0].id}`}
          className="px-6 py-3 rounded-md bg-orange-500 text-sm font-medium hover:bg-orange-400 transition"
        >
          Начать курс
        </Link>
      </div>
    </main>
  );
}
