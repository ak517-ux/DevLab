import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-800/60 bg-[#050509]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          DevLab
        </Link>

        <nav className="flex items-center gap-6 text-sm text-slate-300">
          <Link href="/courses" className="hover:text-white transition">
            Курсы
          </Link>
          <Link href="/about" className="hover:text-white transition">
            О проекте
          </Link>
          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-400 transition text-black font-medium"
          >
            Войти
          </Link>
        </nav>
      </div>
    </header>
  );
}
