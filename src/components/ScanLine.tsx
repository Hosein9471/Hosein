import { memo } from 'react';

/**
 * ScanLine — A subtle horizontal scanning line effect
 * that moves top-to-bottom continuously for a futuristic feel.
 */
const ScanLine: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      <div
        className="absolute left-0 w-full h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.15) 20%, rgba(59,130,246,0.2) 50%, rgba(139,92,246,0.15) 80%, transparent 100%)',
          animation: 'scan-line 8s linear infinite',
          boxShadow: '0 0 30px 10px rgba(139,92,246,0.05)',
        }}
      />
    </div>
  );
};

export default memo(ScanLine);
