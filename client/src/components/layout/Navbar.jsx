import { Link, NavLink } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition ${
    isActive ? 'text-accent-green' : 'text-text-secondary hover:text-text-primary'
  }`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold">
          <Leaf className="h-6 w-6 text-accent-green" />
          TerraNode
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/calculator" className={linkClass}>
            Calculator
          </NavLink>
          <NavLink to="/projects" className={linkClass}>
            Projects
          </NavLink>
          <NavLink to="/corporate" className={linkClass}>
            Corporate
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/projects" className="btn-secondary hidden text-sm sm:inline-flex">
            Fund Restoration
          </Link>
          <Link to="/calculator" className="btn-primary text-sm">
            Calculate Debt
          </Link>
        </div>
      </div>
    </header>
  );
}
