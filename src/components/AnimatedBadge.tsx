import { motion } from 'framer-motion';

interface AnimatedBadgeProps {
  text: string;
  icon?: React.ReactNode;
  color?: string;
  delay?: number;
  variant?: 'default' | 'glow' | 'outline' | 'filled';
}

/**
 * AnimatedBadge — A premium animated badge/chip component
 * with multiple visual variants and entrance animations.
 */
const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
  text,
  icon,
  color = '139, 92, 246',
  delay = 0,
  variant = 'default',
}) => {
  // Variant styling is handled via inline styles below for dynamic color support

  // Use inline styles for dynamic colors since Tailwind can't handle runtime values
  const baseStyle = {
    backgroundColor: variant === 'filled' ? `rgba(${color}, 0.15)` : `rgba(${color}, 0.06)`,
    borderColor: `rgba(${color}, ${variant === 'glow' ? 0.35 : 0.15})`,
    color: `rgba(${color === '255, 255, 255' ? '200, 200, 220' : color}, 0.9)`,
    boxShadow: variant === 'glow' ? `0 0 15px rgba(${color}, 0.1), inset 0 0 15px rgba(${color}, 0.05)` : 'none',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, margin: '-30px' }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 18,
        delay,
      }}
      whileHover={{
        scale: 1.08,
        boxShadow: `0 0 25px rgba(${color}, 0.2), inset 0 0 20px rgba(${color}, 0.08)`,
      }}
      style={baseStyle}
      className="
        inline-flex items-center gap-2
        px-3.5 py-1.5
        text-[11px] sm:text-xs font-semibold tracking-wider uppercase
        border rounded-full
        backdrop-blur-sm
        cursor-default select-none
        transition-all duration-300
      "
    >
      {icon && <span className="text-sm">{icon}</span>}
      <span className="relative">
        {text}
      </span>
    </motion.span>
  );
};

export default AnimatedBadge;
