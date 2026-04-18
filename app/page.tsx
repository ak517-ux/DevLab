"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { AnimatedTerminal } from "@/components/AnimatedTerminal";

export default function HomePage() {
  const { scrollY } = useScroll();

  const bgY = useTransform(scrollY, [0, 400], [0, -140]);
  const bgOpacity = useTransform(scrollY, [0, 300], [1, 0.25]);
  const cardY = useTransform(scrollY, [0, 400], [0, 90]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 space-y-40">

      {/* HERO */}
      <section className="relative grid md:grid-cols-2 gap-12 items-center overflow-hidden">

        {/* Parallax background */}
        <motion.div
          style={{ y: bgY, opacity: bgOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#3CCBFF_0,_transparent_60%),_radial-gradient(circle_at_bottom,_#FF7A3C_0,_transparent_60%)] opacity-30"
        />

        {/* Left text */}
        <div className="relative z-10 flex flex-col justify-center">
          <Reveal>
            <h1 className="text-5xl font-semibold tracking-tight mb-6 leading-tight">
              Учись через практику.
              <span className="text-orange-400"> Без воды.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">
              DevLab — интерактивные лаборатории по Docker, HTTP, Linux и DevOps.
              Ты не читаешь — ты делаешь. И видишь результат сразу.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex gap-4">
              <Link
                href="/courses"
                className="px-7 py-3 rounded-md bg-orange-500 text-black font-medium hover:bg-orange-400 transition"
              >
                Начать обучение
              </Link>

              <Link
                href="/about"
                className="px-7 py-3 rounded-md border border-slate-700 hover:border-slate-500 transition"
              >
                Узнать больше
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Right terminal */}
        <motion.div style={{ y: cardY }} className="relative z-10 h-64">
          <AnimatedTerminal />
        </motion.div>
      </section>


      {/* FEATURES */}
      <section>
        <Reveal>
          <h2 className="text-3xl font-semibold mb-12">Почему DevLab?</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-10">
          <Reveal>
            <Feature
              title="Интерактив"
              text="Каждый урок — это действие. Терминал, визуализации, практические шаги."
            />
          </Reveal>

          <Reveal delay={0.15}>
            <Feature
              title="Минимализм"
              text="Чистый интерфейс без мусора. Только ты и обучение."
            />
          </Reveal>

          <Reveal delay={0.3}>
            <Feature
              title="Гибкость"
              text="Курсы в JSON, легко расширяемая архитектура, быстрый рост платформы."
            />
          </Reveal>
        </div>
      </section>

      {/* POPULAR COURSES */}
      <section>
        <Reveal>
          <h2 className="text-3xl font-semibold mb-12">Популярные курсы</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-10">
          <Reveal>
            <CourseCard title="Docker: основы" slug="docker-basics" icon="🐳" />
          </Reveal>

          <Reveal delay={0.15}>
            <CourseCard title="HTTP: протокол" slug="http-basics" icon="🌐" />
          </Reveal>

          <Reveal delay={0.3}>
            <CourseCard title="Linux: базовые команды" slug="linux-basics" icon="🐧" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="border border-slate-800 rounded-2xl p-8 bg-slate-950/40 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function CourseCard({
  title,
  slug,
  icon,
}: {
  title: string;
  slug: string;
  icon: string;
}) {
  return (
    <Link
      href={`/courses/${slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40 p-8 transition hover:border-slate-700 hover:bg-slate-900/40 hover:scale-[1.02] hover:-translate-y-1 shadow-[0_0_40px_rgba(0,0,0,0.3)]"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-slate-500 text-sm">Открыть курс →</p>
    </Link>
  );
}
