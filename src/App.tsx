import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, Download, ChevronDown,
  Briefcase, Code2, Zap, Settings, Award,
  Server, Database, Palette, Terminal, Sparkles,
  CheckCircle,
} from 'lucide-react';

import { useSite, tr } from './context/SiteContext';
import BinaryRain from './components/BinaryRain';
import FloatingLogos from './components/FloatingLogos';
import ScanLine from './components/ScanLine';
import SectionTitle from './components/SectionTitle';
import AnimatedBadge from './components/AnimatedBadge';
import ProjectCard3D from './components/ProjectCard3D';
import SkillBar from './components/SkillBar';
import TimelineItem from './components/TimelineItem';
import CertCard from './components/CertCard';
import ProfileBadges from './components/ProfileBadges';
import SocialLinks from './components/SocialLinks';
import TypewriterText from './components/TypewriterText';
import ThemeToggle from './components/ThemeToggle';
import LangSwitcher from './components/LangSwitcher';
import AdminPanel from './components/AdminPanel';
import LoginModal from './components/LoginModal';
import LoadingScreen from './components/LoadingScreen';
import { useRotatingAvatar } from './hooks/useRotatingAvatar';
import { t } from './i18n/translations';
import { languages } from './i18n/translations';
import {
  PythonIcon, JavaScriptIcon, JavaIcon, PHPIcon,
  DatabaseIcon, ApiIcon, AIIcon, UIUXIcon,
  TradingIcon, ChatIcon, StudentIcon, GamingIcon, WebIcon,
  ArchitectureIcon,
} from './components/TechIcons';

// Icon mapping for projects
const getProjectIcon = (title: string): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
    'ربات معامله‌گر فارکس': <TradingIcon className="w-5 h-5" />,
    'پیام‌رسان Hs Chat': <ChatIcon className="w-5 h-5" />,
    'دستیار هوشمند دانشجو': <StudentIcon className="w-5 h-5" />,
    'بهینه‌ساز لپ‌تاپ گیمینگ': <GamingIcon className="w-5 h-5" />,
    'بک‌اند سایت سنرست': <WebIcon className="w-5 h-5" />,
    'نرم‌افزار تحلیل لاستیک کویر تایر': <ArchitectureIcon className="w-5 h-5" />,
  };
  return icons[title] || <Code2 className="w-5 h-5" />;
};

// Icon mapping for skills
const getSkillIcon = (name: string): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
    'Python': <PythonIcon className="w-4 h-4" />,
    'Back-end Development': <Server className="w-4 h-4" />,
    'RESTful APIs': <ApiIcon className="w-4 h-4" />,
    'Database (SQL/NoSQL)': <DatabaseIcon className="w-4 h-4" />,
    'JavaScript': <JavaScriptIcon className="w-4 h-4" />,
    'Java': <JavaIcon className="w-4 h-4" />,
    'PHP': <PHPIcon className="w-4 h-4" />,
    'AI & Automation': <AIIcon className="w-4 h-4" />,
    'UI/UX Design': <UIUXIcon className="w-4 h-4" />,
    'Software Architecture': <Server className="w-4 h-4" />,
  };
  return icons[name] || <Code2 className="w-4 h-4" />;
};

// Stats icon map
const statIconMap = {
  code: <Code2 size={18} />,
  sparkles: <Sparkles size={18} />,
  server: <Server size={18} />,
  check: <CheckCircle size={18} />,
};

