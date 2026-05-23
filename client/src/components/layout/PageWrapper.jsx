import { motion } from 'framer-motion';

export default function PageWrapper({ title, subtitle, children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-10">
          {title && (
            <h1 className="font-heading text-3xl font-bold sm:text-4xl">{title}</h1>
          )}
          {subtitle && (
            <p className="mt-3 max-w-2xl text-text-secondary">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </motion.div>
  );
}
