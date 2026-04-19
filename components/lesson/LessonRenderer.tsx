"use client";

import { LabBlock } from "@/components/lab/LabBlock";

export function LessonRenderer({ lesson }) {
  return (
    <div className="space-y-12">
      {lesson.content.map((block, i) => {
        switch (block.type) {
          case "text":
            return (
              <p key={i} className="text-lg leading-relaxed text-slate-300">
                {block.value}
              </p>
            );

          case "lab":
            return (
              <LabBlock
                key={i}
                engine={block.engine}
                steps={block.steps}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
