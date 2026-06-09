import { motion } from 'framer-motion';
import { PythonIcon, JavaIcon, DatabaseIcon, AIIcon, ApiIcon, BackendIcon } from './TechIcons';

interface Badge {
  icon: React.ReactNode;
  label: string;
  color: string;
  angle: number;
}

const badges: Badge[] = [
  { icon: <PythonIcon className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Python', color: '59, 130, 246', angle: -30 },
  { icon: <BackendIcon className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Back-end', color: '139, 92, 246', angle: 30 },
  { icon: <DatabaseIcon className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Database', color: '16, 185, 129', angle: 90 },
  { icon: <AIIcon className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'AI', color: '236, 72, 153', angle: 150 },
  { icon: <ApiIcon className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'API', color: '6, 182, 212', angle: 210 },
  { icon: <JavaIcon className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Java', color: '245, 158, 11', angle: 270 },
];

/**
 * OrbitingBadges — Animated skill badges positioned around the profile avatar
 * Each badge floats with independent animation timing
 */
const OrbitingBadges: React.FC<{ radius?: number }> = ({ radius = 110 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {badges.map((badge, i) => {
        // Calculate position on the circle
        const angleRad = (badge.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius;

        return (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 15,
              delay: 0.5 + i * 0.15,
            }}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
              whileHover={{ scale: 1.15 }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full cursor-default select-none pointer-events-auto backdrop-blur-sm"
              style={{
                backgroundColor: `rgba(${badge.color}, 0.12)`,
                border: `1px solid rgba(${badge.color}, 0.35)`,
                boxShadow: `0 0 25px rgba(${badge.color}, 0.2), inset 0 0 15px rgba(${badge.color}, 0.05)`,
              }}
            >
              <span style={{ color: `rgba(${badge.color}, 0.95)` }}>
                {badge.icon}
              </span>
              <span
                className="text-[9px] sm:text-[11px] font-bold tracking-wide"
                style={{ color: `rgba(${badge.color}, 0.95)` }}
              >
                {badge.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default OrbitingBadges;
