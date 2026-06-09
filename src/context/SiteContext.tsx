import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase, TABLE_NAME, ROW_ID, fetchPortfolioDirect, upsertPortfolioDirect } from '../utils/supabase';

// ══════════════════════════════════════════════
//  TYPES
// ══════════════════════════════════════════════
export interface PersonalInfo {
  nameFa: string;
  nameEn: string;
  title: string;
  subtitle: string;
  slogan: string;
  phone: string;
  email: string;
  avatar: string;
  avatars?: string[];              // ← جدید
  avatarRotateInterval?: number;   // ← جدید (به ثانیه)
  aboutShort: string;
  aboutFull: string;
  availableForWork: boolean;
  resumeFile?: string;
  resumeFileName?: string;
}

export interface ProfileBadge {
  id: string;
  label: string;
  icon: string;
  color: string;
  enabled: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  color: string;
}

export type Translations = { [lang: string]: string };

export interface Project {
  id: string;
  title: string;
  description: string;
  techs: string[];
  color: string;
  image: string;
  isCurrent?: boolean;
  titleTr?: Translations;
  descriptionTr?: Translations;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  description: string;
  color: string;
  isCurrent: boolean;
  avatar: string;
  titleTr?: Translations;
  companyTr?: Translations;
  descriptionTr?: Translations;
}

export interface Certificate {
  id: string;
  title: string;
  color: string;
  titleTr?: Translations;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  customIcon?: string;
}

export interface StatWidget {
  id: string;
  value: string;
  labelFa: string;
  labelEn: string;
  labelRu: string;
  labelAr: string;
  labelTr: string;
  icon: 'code' | 'sparkles' | 'server' | 'check';
  color: 'violet' | 'blue' | 'cyan' | 'emerald';
}

export interface SiteData {
  personal: PersonalInfo;
  profileBadges: ProfileBadge[];
  skills: Skill[];
  projects: Project[];
  workExperience: WorkExperience[];
  certificates: Certificate[];
  socialLinks: SocialLink[];
  typingWords: string[];
  statWidgets: StatWidget[];
}

interface SiteContextType {
  data: SiteData;
  updateData: (newData: Partial<SiteData>) => void;
  updatePersonal: (info: Partial<PersonalInfo>) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  lang: 'fa' | 'en' | 'ru' | 'ar' | 'tr';
  setLang: (lang: 'fa' | 'en' | 'ru' | 'ar' | 'tr') => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => boolean;
  exportData: () => void;
  publishToSupabase: () => Promise<{ success: boolean; error?: string }>;
  isLoading: boolean;
  loadProgress: number;
  loadStatus: string;
}

// ══════════════════════════════════════════════
//  DEFAULT DATA
// ══════════════════════════════════════════════

const defaultStatWidgets: StatWidget[] = [
  {
    id: 'stat-1',
    value: '+۱۰',
    labelFa: 'پروژه موفق',
    labelEn: 'Projects Done',
    labelRu: 'Проектов',
    labelAr: 'مشاريع ناجحة',
    labelTr: 'Tamamlanan Proje',
    icon: 'code',
    color: 'violet',
  },
  {
    id: 'stat-2',
    value: '+۵',
    labelFa: 'سال تجربه',
    labelEn: 'Years Experience',
    labelRu: 'Лет опыта',
    labelAr: 'سنوات خبرة',
    labelTr: 'Yıl Deneyim',
    icon: 'sparkles',
    color: 'blue',
  },
  {
    id: 'stat-3',
    value: '۱۰+',
    labelFa: 'تکنولوژی',
    labelEn: 'Technologies',
    labelRu: 'Технологий',
    labelAr: 'تقنيات',
    labelTr: 'Teknoloji',
    icon: 'server',
    color: 'cyan',
  },
  {
    id: 'stat-4',
    value: '۱۰۰%',
    labelFa: 'رضایت کارفرما',
    labelEn: 'Client Satisfaction',
    labelRu: 'Удовлетворённость',
    labelAr: 'رضا العملاء',
    labelTr: 'Müşteri Memnuniyeti',
    icon: 'check',
    color: 'emerald',
  },
];

