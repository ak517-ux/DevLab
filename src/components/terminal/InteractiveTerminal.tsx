"use client";

import { useState } from "react";
import { DevLabEngine } from "@/lib/devlab/engine";
import type { DevLabEngineName } from "@/lib/devlab/types";

type Props = {
  engine: DevLabEngineName;
  expect?: string;
  onSuccess?: () => void;
};

export function InteractiveTerminal({ engine, expect, onSuccess }: Props) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const result = DevLabEngine.handleCommand(engine, cmd);

    setOutput((prev) => [
      ...prev,
      `devlab@local:~$ ${cmd}`,
      ...result.lines,
    ]);

    if (expect && cmd === expect.trim()) {
      onSuccess?.();
    }

    setInput("");
  };

  return (
    <div className="w-full h-full rounded-xl border border-slate-800 bg-black/70 p-4 font-mono text-sm text-slate-200 flex flex-col">
      <div className="flex-1 overflow-auto space-y-1 mb-3">
        {output.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-green-400">devlab@local:~$</span>
        <input
          className="flex-1 bg-transparent outline-none text-slate-100"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
