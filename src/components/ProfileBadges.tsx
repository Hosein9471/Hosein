import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';
import {
  PythonIcon, JavaIcon, DatabaseIcon,
  AIIcon, ApiIcon, BackendIcon,
} from './TechIcons';
import { Code2 } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  python:   <PythonIcon   className="w-3.5 h-3.5" />,
  java:     <JavaIcon     className="w-3.5 h-3.5" />,
  database: <DatabaseIcon className="w-3.5 h-3.5" />,
  ai:       <AIIcon       className="w-3.5 h-3.5" />,
  api:      <ApiIcon      className="w-3.5 h-3.5" />,
  backend:  <BackendIcon  className="w-3.5 h-3.5" />,
  code:     <Code2        className="w-3.5 h-3.5" />,
};

const positions = [
  { top: '-8%',   right: '5%'   },
  { top: '5%',    left:  '-5%'  },
  { top: '35%',   right: '-12%' },
  { bottom: '30%',left:  '-10%' },
  { bottom: '5%', right: '0%'   },
  { bottom: '-5%',left:  '15%'  },
  { top: '20%',   right: '-8%'  },
  { bottom: '15%',right: '-5%'  },
];

const ProfileBadges: React.FC = () => {
  const { data } = useSite();
  const enabledBadges = data.profileBadges.filter(b => b.enabled);

  return (
    <>
      {enabledBadges.map((badge, i) => {
        const position = positions[i % positions.length];
        const icon = iconMap[badge.icon] || iconMap['code'];

        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 18,
              delay: 0.8 + i * 0.1,
            }}
            className="absolute z-20"
            style={position}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                // هر بج duration متفاوت اما staggered نیست (کمتر CPU)
                duration: 3.5 + i * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
                // کاهش تعداد فریم‌های انیمیشن در موبایل
                repeatType: 'mirror',
              }}
              whileHover={{ scale: 1.12, zIndex: 30 }}
              className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full cursor-default select-none backdrop-blur-md shadow-lg"
              style={{
                backgroundColor: `rgba(${badge.color}, 0.15)`,
                border: `1px solid rgba(${badge.color}, 0.4)`,
                boxShadow: `0 4px 16px rgba(${badge.color}, 0.2)`,
              }}
            >
              <span style={{ color: `rgba(${badge.color}, 1)` }}>
                {icon}
              </span>
              <span
                className="text-[8px] sm:text-[10px] font-bold tracking-wide whitespace-nowrap"
                style={{ color: `rgba(${badge.color}, 1)` }}
              >
                {badge.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
};

export default ProfileBadges;