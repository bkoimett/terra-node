import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, Leaf, ShieldCheck } from 'lucide-react';
import { useTerraNode } from '../context/TerraNodeContext.jsx';
import AnimatedCounter from '../components/shared/AnimatedCounter.jsx';
import ProjectMasonry from '../components/projects/ProjectMasonry.jsx';
import { formatCurrency } from '../lib/formatters.js';
import { fadeUp, spring, staggerContainer, staggerItem } from '../lib/motion.js';
import { getTanaDeltaHeroUrl } from '../data/heroImages.js';

export default function Landing() {
  const { stats, projects, loading } = useTerraNode();
  const featured = projects.slice(0, 3);
  const heroImage = getTanaDeltaHeroUrl(projects);

  return (
    <div>
      {/* Split hero — Regenerative Canvas */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute inset-0 bg-terra-wash" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28 lg:px-8">
          <motion.div {...fadeUp} className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sage">
              Land Restoration Credits
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-[3.25rem]">
              Every GPU has a footprint.{' '}
              <span className="italic text-sage">Restore the land.</span>
            </h1>
            <p className="editorial-lead mt-6 max-w-md">
              TerraNode transforms compute debt into verified restoration — where
              premium engineering meets living ecosystems.
            </p>
            <p className="mt-4 text-base leading-relaxed text-canvas-muted">
              Quantify your arable land impact, fund Kenyan restoration projects, and
              watch debt become forest, wetland, and soil.
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

          <motion.div
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={spring.soft}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-forest-muted shadow-canvas sm:min-h-[400px]">
              <img
                src={heroImage}
                alt="Tana Delta Wetland Revival — wetland ecosystem at soft overcast light, Kenya"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/6] lg:aspect-[4/5]"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-forest/70 p-4 backdrop-blur-md">
                <p className="text-xs font-medium uppercase tracking-wider text-sage">
                  Tana Delta Wetland Revival
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-canvas-text">
                  2.4M m²
                </p>
                <p className="text-sm text-canvas-muted">
                  of arable land displaced by AI — fund restoration like this wetland
                </p>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-sage/10 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-terra/10 blur-3xl" />
          </motion.div>
        </div>
      </section>

      {stats && (
        <section className="border-b border-white/5 bg-forest-light/50 py-6 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={spring.gentle}
            className="mx-auto flex max-w-7xl flex-wrap justify-center gap-10 px-4 text-center sm:gap-16"
          >
            {[
              { value: stats.globalLandDisplaced, label: 'm² displaced by AI (est.)' },
              { value: stats.totalAreaRestored, label: 'm² restored', suffix: ' m²' },
              { value: stats.totalBackers, label: 'backers' },
              { value: stats.totalCreditsIssued, label: 'credits issued' },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="font-mono text-xl font-semibold text-sage">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} />
                </span>
                <p className="mt-1 text-sm text-canvas-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-display text-3xl font-bold sm:text-4xl"
        >
          How restoration works
        </motion.h2>
        <motion.div
          className="mt-14 grid gap-8 md:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Calculator,
              title: 'Calculate',
              desc: 'Quantify arable land and water debt from your GPU fleet.',
            },
            {
              icon: Leaf,
              title: 'Fund',
              desc: 'Purchase credits or micro-fund verified restoration sites.',
            },
            {
              icon: ShieldCheck,
              title: 'Verify',
              desc: 'Track D-MRV scores as land returns to life.',
            },
          ].map((step) => (
            <motion.div key={step.title} variants={staggerItem} className="card-hover text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sage/10">
                <step.icon className="h-7 w-7 text-sage" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-canvas-muted">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="border-t border-white/5 bg-forest-light/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Living projects</h2>
              <p className="mt-2 text-canvas-muted">
                {stats
                  ? `${formatCurrency(stats.totalFundsRaised)} raised across ${stats.projectCount} sites`
                  : 'Loading restoration portfolio...'}
              </p>
            </div>
            <Link
              to="/projects"
              className="text-sm font-medium text-sage transition hover:text-canvas-text"
            >
              View all projects →
            </Link>
          </div>
          <div className="mt-12">
            {loading ? (
              <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="card mb-6 h-96 animate-pulse break-inside-avoid bg-forest-muted"
                  />
                ))}
              </div>
            ) : (
              <ProjectMasonry projects={featured} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
