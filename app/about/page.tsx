"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative">

      {/* Background grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.04] bg-[url('/grid.svg')] bg-[size:32px_32px]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/80 to-black" />

      <div className="max-w-5xl mx-auto px-6 py-24 space-y-32">

        {/* HERO */}
        <section className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold tracking-tight text-white"
          >
            DevLab — современная платформа для IT‑обучения
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-slate-300 text-lg md:text-xl max-w-3xl leading-relaxed"
          >
            Мы создаём новый формат обучения: визуальный, интерактивный и
            практический. Каждый урок — это мини‑приложение, а не скучный текст.
          </motion.p>
        </section>

        {/* PRINCIPLES */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold text-white">Наши принципы</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Визуальность"
              text="Сложные процессы объясняются через анимации, схемы и понятные модели."
            />
            <FeatureCard
              title="Интерактивность"
              text="Терминалы, симуляции, лаборатории — обучение через действие."
            />
            <FeatureCard
              title="Практика"
              text="Каждый урок приближен к реальной работе инженера."
            />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-white">Как работает DevLab</h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.3)]"
          >
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Уроки описываются в JSON. LessonRenderer превращает их в сцену:
              визуализации, терминалы, лабораторные шаги, квизы. Это позволяет
              авторам создавать контент без участия разработчиков.
            </p>

            <pre className="text-[#FF6A1A] text-sm bg-black/40 p-4 rounded-lg border border-white/10 overflow-auto">
{`{
  "title": "Первый контейнер",
  "blocks": [
    { "type": "wow", "title": "Вау‑сцена" },
    { "type": "visual", "variant": "port" },
    { "type": "terminal", "command": "docker run hello-world" }
  ]
}`}
            </pre>
          </motion.div>
        </section>

        {/* ROADMAP */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold text-white">Планы развития</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Интерактивный терминал",
              "Лаборатории Linux / Git / Docker / Kubernetes",
              "Профиль студента и прогресс",
              "Маркетплейс курсов",
              "AI‑ассистент внутри уроков",
              "Виртуальные окружения"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-md hover:border-[#FF6A1A]/60 hover:shadow-[0_0_25px_rgba(255,106,26,0.25)] transition-all"
              >
                <p className="text-slate-300 text-lg">{item}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-semibold text-white">Готов начать?</h2>
          <p className="text-slate-400 text-lg">
            Погрузись в интерактивные лаборатории DevLab.
          </p>

          <Link
            href="/courses"
            className="inline-block px-8 py-3 bg-[#FF6A1A] text-black font-semibold rounded-lg hover:bg-[#ff7f3a] transition shadow-[0_0_20px_rgba(255,106,26,0.4)]"
          >
            Перейти к курсам
          </Link>
        </section>
      </div>
    </div>
  );
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:border-[#FF6A1A]/40 hover:shadow-[0_0_25px_rgba(255,106,26,0.2)] transition-all"
    >
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-slate-300 text-sm leading-relaxed">{text}</p>
    </motion.div>
  );
}
