import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useSite } from '../context/SiteContext';

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  icon: React.ReactNode;
  delay: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level, color, icon, delay }) => {
  const { theme } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // در موبایل once: true (یک‌بار)، در دسکتاپ once: false (هربار)
  const isInView = useInView(ref, {
    once: isMobile,
    margin: '-40px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ type: 'spring', stiffness: 100, damping: 18, delay: isMobile ? 0 : delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
            {name}
          </span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: isMobile ? 0.2 : delay + 0.4 }}
          className="text-xs font-mono font-bold"
          style={{ color: `rgba(${color}, 0.9)` }}
        >
          {level}%
        </motion.span>
      </div>

      {/* Track */}
      <div
        className="relative h-2 rounded-full overflow-hidden"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)',
          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
        }}
      >
        {/* Fill — width بصورت inline تنظیم می‌شود تا در موبایل قطعاً نمایش داده شود */}
        <motion.div
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${level}%` } : { width: '0%' }}
          transition={{
            duration: isMobile ? 0.8 : 1.2,
            delay: isMobile ? 0.1 : delay + 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, rgba(${color}, 0.5), rgba(${color}, 0.9))`,
            boxShadow: `0 0 12px rgba(${color}, 0.3)`,
            minWidth: isInView ? '4px' : '0px',
          }}
        >
          {/* Glowing tip */}
          {isInView && (
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
              style={{
                backgroundColor: `rgba(${color}, 1)`,
                boxShadow: `0 0 10px rgba(${color}, 0.6), 0 0 20px rgba(${color}, 0.4)`,
              }}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillBar;