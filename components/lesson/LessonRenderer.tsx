"use client";

import { useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import IntroText from "@/components/lesson/blocks/IntroText";
import PacketJourney2D from "@/components/lesson/blocks/PacketJourney2D";
import PacketStructure from "@/components/lesson/blocks/PacketStructure";

type LessonBlock = {
  id?: string;
  type: string;
  content: any;
};

type Lesson = {
  id?: string;
  title?: string;
  description?: string;
  type?: string;
  blocks?: LessonBlock[];
};

// Компонент теста
function QuizBlockComponent({ question, options, correct, index }: { question: string; options: string[]; correct: number; index: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Фиксированный ID на основе индекса (не меняется)
  const radioName = `quiz-${index}`;

  const handleCheck = () => {
    if (selected === null) {
      alert("Выберите вариант ответа");
      return;
    }
    
    const correct_answer = selected === correct;
    setIsCorrect(correct_answer);
    setIsAnswered(true);
  };

  const handleReset = () => {
    setSelected(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
      <h3 className="text-xl font-semibold text-white mb-4">{question || "Вопрос"}</h3>
      <div className="space-y-3">
        {options && options.map((opt: string, idx: number) => (
          <div 
            key={idx} 
            className={`flex items-center gap-3 p-3 rounded-lg transition cursor-pointer
              ${selected === idx ? 'bg-[#FF6A1A]/20 border border-[#FF6A1A]' : 'bg-white/5 hover:bg-white/10'}
              ${isAnswered && idx === correct ? 'bg-green-500/20 border-green-500' : ''}
              ${isAnswered && selected === idx && idx !== correct ? 'bg-red-500/20 border-red-500' : ''}
            `}
            onClick={() => !isAnswered && setSelected(idx)}
          >
            <input 
              type="radio" 
              name={radioName}
              checked={selected === idx}
              onChange={() => !isAnswered && setSelected(idx)}
              className="w-4 h-4 accent-[#FF6A1A]"
              disabled={isAnswered}
            />
            <label className="text-slate-300 flex-1 cursor-pointer">{opt}</label>
            {isAnswered && idx === correct && <span className="text-green-400">✓ Правильно</span>}
            {isAnswered && selected === idx && idx !== correct && <span className="text-red-400">✗ Неправильно</span>}
          </div>
        ))}
      </div>
      
      {!isAnswered ? (
        <button 
          onClick={handleCheck}
          className="mt-6 px-6 py-2 bg-[#FF6A1A] rounded-lg hover:bg-[#ff7f3a] transition font-semibold"
        >
          Проверить ответ
        </button>
      ) : (
        <div className="mt-6 space-y-3">
          <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'}`}>
            <p className={isCorrect ? 'text-green-400' : 'text-red-400'}>
              {isCorrect ? '✅ Правильно! Отличная работа!' : `❌ Неправильно. Правильный ответ: ${options[correct]}`}
            </p>
          </div>
          <button 
            onClick={handleReset}
            className="px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            Попробовать снова
          </button>
        </div>
      )}
    </div>
  );
}

// Компонент терминала
function TerminalBlock({ command, output, hint }: { command: string; output: string[]; hint?: string }) {
  const [showOutput, setShowOutput] = useState(false);

  return (
    <div className="bg-black/60 border border-white/10 rounded-2xl p-6 font-mono">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-xs text-slate-500 ml-2">terminal</span>
      </div>
      <div className="text-green-400 mb-3">$ {command}</div>
      
      {!showOutput ? (
        <button
          onClick={() => setShowOutput(true)}
          className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition text-sm"
        >
          ▶ Запустить
        </button>
      ) : (
        <pre className="text-slate-300 text-sm whitespace-pre-wrap">
          {Array.isArray(output) ? output.join('\n') : output}
        </pre>
      )}
      
      {hint && (
        <div className="mt-3 text-xs text-slate-500 border-t border-white/10 pt-3">
          💡 Подсказка: {hint}
        </div>
      )}
    </div>
  );
}

export function LessonRenderer({ lesson }: { lesson: Lesson }) {
  let blocks: LessonBlock[] = [];
  
  if (lesson.blocks && Array.isArray(lesson.blocks)) {
    blocks = lesson.blocks;
  }
  
  if (blocks.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p>В этом уроке пока нет контента.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {blocks.map((block, index) => {
        const blockContent = block.content || block;
        
        switch (block.type) {
          case "intro":
            return <IntroText key={block.id || index} />;

          case "text":
            // Получаем текст из разных возможных полей
            let textContent = blockContent.content || blockContent.markdown || blockContent.text;
            if (!textContent && typeof blockContent === 'string') {
              textContent = blockContent;
            }
            if (!textContent) {
              textContent = "Пустой блок";
            }
            return (
              <div key={block.id || index} className="prose prose-invert max-w-none" data-color-mode="dark">
                <MDEditor.Markdown 
                  source={textContent}
                  style={{ background: 'transparent', color: 'white' }}
                />
              </div>
            );

          case "visual":
            if (blockContent.variant === "packet-structure") {
  return <PacketStructure key={block.id || index} />;
}
            if (blockContent.variant === "journey-2d") {
              return <PacketJourney2D key={block.id || index} />;
            }
            return (
              <div key={block.id || index} className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold text-white mb-2">{blockContent.title || "Визуализация"}</h3>
                <p className="text-slate-300">{blockContent.text || "Интерактивная визуализация"}</p>
              </div>
            );

          case "terminal":
            return (
              <TerminalBlock
                key={block.id || index}
                command={blockContent.command || "echo 'Hello World'"}
                output={blockContent.output || ["Команда выполнена"]}
                hint={blockContent.hint}
              />
            );

          case "quiz":
  return (
    <QuizBlockComponent 
      key={block.id || index}
      index={index}
      question={blockContent.question}
      options={blockContent.options}
      correct={blockContent.correct}
    />
  );

          default:
            return (
              <div key={block.id || index} className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 text-yellow-400">
                Неподдерживаемый тип блока: {block.type}
              </div>
            );
        }
      })}
    </div>
  );
}