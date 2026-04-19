"use client";

import { useState } from "react";
import type { DevLabEngineName } from "@/lib/devlab/types";
import { InteractiveTerminal } from "@/components/terminal/InteractiveTerminal";
import { LabVisualization } from "./LabVisualization";

type LabStep = {
  expect: string;
  hint?: string;
  successText?: string;
};

type Props = {
  engine: DevLabEngineName;
  steps: LabStep[];
};

export function LabBlock({ engine, steps }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];

  return (
    <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-sm text-slate-400 mb-1">
            Шаг {currentStep + 1} из {steps.length}
          </div>
          <div className="text-slate-100">
            Ожидаемая команда:{" "}
            <code className="text-orange-400">{step.expect}</code>
          </div>
          {step.hint && (
            <div className="text-sm text-slate-400 mt-2">
              Подсказка: {step.hint}
            </div>
          )}
        </div>

        <InteractiveTerminal
          engine={engine}
          expect={step.expect}
          onSuccess={() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep((s) => s + 1);
            }
          }}
        />
      </div>

      <LabVisualization engine="docker" />
    </div>
  );
}
