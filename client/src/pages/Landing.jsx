import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, Leaf, ShieldCheck } from 'lucide-react';
import { useTerraNode } from '../context/TerraNodeContext.jsx';
import AnimatedCounter from '../components/shared/AnimatedCounter.jsx';
import ProjectCard from '../components/projects/ProjectCard.jsx';
import { formatArea, formatCurrency } from '../lib/formatters.js';

export default function Landing() {
  const { stats, projects, loading } = useTerraNode();
  const featured = projects.slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-green/10 via-transparent to-accent-amber/5" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-medium uppercase tracking-wider text-accent-green">
              Land Restoration Credits
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Every GPU Has a Footprint.{' '}
              <span className="text-accent-green">Restore It.</span>
            </h1>
            <p className="mt-6 text-lg text-text-secondary">
              TerraNode connects AI compute providers with verified land restoration
              projects — quantify your arable land debt and fund real-world impact.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/calculator" className="btn-primary">
                <Calculator className="h-5 w-5" />
                Calculate Your Debt
              </Link>
              <Link to="/projects" className="btn-secondary">
                Fund Restoration
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {stats && (
        <section className="border-b border-border bg-bg-secondary py-4">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 px-4 text-center text-sm sm:gap-16">
            <div>
              <span className="font-mono text-lg font-semibold text-accent-green">
                <AnimatedCounter value={stats.globalLandDisplaced} />
              </span>
              <p className="text-text-secondary">m² land displaced by AI (est.)</p>
            </div>
            <div>
              <span className="font-mono text-lg font-semibold text-accent-green">
                <AnimatedCounter value={stats.totalAreaRestored} suffix=" m²" />
              </span>
              <p className="text-text-secondary">restored via TerraNode</p>
            </div>
            <div>
              <span className="font-mono text-lg font-semibold text-accent-green">
                <AnimatedCounter value={stats.totalBackers} />
              </span>
              <p className="text-text-secondary">backers</p>
            </div>
            <div>
              <span className="font-mono text-lg font-semibold text-accent-green">
                <AnimatedCounter value={stats.totalCreditsIssued} />
              </span>
              <p className="text-text-secondary">credits issued</p>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold">How It Works</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Calculator,
              title: 'Calculate',
              desc: 'Quantify your AI infrastructure arable land and water debt.',
            },
            {
              icon: Leaf,
              title: 'Fund',
              desc: 'Purchase credits or micro-fund restoration projects worldwide.',
            },
            {
              icon: ShieldCheck,
              title: 'Verify',
              desc: 'Track D-MRV scores and verified restoration outcomes.',
            },
          ].map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card text-center"
            >
              <step.icon className="mx-auto h-10 w-10 text-accent-green" />
              <h3 className="mt-4 font-heading text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-heading text-3xl font-bold">Featured Projects</h2>
              <p className="mt-2 text-text-secondary">
                {stats
                  ? `${formatCurrency(stats.totalFundsRaised)} raised across ${stats.projectCount} projects`
                  : 'Loading projects...'}
              </p>
            </div>
            <Link to="/projects" className="text-sm text-accent-green hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading
              ? [1, 2, 3].map((n) => (
                  <div key={n} className="card h-96 animate-pulse bg-bg-tertiary" />
                ))
              : featured.map((p) => <ProjectCard key={p._id} project={p} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
