import { useRef, useState, useCallback, memo, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  type MotionStyle,
} from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useReveal, useIsMobile } from '../hooks/useReveal';

interface ProjectCard3DProps {
  title: string;
  description: string;
  techs: string[];
  icon: React.ReactNode;
  color: string;
  index: number;
  image: string;
  isCurrent?: boolean;
  inProgressLabel?: string;
  viewLabel?: string;
}

const TILT = 12;

const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
  title,
  description,
  techs,
  icon,
  color,
  index,
  image,
  isCurrent,
  inProgressLabel = 'In Progress',
  viewLabel = 'View',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  const { ref: revealRef, visible } = useReveal({ once: true, rootMargin: '-40px' });

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const sRotX = useSpring(rotX, { stiffness: 200, damping: 25, mass: 0.4 });
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 25, mass: 0.4 });
  const sGlowX = useSpring(glowX, { stiffness: 250, damping: 30 });
  const sGlowY = useSpring(glowY, { stiffness: 250, damping: 30 });

  const glowBg = useMotionTemplate`radial-gradient(500px circle at ${sGlowX}px ${sGlowY}px, rgba(${color}, 0.12), transparent 50%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile || !ref.current) return;
      if (rafRef.current !== null) return;
      const clientX = e.clientX;
      const clientY = e.clientY;
      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current) {
          rafRef.current = null;
          return;
        }
        const rect = ref.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const nx = (x / rect.width) * 2 - 1;
        const ny = (y / rect.height) * 2 - 1;
        rotY.set(nx * TILT);
        rotX.set(-ny * TILT);
        glowX.set(x);
        glowY.set(y);
        rafRef.current = null;
      });
    },
    [rotX, rotY, glowX, glowY, isMobile]
  );

  const handleLeave = useCallback(() => {
    setHovered(false);
    rotX.set(0);
    rotY.set(0);
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, [rotX, rotY]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const tiltStyle: MotionStyle = isMobile
    ? {}
    : {
        rotateX: sRotX,
        rotateY: sRotY,
        transformPerspective: 1200,
      };

  return (
    <div
      ref={revealRef}
      className={`reveal-card group relative ${visible ? 'is-visible' : ''}`}
      style={{
        perspective: 1200,
        contain: 'layout style paint',
        transitionDelay: `${index * 70}ms`,
      }}
    >
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(${color}, 0.3), transparent 50%, rgba(${color}, 0.2))`,
        }}
      />

      <motion.div
        ref={ref}
        style={tiltStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={handleLeave}
        className="relative z-10 rounded-2xl overflow-hidden glass-strong cursor-pointer group-hover:border-white/[0.12] transition-[border-color] duration-500"
      >
        {!isMobile && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: glowBg }}
          />
        )}

        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-70 z-20 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(${color}, 0.8), transparent)`,
          }}
        />

        <div className="relative h-36 sm:h-40 overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover transition-transform duration-500 ease-out ${hovered ? 'scale-110' : 'scale-100'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/60 to-transparent pointer-events-none" />

          {isCurrent && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-bold text-emerald-400">{inProgressLabel}</span>
            </div>
          )}

          <div
            className={`absolute bottom-3 right-3 flex items-center justify-center w-10 h-10 rounded-xl text-xl transition-transform duration-300 ease-out ${hovered ? 'scale-110 rotate-6' : ''}`}
            style={{
              backgroundColor: `rgba(${color}, 0.15)`,
              border: `1px solid rgba(${color}, 0.3)`,
              boxShadow: `0 0 20px rgba(${color}, 0.2)`,
            }}
          >
            {icon}
          </div>

          {!isMobile && (
            <div
              className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
            >
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 hover:bg-white/20 transition-all duration-300 pointer-events-auto ${hovered ? 'translate-y-0' : 'translate-y-2'}`}
              >
                <ExternalLink size={14} />
                <span className="text-xs font-semibold">{viewLabel}</span>
              </button>
            </div>
          )}
        </div>

        <div className="relative p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {techs.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase rounded-full cursor-default select-none transition-transform duration-200 hover:scale-110"
                style={{
                  backgroundColor: `rgba(${color}, 0.1)`,
                  border: `1px solid rgba(${color}, 0.2)`,
                  color: `rgba(${color}, 0.85)`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(ProjectCard3D);