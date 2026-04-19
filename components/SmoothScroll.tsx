import type { ReactNode } from "react";
import { LenisProvider } from "@/app/providers/LenisProvider";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return <LenisProvider>{children}</LenisProvider>;
}
