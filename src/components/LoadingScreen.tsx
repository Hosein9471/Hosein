import { memo, useEffect, useState } from 'react';

interface LoadingScreenProps {
  progress?: number;
  status?: string;
}

// خطوط کدی که typewriter می‌شود — شخصی‌سازی شده
const codeLines = [
  '// Initializing portfolio...',
  '',
  'const developer = {',
  '  name: "Hosein Akbari Samani",',
  '  role: "Senior Python Developer",',
  '  expertise: [',
  '    "Python", "Back-end",',
  '    "REST APIs", "AI/ML",',
  '    "Database", "Microservices"',
  '  ],',
  '  passion: "Clean Code & Innovation",',
  '  available: true,',
  '};',
  '',
  'await developer.loadPortfolio();',
  'console.log("✓ Welcome!");',
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress = 0 }) => {
  const pct = Math.min(100, Math.max(0, progress));
  const [typedText, setTypedText] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= codeLines.length) {
      const restartTimer = setTimeout(() => {
        setTypedText([]);
        setCurrentLine(0);
        setCurrentChar(0);
      }, 2000);
      return () => clearTimeout(restartTimer);
    }

    const line = codeLines[currentLine];

    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setCurrentChar(prev => prev + 1);
      }, 28);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setTypedText(prev => [...prev, line]);
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, line === '' ? 50 : 120);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar]);

  // Syntax highlighter پیشرفته با رنگ‌های متنوع
  const colorize = (text: string): string => {
    if (!text) return '';

    // اول comment ها (مهم — اول چک بشن)
    if (text.trim().startsWith('//')) {
      return `<span class="ls2-cmt">${text}</span>`;
    }

    let result = text;

    // strings
    result = result.replace(/(".*?")/g, '<span class="ls2-str">$1</span>');

    // numbers
    result = result.replace(/\b(\d+)\b/g, '<span class="ls2-num">$1</span>');

    // keywords
    result = result.replace(
      /\b(const|let|var|await|async|function|return|if|else|true|false|null|undefined)\b/g,
      '<span class="ls2-kw">$1</span>'
    );

    // function calls
    result = result.replace(/(\.\w+)\(/g, '<span class="ls2-fn">$1</span>(');

    // properties
    result = result.replace(/(\w+):/g, '<span class="ls2-prop">$1</span>:');

    // brackets
    result = result.replace(/([{}\[\]()])/g, '<span class="ls2-brk">$1</span>');

    return result;
  };

  return (
    <div className="ls2-root">
      {/* Floating code particles */}
      <div className="ls2-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="ls2-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          >
            {['{ }', '< >', '( )', '[ ]', '=>', '01', '10', '||', '&&', '!='][i % 10]}
          </div>
        ))}
      </div>

      <div className="ls2-grid" />

      <div className="ls2-scene">
        {/* Logo */}
        <div className="ls2-logo-wrap">
          <div className="ls2-logo-glow" />
          <div className="ls2-logo">
            <span className="ls2-logo-bracket ls2-bracket-left">&lt;</span>
            <span className="ls2-logo-slash">/</span>
            <span className="ls2-logo-bracket ls2-bracket-right">&gt;</span>
          </div>
        </div>

        {/* Code window */}
        <div className="ls2-code-window">
          <div className="ls2-code-header">
            <span className="ls2-dot ls2-dot-red" />
            <span className="ls2-dot ls2-dot-yellow" />
            <span className="ls2-dot ls2-dot-green" />
            <span className="ls2-code-title">developer.ts</span>
          </div>

          <div className="ls2-code-body">
            {typedText.map((line, i) => (
              <div
                key={i}
                className="ls2-code-line"
                dangerouslySetInnerHTML={{ __html: colorize(line) || '&nbsp;' }}
              />
            ))}
            {currentLine < codeLines.length && (
              <div className="ls2-code-line">
                <span
                  dangerouslySetInnerHTML={{
                    __html: colorize(codeLines[currentLine].slice(0, currentChar)),
                  }}
                />
                <span className="ls2-cursor">▊</span>
              </div>
            )}
          </div>
        </div>

        {/* Percentage + progress */}
        <div className="ls2-status">
          <div className="ls2-percent">
            <span className="ls2-percent-sign">%</span>
            <span className="ls2-percent-num">{Math.round(pct)}</span>
          </div>
          <div className="ls2-progress">
            <div className="ls2-progress-bar" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LoadingScreen);