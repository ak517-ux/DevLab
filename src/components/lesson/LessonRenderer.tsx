"use client";

import { LabBlock } from "@/components/lab/LabBlock";

export function LessonRenderer({ lesson }: { lesson: any }) {
  return (
    <div className="space-y-12">
      {lesson.content.map((block: any, i: number) => {
        if (block.type === "text") {
          return (
            <p key={i} className="text-lg leading-relaxed text-slate-300">
              {block.value}
            </p>
          );
        }

        if (block.type === "lab") {
          return (
            <LabBlock
              key={i}
              engine={block.engine}
              steps={block.steps}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
