import { Link } from 'react-router-dom';
import { MapPin, Users, Ruler } from 'lucide-react';
import Badge from '../shared/Badge.jsx';
import FundingProgress from './FundingProgress.jsx';
import { formatArea, formatCurrency } from '../../lib/formatters.js';
import { CATEGORY_LABELS } from '../../lib/constants.js';

export default function ProjectCard({ project, selectable, selected, onSelect }) {
  const id = project._id || project.id;

  const content = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge type={project.category}>{CATEGORY_LABELS[project.category]}</Badge>
          <Badge variant="status" type={project.status}>
            {project.status.replace('-', ' ')}
          </Badge>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1 text-sm text-text-secondary">
        <MapPin className="h-4 w-4" />
        {project.location.region}, {project.location.country}
      </div>
      <h3 className="mt-2 font-heading text-lg font-semibold">{project.name}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-text-secondary">{project.description}</p>
      <div className="mt-4">
        <FundingProgress raised={project.fundingRaised} goal={project.fundingGoal} />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-text-muted">
        <span className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          {project.backers} backers
        </span>
        <span className="flex items-center gap-1">
          <Ruler className="h-4 w-4" />
          {formatArea(project.targetArea)}
        </span>
      </div>
      {!selectable && (
        <span className="btn-primary mt-4 w-full text-center text-sm">
          Fund This Project →
        </span>
      )}
    </>
  );

  if (selectable) {
    return (
      <button
        type="button"
        onClick={() => onSelect?.(id)}
        className={`card group w-full text-left transition ${
          selected
            ? 'ring-2 ring-accent-green'
            : 'hover:border-accent-green/50 hover:shadow-accent-green/10'
        }`}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      to={`/projects/${id}`}
      className="card group block transition hover:border-accent-green/50 hover:shadow-accent-green/10"
    >
      {content}
    </Link>
  );
}
