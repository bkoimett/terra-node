import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function AnimatedCounter({ value, decimals = 0, prefix = '', suffix = '' }) {
  const spring = useSpring(0, { stiffness: 80, damping: 20 });
  const display = useTransform(spring, (v) =>
    `${prefix}${v.toLocaleString('en-US', {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    })}${suffix}`
  );
  const [text, setText] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    spring.set(value);
    return display.on('change', (v) => setText(v));
  }, [value, spring, display, prefix, suffix]);

  return (
    <motion.span className="font-mono tabular-nums" key={value}>
      {text}
    </motion.span>
  );
}
