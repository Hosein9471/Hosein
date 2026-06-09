import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, User, Briefcase, FolderOpen, Award, Share2, Settings,
  Save, LogOut, Plus, Trash2, Palette, Image, Tag,
  ArrowUp, ArrowDown, BarChart2,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import type { StatWidget } from '../context/SiteContext';
import { uploadImageToStorage } from '../utils/uploadImage';

type Tab = 'personal' | 'badges' | 'skills' | 'projects' | 'work' | 'certs' | 'social' | 'stats' | 'settings';

const AdminPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    data, updateData, updatePersonal,
    theme, toggleTheme, logout, changePassword,
    exportData, publishToSupabase,
  } = useSite();

  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const [saved, setSaved] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMsg, setPassMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'personal', label: 'اطلاعات شخصی',    icon: <User size={16} />       },
    { id: 'badges',   label: 'بج‌های پروفایل',   icon: <Tag size={16} />        },
    { id: 'stats',    label: 'ویجت‌های آماری',   icon: <BarChart2 size={16} />  },
    { id: 'skills',   label: 'مهارت‌ها',          icon: <Settings size={16} />   },
    { id: 'projects', label: 'پروژه‌ها',          icon: <FolderOpen size={16} /> },
    { id: 'work',     label: 'سوابق کاری',        icon: <Briefcase size={16} />  },
    { id: 'certs',    label: 'گواهینامه‌ها',      icon: <Award size={16} />      },
    { id: 'social',   label: 'شبکه‌های اجتماعی', icon: <Share2 size={16} />     },
    { id: 'settings', label: 'تنظیمات',           icon: <Palette size={16} />    },
  ];

  const inputClass = `w-full px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
    theme === 'dark'
      ? 'bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500'
      : 'bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500'
  }`;

  const labelClass = `block text-xs font-semibold mb-1.5 ${
    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
  }`;

  const cardClass = `p-4 rounded-xl ${
    theme === 'dark' ? 'bg-zinc-800/50' : 'bg-zinc-100'
  }`;

  const updateStat = (index: number, patch: Partial<StatWidget>) => {
    const updated = [...data.statWidgets];
    updated[index] = { ...updated[index], ...patch };
    updateData({ statWidgets: updated });
  };

  const removeStat = (index: number) => {
    updateData({ statWidgets: data.statWidgets.filter((_, i) => i !== index) });
  };

  const addStat = () => {
    const newStat: StatWidget = {
      id: Date.now().toString(),
      value: '۰',
      labelFa: 'عنوان جدید',
      labelEn: 'New Label',
      labelRu: 'Новый',
      labelAr: 'جديد',
      labelTr: 'Yeni',
      icon: 'code',
      color: 'violet',
    };
    updateData({ statWidgets: [...data.statWidgets, newStat] });
  };

  // helper برای آپلود عکس با فشرده‌سازی

const handleImageUpload = async (
  file: File,
  _maxSize: number,
  _quality: number,
  callback: (url: string) => void
) => {
  setUploading(true);
  try {
    // آپلود مستقیم به Supabase Storage
    const url = await uploadImageToStorage(file);
    callback(url);
  } catch (err: any) {
    console.error('Upload error:', err);
    alert('خطا در آپلود عکس: ' + (err?.message || 'Unknown'));
  }
  setUploading(false);
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
        className={`w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col ${
          theme === 'dark'
            ? 'bg-zinc-900 border border-zinc-800'
            : 'bg-white border border-zinc-200'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          theme === 'dark' ? 'border-zinc-800 bg-zinc-900/80' : 'border-zinc-200 bg-zinc-50'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <Settings size={20} className="text-white" />
            </div>
            <div>
              <h2 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                پنل مدیریت
              </h2>
              <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                {uploading ? '⏳ در حال پردازش عکس...' : 'ویرایش محتوای سایت'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { logout(); onClose(); }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={14} />
              خروج
            </motion.button>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-zinc-800 text-zinc-400'
                  : 'hover:bg-zinc-100 text-zinc-600'
              }`}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Sidebar */}
          <div className={`w-52 shrink-0 p-3 border-l overflow-y-auto ${
            theme === 'dark'
              ? 'border-zinc-800 bg-zinc-900/50'
              : 'border-zinc-200 bg-zinc-50'
          }`}>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                      : theme === 'dark'
                      ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                      : 'text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">

              {/* ═══ PERSONAL INFO TAB ═══ */}
              {activeTab === 'personal' && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    اطلاعات شخصی
                  </h3>

                  {/* Avatar اصلی */}
                  <div className={cardClass}>
                    <div className="flex items-center gap-4">
                      <img
                        src={data.personal.avatar}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full object-cover border-2 border-violet-500/30"
                      />
                      <div className="flex-1 space-y-2">
                        <label className={labelClass}>
                          <Image size={12} className="inline ml-1" />
                          تصویر پروفایل اصلی
                        </label>
                        <div className="flex gap-2">
                          <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/20 text-violet-400 text-xs font-semibold hover:bg-violet-500/30 transition-colors cursor-pointer">
                            <Image size={14} />
                            {uploading ? '⏳ در حال پردازش...' : 'انتخاب از سیستم'}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={uploading}
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  await handleImageUpload(file, 1200, 0.92, (b64) => {
                                    updatePersonal({ avatar: b64 });
                                  });
                                }
                                e.target.value = '';
                              }}
                            />
                          </label>
                        </div>
