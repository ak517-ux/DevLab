"use client";

type LabStep = {
  id: string;
  title: string;
  description?: string;
  terminal?: {
    expected?: string;
    hint?: string;
  };
  visualization?: unknown;
};

export function LabBlock({
  engine,
  steps,
}: {
  engine?: string;
  steps: LabStep[];
}) {
  return (
    <section className="space-y-6">
      {engine && (
        <div className="text-sm text-slate-500">
          Лаборатория: <span className="text-slate-300">{engine}</span>
        </div>
      )}

      {steps.map((step) => (
        <article
          key={step.id}
          className="rounded-xl border border-slate-800 bg-slate-950/50 p-5"
        >
          <h3 className="text-xl font-medium mb-2">{step.title}</h3>

          {step.description ? (
            <p className="text-slate-300 mb-4">{step.description}</p>
          ) : null}

          {step.terminal ? (
            <div className="rounded-lg border border-slate-800 bg-black/50 p-4 font-mono text-sm">
              <div className="text-slate-500 mb-1">Ожидаемая команда:</div>
              <div className="text-orange-400 break-all">
                {step.terminal.expected ?? "—"}
              </div>
              {step.terminal.hint ? (
                <div className="text-slate-500 mt-2">
                  Подсказка: {step.terminal.hint}
                </div>
              ) : null}
            </div>
          ) : null}

          {step.visualization ? (
            <pre className="mt-4 rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-xs text-slate-400 overflow-auto">
              {JSON.stringify(step.visualization, null, 2)}
            </pre>
          ) : null}
        </article>
      ))}
    </section>
  );
}
