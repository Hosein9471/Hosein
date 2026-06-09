import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: string;
  gradient?: string;
  align?: 'left' | 'center';
}

/**
 * SectionTitle — Animated section header with gradient text,
 * decorative lines, and a cinematic reveal animation.
 */
const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  icon,
  gradient = 'text-gradient-main',
  align = 'center',
}) => {
  return (
    <div className={`mb-12 sm:mb-16 ${align === 'center' ? 'text-center' : 'text-right'}`}>
      {/* Icon + Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className={`inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full glass ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      >
        {icon && <span className="text-base">{icon}</span>}
        {subtitle && (
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-zinc-400">
            {subtitle}
          </span>
        )}
      </motion.div>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30, skewY: 2 }}
        whileInView={{ opacity: 1, y: 0, skewY: 0 }}
        viewport={{ once: false, margin: '-50px' }}
        transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
        className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${gradient}`}
      >
        {title}
      </motion.h2>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`mt-4 h-[2px] w-24 sm:w-32 ${
          align === 'center' ? 'mx-auto' : 'mr-0 ml-auto'
        }`}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.6), rgba(59,130,246,0.4), transparent)',
        }}
      />
    </div>
  );
};

export default SectionTitle;
