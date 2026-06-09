import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Lock, AlertCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { t } from '../i18n/translations';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSuccess }) => {
  const { login, theme, lang } = useSite();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-sm rounded-2xl p-6 shadow-2xl ${
          theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-zinc-200'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <Lock size={20} className="text-white" />
            </div>
            <h2 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              {t(lang, 'adminPanel') || 'Admin'}
            </h2>
          </div>
          <button onClick={onClose} className={`p-2 rounded-lg transition-colors ${
            theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'
          }`}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              رمز عبور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور را وارد کنید"
              className={`w-full px-4 py-3 rounded-lg text-sm transition-all ${
                theme === 'dark'
                  ? 'bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 focus:border-violet-500'
                  : 'bg-zinc-50 border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-violet-500'
              } ${error ? 'border-red-500 shake' : ''}`}
              autoFocus
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-400 text-xs"
            >
              <AlertCircle size={14} />
              رمز عبور اشتباه است
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 text-white font-bold text-sm"
          >
            ورود
          </motion.button>
        </form>

        <p className={`text-center text-[10px] mt-4 ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>
          مدیر سایت
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;