<input
  type="text"
  value={data.personal.avatar || ''}
  onChange={(e) => updatePersonal({ avatar: e.target.value })}
  className={inputClass}
  dir="ltr"
  placeholder="آدرس تصویر..."
/>                        

                        
                        
                        
                        
                        
                      </div>
                    </div>
                  </div>

                  {/* ── Multiple Avatars (Rotating) — بدون محدودیت ── */}
                  <div className={cardClass}>
                    <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      🔄 عکس‌های چرخشی (اختیاری، بدون محدودیت تعداد)
                    </p>
                    <p className={`text-[10px] mb-3 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                      هر چند عکس بخواهی اضافه کن — به صورت رندوم در صفحه اصلی چرخش می‌کنند
                    </p>

                    <div className="flex flex-wrap gap-3 mb-3">
                      {(data.personal.avatars || []).map((img, i) => (
                        <div key={i} className="relative group">
                          <img
                            src={img}
                            alt={`Avatar ${i + 1}`}
                            className="w-16 h-16 rounded-lg object-cover border-2 border-violet-500/30"
                          />
                          <button
                            onClick={() => {
                              const updated = (data.personal.avatars || []).filter((_, idx) => idx !== i);
                              updatePersonal({ avatars: updated });
                            }}
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            title="حذف"
                          >
                            ×
                          </button>
                          <span className="absolute bottom-0 left-0 right-0 text-center text-[8px] bg-black/60 text-white py-0.5">
                            #{i + 1}
                          </span>
                        </div>
                      ))}

                      <label className={`w-16 h-16 rounded-lg border-2 border-dashed border-violet-500/40 flex items-center justify-center cursor-pointer hover:bg-violet-500/10 transition-colors ${uploading ? 'opacity-50 cursor-wait' : ''}`}>
                        <span className="text-2xl text-violet-400">{uploading ? '⏳' : '+'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploading}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              await handleImageUpload(file, 1200, 0.92, (b64) => {
                                const current = data.personal.avatars || [];
                                updatePersonal({ avatars: [...current, b64] });
                              });
                            }
                            e.target.value = '';
                          }}
                        />
                      </label>
                    </div>

                    {(data.personal.avatars?.length || 0) > 1 && (
                      <div className="flex items-center gap-3">
                        <label className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          مدت چرخش (ثانیه):
                        </label>
                        <input
                          type="number"
                          min="2"
                          max="60"
                          value={data.personal.avatarRotateInterval || 4}
                          onChange={(e) => updatePersonal({ avatarRotateInterval: parseInt(e.target.value) || 4 })}
                          className={`w-20 ${inputClass}`}
                        />
                        <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                          ({data.personal.avatars?.length} عکس)
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>نام فارسی</label>
                      <input type="text" value={data.personal.nameFa}
                        onChange={(e) => updatePersonal({ nameFa: e.target.value })}
                        className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>نام انگلیسی</label>
                      <input type="text" value={data.personal.nameEn}
                        onChange={(e) => updatePersonal({ nameEn: e.target.value })}
                        className={inputClass} dir="ltr" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>عنوان شغلی</label>
                      <input type="text" value={data.personal.title}
                        onChange={(e) => updatePersonal({ title: e.target.value })}
                        className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>زیرعنوان</label>
                      <input type="text" value={data.personal.subtitle}
                        onChange={(e) => updatePersonal({ subtitle: e.target.value })}
                        className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>شعار</label>
                    <input type="text" value={data.personal.slogan}
                      onChange={(e) => updatePersonal({ slogan: e.target.value })}
                      className={inputClass} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>تلفن</label>
                      <input type="text" value={data.personal.phone}
                        onChange={(e) => updatePersonal({ phone: e.target.value })}
                        className={inputClass} dir="ltr" />
                    </div>
                    <div>
                      <label className={labelClass}>ایمیل</label>
                      <input type="email" value={data.personal.email}
                        onChange={(e) => updatePersonal({ email: e.target.value })}
                        className={inputClass} dir="ltr" />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>توضیح کوتاه</label>
                    <input type="text" value={data.personal.aboutShort}
                      onChange={(e) => updatePersonal({ aboutShort: e.target.value })}
                      className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass}>
                      درباره من (کامل) — برای پاراگراف جدید یک خط خالی بگذارید
                    </label>
                    <textarea
                      value={data.personal.aboutFull}
                      onChange={(e) => updatePersonal({ aboutFull: e.target.value })}
                      rows={8}
                      className={inputClass}
                      placeholder="پاراگراف اول...

پاراگراف دوم..."
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="available"
                      checked={data.personal.availableForWork}
                      onChange={(e) => updatePersonal({ availableForWork: e.target.checked })}
                      className="w-4 h-4 rounded border-zinc-600 text-violet-500 focus:ring-violet-500"
                    />
                    <label htmlFor="available" className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      آماده همکاری هستم
                    </label>
                  </div>

                  {/* Resume PDF */}
                  <div className={cardClass}>
                    <p className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      📄 فایل رزومه (PDF)
                    </p>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-violet-500/20 text-violet-400 text-xs font-semibold hover:bg-violet-500/30 transition-colors cursor-pointer">
                        <Save size={14} />
                        {data.personal.resumeFile ? 'تغییر فایل' : 'آپلود PDF'}
                        <input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && file.type === 'application/pdf') {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                const result = ev.target?.result as string;
                                if (result) {
                                  updatePersonal({
                                    resumeFile: result,
                                    resumeFileName: file.name,
                                  });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      {data.personal.resumeFile ? (
                        <div className="flex items-center gap-2">
                          <span className={`text-xs ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            ✓ {data.personal.resumeFileName || 'resume.pdf'}
                          </span>
                          <button
                            onClick={() => updatePersonal({ resumeFile: undefined, resumeFileName: undefined })}
                            className="text-[10px] text-red-400 hover:text-red-300"
                          >
                            حذف
                          </button>
                        </div>
                      ) : (
                        <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                          فایلی آپلود نشده
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ═══ PROFILE BADGES TAB ═══ */}
              {activeTab === 'badges' && (
                <motion.div
                  key="badges"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      بج‌های روی پروفایل
                    </h3>
                    <button
                      onClick={() => updateData({
                        profileBadges: [...data.profileBadges, {
                          id: Date.now().toString(),
                          label: 'مهارت جدید',
                          icon: 'code',
                          color: '139, 92, 246',
                          enabled: true,
                        }],
                      })}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-400 text-xs font-semibold hover:bg-violet-500/30 transition-colors"
                    >
                      <Plus size={14} />
                      افزودن
                    </button>
                  </div>

                  <p className={`text-xs mb-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    این بج‌ها روی و اطراف عکس پروفایل نمایش داده می‌شوند
                  </p>

                  <div className="space-y-3">
                    {data.profileBadges.map((badge, i) => (
                      <div key={badge.id} className={cardClass}>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={badge.enabled}
                            onChange={(e) => {
                              const updated = [...data.profileBadges];
                              updated[i] = { ...badge, enabled: e.target.checked };
                              updateData({ profileBadges: updated });
                            }}
                            className="w-4 h-4 rounded"
                          />
                          <input
                            type="text"
                            value={badge.label}
                            onChange={(e) => {
                              const updated = [...data.profileBadges];
                              updated[i] = { ...badge, label: e.target.value };
                              updateData({ profileBadges: updated });
                            }}
                            className={`flex-1 ${inputClass}`}
                            placeholder="نام مهارت"
                          />
                          <input
                            type="text"
                            value={badge.color}
                            onChange={(e) => {
                              const updated = [...data.profileBadges];
                              updated[i] = { ...badge, color: e.target.value };
                              updateData({ profileBadges: updated });
                            }}
                            className={`w-32 ${inputClass}`}
                            placeholder="R, G, B"
                            dir="ltr"
                          />
                          <div
                            className="w-6 h-6 rounded-full shrink-0"
                            style={{ backgroundColor: `rgb(${badge.color})` }}
                          />
                          <button
                            onClick={() => updateData({
                              profileBadges: data.profileBadges.filter((_, idx) => idx !== i),
                            })}
                            className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ═══ STATS WIDGETS TAB ═══ */}
              {activeTab === 'stats' && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        ویجت‌های آماری
                      </h3>
                      <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                        اعداد و برچسب‌های بخش "درباره من" را ویرایش کنید
                      </p>
                    </div>
                    <button
                      onClick={addStat}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-400 text-xs font-semibold hover:bg-violet-500/30 transition-colors"
                    >
                      <Plus size={14} />
                      افزودن
                    </button>
                  </div>

                  <div className={`${cardClass} mb-2`}>
                    <p className={`text-xs font-semibold mb-3 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      پیش‌نمایش:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {data.statWidgets.map((stat) => (
                        <div
                          key={stat.id}
                          className={`text-center p-3 rounded-xl ${
                            theme === 'dark' ? 'bg-white/[0.03]' : 'bg-black/[0.02]'
                          } border ${
                            theme === 'dark' ? 'border-white/[0.05]' : 'border-black/[0.05]'
                          }`}
                        >
                          <p className={`text-xl font-black text-${stat.color}-400`}>
                            {stat.value}
                          </p>
                          <p className={`text-[10px] mt-0.5 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                            {stat.labelFa}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {data.statWidgets.map((stat, i) => (
                      <div key={stat.id} className={cardClass}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-${stat.color}-400 bg-${stat.color}-500/10`}
                            >
                              ویجت {i + 1}
                            </span>
                          </div>
                          <button
                            onClick={() => removeStat(i)}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={labelClass}>مقدار (عدد)</label>
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => updateStat(i, { value: e.target.value })}
                              className={inputClass}
                              placeholder="مثال: +۱۰ یا ۱۰۰%"
                              dir="rtl"
                            />
                          </div>

                          <div>
                            <label className={labelClass}>رنگ</label>
                            <select
                              value={stat.color}
                              onChange={(e) => updateStat(i, { color: e.target.value as StatWidget['color'] })}
                              className={inputClass}
                            >
                              <option value="violet">بنفش (violet)</option>
                              <option value="blue">آبی (blue)</option>
                              <option value="cyan">فیروزه‌ای (cyan)</option>
                              <option value="emerald">سبز (emerald)</option>
                            </select>
                          </div>

                          <div>
                            <label className={labelClass}>آیکون</label>
                            <select
                              value={stat.icon}
                              onChange={(e) => updateStat(i, { icon: e.target.value as StatWidget['icon'] })}
                              className={inputClass}
                            >
                              <option value="code">کد (code)</option>
                              <option value="sparkles">ستاره (sparkles)</option>
                              <option value="server">سرور (server)</option>
                              <option value="check">تیک (check)</option>
                            </select>
                          </div>

                          <div>
                            <label className={labelClass}>برچسب فارسی</label>
                            <input
                              type="text"
                              value={stat.labelFa}
                              onChange={(e) => updateStat(i, { labelFa: e.target.value })}
                              className={inputClass}
                              placeholder="مثال: پروژه موفق"
                            />
                          </div>

                          <div>
                            <label className={labelClass}>برچسب انگلیسی</label>
                            <input
                              type="text"
                              value={stat.labelEn}
                              onChange={(e) => updateStat(i, { labelEn: e.target.value })}
                              className={inputClass}
                              placeholder="e.g. Projects Done"
                              dir="ltr"
                            />
                          </div>

                          <div>
                            <label className={labelClass}>برچسب روسی</label>
                            <input
                              type="text"
                              value={stat.labelRu}
                              onChange={(e) => updateStat(i, { labelRu: e.target.value })}
                              className={inputClass}
                              dir="ltr"
                            />
                          </div>

                          <div>
                            <label className={labelClass}>برچسب عربی</label>
                            <input
                              type="text"
                              value={stat.labelAr}
                              onChange={(e) => updateStat(i, { labelAr: e.target.value })}
                              className={inputClass}
                            />
                          </div>

                          <div>
                            <label className={labelClass}>برچسب ترکی</label>
                            <input
                              type="text"
                              value={stat.labelTr}
                              onChange={(e) => updateStat(i, { labelTr: e.target.value })}
                              className={inputClass}
                              dir="ltr"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ═══ SKILLS TAB ═══ */}
              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      مهارت‌ها
                    </h3>
                    <button
                      onClick={() => updateData({
                        skills: [...data.skills, {
                          id: Date.now().toString(),
                          name: 'مهارت جدید',
                          level: 50,
                          color: '139, 92, 246',
                        }],
                      })}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-400 text-xs font-semibold hover:bg-violet-500/30 transition-colors"
                    >
                      <Plus size={14} />
                      افزودن
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.skills.map((skill, i) => (
                      <div key={skill.id} className={cardClass}>
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => {
                              const updated = [...data.skills];
                              updated[i] = { ...skill, name: e.target.value };
                              updateData({ skills: updated });
                            }}
                            className={`flex-1 ${inputClass}`}
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              value={skill.level}
                              onChange={(e) => {
                                const updated = [...data.skills];
                                updated[i] = { ...skill, level: parseInt(e.target.value) };
                                updateData({ skills: updated });
                              }}
                              min="0"
                              max="100"
                              className="w-24"
                            />
                            <span className={`w-10 text-center text-sm font-mono ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                              {skill.level}%
                            </span>
                          </div>
                          <button
                            onClick={() => updateData({ skills: data.skills.filter((_, idx) => idx !== i) })}
                            className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ═══ PROJECTS TAB ═══ */}
              {activeTab === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      پروژه‌ها
                    </h3>
                    <button
                      onClick={() => updateData({
                        projects: [...data.projects, {
                          id: Date.now().toString(),
                          title: 'پروژه جدید',
                          description: 'توضیحات پروژه',
                          techs: ['Tech'],
                          color: '139, 92, 246',
                          image: '/images/project-backend.jpg',
                        }],
                      })}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-400 text-xs font-semibold hover:bg-violet-500/30 transition-colors"
                    >
                      <Plus size={14} />
                      افزودن
                    </button>
                  </div>

                  <div className="space-y-4">
                    {data.projects.map((project, i) => (
                      <div key={project.id} className={cardClass}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            <button
                              disabled={i === 0}
                              onClick={() => {
                                const updated = [...data.projects];
                                [updated[i - 1], updated[i]] = [updated[i], updated[i - 1]];
                                updateData({ projects: updated });
                              }}
                              className={`p-1.5 rounded-lg transition-colors ${i === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-violet-500/20 text-violet-400'}`}
                            >
                              <ArrowUp size={14} />
                            </button>
                            <button
                              disabled={i === data.projects.length - 1}
                              onClick={() => {
                                const updated = [...data.projects];
                                [updated[i], updated[i + 1]] = [updated[i + 1], updated[i]];
                                updateData({ projects: updated });
                              }}
                              className={`p-1.5 rounded-lg transition-colors ${i === data.projects.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-violet-500/20 text-violet-400'}`}
                            >
                              <ArrowDown size={14} />
                            </button>
                            <span className={`text-[10px] font-mono mr-2 ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                              #{i + 1}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={project.isCurrent || false}
                                onChange={(e) => {
                                  const updated = [...data.projects];
                                  updated[i] = { ...project, isCurrent: e.target.checked };
                                  updateData({ projects: updated });
                                }}
                                className="w-3.5 h-3.5 rounded"
                              />
                              <span className={`text-[10px] font-semibold ${project.isCurrent ? 'text-emerald-400' : theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                                در حال انجام
                              </span>
                            </label>
                            <button
                              onClick={() => updateData({ projects: data.projects.filter((_, idx) => idx !== i) })}
                              className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="shrink-0 space-y-2">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-24 h-24 rounded-lg object-cover border border-white/10"
                            />
                            <label className={`flex items-center justify-center gap-1 px-2 py-1 rounded-lg bg-violet-500/20 text-violet-400 text-[10px] font-semibold hover:bg-violet-500/30 transition-colors cursor-pointer ${uploading ? 'opacity-50 cursor-wait' : ''}`}>
                              <Image size={10} />
                              تغییر عکس
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={uploading}
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    await handleImageUpload(file, 1200, 0.9, (b64) => {
                                      const updated = [...data.projects];
                                      updated[i] = { ...project, image: b64 };
                                      updateData({ projects: updated });
                                    });
                                  }
                                  e.target.value = '';
                                }}
                              />
                            </label>
                          </div>

                          <div className="flex-1 space-y-2">
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => {
                                const updated = [...data.projects];
                                updated[i] = { ...project, title: e.target.value };
                                updateData({ projects: updated });
                              }}
                              className={inputClass}
                              placeholder="عنوان"
                            />
                            <textarea
                              value={project.description}
                              onChange={(e) => {
                                const updated = [...data.projects];
                                updated[i] = { ...project, description: e.target.value };
                                updateData({ projects: updated });
                              }}
                              className={inputClass}
                              rows={2}
                              placeholder="توضیحات"
                            />
                            <input
                              type="text"
                              value={project.techs.join(', ')}
                              onChange={(e) => {
                                const updated = [...data.projects];
                                updated[i] = { ...project, techs: e.target.value.split(',').map(t => t.trim()) };
                                updateData({ projects: updated });
                              }}
                              className={inputClass}
                              placeholder="تکنولوژی‌ها (با کاما جدا کنید)"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ═══ WORK EXPERIENCE TAB ═══ */}
              {activeTab === 'work' && (
                <motion.div
                  key="work"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      سوابق کاری
                    </h3>
                    <button
                      onClick={() => updateData({
                        workExperience: [...data.workExperience, {
                          id: Date.now().toString(),
                          title: 'عنوان شغلی',
                          company: 'نام شرکت',
                          description: 'توضیحات',
                          color: '139, 92, 246',
                          isCurrent: false,
                          avatar: '/images/company-raika.jpg',
                        }],
                      })}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-400 text-xs font-semibold hover:bg-violet-500/30 transition-colors"
                    >
                      <Plus size={14} />
                      افزودن
                    </button>
                  </div>

                  <div className="space-y-4">
                    {data.workExperience.map((work, i) => (
                      <div key={work.id} className={cardClass}>
                        <div className="flex gap-4">
                          <div className="shrink-0 space-y-2">
                            <img
                              src={work.avatar}
                              alt={work.company}
                              className="w-16 h-16 rounded-full object-cover border-2 border-violet-500/30"
                            />
                            <label className={`flex items-center justify-center gap-1 px-2 py-1 rounded-lg bg-violet-500/20 text-violet-400 text-[9px] font-semibold hover:bg-violet-500/30 transition-colors cursor-pointer ${uploading ? 'opacity-50 cursor-wait' : ''}`}>
                              <Image size={10} />
                              تغییر
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={uploading}
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    await handleImageUpload(file, 500, 0.9, (b64) => {
                                      const updated = [...data.workExperience];
                                      updated[i] = { ...work, avatar: b64 };
                                      updateData({ workExperience: updated });
                                    });
                                  }
                                  e.target.value = '';
                                }}
                              />
                            </label>
                          </div>

                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={work.title}
                                onChange={(e) => {
                                  const updated = [...data.workExperience];
                                  updated[i] = { ...work, title: e.target.value };
                                  updateData({ workExperience: updated });
                                }}
                                className={`flex-1 ${inputClass}`}
                                placeholder="عنوان شغلی"
                              />
                              <button
                                onClick={() => updateData({
                                  workExperience: data.workExperience.filter((_, idx) => idx !== i),
                                })}
                                className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={work.company}
                              onChange={(e) => {
                                const updated = [...data.workExperience];
                                updated[i] = { ...work, company: e.target.value };
                                updateData({ workExperience: updated });
                              }}
                              className={inputClass}
                              placeholder="نام شرکت"
                            />
                            <textarea
                              value={work.description}
                              onChange={(e) => {
                                const updated = [...data.workExperience];
                                updated[i] = { ...work, description: e.target.value };
                                updateData({ workExperience: updated });
                              }}
                              className={inputClass}
                              rows={2}
                              placeholder="توضیحات"
                            />
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={work.isCurrent}
                                onChange={(e) => {
                                  const updated = [...data.workExperience];
                                  updated[i] = { ...work, isCurrent: e.target.checked };
                                  updateData({ workExperience: updated });
                                }}
                                className="w-4 h-4 rounded"
                              />
                              <span className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                در حال انجام
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ═══ CERTIFICATES TAB ═══ */}
              {activeTab === 'certs' && (
                <motion.div
                  key="certs"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      گواهینامه‌ها
                    </h3>
                    <button
                      onClick={() => updateData({
                        certificates: [...data.certificates, {
                          id: Date.now().toString(),
                          title: 'گواهینامه جدید',
                          color: '139, 92, 246',
                        }],
                      })}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-400 text-xs font-semibold hover:bg-violet-500/30 transition-colors"
                    >
                      <Plus size={14} />
                      افزودن
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.certificates.map((cert, i) => (
                      <div key={cert.id} className={`${cardClass} flex items-center gap-3`}>
                        <input
                          type="text"
                          value={cert.title}
                          onChange={(e) => {
                            const updated = [...data.certificates];
                            updated[i] = { ...cert, title: e.target.value };
                            updateData({ certificates: updated });
                          }}
                          className={`flex-1 ${inputClass}`}
                        />
                        <button
                          onClick={() => updateData({
                            certificates: data.certificates.filter((_, idx) => idx !== i),
                          })}
                          className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ═══ SOCIAL LINKS TAB ═══ */}
              {activeTab === 'social' && (
                <motion.div
                  key="social"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    شبکه‌های اجتماعی
                  </h3>

                  <div className="space-y-3">
                    {data.socialLinks.map((social, i) => (
                      <div key={social.id} className={cardClass}>
                        <div className="flex items-center gap-3 mb-2">
                          <input
                            type="checkbox"
                            checked={social.enabled}
                            onChange={(e) => {
                              const updated = [...data.socialLinks];
                              updated[i] = { ...social, enabled: e.target.checked };
                              updateData({ socialLinks: updated });
                            }}
                            className="w-4 h-4 rounded"
                          />
                          <span className={`w-20 text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                            {social.name}
                          </span>
                          <input
                            type="text"
                            value={social.url}
                            onChange={(e) => {
                              const updated = [...data.socialLinks];
                              updated[i] = { ...social, url: e.target.value };
                              updateData({ socialLinks: updated });
                            }}
                            className={`flex-1 ${inputClass}`}
                            dir="ltr"
                          />
                        </div>
                        <div className="flex items-center gap-2 mr-7">
                          {social.customIcon && (
                            <img src={social.customIcon} alt="" className="w-6 h-6 object-contain rounded" />
                          )}
                          <label className={`flex items-center gap-1 px-2 py-1 rounded-lg bg-violet-500/10 text-violet-400 text-[10px] font-semibold hover:bg-violet-500/20 transition-colors cursor-pointer ${uploading ? 'opacity-50 cursor-wait' : ''}`}>
                            <Image size={10} />
                            آیکون سفارشی
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={uploading}
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  await handleImageUpload(file, 256, 0.92, (b64) => {
                                    const updated = [...data.socialLinks];
                                    updated[i] = { ...social, customIcon: b64 };
                                    updateData({ socialLinks: updated });
                                  });
                                }
                                e.target.value = '';
                              }}
                            />
                          </label>
                          {social.customIcon && (
                            <button
                              onClick={() => {
                                const updated = [...data.socialLinks];
                                updated[i] = { ...social, customIcon: undefined };
                                updateData({ socialLinks: updated });
                              }}
                              className="text-[10px] text-red-400 hover:text-red-300"
                            >
                              حذف آیکون
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ═══ SETTINGS TAB ═══ */}
              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    تنظیمات
                  </h3>

                  <div className={cardClass}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                          تم سایت
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                          انتخاب بین حالت روشن و تیره
                        </p>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                          theme === 'dark'
                            ? 'bg-zinc-700 text-white hover:bg-zinc-600'
                            : 'bg-zinc-200 text-zinc-900 hover:bg-zinc-300'
                        }`}
                      >
                        {theme === 'dark' ? '🌙 تیره' : '☀️ روشن'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>کلمات تایپ شونده (با کاما جدا کنید)</label>
                    <input
                      type="text"
                      value={data.typingWords.join(', ')}
                      onChange={(e) => updateData({ typingWords: e.target.value.split(',').map(w => w.trim()) })}
                      className={inputClass}
                      dir="ltr"
                    />
                  </div>

                  <div className={cardClass}>
                    <p className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      🔐 تغییر رمز عبور
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className={labelClass}>رمز فعلی</label>
                        <input
                          type="password"
                          value={oldPass}
                          onChange={(e) => setOldPass(e.target.value)}
                          className={inputClass}
                          placeholder="رمز فعلی را وارد کنید"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>رمز جدید</label>
                        <input
                          type="password"
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          className={inputClass}
                          placeholder="حداقل ۴ کاراکتر"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>تکرار رمز جدید</label>
                        <input
                          type="password"
                          value={confirmPass}
                          onChange={(e) => setConfirmPass(e.target.value)}
                          className={inputClass}
                          placeholder="رمز جدید را دوباره وارد کنید"
                        />
                      </div>

                      {passMsg && (
                        <p className={`text-xs font-semibold ${passMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                          {passMsg.text}
                        </p>
                      )}

                      <button
                        onClick={() => {
                          if (!oldPass || !newPass || !confirmPass) {
                            setPassMsg({ type: 'error', text: 'لطفاً همه فیلدها را پر کنید' });
                          } else if (newPass !== confirmPass) {
                            setPassMsg({ type: 'error', text: 'رمز جدید و تکرار آن مطابقت ندارند' });
                          } else if (newPass.length < 4) {
                            setPassMsg({ type: 'error', text: 'رمز جدید باید حداقل ۴ کاراکتر باشد' });
                          } else if (changePassword(oldPass, newPass)) {
                            setPassMsg({ type: 'success', text: '✓ رمز عبور با موفقیت تغییر کرد' });
                            setOldPass(''); setNewPass(''); setConfirmPass('');
                          } else {
                            setPassMsg({ type: 'error', text: 'رمز فعلی اشتباه است' });
                          }
                          setTimeout(() => setPassMsg(null), 3000);
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/20 text-violet-400 text-xs font-semibold hover:bg-violet-500/30 transition-colors"
                      >
                        🔑 تغییر رمز
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between gap-3 px-6 py-4 border-t ${
          theme === 'dark' ? 'border-zinc-800 bg-zinc-900/80' : 'border-zinc-200 bg-zinc-50'
        }`}>
          <div className="flex flex-col">
            <p className={`text-[10px] font-semibold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
              ● متصل به دیتابیس آنلاین (Supabase)
            </p>
            <p className={`text-[9px] ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
              تغییرات در لحظه برای همه کاربران اعمال می‌شود
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportData}
              className="px-2.5 py-2 rounded-lg bg-zinc-500/10 text-zinc-400 hover:text-white hover:bg-zinc-500/20 text-[10px] font-medium transition-colors"
              title="دانلود فایل کامل HTML"
            >
              📥 دانلود HTML
            </button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-700 text-white font-semibold text-xs"
            >
              <Save size={12} />
              {saved ? '✓' : 'ذخیره محلی'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={async () => {
                setSaved(true);
                const res = await publishToSupabase();
                if (res.success) {
                  alert('🎉 اطلاعات با موفقیت در Supabase منتشر شد!');
                } else {
                  alert('❌ خطا:\n' + res.error);
                }
                setSaved(false);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20"
            >
              🚀 انتشار آنلاین (Supabase)
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminPanel;