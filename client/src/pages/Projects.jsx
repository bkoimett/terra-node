import { useEffect, useMemo, useState } from 'react';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import ProjectMasonry from '../components/projects/ProjectMasonry.jsx';
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
      subtitle="Browse verified land restoration — golden-hour landscapes waiting for your support."
    >
      {stats && (
        <div className="mb-10 grid gap-5 sm:grid-cols-3">
          {[
            { value: stats.projectCount, label: 'Active projects' },
            { value: formatArea(totals.totalArea), label: 'Target restoration' },
            {
              value: formatCurrency(totals.totalRaised),
              label: `${totals.totalBackers} backers`,
            },
          ].map((item) => (
            <div key={item.label} className="card-hover text-center">
              <p className="font-mono text-2xl font-semibold text-sage">{item.value}</p>
              <p className="mt-1 text-sm text-canvas-muted">{item.label}</p>
            </div>
          ))}
        </div>
      )}

      <ProjectFilters filters={filters} onChange={setFilters} />

      <div className="mt-10">
        {loading || ctxLoading ? (
          <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="card mb-6 h-96 animate-pulse break-inside-avoid bg-forest-muted"
              />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <ProjectMasonry projects={projects} />
        ) : (
          <p className="py-16 text-center text-canvas-muted">
            No projects match your filters.
          </p>
        )}
      </div>
    </PageWrapper>
  );
}
