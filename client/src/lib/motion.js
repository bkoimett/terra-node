/** Shared Framer Motion presets — Regenerative Canvas */
export const spring = {
  gentle: { type: 'spring', stiffness: 120, damping: 20 },
  snappy: { type: 'spring', stiffness: 280, damping: 26 },
  soft: { type: 'spring', stiffness: 80, damping: 18 },
};

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: spring.gentle,
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: spring.gentle,
};

export const imageZoom = {
  initial: { scale: 1.08, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { ...spring.soft },
};

export const progressEase = {
  type: 'spring',
  stiffness: 60,
  damping: 18,
  mass: 0.8,
};
