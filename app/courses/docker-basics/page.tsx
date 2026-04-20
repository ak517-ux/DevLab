"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const modules = [
  "Введение в контейнеризацию",
  "Первые шаги с Docker",
  "Docker Images",
  "Dockerfile",
  "Управление данными",
  "Сети Docker",
  "Docker Compose",
  "Оптимизация и внутренности",
  "Финальный проект",
];

function CertificatePreview() {
  return (
    <div className="relative w-full max-w-xl aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.7)]">
      <svg
        viewBox="0 0 1200 675"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="cert-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="50%" stopColor="#0b1120" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="cert-accent" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF6A1A" />
            <stop offset="100%" stopColor="#ff924d" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="1200" height="675" fill="url(#cert-bg)" />

        <rect
          x="40"
          y="40"
          width="1120"
          height="595"
          rx="32"
          ry="32"
          fill="none"
          stroke="rgba(148,163,184,0.4)"
          strokeWidth="3"
        />

        <rect
          x="60"
          y="60"
          width="1080"
          height="555"
          rx="26"
          ry="26"
          fill="rgba(15,23,42,0.85)"
          stroke="rgba(148,163,184,0.25)"
          strokeWidth="2"
        />

        <rect
          x="60"
          y="60"
          width="1080"
          height="80"
          fill="rgba(15,23,42,0.9)"
        />
        <rect
          x="60"
          y="60"
          width="260"
          height="80"
          fill="rgba(15,23,42,1)"
        />

        <circle cx="110" cy="100" r="18" fill="url(#cert-accent)" />
        <polygon
          points="110,88 118,100 110,112 102,100"
          fill="rgba(15,23,42,1)"
        />

        <text
          x="140"
          y="106"
          fill="#e5e7eb"
          fontSize="30"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
          fontWeight="600"
        >
          DevLab
        </text>

        <text
          x="600"
          y="180"
          textAnchor="middle"
          fill="#e5e7eb"
          fontSize="40"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
          letterSpacing="0.18em"
        >
          СЕРТИФИКАТ О ЗАВЕРШЕНИИ
        </text>

        <text
          x="600"
          y="240"
          textAnchor="middle"
          fill="#9ca3af"
          fontSize="22"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          Настоящим подтверждается, что студент успешно завершил курс
        </text>

        <text
          x="600"
          y="310"
          textAnchor="middle"
          fill="#e5e7eb"
          fontSize="34"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
          fontWeight="600"
        >
          Docker: Основы контейнеризации
        </text>

        <text
          x="600"
          y="380"
          textAnchor="middle"
          fill="#f97316"
          fontSize="30"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
          fontWeight="600"
        >
          Имя студента
        </text>

        <text
          x="600"
          y="420"
          textAnchor="middle"
          fill="#9ca3af"
          fontSize="18"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          (подставляется автоматически после завершения курса)
        </text>

        <line
          x1="260"
          y1="500"
          x2="460"
          y2="500"
          stroke="rgba(148,163,184,0.6)"
          strokeWidth="2"
        />
        <text
          x="360"
          y="530"
          textAnchor="middle"
          fill="#e5e7eb"
          fontSize="18"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          Подпись DevLab
        </text>

        <text
          x="260"
          y="470"
          fill="#9ca3af"
          fontSize="16"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          ⬢ DevLab
        </text>

        <text
          x="740"
          y="500"
          fill="#9ca3af"
          fontSize="18"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          Дата: 2025-01-01
        </text>
        <text
          x="740"
          y="530"
          fill="#9ca3af"
          fontSize="18"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          Сертификат № DL-DOCKER-0001
        </text>

        <rect
          x="980"
          y="80"
          width="120"
          height="40"
          rx="20"
          ry="20"
          fill="rgba(15,23,42,1)"
          stroke="url(#cert-accent)"
          strokeWidth="2"
        />
        <text
          x="1040"
          y="107"
          textAnchor="middle"
          fill="#f97316"
          fontSize="18"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        >
          Docker
        </text>
      </svg>
    </div>
  );
}

