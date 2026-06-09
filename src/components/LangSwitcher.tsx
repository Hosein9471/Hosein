import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { languages } from '../i18n/translations';

const LangSwitcher: React.FC = () => {
  const { lang, setLang, theme } = useSite();
  const [open, setOpen] = useState(false);

  const current = languages.find(l => l.code === lang) || languages[0];

  return (
    <div className="fixed top-4 left-16 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full transition-colors ${
          theme === 'dark'
            ? 'bg-zinc-800/80 border border-zinc-700 text-zinc-300 hover:bg-zinc-700'
            : 'bg-white/80 border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
        } backdrop-blur-sm shadow-lg`}
      >
        <Globe size={14} />
        <span className="text-xs font-semibold">{current.flag}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-12 left-0 rounded-xl overflow-hidden shadow-2xl ${
              theme === 'dark'
                ? 'bg-zinc-900 border border-zinc-800'
                : 'bg-white border border-zinc-200'
            }`}
          >
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  lang === l.code
                    ? 'bg-violet-500/20 text-violet-400'
                    : theme === 'dark'
                    ? 'text-zinc-300 hover:bg-zinc-800'
                    : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <span className="text-base">{l.flag}</span>
                <span className="font-medium text-xs whitespace-nowrap">{l.nativeName}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close */}
      {open && <div className="fixed inset-0 z-[-1]" onClick={() => setOpen(false)} />}
    </div>
  );
};

export default LangSwitcher;
