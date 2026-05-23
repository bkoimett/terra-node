import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard.jsx';
import { staggerContainer, staggerItem } from '../../lib/motion.js';

export default function ProjectMasonry({ projects, selectable, selectedIds, onSelect }) {
  return (
    <motion.div
      className="columns-1 gap-6 sm:columns-2 xl:columns-3"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {projects.map((project, index) => (
        <motion.div
          key={project._id || project.id}
          variants={staggerItem}
          className={`mb-6 break-inside-avoid ${
            index % 3 === 1 ? 'sm:mt-8' : index % 3 === 2 ? 'sm:mt-4' : ''
          }`}
        >
          <ProjectCard
            project={project}
            variant={index % 3 === 0 ? 'tall' : index % 3 === 1 ? 'wide' : 'default'}
            selectable={selectable}
            selected={selectedIds?.includes(project._id || project.id)}
            onSelect={onSelect}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
