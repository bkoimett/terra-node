import { Link } from 'react-router-dom';
import { MapPin, Users, Ruler } from 'lucide-react';
import Badge from '../shared/Badge.jsx';
import FundingProgress from './FundingProgress.jsx';
import { formatArea } from '../../lib/formatters.js';
import { CATEGORY_LABELS } from '../../lib/constants.js';

const aspectMap = {
  default: 'aspect-[4/3]',
  tall: 'aspect-[3/4]',
  wide: 'aspect-[16/9]',
};

export default function ProjectCard({
  project,
  selectable,
  selected,
  onSelect,
  variant = 'default',
}) {
  const id = project._id || project.id;
  const aspect = aspectMap[variant] || aspectMap.default;

  const content = (
    <>
      <div className={`relative overflow-hidden rounded-2xl ${aspect}`}>
        <img
          src={project.imageUrl}
          alt={project.name}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/10 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge type={project.category}>{CATEGORY_LABELS[project.category]}</Badge>
          <Badge variant="status" type={project.status}>
            {project.status.replace('-', ' ')}
          </Badge>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-1.5 text-sm text-canvas-muted">
        <MapPin className="h-4 w-4 text-sage/80" />
        {project.location.region}, {project.location.country}
      </div>
      <h3 className="mt-2 font-display text-xl font-semibold leading-snug">{project.name}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-canvas-muted">
        {project.description}
      </p>
      <div className="mt-5">
        <FundingProgress raised={project.fundingRaised} goal={project.fundingGoal} />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-canvas-subtle">
        <span className="flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          {project.backers} backers
        </span>
        <span className="flex items-center gap-1.5 font-mono text-xs">
          <Ruler className="h-4 w-4" />
          {formatArea(project.targetArea)}
        </span>
      </div>
      {!selectable && (
        <span className="btn-primary mt-5 w-full text-center text-sm">Fund This Project →</span>
      )}
    </>
  );

  const cardClass = `card-hover group w-full text-left ${
    selected ? 'ring-2 ring-sage/60 ring-offset-2 ring-offset-forest' : ''
  }`;

  if (selectable) {
    return (
      <button type="button" onClick={() => onSelect?.(id)} className={cardClass}>
        {content}
      </button>
    );
  }

  return (
    <Link to={`/projects/${id}`} className={`${cardClass} block`}>
      {content}
    </Link>
  );
}
