import { useEffect, useMemo, useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import ProjectCard from '../components/projects/ProjectCard.jsx';
import ProjectFilters from '../components/projects/ProjectFilters.jsx';
import { useTerraNode } from '../context/TerraNodeContext.jsx';
import { api } from '../api/client.js';
import { formatArea, formatCurrency } from '../lib/formatters.js';

export default function Projects() {
  const { stats, loading: ctxLoading } = useTerraNode();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    region: '',
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = Object.fromEntries(
          Object.entries(filters).filter(([, v]) => v)
        );
        const data = await api.getProjects(params);
        setProjects(data);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [filters]);

  const totals = useMemo(() => {
    const totalArea = projects.reduce((s, p) => s + p.targetArea, 0);
    const totalRaised = projects.reduce((s, p) => s + p.fundingRaised, 0);
    const totalBackers = projects.reduce((s, p) => s + p.backers, 0);
    return { totalArea, totalRaised, totalBackers };
  }, [projects]);

  return (
    <PageWrapper
      title="Restoration Marketplace"
      subtitle="Browse verified land restoration projects and fund impact directly."
    >
      {stats && (
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="card text-center">
            <p className="text-2xl font-mono font-semibold text-accent-green">
              {stats.projectCount}
            </p>
            <p className="text-sm text-text-secondary">Active projects</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-mono font-semibold text-accent-green">
              {formatArea(totals.totalArea)}
            </p>
            <p className="text-sm text-text-secondary">Target restoration</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-mono font-semibold text-accent-green">
              {formatCurrency(totals.totalRaised)}
            </p>
            <p className="text-sm text-text-secondary">{totals.totalBackers} backers</p>
          </div>
        </div>
      )}

      <ProjectFilters filters={filters} onChange={setFilters} />

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading || ctxLoading
          ? [1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="card h-96 animate-pulse bg-bg-tertiary" />
            ))
          : projects.map((p) => <ProjectCard key={p._id} project={p} />)}
      </div>

      {!loading && projects.length === 0 && (
        <p className="mt-8 text-center text-text-secondary">No projects match your filters.</p>
      )}
    </PageWrapper>
  );
}
