"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type LineType = "info" | "loading" | "success" | "error";

type TerminalLine = {
  type: LineType;
  text: string;
};

type ScriptItem = {
  cmd: string;
  out: TerminalLine[];
};

const SCRIPT: ScriptItem[] = [
  {
    cmd: "docker pull nginx",
    out: [
      { type: "info", text: "Using default tag: latest" },
      { type: "info", text: "latest: Pulling from library/nginx" },
      { type: "loading", text: "Downloading layers..." },
      { type: "success", text: "Digest: sha256:8f…" },
    ],
  },
  {
    cmd: "docker run -d -p 80:80 nginx",
    out: [
      { type: "loading", text: "Starting container..." },
      { type: "success", text: "Container started: 9f3c1a2b7d" },
    ],
  },
  {
    cmd: "docker ps",
    out: [
      { type: "info", text: "CONTAINER ID   IMAGE     COMMAND                  STATUS          PORTS                NAMES" },
      { type: "info", text: "9f3c1a2b7d     nginx     \"nginx -g 'daemon of…'\"   Up 10 seconds   0.0.0.0:80->80/tcp   nginx-web" },
    ],
  },
  {
    cmd: "curl http://localhost",
    out: [
      { type: "info", text: "<html>" },
      { type: "info", text: "<body><h1>Welcome to nginx!</h1></body>" },
      { type: "info", text: "</html>" },
    ],
  },
  {
    cmd: "docker logs nginx-web",
    out: [
      { type: "error", text: "Warning: deprecated config detected" },
      { type: "info", text: "nginx: worker process started" },
    ],
  },
];

export function AnimatedTerminal() {
  const [currentCommand, setCurrentCommand] = useState("");
  const [output, setOutput] = useState<TerminalLine[]>([]);
  const [cmdIndex, setCmdIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [outIndex, setOutIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const current = SCRIPT[cmdIndex];

    // Печать команды
    if (isTyping) {
      const interval = setInterval(() => {
        if (charIndex < current.cmd.length) {
          setCurrentCommand(current.cmd.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 45);

      return () => clearInterval(interval);
    }

    // Печать вывода
    if (!isTyping && outIndex < SCRIPT[cmdIndex].out.length) {
      const timeout = setTimeout(() => {
        setOutput((prev) => [...prev, SCRIPT[cmdIndex].out[outIndex]]);
        setOutIndex(outIndex + 1);
      }, 250);

      return () => clearTimeout(timeout);
    }

    // Переход к следующей команде
    if (outIndex === SCRIPT[cmdIndex].out.length) {
      const timeout = setTimeout(() => {
        setCurrentCommand("");
        setOutput([]);
        setCharIndex(0);
        setOutIndex(0);
        setIsTyping(true);
        setCmdIndex((cmdIndex + 1) % SCRIPT.length);
      }, 1800);

      return () => clearTimeout(timeout);
    }
  }, [charIndex, isTyping, outIndex, cmdIndex]);

  return (
    <motion.div
      whileHover={{ rotateX: 4, rotateY: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className="w-full h-full rounded-xl border border-slate-800 bg-black/60 backdrop-blur-xl p-4 font-mono text-sm text-slate-200 shadow-[0_0_40px_rgba(0,0,0,0.4)] overflow-hidden"
    >
      {/* Prompt */}
      <div className="text-green-400 mb-2">devlab@local:~$</div>

      {/* Command typing */}
      <div className="flex mb-4">
        <span className="text-orange-400">{currentCommand}</span>
        <span className="animate-pulse ml-1">▊</span>
      </div>

      {/* Output */}
      <div className="space-y-1">
        {output.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={
              line.type === "error"
                ? "text-red-400"
                : line.type === "success"
                ? "text-green-400"
                : line.type === "loading"
                ? "text-yellow-400"
                : "text-slate-400"
            }
          >
            {line.type === "loading" ? "⠋ " : ""}
            {line.text}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
