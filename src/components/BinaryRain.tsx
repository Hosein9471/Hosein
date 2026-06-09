import { useEffect, useState, memo } from 'react';
import { useSite } from '../context/SiteContext';

interface BinaryColumn {
  id: number;
  left: number;
  delay: number;
  duration: number;
  chars: string;
  opacity: number;
  fontSize: number;
}

const BinaryRain: React.FC = () => {
  const { theme } = useSite();
  const [columns, setColumns] = useState<BinaryColumn[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    const cols: BinaryColumn[] = [];
    // موبایل: ۸ ستون — دسکتاپ: حداکثر ۲۰ ستون
    const count = mobile
      ? 8
      : Math.min(Math.floor(window.innerWidth / 60), 20);

    for (let i = 0; i < count; i++) {
      // موبایل: کاراکتر کمتر برای هر ستون
      const charCount = mobile
        ? 8 + Math.floor(Math.random() * 8)
        : 15 + Math.floor(Math.random() * 20);

      const chars = Array.from({ length: charCount }, () =>
        Math.random() > 0.5 ? '1' : '0'
      ).join('\n');

      cols.push({
        id: i,
        left: (i / count) * 100 + Math.random() * 2,
        delay: Math.random() * 12,
        // موبایل: duration بیشتر = انیمیشن کندتر = CPU کمتر
        duration: mobile
          ? 18 + Math.random() * 14
          : 12 + Math.random() * 18,
        chars,
        opacity:
          theme === 'dark'
            ? 0.03 + Math.random() * 0.05
            : 0.06 + Math.random() * 0.08,
        fontSize: mobile ? 9 : 10 + Math.floor(Math.random() * 4),
      });
    }
    setColumns(cols);
  }, [theme]);

  const textColor =
    theme === 'dark' ? 'text-violet-400' : 'text-emerald-500';

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {columns.map((col) => (
        <div
          key={col.id}
          className={`absolute font-mono ${textColor} whitespace-pre leading-tight select-none`}
          style={{
            left: `${col.left}%`,
            fontSize: `${col.fontSize}px`,
            opacity: col.opacity,
            animation: `binary-fall ${col.duration}s linear ${col.delay}s infinite`,
            // موبایل: will-change حذف شده تا RAM کمتر مصرف شود
            willChange: isMobile ? 'auto' : 'transform',
          }}
        >
          {col.chars}
        </div>
      ))}
    </div>
  );
};

export default memo(BinaryRain);