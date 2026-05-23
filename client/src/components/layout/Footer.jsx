import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-forest-light">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-xl font-semibold">TerraNode</p>
            <p className="editorial-lead mt-3 max-w-sm text-base">
              Hackathon prototype — simulated transactions. Real land, imagined payments.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-canvas-muted">
            <Link to="/calculator" className="transition hover:text-sage">
              Calculator
            </Link>
            <Link to="/projects" className="transition hover:text-sage">
              Projects
            </Link>
            <Link to="/corporate" className="transition hover:text-sage">
              Corporate
            </Link>
          </div>
        </div>
        <p className="mt-10 text-xs text-canvas-subtle">
          © {new Date().getFullYear()} TerraNode — Regenerative Canvas
        </p>
      </div>
    </footer>
  );
}
