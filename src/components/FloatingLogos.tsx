import { memo, useEffect, useState } from 'react';

const allLogos = [
  { id: 'python', color: '#3776ab', symbol: '🐍', x: 8,  y: 15, size: 32, delay: 0   },
  { id: 'js',     color: '#f7df1e', symbol: 'JS', x: 85, y: 20, size: 28, delay: 2   },
  { id: 'react',  color: '#61dafb', symbol: '⚛',  x: 75, y: 70, size: 34, delay: 1   },
  { id: 'db',     color: '#10b981', symbol: '◆',  x: 15, y: 75, size: 24, delay: 3   },
  { id: 'java',   color: '#f59e0b', symbol: '☕', x: 90, y: 50, size: 28, delay: 4   },
  { id: 'code',   color: '#8b5cf6', symbol: '</>', x: 5,  y: 45, size: 22, delay: 1.5 },
  { id: 'php',    color: '#777bb4', symbol: 'PHP', x: 50, y: 85, size: 20, delay: 2.5 },
  { id: 'ai',     color: '#ec4899', symbol: '🧠', x: 40, y: 10, size: 26, delay: 3.5 },
  { id: 'term',   color: '#22d3ee', symbol: '>_', x: 65, y: 40, size: 20, delay: 0.5 },
  { id: 'git',    color: '#f05032', symbol: '⑂',  x: 25, y: 55, size: 22, delay: 4.5 },
];

// موبایل: فقط ۵ لوگو نمایش داده می‌شود
const mobileLogos = allLogos.slice(0, 5);

const FloatingLogos: React.FC = () => {
  const [logos, setLogos] = useState(allLogos);

  useEffect(() => {
    const check = () => {
      setLogos(window.innerWidth < 768 ? mobileLogos : allLogos);
    };
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {logos.map((logo) => (
        <div
          key={logo.id}
          className="absolute select-none font-mono font-bold"
          style={{
            left: `${logo.x}%`,
            top: `${logo.y}%`,
            fontSize: `${logo.size}px`,
            color: logo.color,
            opacity: 0.06,
            animation: `float ${6 + logo.delay}s ease-in-out ${logo.delay}s infinite`,
            filter: `drop-shadow(0 0 20px ${logo.color}40)`,
          }}
        >
          {logo.symbol}
        </div>
      ))}
    </div>
  );
};

export default memo(FloatingLogos);