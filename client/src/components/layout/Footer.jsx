import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-lg font-semibold">TerraNode</p>
            <p className="mt-1 max-w-md text-sm text-text-secondary">
              Hackathon prototype — all transactions are simulated. No real payments or
              on-chain credits.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
            <Link to="/calculator" className="hover:text-accent-green">
              Calculator
            </Link>
            <Link to="/projects" className="hover:text-accent-green">
              Projects
            </Link>
            <Link to="/corporate" className="hover:text-accent-green">
              Corporate
            </Link>
          </div>
        </div>
        <p className="mt-8 text-xs text-text-muted">
          © {new Date().getFullYear()} TerraNode. Tokenizing land restoration to offset AI
          compute footprint.
        </p>
      </div>
    </footer>
  );
}
