import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useSite();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`fixed top-4 left-4 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
        theme === 'dark'
          ? 'bg-zinc-800/80 border border-zinc-700 text-yellow-400 hover:bg-zinc-700'
          : 'bg-white/80 border border-zinc-200 text-violet-600 hover:bg-zinc-100'
      } backdrop-blur-sm shadow-lg`}
      title={theme === 'dark' ? 'حالت روشن' : 'حالت تیره'}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