const defaultData: SiteData = {
  personal: {
    nameFa: 'حسین اکبری سامانی',
    nameEn: 'Hosein Akbari Samani',
    title: 'برنامه‌نویس ارشد پایتون',
    subtitle: 'متخصص توسعه Back-end',
    slogan: '« تبدیل ایده به کد، کد به ارزش »',
    phone: '09940269037',
    email: 'hossein@example.com',
    avatar: '/images/avatar.jpg',
    avatars: [],              // ← جدید
    avatarRotateInterval: 4,  // ← جدید
    availableForWork: true,
    aboutShort: 'متخصص توسعه نرم‌افزار با تمرکز بر راه‌حل‌های هوشمند و مقیاس‌پذیر',
    aboutFull: `برنامه‌نویس ارشد پایتون و معمار نرم‌افزار با سابقه درخشان در طراحی و پیاده‌سازی سیستم‌های سازمانی پیچیده. تخصص اصلی بنده در حوزه توسعه Back-end، طراحی RESTful APIs، معماری Microservices و پیاده‌سازی راهکارهای مبتنی بر هوش مصنوعی می‌باشد.

در طول دوران حرفه‌ای، افتخار همکاری با شرکت‌های معتبر صنعتی را داشته و پروژه‌های متنوعی از جمله سیستم‌های معاملاتی الگوریتمی، پلتفرم‌های پیام‌رسان امن، و نرم‌افزارهای تحلیل صنعتی را با موفقیت به سرانجام رسانده‌ام.

رویکرد حرفه‌ای بنده مبتنی بر اصول مهندسی نرم‌افزار، کدنویسی تمیز (Clean Code)، و بهینه‌سازی مستمر عملکرد سیستم‌ها است.`,
  },
  profileBadges: [
    { id: '1', label: 'Python',   icon: 'python',   color: '59, 130, 246',  enabled: true },
    { id: '2', label: 'Back-end', icon: 'backend',  color: '139, 92, 246',  enabled: true },
    { id: '3', label: 'Database', icon: 'database', color: '16, 185, 129',  enabled: true },
    { id: '4', label: 'AI',       icon: 'ai',       color: '236, 72, 153',  enabled: true },
    { id: '5', label: 'API',      icon: 'api',      color: '6, 182, 212',   enabled: true },
    { id: '6', label: 'Java',     icon: 'java',     color: '245, 158, 11',  enabled: true },
  ],
  typingWords: [
    'Python Developer',
    'Back-end Expert',
    'API Architect',
    'AI Enthusiast',
    'Problem Solver',
    'Clean Coder',
  ],
  skills: [
    { id: '1',  name: 'Python',                level: 95, color: '59, 130, 246'  },
    { id: '2',  name: 'Back-end Development',  level: 92, color: '139, 92, 246'  },
    { id: '3',  name: 'RESTful APIs',          level: 90, color: '6, 182, 212'   },
    { id: '4',  name: 'Database (SQL/NoSQL)',  level: 88, color: '16, 185, 129'  },
    { id: '5',  name: 'JavaScript',            level: 82, color: '245, 158, 11'  },
    { id: '6',  name: 'Java',                  level: 78, color: '239, 68, 68'   },
    { id: '7',  name: 'PHP',                   level: 75, color: '168, 85, 247'  },
    { id: '8',  name: 'AI & Automation',       level: 85, color: '236, 72, 153'  },
    { id: '9',  name: 'UI/UX Design',          level: 80, color: '244, 114, 182' },
    { id: '10', name: 'Software Architecture', level: 87, color: '34, 211, 238'  },
  ],
  projects: [
    {
      id: '1',
      title: 'ربات معامله‌گر فارکس',
      description: 'توسعه الگوریتم‌های پیچیده برای تحلیل بازار و اجرای خودکار معاملات با دقت بالا.',
      techs: ['Python', 'ML', 'Trading API'],
      color: '16, 185, 129',
      image: '/images/project-forex.jpg',
      titleTr: { en: 'Forex Trading Bot', ru: 'Торговый бот Forex', ar: 'روبوت تداول فوركس', tr: 'Forex Ticaret Botu' },
      descriptionTr: { en: 'Complex algorithms for market analysis and automated high-accuracy trading.', ru: 'Сложные алгоритмы для анализа рынка и автоматической торговли.', ar: 'خوارزميات معقدة لتحليل السوق والتداول الآلي بدقة عالية.', tr: 'Piyasa analizi ve yüksek doğruluklu otomatik ticaret algoritmaları.' },
    },
    {
      id: '2',
      title: 'پیام‌رسان Hs Chat',
      description: 'طراحی و توسعه یک پیام‌رسان امن و مقیاس‌پذیر با تمرکز بر سرعت و رمزنگاری.',
      techs: ['Python', 'WebSocket', 'Encryption'],
      color: '59, 130, 246',
      image: '/images/project-chat.jpg',
      titleTr: { en: 'Hs Chat Messenger', ru: 'Мессенджер Hs Chat', ar: 'تطبيق Hs Chat', tr: 'Hs Chat Mesajlaşma' },
      descriptionTr: { en: 'A secure and scalable messaging platform focused on speed and encryption.', ru: 'Безопасная и масштабируемая платформа обмена сообщениями.', ar: 'منصة مراسلة آمنة وقابلة للتوسع مع التركيز على السرعة والتشفير.', tr: 'Hız ve şifrelemeye odaklanan güvenli ve ölçeklenebilir mesajlaşma.' },
    },
    {
      id: '3',
      title: 'دستیار هوشمند دانشجو',
      description: 'سیستم هوشمند مبتنی بر AI برای مدیریت و تسهیل فرآیندهای آموزشی.',
      techs: ['Python', 'AI/NLP', 'API'],
      color: '139, 92, 246',
      image: '/images/project-student.jpg',
      titleTr: { en: 'Smart Student Assistant', ru: 'Умный помощник студента', ar: 'مساعد الطالب الذكي', tr: 'Akıllı Öğrenci Asistanı' },
      descriptionTr: { en: 'AI-based intelligent system for managing and facilitating educational processes.', ru: 'Интеллектуальная система на базе ИИ для управления учебными процессами.', ar: 'نظام ذكي قائم على الذكاء الاصطناعي لإدارة العمليات التعليمية.', tr: 'Eğitim süreçlerini yönetmek için AI tabanlı akıllı sistem.' },
    },
    {
      id: '4',
      title: 'بهینه‌ساز لپ‌تاپ گیمینگ',
      description: 'ابزار نرم‌افزاری جهت بهبود عملکرد سخت‌افزاری و مدیریت منابع سیستم.',
      techs: ['Python', 'System API', 'GUI'],
      color: '245, 158, 11',
      image: '/images/project-gaming.jpg',
      titleTr: { en: 'Gaming Laptop Optimizer', ru: 'Оптимизатор игрового ноутбука', ar: 'محسّن أداء اللابتوب', tr: 'Oyun Laptop Optimizasyonu' },
      descriptionTr: { en: 'Software tool for hardware performance improvement and system resource management.', ru: 'Программный инструмент для улучшения производительности и управления ресурсами.', ar: 'أداة برمجية لتحسين أداء الأجهزة وإدارة موارد النظام.', tr: 'Donanım performansını iyileştirme ve sistem kaynaklarını yönetme aracı.' },
    },
    {
      id: '5',
      title: 'بک‌اند سایت سنرست',
      description: 'طراحی و پیاده‌سازی زیرساخت‌های بک‌اند و API های وب‌سایت شرکت.',
      techs: ['Python', 'REST', 'SQL'],
      color: '6, 182, 212',
      image: '/images/project-backend.jpg',
      titleTr: { en: 'Sunrest Website Backend', ru: 'Backend сайта Sunrest', ar: 'خلفية موقع Sunrest', tr: 'Sunrest Web Sitesi Backend' },
      descriptionTr: { en: 'Design and implementation of backend infrastructure and APIs for company website.', ru: 'Проектирование и реализация backend-инфраструктуры и API для сайта компании.', ar: 'تصميم وتنفيذ البنية التحتية الخلفية وواجهات البرمجة لموقع الشركة.', tr: 'Şirket web sitesi için backend altyapısı ve API tasarımı ve uygulaması.' },
    },
    {
      id: '6',
      title: 'نرم‌افزار تحلیل لاستیک کویر تایر',
      description: 'طراحی و توسعه نرم‌افزار تجزیه و تحلیل و سه‌بعدی‌سازی لاستیک. پیاده‌سازی الگوریتم‌های پردازش تصویر و مدل‌سازی سه‌بعدی برای کنترل کیفیت.',
      techs: ['Python', '3D Modeling', 'Image Processing', 'OpenCV'],
      color: '239, 68, 68',
      image: '/images/project-tire.jpg',
      isCurrent: true,
      titleTr: { en: 'Kavir Tire 3D Analysis Software', ru: 'ПО 3D-анализа шин Kavir', ar: 'برنامج تحليل إطارات كوير ثلاثي الأبعاد', tr: 'Kavir Lastik 3D Analiz Yazılımı' },
      descriptionTr: { en: '3D tire analysis and visualization software with image processing and quality control algorithms.', ru: 'ПО для 3D-анализа и визуализации шин с алгоритмами обработки изображений.', ar: 'برنامج تحليل ثلاثي الأبعاد للإطارات مع خوارزميات معالجة الصور ومراقبة الجودة.', tr: 'Görüntü işleme ve kalite kontrol algoritmaları ile 3D lastik analiz yazılımı.' },
    },
  ],
  workExperience: [
    {
      id: '1',
      title: 'برنامه‌نویس ارشد پایتون',
      company: 'شرکت پیشگامان دنیای نوین رایکا',
      description: 'طراحی و توسعه زیرساخت‌های بک‌اند با استفاده از پایتون. بهینه‌سازی فرآیندهای پایگاه داده و بهبود زمان پاسخ‌گویی سیستم‌ها. همکاری در تیم‌های چابک برای پیاده‌سازی ویژگی‌های جدید.',
      color: '139, 92, 246',
      isCurrent: false,
      avatar: '/images/company-raika.jpg',
      titleTr: { en: 'Senior Python Developer', ru: 'Старший Python-разработчик', ar: 'مطور Python أول', tr: 'Kıdemli Python Geliştirici' },
      companyTr: { en: 'Raika New World Pioneers Co.', ru: 'Компания Raika', ar: 'شركة رايكا للتكنولوجيا', tr: 'Raika Teknoloji Şirketi' },
      descriptionTr: { en: 'Backend infrastructure design with Python. Database optimization and agile team collaboration.', ru: 'Проектирование backend-инфраструктуры на Python. Оптимизация БД и работа в agile-команде.', ar: 'تصميم البنية التحتية الخلفية بـ Python. تحسين قاعدة البيانات والتعاون في فرق Agile.', tr: 'Python ile backend altyapı tasarımı. Veritabanı optimizasyonu ve agile takım çalışması.' },
    },
  ],
  certificates: [
    { id: '1', title: 'دوره جامع توسعه Python',            color: '59, 130, 246',  titleTr: { en: 'Comprehensive Python Development',     ru: 'Комплексная разработка на Python',     ar: 'دورة تطوير Python الشاملة',          tr: 'Kapsamlı Python Geliştirme'    } },
    { id: '2', title: 'دوره تخصصی توسعه Back-end',          color: '139, 92, 246',  titleTr: { en: 'Specialized Back-end Development',      ru: 'Специализированная Backend-разработка', ar: 'دورة تطوير Back-end المتخصصة',        tr: 'Uzman Backend Geliştirme'      } },
    { id: '3', title: 'دوره تخصصی UI/UX Design',            color: '236, 72, 153',  titleTr: { en: 'UI/UX Design Specialization',           ru: 'Специализация UI/UX дизайн',           ar: 'تخصص تصميم UI/UX',                   tr: 'UI/UX Tasarım Uzmanlığı'       } },
    { id: '4', title: 'دوره جامع HTML و تکنولوژی وب',        color: '6, 182, 212',   titleTr: { en: 'Comprehensive HTML & Web Technologies', ru: 'Комплексный курс HTML и веб-технологий', ar: 'دورة HTML وتقنيات الويب الشاملة',     tr: 'Kapsamlı HTML ve Web Teknolojileri' } },
    { id: '5', title: 'گواهینامه تخصصی برنامه‌نویسی Java',  color: '245, 158, 11',  titleTr: { en: 'Java Programming Certificate',          ru: 'Сертификат программирования Java',     ar: 'شهادة برمجة Java',                   tr: 'Java Programlama Sertifikası'  } },
    { id: '6', title: 'گواهینامه تخصصی برنامه‌نویسی C++',   color: '239, 68, 68',   titleTr: { en: 'C++ Programming Certificate',           ru: 'Сертификат программирования C++',      ar: 'شهادة برمجة C++',                    tr: 'C++ Programlama Sertifikası'   } },
  ],
  socialLinks: [
    { id: 'github',    name: 'GitHub',    url: 'https://github.com/',                enabled: true },
    { id: 'telegram',  name: 'Telegram',  url: 'https://t.me/',                      enabled: true },
    { id: 'instagram', name: 'Instagram', url: 'https://instagram.com/',             enabled: true },
    { id: 'whatsapp',  name: 'WhatsApp',  url: 'https://wa.me/989940269037',         enabled: true },
    { id: 'eitaa',     name: 'ایتا',      url: 'https://eitaa.com/',                 enabled: true },
    { id: 'bale',      name: 'بله',       url: 'https://bale.ai/',                   enabled: true },
    { id: 'email',     name: 'ایمیل',     url: 'mailto:hossein@example.com',         enabled: true },
  ],
  statWidgets: defaultStatWidgets,
};

