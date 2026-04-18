export function Footer() {
  return (
    <footer className="border-t border-slate-800/60 mt-20 py-10 text-slate-500 text-sm">
      <div className="max-w-6xl mx-auto px-6 flex justify-between">
        <div>© {new Date().getFullYear()} DevLab</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-300 transition">GitHub</a>
          <a href="#" className="hover:text-slate-300 transition">Контакты</a>
        </div>
      </div>
    </footer>
  );
}
