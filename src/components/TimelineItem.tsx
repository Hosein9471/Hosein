import { memo } from 'react';
import { useReveal } from '../hooks/useReveal';

interface TimelineItemProps {
  title: string;
  subtitle: string;
  description?: string;
  icon: React.ReactNode;
  color: string;
  index: number;
  side?: 'left' | 'right';
  avatar?: string;
  isCurrent?: boolean;
  currentLabel?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  subtitle,
  description,
  icon,
  color,
  index,
  side = 'left',
  avatar,
  isCurrent,
  currentLabel = 'Active',
}) => {
  const isLeft = side === 'left';
  const { ref, visible } = useReveal({ once: true, rootMargin: '-40px' });

  return (
    <div
      ref={ref}
      className={`flex items-start gap-4 sm:gap-6 ${isLeft ? '' : 'flex-row-reverse'} w-full reveal-timeline ${isLeft ? 'from-left' : 'from-right'} ${visible ? 'is-visible' : ''}`}
      style={{
        contain: 'layout style',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className="flex-1 glass rounded-xl p-5 sm:p-6 relative overflow-hidden group hover:border-white/[0.12] transition-[border-color] duration-500">
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-60 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(${color}, 0.7), transparent)`,
          }}
        />

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, rgba(${color}, 0.06), transparent 70%)`,
          }}
        />

        <div className="flex items-start gap-4 relative">
          {avatar ? (
            <img
              src={avatar}
              alt={subtitle}
              loading="lazy"
              decoding="async"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 shrink-0"
              style={{ borderColor: `rgba(${color}, 0.4)` }}
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{
                backgroundColor: `rgba(${color}, 0.15)`,
                border: `1px solid rgba(${color}, 0.3)`,
              }}
            >
              <span style={{ color: `rgba(${color}, 0.9)` }}>{icon}</span>
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white leading-tight">{title}</h4>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-medium">{subtitle}</p>
              </div>
              {isCurrent && (
                <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-400">{currentLabel}</span>
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">{description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center shrink-0 pt-2">
        <div
          className={`w-4 h-4 rounded-full relative transition-transform duration-500 ease-out ${visible ? 'scale-100' : 'scale-0'}`}
          style={{
            backgroundColor: `rgba(${color}, 0.3)`,
            border: `2px solid rgba(${color}, 0.6)`,
            boxShadow: `0 0 15px rgba(${color}, 0.3)`,
            transitionDelay: `${index * 80 + 200}ms`,
          }}
        >
          <div
            className="absolute inset-1 rounded-full animate-pulse-glow"
            style={{ backgroundColor: `rgba(${color}, 0.8)` }}
          />
        </div>
        <div
          className="w-[2px] flex-1 min-h-[40px]"
          style={{
            background: `linear-gradient(to bottom, rgba(${color}, 0.3), transparent)`,
          }}
        />
      </div>

      <div className="flex-1 hidden md:block" />
    </div>
  );
};

export default memo(TimelineItem);