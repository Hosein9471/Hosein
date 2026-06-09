import { memo } from 'react';
import { useReveal } from '../hooks/useReveal';

interface CertCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  index: number;
}

const CertCard: React.FC<CertCardProps> = ({ title, icon, color, index }) => {
  const { ref, visible } = useReveal({ once: true, rootMargin: '-30px' });

  return (
    <div
      ref={ref}
      className={`reveal-card glass rounded-xl p-4 sm:p-5 relative overflow-hidden group cursor-default min-h-[80px] ${visible ? 'is-visible' : ''}`}
      style={{
        contain: 'layout style paint',
        transitionDelay: `${index * 50}ms`,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-50 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${color}, 0.6), transparent)`,
        }}
      />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(${color}, 0.06), transparent 70%)`,
        }}
      />

      <div className="flex items-center gap-3 relative">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg text-lg shrink-0"
          style={{
            backgroundColor: `rgba(${color}, 0.1)`,
            border: `1px solid rgba(${color}, 0.2)`,
            color: `rgba(${color}, 0.9)`,
          }}
        >
          {icon}
        </div>
        <p
          className="text-xs sm:text-sm font-semibold text-zinc-300 leading-snug flex-1 min-w-0"
          style={{
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default memo(CertCard);