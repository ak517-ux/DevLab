"use client";

import { LabBlock } from "@/src/components/lab/LabBlock";

type LessonBlock =
  | { type: "text"; value: string }
  | {
      type: "lab";
      engine: "docker";
      steps: Array<{ expect: string; hint?: string; successText?: string }>;
    };

type Lesson = {
  content: LessonBlock[];
};

export function LessonRenderer({ lesson }: { lesson: Lesson }) {
  return (
    <div className="space-y-12">
      {lesson.content.map((block, i) => {
        if (block.type === "text") {
          return (
            <p key={i} className="text-lg leading-relaxed text-slate-300">
              {block.value}
            </p>
          );
        }

        if (block.type === "lab") {
          return <LabBlock key={i} engine={block.engine} steps={block.steps} />;
        }

        return null;
      })}
    </div>
  );
}
