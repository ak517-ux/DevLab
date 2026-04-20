"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export function CourseCard({ course }) {
  const [hovered, setHovered] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!hovered) {
      setTyped("");
      return;
    }

    const lines = Array.isArray(course.previewCode)
      ? course.previewCode
      : typeof course.previewCode === "string"
      ? course.previewCode.split("\n")
      : [
          "docker run -it ubuntu bash",
          "docker ps -a",
          "docker build -t myapp ."
        ];

    const fullText = lines.join("\n");
    let i = 0;

    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 28);

    return () => clearInterval(interval);
  }, [hovered, course.previewCode]);

  return (
    <Link href={`/courses/${course.slug}`} className="block group">
      <div
        className="relative w-full h-72 perspective cursor-pointer transition-all duration-300"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
            hovered ? "rotate-y-180" : ""
          }`}
        >
          {/* FRONT */}
          <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_45px_-5px_rgba(255,120,40,0.55)] group-hover:border-orange-500/40 border border-slate-800">
            <Image
              src={course.previewImage}
              alt={course.title}
              fill
              className="object-cover brightness-[0.45]"
            />

            {/* затемнение + текст */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/75 via-black/40 to-transparent">
              {/* Docker icon */}
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src="/icons/docker.png"
                  alt="Docker"
                  width={26}
                  height={26}
                  className="opacity-90"
                />
                <span className="text-white/90 text-sm tracking-wide">
                  Docker Course
                </span>
              </div>

              <h2 className="text-2xl font-semibold text-white drop-shadow-md">
                {course.title}
              </h2>

              <p className="text-slate-300 text-sm mt-2 drop-shadow-sm leading-relaxed">
                {course.description}
              </p>
            </div>
          </div>

          {/* BACK — печатающийся код */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden border border-orange-500/40 shadow-[0_0_45px_-5px_rgba(255,120,40,0.55)]">
            <Image
              src={course.previewImage}
              alt={course.title}
              fill
              className="object-cover brightness-[0.3]"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <pre className="text-lg font-mono whitespace-pre-wrap leading-relaxed text-[#FF6A1A]">
                {typed}
                <span className="blinking-cursor">|</span>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
