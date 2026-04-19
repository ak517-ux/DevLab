"use client";

import { LabBlock } from "@/components/lab/LabBlock";

type Lesson = {
  type: string;
  content?: Array<{ type: string; value?: string }>;
  steps?: Array<{
    id: string;
    title: string;
    description?: string;
    terminal?: { expected?: string; hint?: string };
    visualization?: unknown;
  }>;
  engine?: string;
};

export function LessonRenderer({ lesson }: { lesson: Lesson }) {
  if (lesson.type === "lab") {
    return <LabBlock engine={lesson.engine} steps={lesson.steps ?? []} />;
  }

  return (
    <div className="space-y-6">
      {(lesson.content ?? []).map((block, i) => {
        if (block.type !== "text") return null;

        return (
          <p key={i} className="text-lg leading-relaxed text-slate-300">
            {block.value ?? ""}
          </p>
        );
      })}
    </div>
  );
}