const App: React.FC = () => {
  const { data, theme, isAdmin, lang, isLoading, loadProgress, loadStatus } = useSite();
  const T = (key: Parameters<typeof t>[1]) => t(lang, key);
  const tx = (original: string, translations?: { [l: string]: string }) =>
    tr(original, translations, lang);
  const currentLang = languages.find(l => l.code === lang);
  const dir = currentLang?.dir || 'rtl';
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // عکس چرخشی برای Hero
  const currentAvatar = useRotatingAvatar(
    data.personal.avatar,
    data.personal.avatars,
    data.personal.avatarRotateInterval || 4
  );

  // در موبایل once:true (یک‌بار)، در دسکتاپ once:false (هربار scroll)
  const viewportConfig = { once: isMobile, margin: isMobile ? '-20px' : '-80px' };

  const bgClass = theme === 'dark' ? 'bg-void' : 'bg-[#f8fafc]';
  const textClass = theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900';

  // About paragraphs — split aboutFull by double newline
  const aboutParagraphs = (data.personal.aboutFull || '')
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean);

  // Stat label map by language
  const getStatLabel = (stat: typeof data.statWidgets[0]): string => {
    const map: Record<string, string> = {
      fa: stat.labelFa,
      en: stat.labelEn,
      ru: stat.labelRu,
      ar: stat.labelAr,
      tr: stat.labelTr,
    };
    return map[lang] || stat.labelFa;
  };

  if (isLoading) {
    return <LoadingScreen progress={loadProgress} status={loadStatus} />;
  }

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen ${bgClass} ${textClass} overflow-x-hidden`}
      dir={dir}
    >
      {/* Theme Toggle + Lang Switcher */}
      <ThemeToggle />
      <LangSwitcher />

      {/* Admin Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => isAdmin ? setShowAdmin(true) : setShowLogin(true)}
        className={`fixed top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
          theme === 'dark'
            ? 'bg-zinc-800/80 border border-zinc-700 text-violet-400 hover:bg-zinc-700'
            : 'bg-white/80 border border-zinc-200 text-violet-600 hover:bg-zinc-100'
        } backdrop-blur-sm shadow-lg`}
        title={T('adminPanel')}
      >
        <Settings size={18} />
      </motion.button>

      {/* Modals */}
      <AnimatePresence>
        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onSuccess={() => { setShowLogin(false); setShowAdmin(true); }}
          />
        )}
        {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
      </AnimatePresence>

      {/* Background Effects */}
      <BinaryRain />

      {theme === 'dark' && !isMobile && (
        <>
          <FloatingLogos />
          <ScanLine />
        </>
      )}
      {theme === 'dark' && isMobile && <ScanLine />}

      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />

      {theme === 'dark' && !isMobile && (
        <>
          <div className="fixed top-[-20%] right-[15%] w-[700px] h-[700px] bg-violet-600/[0.03] rounded-full blur-[150px] pointer-events-none" />
          <div className="fixed bottom-[-15%] left-[10%] w-[600px] h-[600px] bg-blue-600/[0.03] rounded-full blur-[130px] pointer-events-none" />
          <div className="fixed top-[50%] left-[40%] w-[500px] h-[500px] bg-pink-600/[0.02] rounded-full blur-[120px] pointer-events-none" />
        </>
      )}
      {theme === 'dark' && isMobile && (
        <div className="fixed top-[-10%] right-[5%] w-[300px] h-[300px] bg-violet-600/[0.03] rounded-full blur-[80px] pointer-events-none" />
      )}

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-right"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4, #ec4899)',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">

        {/* ═══════════════════════════════════════════════
            HERO SECTION
            ═══════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
          <div className="relative max-w-6xl mx-auto text-center w-full">

            <div className="relative mx-auto mb-2 w-full" style={{ maxWidth: '800px' }}>

              {/* Layer 0 */}
              <motion.div
                initial={{ opacity: 0, y: 100, rotateX: 40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1.4, delay: 0, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none"
                style={{ top: '-5%', perspective: '800px' }}
              >
                <span className="hero-3d-text-solid text-[100px] sm:text-[160px] md:text-[220px] lg:text-[280px]" dir="ltr">
                  {'</>'}
                </span>
              </motion.div>

              {/* Layer 1: DEV */}
              <motion.div
                initial={{ opacity: 0, x: -120, skewX: 15 }}
                animate={{ opacity: 1, x: 0, skewX: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none select-none"
                style={{ top: '15%' }}
              >
                <span className="hero-3d-text text-[110px] sm:text-[170px] md:text-[230px] lg:text-[270px]" dir="ltr">
                  DEV
                </span>
              </motion.div>

              {/* Layer 1b: ELOPER */}
              <motion.div
                initial={{ opacity: 0, x: 120, skewX: -15 }}
                animate={{ opacity: 1, x: 0, skewX: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none select-none"
                style={{ top: '52%' }}
              >
                <span className="hero-3d-text-stroke text-[80px] sm:text-[130px] md:text-[180px] lg:text-[210px]" dir="ltr">
                  ELOPER
                </span>
              </motion.div>

              {/* Layer 2: Person */}
              <motion.div
                initial={{ opacity: 0, y: 140, scale: 0.65 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 50,
                  damping: 14,
                  delay: 0.15,
                  mass: 1.4,
                }}
                className="relative z-10 mx-auto w-72 h-[380px] sm:w-[360px] sm:h-[460px] md:w-[440px] md:h-[560px] lg:w-[500px] lg:h-[620px]"
              >
                <ProfileBadges />

                
                
                
                
<AnimatePresence mode="wait">
  <motion.img
    key={currentAvatar}
    src={currentAvatar}
    alt={data.personal.nameFa}
    initial={{ opacity: 0, scale: 1.08, filter: 'blur(20px)' }}
    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
    exit={{ opacity: 0, scale: 0.96, filter: 'blur(15px)' }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className="relative z-10 w-full h-full object-contain object-bottom avatar-nobg"
    style={{
      maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
      position: 'absolute',
      inset: 0,
    }}
    whileHover={{ scale: 1.02 }}
  />
</AnimatePresence>
                

                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-80 h-28 rounded-full blur-3xl bg-violet-500/25 z-0" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-56 h-14 rounded-full blur-xl bg-blue-500/20 z-0" />
              </motion.div>
            </div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.8 }}
              className="mb-2"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
                <motion.span
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(90deg, #a78bfa, #60a5fa, #c084fc, #f0abfc, #a78bfa)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  {data.personal.nameFa}
                </motion.span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className={`text-xs sm:text-sm font-medium tracking-widest mt-1 ${
                  theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'
                }`}
                dir="ltr"
              >
                {data.personal.nameEn}
              </motion.p>

              {data.personal.availableForWork && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1, type: 'spring', stiffness: 150 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 mt-3 rounded-full glass shadow-lg"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                    <span className="relative rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className={`text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase ${
                    theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    {T('openToWork')}
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* Slogan */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="text-sm sm:text-base font-semibold text-violet-400 mb-3"
            >
              {data.personal.slogan}
            </motion.p>

            {/* Typing animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex items-center justify-center gap-2 mb-4 h-8"
            >
              <Terminal size={16} className={theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} />
              <TypewriterText words={data.typingWords} typingSpeed={80} deletingSpeed={40} pauseDuration={1500} />
            </motion.div>

            {/* Short description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className={`max-w-md mx-auto text-xs sm:text-sm leading-relaxed mb-5 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              {data.personal.aboutShort}
            </motion.p>

            {/* Contact badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-5"
            >
              <a href={`tel:${data.personal.phone}`} className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-full text-[10px] sm:text-xs hover:border-violet-500/30 transition-all">
                <Phone size={12} className="text-violet-400" />
                <span className="font-mono" dir="ltr">{data.personal.phone}</span>
              </a>
              <a href={`mailto:${data.personal.email}`} className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-full text-[10px] sm:text-xs hover:border-blue-500/30 transition-all">
                <Mail size={12} className="text-blue-400" />
                <span>{T('email')}</span>
              </a>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139,92,246,0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (data.personal.resumeFile) {
                    const link = document.createElement('a');
                    link.href = data.personal.resumeFile;
                    link.download = data.personal.resumeFileName || 'resume.pdf';
                    link.click();
                  }
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-l from-violet-600 to-blue-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-violet-500/20 ${
                  !data.personal.resumeFile ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!data.personal.resumeFile}
              >
                <Download size={14} />
                {T('downloadResume')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full glass font-semibold text-xs sm:text-sm hover:border-white/[0.15] transition-all"
              >
                <Zap size={14} className="text-yellow-400" />
                {T('projects')}
              </motion.button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2"
            >
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ChevronDown size={18} className={theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'} />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            ABOUT SECTION
            ═══════════════════════════════════════════════ */}
        <section className="relative py-14 sm:py-18 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title={T('aboutTitle')}
              subtitle={T('aboutSubtitle')}
              icon="👋"
              gradient="text-gradient-main"
              align="center"
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative glass-strong rounded-2xl p-6 sm:p-8 overflow-hidden"
              style={{
                contain: 'layout style paint',
                transform: 'translateZ(0)',
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-500/[0.08] to-transparent rounded-bl-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/[0.08] to-transparent rounded-tr-full pointer-events-none" />

              <div className="relative">
                <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
                  <img
                    src={data.personal.avatar}
                    alt={data.personal.nameFa}
                    loading="lazy"
                    decoding="async"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-white/10 shrink-0 shadow-xl"
                  />
                  <div className="text-center sm:text-right">
                    <h3 className="text-lg sm:text-xl font-bold mb-1">
                      {data.personal.title}
                    </h3>
                    <p className="text-sm text-violet-400 font-semibold">
                      {data.personal.subtitle}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2 justify-center sm:justify-start">
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                        <CheckCircle size={10} /> {T('ctaFastResponse')}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-blue-400">
                        <Zap size={10} /> {T('scalableArch')}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-violet-400">
                        <Code2 size={10} /> {T('flawlessQuality')}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`text-sm sm:text-base leading-[2.2] space-y-4 ${
                    theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
                  }`}
                >
                  {aboutParagraphs.length > 0 ? (
                    aboutParagraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))
                  ) : (
                    <p>{data.personal.aboutShort}</p>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { icon: <Zap size={18} />, title: T('quickProblem'), desc: T('quickProblemDesc'), color: 'amber' },
                    { icon: <Server size={18} />, title: T('scalableArch'), desc: T('scalableArchDesc'), color: 'violet' },
                    { icon: <CheckCircle size={18} />, title: T('flawlessQuality'), desc: T('flawlessQualityDesc'), color: 'emerald' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl ${
                        theme === 'dark' ? 'bg-white/[0.03]' : 'bg-black/[0.02]'
                      } border ${
                        theme === 'dark' ? 'border-white/[0.05]' : 'border-black/[0.05]'
                      } transition-transform duration-300 cursor-default hover:-translate-y-1`}
                    >
                      <div className={`text-${item.color}-400 mb-2`}>{item.icon}</div>
                      <p className="text-sm font-bold mb-1">{item.title}</p>
                      <p className={`text-[11px] leading-relaxed ${
                        theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'
                      }`}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  {data.statWidgets.map((stat) => (
                    <div
                      key={stat.id}
                      className={`text-center p-4 rounded-xl ${
                        theme === 'dark' ? 'bg-white/[0.03]' : 'bg-black/[0.02]'
                      } border ${
                        theme === 'dark' ? 'border-white/[0.05]' : 'border-black/[0.05]'
                      } cursor-default transition-transform duration-300 hover:-translate-y-1`}
                    >
                      <div className={`text-${stat.color}-400 mb-2 flex justify-center`}>
                        {statIconMap[stat.icon]}
                      </div>
                      <p className="text-2xl sm:text-3xl font-black">{stat.value}</p>
                      <p className={`text-[10px] sm:text-xs mt-1 ${
                        theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'
                      }`}>
                        {getStatLabel(stat)}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className={`mt-6 p-4 rounded-xl relative overflow-hidden ${
                    theme === 'dark' ? 'bg-violet-500/[0.04]' : 'bg-violet-500/[0.03]'
                  } border ${
                    theme === 'dark' ? 'border-violet-500/[0.1]' : 'border-violet-500/[0.08]'
                  }`}
                >
                  <div className="absolute top-2 right-3 text-4xl text-violet-500/20 font-serif leading-none select-none">❝</div>
                  <p className={`text-xs sm:text-sm italic leading-relaxed pr-6 ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>
                    {T('aboutQuote1')}<br/>{T('aboutQuote2')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SKILLS SECTION
            ═══════════════════════════════════════════════ */}
        <section className="relative py-14 sm:py-18 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title={T('skillsTitle')}
              subtitle={T('skillsSubtitle')}
              icon="⚡"
              gradient="text-gradient-cyan"
            />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportConfig}
              className="flex flex-wrap justify-center gap-2 mb-8"
            >
              <AnimatedBadge text="Python" icon={<PythonIcon className="w-3.5 h-3.5" />} color="59, 130, 246" delay={0} variant="glow" />
              <AnimatedBadge text="Java" icon={<JavaIcon className="w-3.5 h-3.5" />} color="245, 158, 11" delay={0.05} />
              <AnimatedBadge text="PHP" icon={<PHPIcon className="w-3.5 h-3.5" />} color="168, 85, 247" delay={0.1} />
              <AnimatedBadge text="JavaScript" icon={<JavaScriptIcon className="w-3.5 h-3.5" />} color="245, 158, 11" delay={0.15} />
              <AnimatedBadge text="RESTful APIs" icon={<ApiIcon className="w-3.5 h-3.5" />} color="6, 182, 212" delay={0.2} />
              <AnimatedBadge text="Database" icon={<DatabaseIcon className="w-3.5 h-3.5" />} color="16, 185, 129" delay={0.25} />
              <AnimatedBadge text="AI" icon={<AIIcon className="w-3.5 h-3.5" />} color="236, 72, 153" delay={0.3} variant="glow" />
              <AnimatedBadge text="UI/UX" icon={<UIUXIcon className="w-3.5 h-3.5" />} color="244, 114, 182" delay={0.35} />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {data.skills.map((skill, i) => (
                <SkillBar
                  key={skill.id}
                  name={skill.name}
                  level={skill.level}
                  color={skill.color}
                  icon={getSkillIcon(skill.name)}
                  delay={i * 0.05}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            WORK EXPERIENCE SECTION
            ═══════════════════════════════════════════════ */}
        <section className="relative py-14 sm:py-18 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <SectionTitle
              title={T('workTitle')}
              subtitle={T('workSubtitle')}
              icon="💼"
              gradient="text-gradient-gold"
            />

            <div className="space-y-6">
              {data.workExperience.map((work, i) => (
                <TimelineItem
                  key={work.id}
                  title={tx(work.title, work.titleTr)}
                  subtitle={tx(work.company, work.companyTr)}
                  description={tx(work.description, work.descriptionTr)}
                  icon={<Briefcase className="w-5 h-5" />}
                  color={work.color}
                  index={i}
                  side="right"
                  avatar={work.avatar}
                  isCurrent={work.isCurrent}
                  currentLabel={T('active')}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.3 }}
              className="mt-8 glass rounded-xl p-4"
            >
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <Server size={16} />, title: T('backendDev'), color: 'text-violet-400' },
                  { icon: <Database size={16} />, title: T('dbOptimize'), color: 'text-blue-400' },
                  { icon: <Palette size={16} />, title: T('agileTeam'), color: 'text-cyan-400' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportConfig}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className={`text-center p-2 rounded-lg ${
                      theme === 'dark' ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
                    }`}
                  >
                    <div className={`${item.color} mb-1 flex justify-center`}>{item.icon}</div>
                    <p className="text-[9px] sm:text-[10px] font-bold">{item.title}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            PROJECTS SECTION
            ═══════════════════════════════════════════════ */}
        <section className="relative py-14 sm:py-18 px-4 sm:px-6">
          {theme === 'dark' && !isMobile && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/[0.03] rounded-full blur-[120px] pointer-events-none" />
          )}

          <div className="max-w-5xl mx-auto relative">
            <SectionTitle
              title={T('projectsTitle')}
              subtitle={T('projectsSubtitle')}
              icon="🚀"
              gradient="text-gradient-main"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.projects.map((project, i) => (
                <ProjectCard3D
                  key={project.id}
                  title={tx(project.title, project.titleTr)}
                  description={tx(project.description, project.descriptionTr)}
                  techs={project.techs}
                  icon={getProjectIcon(project.title)}
                  color={project.color}
                  image={project.image}
                  index={i}
                  isCurrent={project.isCurrent}
                  inProgressLabel={T('inProgress')}
                  viewLabel={T('view')}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            CERTIFICATIONS SECTION
            ═══════════════════════════════════════════════ */}
        <section className="relative py-14 sm:py-18 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title={T('certsTitle')}
              subtitle={T('certsSubtitle')}
              icon="🏆"
              gradient="text-gradient-pink"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.certificates.map((cert, i) => (
                <CertCard
                  key={cert.id}
                  title={tx(cert.title, cert.titleTr)}
                  icon={<Award className="w-5 h-5" />}
                  color={cert.color}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SOCIAL LINKS SECTION
            ═══════════════════════════════════════════════ */}
        <section className="relative py-14 sm:py-18 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title={T('socialTitle')}
              subtitle={T('socialSubtitle')}
              icon="🌐"
              gradient="text-gradient-cyan"
            />
            <SocialLinks />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            WORKFLOW / PROCESS SECTION
            ═══════════════════════════════════════════════ */}
        <section className="relative py-14 sm:py-18 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title={T('processTitle')}
              subtitle={T('processSubtitle')}
              icon="🔄"
              gradient="text-gradient-gold"
            />

            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-[2px] -translate-y-1/2 z-0"
                style={{
                  background: theme === 'dark'
                    ? 'linear-gradient(90deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2), rgba(6,182,212,0.2), rgba(16,185,129,0.2))'
                    : 'linear-gradient(90deg, rgba(139,92,246,0.15), rgba(59,130,246,0.15), rgba(6,182,212,0.15), rgba(16,185,129,0.15))',
                }}
              />

              {[
                {
                  step: '۰۱', title: T('step1'), desc: T('step1Desc'), color: '139, 92, 246',
                  iconSvg: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
                    </svg>
                  ),
                },
                {
                  step: '۰۲', title: T('step2'), desc: T('step2Desc'), color: '59, 130, 246',
                  iconSvg: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                    </svg>
                  ),
                },
                {
                  step: '۰۳', title: T('step3'), desc: T('step3Desc'), color: '6, 182, 212',
                  iconSvg: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                    </svg>
                  ),
                },
                {
                  step: '۰۴', title: T('step4'), desc: T('step4Desc'), color: '16, 185, 129',
                  iconSvg: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={viewportConfig}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 100, damping: 16 }}
                  whileHover={{ y: -6, scale: 1.04 }}
                  className="relative z-10 glass rounded-xl p-5 text-center overflow-hidden cursor-default transition-all duration-300 group"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                    style={{ background: `linear-gradient(90deg, transparent, rgba(${item.color}, 0.6), transparent)` }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 30%, rgba(${item.color}, 0.06), transparent 70%)` }}
                  />
                  <span className="text-[10px] font-mono font-bold" style={{ color: `rgba(${item.color}, 0.4)` }}>
                    {item.step}
                  </span>
                  <motion.div
                    className="flex justify-center my-3"
                    style={{ color: `rgba(${item.color}, 0.8)` }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        backgroundColor: `rgba(${item.color}, 0.1)`,
                        border: `1px solid rgba(${item.color}, 0.2)`,
                      }}
                    >
                      {item.iconSvg}
                    </div>
                  </motion.div>
                  <h4 className="text-sm font-bold mb-1">{item.title}</h4>
                  <p className={`text-[10px] leading-relaxed ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'
                  }`}>
                    {item.desc}
                  </p>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -left-3 -translate-y-1/2 z-20">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: theme === 'dark' ? '#0d0d14' : '#f8fafc',
                          border: `2px solid rgba(${item.color}, 0.3)`,
                        }}
                      >
                        <svg viewBox="0 0 12 12" className="w-3 h-3" style={{ color: `rgba(${item.color}, 0.6)` }}>
                          <path d="M2 6h8M6 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            CONTACT CTA SECTION
            ═══════════════════════════════════════════════ */}
        <section className="relative py-14 sm:py-18 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={viewportConfig}
              transition={{ type: 'spring', stiffness: 80, damping: 20 }}
              className="relative glass-strong rounded-3xl p-6 sm:p-10 text-center overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-b from-violet-500/10 to-transparent rounded-b-full pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportConfig}
                className="text-5xl block mb-4"
              >
                🤝
              </motion.span>

              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gradient-main">
                {T('ctaTitle')}
              </h2>

              <p className={`text-sm sm:text-base mb-6 max-w-lg mx-auto leading-relaxed ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                {T('ctaDesc')}
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportConfig}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-4 mb-6"
              >
                {[
                  { icon: <CheckCircle size={14} />, text: T('ctaFastResponse'), color: 'emerald' },
                  { icon: <Zap size={14} />, text: T('ctaQuickStart'), color: 'amber' },
                  { icon: <Code2 size={14} />, text: T('ctaFreeConsult'), color: 'violet' },
                ].map((item, i) => (
                  <span key={i} className={`flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-${item.color}-400`}>
                    {item.icon} {item.text}
                  </span>
                ))}
              </motion.div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <motion.a
                  href={`tel:${data.personal.phone}`}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139,92,246,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-l from-violet-600 to-blue-600 text-white font-bold text-sm shadow-lg shadow-violet-500/20"
                >
                  <Phone size={16} />
                  {T('ctaCall')}
                </motion.a>
                <motion.a
                  href={`mailto:${data.personal.email}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full glass font-semibold text-sm hover:border-white/[0.15] transition-all"
                >
                  <Mail size={16} />
                  {T('ctaEmail')}
                </motion.a>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportConfig}
                transition={{ delay: 0.5 }}
                className={`mt-5 text-[10px] ${
                  theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'
                }`}
              >
                ⏱️ {T('ctaResponseTime')}
              </motion.p>

              <div className="noise absolute inset-0 pointer-events-none rounded-3xl" />
            </motion.div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative pb-6 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="h-px w-full bg-gradient-to-l from-transparent via-white/[0.06] to-transparent mb-5" />
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-2 text-[9px] sm:text-[10px] ${
              theme === 'dark' ? 'text-zinc-600' : 'text-zinc-500'
            }`}>
              <span className="font-bold">{data.personal.nameFa}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;