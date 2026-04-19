"use client";

import { useEffect, useState } from "react";
import { on } from "@/src/lib/devlab/events/eventBus";

type DockerContainer = { id: string; image: string; name: string };

type Props = {
  engine: "docker";
};

export function LabVisualization({ engine }: Props) {
  const [images, setImages] = useState<string[]>([]);
  const [containers, setContainers] = useState<DockerContainer[]>([]);

  useEffect(() => {
    if (engine !== "docker") return;

    on("docker:imagePulled", (image: { name: string }) => {
      setImages((prev) =>
        prev.includes(image.name) ? prev : [...prev, image.name]
      );
    });

    on("docker:containerCreated", (c: DockerContainer) => {
      setContainers((prev) => [...prev, c]);
    });
  }, [engine]);

  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 h-full flex flex-col gap-4">
      <div>
        <div className="text-sm font-medium text-slate-300 mb-2">Образы</div>
        <div className="flex flex-wrap gap-2">
          {images.length === 0 && (
            <div className="text-xs text-slate-500">Пока нет образов</div>
          )}
          {images.map((img) => (
            <div
              key={img}
              className="px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-100 border border-slate-700"
            >
              {img}:latest
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-slate-300 mb-2">
          Контейнеры
        </div>
        <div className="space-y-2">
          {containers.length === 0 && (
            <div className="text-xs text-slate-500">Пока нет контейнеров</div>
          )}
          {containers.map((c) => (
            <div
              key={c.id}
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-100"
            >
              <div className="font-mono text-[11px] mb-1">{c.id}</div>
              <div>{c.name}</div>
              <div className="text-slate-400">{c.image}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
