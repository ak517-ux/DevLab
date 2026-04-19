"use client";

import { LenisProvider } from "@/app/providers/LenisProvider";

export default function SmoothScroll({ children }) {
  return <LenisProvider>{children}</LenisProvider>;
}