export default function DockerBasicsPage() {
  return (
    <div className="w-full min-h-screen text-white flex justify-center">
      <div className="w-full max-w-7xl px-4 lg:px-8 py-10">

        {/* FLOATING TOP PROGRESS BAR */}
        <div className="fixed top-0 left-0 w-full h-[4px] bg-black/40 z-40">
          <motion.div
            className="h-full bg-[#FF6A1A]"
            style={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-12">

          {/* LEFT SIDEBAR WITH COURSE PROGRESS */}
          <aside className="hidden lg:flex flex-col gap-6 sticky top-10 h-fit bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <div>
              <h3 className="text-lg font-semibold mb-3">Прогресс курса</h3>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <svg viewBox="0 0 36 36" className="w-16 h-16">
                    <path
                      className="text-slate-700"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <motion.path
                      className="text-[#FF6A1A]"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      strokeDasharray="60, 100"
                      initial={{ strokeDasharray: "0, 100" }}
                      animate={{ strokeDasharray: "60, 100" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                    60%
                  </div>
                </div>
                <div className="text-sm text-slate-300">
                  <div className="font-medium text-white mb-1">
                    6 из 10 модулей
                  </div>
                  <div className="text-slate-400">
                    Продолжай — до сертификата осталось немного.
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <h3 className="text-lg font-semibold mb-3">Модули курса</h3>
              <div className="relative pl-3">
                <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-slate-700 rounded-full" />
                <ul className="space-y-3 text-slate-300 text-sm">
                  {modules.map((m, i) => (
                    <li key={m} className="relative flex items-center gap-2">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          i < 5
                            ? "bg-[#FF6A1A]"
                            : i === 5
                            ? "bg-[#FF6A1A]/70"
                            : "bg-slate-600"
                        }`}
                      />
                      <span
                        className={
                          i === 5
                            ? "text-white font-medium"
                            : i < 5
                            ? "text-slate-200"
                            : "text-slate-400"
                        }
                      >
                        {i + 1}. {m}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="space-y-16">

            {/* HERO */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full rounded-2xl overflow-hidden"
            >
              <div className="relative w-full h-[360px] md:h-[400px]">
                <Image
                  src="/images/docker-bg.png"
                  alt="Docker Background"
                  fill
                  className="object-cover brightness-[0.45]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                <div className="max-w-2xl">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Docker: Основы контейнеризации
                  </h1>
                  <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-6">
                    Освой технологию, на которой держится современная инфраструктура. 
                    Пойми, как работают контейнеры, научись создавать собственные образы, 
                    управлять сетями, томами и многоконтейнерными приложениями.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Link
                    href="/courses/docker-basics/intro"
                    className="w-full max-w-sm bg-[#FF6A1A] hover:bg-[#ff7f3a] transition-colors px-6 py-3 rounded-lg text-base md:text-lg font-semibold shadow-[0_0_24px_rgba(255,106,26,0.6)] text-center"
                  >
                    Начать обучение
                  </Link>
                  <div className="text-xs md:text-sm text-slate-300">
                    ~ 10 модулей • интерактивные задания • сертификат DevLab
                  </div>
                </div>
              </div>
            </motion.section>

            {/* MODULE CARDS */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                Модули курса
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {modules.map((title, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    whileHover={{ y: -4 }}
                    className="group bg-black/40 border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:border-[#FF6A1A]/60 hover:shadow-[0_0_30px_rgba(255,106,26,0.25)] transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">
                        {i + 1}. {title}
                      </h3>
                      <span className="text-xs text-slate-400">
                        {i < 5 ? "В процессе" : "Ожидает"}
                      </span>
                    </div>

                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-4">
                      <motion.div
                        className="h-full bg-[#FF6A1A]"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: i < 5 ? 0.7 : 0.15 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{ originX: 0 }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Link
                        href={`/courses/docker-basics/module-${i + 1}`}
                        className="text-[#FF6A1A] hover:text-[#ff9a55] text-sm font-medium"
                      >
                        Перейти к заданиям →
                      </Link>
                      <span className="text-xs text-slate-400">
                        ~ {i === modules.length - 1 ? "40" : "20"} минут
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* WHAT'S INSIDE */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                Что внутри курса
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Интерактивный терминал",
                    desc: "Выполняй команды Docker прямо в браузере в безопасной среде.",
                    img: "/images/docker-preview-terminal.png",
                  },
                  {
                    title: "Визуализации Docker",
                    desc: "Пойми, как устроены контейнеры, образы, сети и тома.",
                    img: "/images/docker-preview-diagram.png",
                  },
                  {
                    title: "Практические задания",
                    desc: "Реальные сценарии: от запуска контейнера до многоконтейнерного сервиса.",
                    img: "/images/docker-preview-tasks.png",
                  },
                ].map((block, i) => (
                  <motion.div
                    key={block.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md"
                  >
                    <div className="relative w-full h-40">
                      <Image
                        src={block.img}
                        alt={block.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {block.title}
                      </h3>
                      <p className="text-sm text-slate-300">{block.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* TEXT SECTIONS */}
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Что ты освоишь
              </h2>
              <ul className="space-y-3 text-slate-300 text-base md:text-lg">
                <li>• запуск и управление контейнерами как профессионал</li>
                <li>• создание оптимизированных Dockerfile</li>
                <li>• работа с образами, слоями и кэшированием</li>
                <li>• управление томами и сетями Docker</li>
                <li>• сборка многоконтейнерных приложений через Docker Compose</li>
                <li>• понимание внутренностей Docker: namespaces, cgroups, OverlayFS</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Почему Docker важен
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                Docker — это фундамент DevOps. Все современные сервисы, пайплайны, CI/CD, Kubernetes — 
                всё начинается с контейнеров. Если ты хочешь стать DevOps‑инженером, backend‑разработчиком 
                или просто понимать, как запускаются реальные сервисы — Docker обязателен.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Как построен курс
              </h2>
              <ul className="space-y-3 text-slate-300 text-base md:text-lg">
                <li>• чёткая теория без воды</li>
                <li>• визуализации, объясняющие сложные процессы</li>
                <li>• интерактивные терминалы, где ты вводишь команды</li>
                <li>• практические задания, приближённые к реальной работе</li>
                <li>• мини‑проекты, которые закрепляют знания</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Для кого этот курс
              </h2>
              <ul className="space-y-3 text-slate-300 text-base md:text-lg">
                <li>• начинающие DevOps‑инженеры</li>
                <li>• backend‑разработчики</li>
                <li>• студенты технических направлений</li>
                <li>• те, кто хочет перейти от «запуска на локалке» к реальной инфраструктуре</li>
              </ul>
            </section>

            {/* CERTIFICATE BLOCK */}
            <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                  Получите ваш сертификат DevLab
                </h2>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4">
                  После завершения всех модулей и финального проекта ты получишь именной сертификат DevLab 
                  по курсу «Docker: Основы контейнеризации». Его можно добавить в резюме, профиль на LinkedIn 
                  или использовать как подтверждение навыков при устройстве на работу.
                </p>
                <ul className="space-y-2 text-slate-300 text-sm md:text-base mb-6">
                  <li>• именной сертификат с логотипом DevLab</li>
                  <li>• уникальный номер и дата выдачи</li>
                  <li>• подтверждение прохождения всех модулей и проекта</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    className="w-full sm:w-auto bg-[#FF6A1A] hover:bg-[#ff7f3a] transition-colors px-6 py-3 rounded-lg text-sm md:text-base font-semibold shadow-[0_0_24px_rgba(255,106,26,0.6)]"
                    type="button"
                  >
                    Узнать условия получения сертификата
                  </button>
                  <div className="text-xs md:text-sm text-slate-400 flex items-center">
                    Сертификат доступен после завершения курса на 100%.
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
                <CertificatePreview />
              </motion.div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
