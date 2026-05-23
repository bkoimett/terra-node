import { motion } from 'framer-motion';
import { spring } from '../../lib/motion.js';

export default function PageWrapper({ title, subtitle, children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring.gentle}
      className={`mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${className}`}
    >
      {(title || subtitle) && (
        <header className="mb-12 max-w-2xl">
          {title && (
            <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="editorial-lead mt-4 text-lg">{subtitle}</p>
          )}
        </header>
      )}
      {children}
    </motion.div>
  );
}