// ══════════════════════════════════════════════
//  CONTEXT
// ══════════════════════════════════════════════

const SiteContext = createContext<SiteContextType | null>(null);

const STORAGE_KEY = 'portfolio_data';
const THEME_KEY = 'portfolio_theme';
const PASSWORD_KEY = 'portfolio_admin_pass';

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<SiteData>(defaultData);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadStatus, setLoadStatus] = useState('در حال راه‌اندازی...');

  // ── Loading: همیشه آخرین داده Supabase را قبل از نمایش می‌گیرد ──


  // ── Loading: سریع‌ترین حالت ممکن ─


  // ── Loading: همیشه آخرین داده Supabase را قبل از نمایش می‌گیرد ──

  // ── Loading: ساده، پایدار، با لاگ کامل ──


  // ── Loading: Smart strategy ──
  // اگر کش هست → فوری نمایش + آپدیت در پس‌زمینه
  // اگر کش نیست → صبر تا اطلاعات از Supabase بیاد


  // ── Loading: Smart strategy ──
  // اگر کش هست → فوری نمایش + آپدیت در پس‌زمینه
  // اگر کش نیست → صبر تا اطلاعات از Supabase بیاد

 
 
 
 

 
 
 
 
  // ── Loading: همیشه آخرین داده Supabase قبل از نمایش ──





  // ── Loading: همیشه آخرین داده Supabase + preload عکس‌ها ──
  useEffect(() => {
    const merge = (raw: any): SiteData => ({
      ...defaultData,
      ...raw,
      personal: { ...defaultData.personal, ...raw.personal },
      profileBadges: raw.profileBadges || defaultData.profileBadges,
      statWidgets: raw.statWidgets || defaultData.statWidgets,
    });

    const removeInitialLoader = () => {
      const loader = document.getElementById('initial-loader');
      if (loader) loader.remove();
    };

    const load = async () => {
      removeInitialLoader();
      setLoadProgress(15);

      // fallback از localStorage
      let fallbackData: SiteData | null = null;
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.personal) {
            fallbackData = merge(parsed);
          }
        }
      } catch {}

      if (!fallbackData) {
        const embedded = document.getElementById('portfolio-data');
        if (embedded && embedded.textContent) {
          try {
            const parsed = JSON.parse(embedded.textContent);
            if (parsed && parsed.personal) {
              fallbackData = merge(parsed);
            }
          } catch {}
        }
      }

      setLoadProgress(30);

      // ── همیشه منتظر Supabase بمون ──
      console.log('[Site] Fetching from Supabase...');

      let supabaseData: SiteData | null = null;

      const progressInterval = setInterval(() => {
        setLoadProgress(prev => (prev < 80 ? prev + 2 : prev));
      }, 100);

      try {
        const startTime = Date.now();
        const row = await fetchPortfolioDirect(15000);
        const elapsed = Date.now() - startTime;
        console.log(`[Site] Supabase responded in ${elapsed}ms`);

        if (row?.data?.personal) {
          supabaseData = merge(row.data);
          console.log('[Site] ✓ Fresh data from Supabase');
        }
      } catch (e: any) {
        console.warn('[Site] Supabase failed:', e?.message);
      } finally {
        clearInterval(progressInterval);
      }

      // اعمال داده
      const finalData = supabaseData || fallbackData;
      if (finalData) {
        setData(finalData);
        if (supabaseData) {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(supabaseData));
          } catch {}
        }
      }

      // ── Preload عکس‌های پروفایل قبل از نمایش ──
      if (finalData?.personal) {
        const imagesToPreload: string[] = [];

        if (finalData.personal.avatar) {
          imagesToPreload.push(finalData.personal.avatar);
        }

        if (finalData.personal.avatars && finalData.personal.avatars.length > 0) {
          imagesToPreload.push(...finalData.personal.avatars);
        }

        if (imagesToPreload.length > 0) {
          console.log(`[Site] Preloading ${imagesToPreload.length} images...`);
          setLoadProgress(90);

          await Promise.all(
            imagesToPreload.map(
              (src) =>
                new Promise<void>((resolve) => {
                  const img = new Image();
                  img.onload = () => resolve();
                  img.onerror = () => resolve();
                  img.src = src;
                  setTimeout(() => resolve(), 5000);
                })
            )
          );

          console.log('[Site] ✓ All images preloaded');
        }
      }

      // پایان loading
      setLoadProgress(100);
      await new Promise(resolve => setTimeout(resolve, 200));
      setIsLoading(false);
    };

    load();
  }, []);
 






  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return (saved as 'dark' | 'light') || 'dark';
  });

  const [lang, setLangState] = useState<'fa' | 'en' | 'ru' | 'ar' | 'tr'>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return (saved as 'fa' | 'en' | 'ru' | 'ar' | 'tr') || 'fa';
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('isAdmin') === 'true';
  });

  // ذخیره خودکار در localStorage (فقط بعد از اتمام loading)
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {}
    }
  }, [data, isLoading]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const updateData = (newData: Partial<SiteData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const updatePersonal = (info: Partial<PersonalInfo>) => {
    setData(prev => ({
      ...prev,
      personal: { ...prev.personal, ...info },
    }));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setLang = (newLang: 'fa' | 'en' | 'ru' | 'ar' | 'tr') => {
    setLangState(newLang);
    localStorage.setItem('portfolio_lang', newLang);
  };

  const getPassword = (): string => {
    return localStorage.getItem(PASSWORD_KEY) || 'admin123';
  };

  const login = (password: string): boolean => {
    if (password === getPassword()) {
      setIsAdmin(true);
      sessionStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('isAdmin');
  };

  const changePassword = (oldPass: string, newPass: string): boolean => {
    if (oldPass === getPassword() && newPass.length >= 4) {
      localStorage.setItem(PASSWORD_KEY, newPass);
      return true;
    }
    return false;
  };

  const exportData = () => {
    const clone = document.documentElement.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('[data-admin-only]').forEach(el => el.remove());

    const dataScript = document.createElement('script');
    dataScript.id = 'portfolio-data';
    dataScript.type = 'application/json';
    dataScript.textContent = JSON.stringify(data);

    const head = clone.querySelector('head');
    if (head) {
      const old = head.querySelector('#portfolio-data');
      if (old) old.remove();
      head.appendChild(dataScript);
    }

    const html = '<!DOCTYPE html>\n' + clone.outerHTML;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const publishToSupabase = async () => {
    try {
      const { error } = await supabase
        .from(TABLE_NAME)
        .upsert({ id: ROW_ID, data });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  };

  return (
    <SiteContext.Provider
      value={{
        data,
        updateData,
        updatePersonal,
        theme,
        toggleTheme,
        lang,
        setLang,
        isAdmin,
        login,
        logout,
        changePassword,
        exportData,
        publishToSupabase,
        isLoading,
        loadProgress,
        loadStatus,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within SiteProvider');
  }
  return context;
};

/**
 * Helper: get translated text or fallback to original
 */
export const tr = (
  original: string,
  translations: { [lang: string]: string } | undefined,
  lang: string
): string => {
  if (lang === 'fa' || !translations) return original;
  return translations[lang] || original;
};