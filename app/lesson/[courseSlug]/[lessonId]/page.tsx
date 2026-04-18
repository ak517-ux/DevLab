import { getLesson } from '@/lib/courses/getLesson';
import { getCourseBySlug } from '@/lib/courses/getCourseBySlug';
import Link from 'next/link';

interface Props {
  params: {
    courseSlug: string;
    lessonId: string;
  };
}

export default function LessonPage({ params }: Props) {
  const course = getCourseBySlug(params.courseSlug);
  const lesson = getLesson(params.courseSlug, params.lessonId);

  const currentIndex = course.lessons.findIndex(
    (l: any) => l.id === params.lessonId
  );

  const nextLesson = course.lessons[currentIndex + 1];

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-6">{lesson.title}</h1>

      {/* Теоретический урок */}
      {lesson.type === 'theory' && (
        <div className="space-y-6 text-slate-300 leading-relaxed">
          {lesson.content.map((block: any, i: number) => (
            <p key={i}>{block.value}</p>
          ))}
        </div>
      )}

      {/* Лабораторный урок */}
      {lesson.type === 'lab' && (
        <div className="space-y-10">
          {lesson.steps.map((step: any) => (
            <div
              key={step.id}
              className="border border-slate-800 rounded-xl p-6 bg-slate-950/40"
            >
              <h2 className="text-xl font-medium mb-2">{step.title}</h2>
              <p className="text-slate-400 mb-4">{step.description}</p>

              {/* Терминал (пока заглушка) */}
              <div className="bg-black/60 border border-slate-800 rounded-lg p-4 font-mono text-sm text-slate-200">
                <div className="text-slate-500 mb-2">Терминал (симуляция)</div>
                <div className="text-slate-400">Ожидаем команду:</div>
                <div className="text-orange-400">{step.terminal.expected}</div>
                <div className="text-slate-500 mt-2 text-xs">
                  Подсказка: {step.terminal.hint}
                </div>
              </div>

              {/* Визуализация (пока заглушка) */}
              <div className="mt-6 bg-slate-900/40 border border-slate-800 rounded-lg p-4">
                <div className="text-slate-500 text-sm mb-2">
                  Визуализация (будет позже)
                </div>
                <pre className="text-xs text-slate-500">
                  {JSON.stringify(step.visualization, null, 2)}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Навигация */}
      <div className="mt-12 flex justify-between">
        <Link
          href={`/courses/${course.slug}`}
          className="text-slate-500 hover:text-slate-300 transition"
        >
          ← Назад к курсу
        </Link>

        {nextLesson && (
          <Link
            href={`/lesson/${course.slug}/${nextLesson.id}`}
            className="px-6 py-3 rounded-md bg-orange-500 text-sm font-medium hover:bg-orange-400 transition"
          >
            Следующий урок →
          </Link>
        )}
      </div>
    </main>
  );
}
