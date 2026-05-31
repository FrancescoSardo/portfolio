export function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-zinc-600">
          © 2026 Francesco Sardo · francescosardo91@gmail.com
        </span>
        <div className="flex gap-6">
          <a
            href="https://github.com/FrancescoSardo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-zinc-600 hover:text-amber-400 transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/francescosardo-devops"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-zinc-600 hover:text-amber-400 transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
