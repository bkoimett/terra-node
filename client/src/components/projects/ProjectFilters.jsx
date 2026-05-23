import { Search } from 'lucide-react';
import { CATEGORY_LABELS, STATUS_LABELS } from '../../lib/constants.js';

export default function ProjectFilters({ filters, onChange }) {
  return (
    <div className="card flex flex-col gap-4 lg:flex-row lg:items-end">
      <div className="flex-1">
        <label className="label">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search projects..."
            className="input-field pl-10"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
          />
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <label className="label">Category</label>
          <select
            className="input-field"
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
          >
            <option value="">All</option>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Status</label>
          <select
            className="input-field"
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value })}
          >
            <option value="">All</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="label">Region</label>
          <input
            type="text"
            placeholder="e.g. Nakuru"
            className="input-field"
            value={filters.region}
            onChange={(e) => onChange({ ...filters, region: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
