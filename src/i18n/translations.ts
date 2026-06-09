export type Lang = 'fa' | 'en' | 'ru' | 'ar' | 'tr';

export interface LangOption {
  code: Lang;
  name: string;
  nativeName: string;
  dir: 'rtl' | 'ltr';
  flag: string;
}

export const languages: LangOption[] = [
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', dir: 'rtl', flag: '🇮🇷' },
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr', flag: '🇬🇧' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr', flag: '🇷🇺' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', dir: 'ltr', flag: '🇹🇷' },
];

type TranslationKeys = {
  // Hero
  availableForWork: string;
  openToWork: string;
  downloadResume: string;
  projects: string;
  email: string;
  // About
  aboutTitle: string;
  aboutSubtitle: string;
  projectsDone: string;
  yearsExp: string;
  technologies: string;
  clientSatisfaction: string;
  quickProblem: string;
  quickProblemDesc: string;
  scalableArch: string;
  scalableArchDesc: string;
  flawlessQuality: string;
  flawlessQualityDesc: string;
  // Skills
  skillsTitle: string;
  skillsSubtitle: string;
  // Work
  workTitle: string;
  workSubtitle: string;
  responsibilities: string;
  backendDev: string;
  dbOptimize: string;
  agileTeam: string;
  active: string;
  // Projects
  projectsTitle: string;
  projectsSubtitle: string;
  inProgress: string;
  view: string;
  // Certs
  certsTitle: string;
  certsSubtitle: string;
  // Social
  socialTitle: string;
  socialSubtitle: string;
  // Process
  processTitle: string;
  processSubtitle: string;
  step1: string;
  step1Desc: string;
  step2: string;
  step2Desc: string;
  step3: string;
  step3Desc: string;
  step4: string;
  step4Desc: string;
  // CTA
  ctaTitle: string;
  ctaDesc: string;
  ctaCall: string;
  ctaEmail: string;
  ctaFastResponse: string;
  ctaQuickStart: string;
  ctaFreeConsult: string;
  ctaResponseTime: string;
  // About paragraphs
  aboutP1: string;
  aboutP1Highlight1: string;
  aboutP1Highlight2: string;
  aboutP2: string;
  aboutP2Highlight: string;
  aboutP3: string;
  aboutP3Highlight: string;
  aboutQuote1: string;
  aboutQuote2: string;
  // Admin
  adminPanel: string;
  // Footer
  scroll: string;
};

const translations: Record<Lang, TranslationKeys> = {
  fa: {
    availableForWork: 'آماده همکاری',
    openToWork: 'Open to Work',
    downloadResume: 'دانلود رزومه',
    projects: 'پروژه‌ها',
    email: 'ایمیل',
    aboutTitle: 'درباره من',
    aboutSubtitle: 'معرفی حرفه‌ای',
    projectsDone: 'پروژه موفق',
    yearsExp: 'سال تجربه',
    technologies: 'تکنولوژی',
    clientSatisfaction: 'رضایت کارفرما',
    quickProblem: 'حل مسئله سریع',
    quickProblemDesc: 'تحلیل و رفع مشکلات پیچیده فنی با رویکرد بهینه',
    scalableArch: 'معماری مقیاس‌پذیر',
    scalableArchDesc: 'طراحی سیستم‌هایی که با رشد کسب‌وکار شما رشد می‌کنند',
    flawlessQuality: 'کیفیت بی‌نقص',
    flawlessQualityDesc: 'تست‌محور، مستند و قابل نگهداری — بدون نگرانی بعدی',
    skillsTitle: 'مهارت‌های فنی',
    skillsSubtitle: 'تخصص‌ها',
    workTitle: 'سوابق کاری',
    workSubtitle: 'تجربه حرفه‌ای',
    responsibilities: 'مسئولیت‌ها',
    backendDev: 'توسعه بک‌اند',
    dbOptimize: 'بهینه‌سازی DB',
    agileTeam: 'تیم Agile',
    active: 'فعال',
    projectsTitle: 'پروژه‌های منتخب',
    projectsSubtitle: 'نمونه کارها',
    inProgress: 'در حال انجام',
    view: 'مشاهده',
    certsTitle: 'گواهینامه‌ها',
    certsSubtitle: 'مدارک تخصصی',
    socialTitle: 'شبکه‌های اجتماعی',
    socialSubtitle: 'ارتباط با من',
    processTitle: 'فرآیند کار من',
    processSubtitle: 'از ایده تا اجرا',
    step1: 'تحلیل نیازها',
    step1Desc: 'بررسی دقیق نیازمندی‌ها و طراحی معماری',
    step2: 'طراحی و توسعه',
    step2Desc: 'کدنویسی تمیز با بهترین الگوهای طراحی',
    step3: 'تست و بهینه‌سازی',
    step3Desc: 'تست جامع و بهینه‌سازی برای بالاترین کیفیت',
    step4: 'تحویل و پشتیبانی',
    step4Desc: 'تحویل به‌موقع و پشتیبانی مستمر پس از ارائه',
    ctaTitle: 'بیایید با هم کار کنیم',
    ctaDesc: 'پروژه‌ای دارید که نیاز به توسعه حرفه‌ای دارد؟ من آماده‌ام.',
    ctaCall: 'تماس بگیرید',
    ctaEmail: 'ارسال ایمیل',
    ctaFastResponse: 'پاسخ‌گویی سریع',
    ctaQuickStart: 'شروع فوری پروژه',
    ctaFreeConsult: 'مشاوره رایگان',
    ctaResponseTime: 'میانگین زمان پاسخ‌گویی: کمتر از ۲ ساعت',
    aboutP1: 'و معمار نرم‌افزار با سابقه درخشان در طراحی و پیاده‌سازی سیستم‌های سازمانی پیچیده. تخصص اصلی بنده در حوزه توسعه Back-end، طراحی RESTful APIs، معماری Microservices و پیاده‌سازی راهکارهای مبتنی بر',
    aboutP1Highlight1: 'برنامه‌نویس ارشد پایتون',
    aboutP1Highlight2: 'هوش مصنوعی',
    aboutP2: 'در طول دوران حرفه‌ای، افتخار همکاری با شرکت‌های معتبر صنعتی را داشته و پروژه‌های متنوعی از جمله سیستم‌های معاملاتی الگوریتمی، پلتفرم‌های پیام‌رسان امن، و نرم‌افزارهای تحلیل صنعتی سه‌بعدی را',
    aboutP2Highlight: 'با موفقیت',
    aboutP3: 'رویکرد حرفه‌ای بنده مبتنی بر اصول مهندسی نرم‌افزار،',
    aboutP3Highlight: 'کدنویسی تمیز (Clean Code)',
    aboutQuote1: 'من معتقدم بهترین نرم‌افزار، نرم‌افزاری است که مشکل واقعی را حل کند، ساده باشد، و قابل اعتماد.',
    aboutQuote2: 'هر خط کدی که می‌نویسم با هدف خلق ارزش واقعی برای کسب‌وکار شماست.',
    adminPanel: 'پنل مدیریت',
    scroll: 'اسکرول',
  },
  en: {
    availableForWork: 'Available for Work',
    openToWork: 'Open to Work',
    downloadResume: 'Download Resume',
    projects: 'Projects',
    email: 'Email',
    aboutTitle: 'About Me',
    aboutSubtitle: 'Professional Introduction',
    projectsDone: 'Projects Done',
    yearsExp: 'Years Experience',
    technologies: 'Technologies',
    clientSatisfaction: 'Client Satisfaction',
    quickProblem: 'Fast Problem Solving',
    quickProblemDesc: 'Analyzing and resolving complex technical issues with optimal approaches',
    scalableArch: 'Scalable Architecture',
    scalableArchDesc: 'Designing systems that grow with your business',
    flawlessQuality: 'Flawless Quality',
    flawlessQualityDesc: 'Test-driven, documented and maintainable — worry-free',
    skillsTitle: 'Technical Skills',
    skillsSubtitle: 'Expertise',
    workTitle: 'Work Experience',
    workSubtitle: 'Professional Background',
    responsibilities: 'Responsibilities',
    backendDev: 'Backend Dev',
    dbOptimize: 'DB Optimization',
    agileTeam: 'Agile Team',
    active: 'Active',
    projectsTitle: 'Featured Projects',
    projectsSubtitle: 'Portfolio',
    inProgress: 'In Progress',
    view: 'View',
    certsTitle: 'Certifications',
    certsSubtitle: 'Professional Credentials',
    socialTitle: 'Social Networks',
    socialSubtitle: 'Connect with Me',
    processTitle: 'My Workflow',
    processSubtitle: 'From Idea to Execution',
    step1: 'Requirements Analysis',
    step1Desc: 'Thorough requirements review and architecture design',
    step2: 'Design & Development',
    step2Desc: 'Clean coding with best design patterns',
    step3: 'Testing & Optimization',
    step3Desc: 'Comprehensive testing and performance optimization',
    step4: 'Delivery & Support',
    step4Desc: 'On-time delivery and continuous post-launch support',
    ctaTitle: "Let's Work Together",
    ctaDesc: 'Have a project that needs professional development? I\'m ready.',
    ctaCall: 'Call Me',
    ctaEmail: 'Send Email',
    ctaFastResponse: 'Fast Response',
    ctaQuickStart: 'Quick Project Start',
    ctaFreeConsult: 'Free Consultation',
    ctaResponseTime: 'Average response time: less than 2 hours',
    aboutP1: 'and Software Architect with a proven track record in designing and implementing complex enterprise systems. Core expertise in Back-end development, RESTful API design, Microservices architecture, and',
    aboutP1Highlight1: 'Senior Python Developer',
    aboutP1Highlight2: 'Artificial Intelligence',
    aboutP2: 'Throughout my career, I have had the privilege of collaborating with reputable industrial companies and delivering diverse projects including algorithmic trading systems, secure messaging platforms, and 3D industrial analysis software',
    aboutP2Highlight: 'successfully',
    aboutP3: 'My professional approach is grounded in software engineering principles,',
    aboutP3Highlight: 'Clean Code practices',
    aboutQuote1: 'I believe the best software solves real problems, stays simple, and remains reliable.',
    aboutQuote2: 'Every line of code I write aims to create real value for your business.',
    adminPanel: 'Admin Panel',
    scroll: 'Scroll',
  },
  ru: {
    availableForWork: 'Готов к сотрудничеству',
    openToWork: 'Открыт для работы',
    downloadResume: 'Скачать резюме',
    projects: 'Проекты',
    email: 'Эл. почта',
    aboutTitle: 'Обо мне',
    aboutSubtitle: 'Профессиональное представление',
    projectsDone: 'Проектов выполнено',
    yearsExp: 'Лет опыта',
    technologies: 'Технологий',
    clientSatisfaction: 'Удовлетворённость клиентов',
    quickProblem: 'Быстрое решение проблем',
    quickProblemDesc: 'Анализ и решение сложных технических задач оптимальным подходом',
    scalableArch: 'Масштабируемая архитектура',
    scalableArchDesc: 'Проектирование систем, растущих вместе с вашим бизнесом',
    flawlessQuality: 'Безупречное качество',
    flawlessQualityDesc: 'Тестирование, документация и поддерживаемость — без забот',
    skillsTitle: 'Технические навыки',
    skillsSubtitle: 'Компетенции',
    workTitle: 'Опыт работы',
    workSubtitle: 'Профессиональный опыт',
    responsibilities: 'Обязанности',
    backendDev: 'Backend разработка',
    dbOptimize: 'Оптимизация БД',
    agileTeam: 'Agile команда',
    active: 'Активен',
    projectsTitle: 'Избранные проекты',
    projectsSubtitle: 'Портфолио',
    inProgress: 'В процессе',
    view: 'Просмотр',
    certsTitle: 'Сертификаты',
    certsSubtitle: 'Профессиональные удостоверения',
    socialTitle: 'Социальные сети',
    socialSubtitle: 'Связаться со мной',
    processTitle: 'Мой рабочий процесс',
    processSubtitle: 'От идеи до реализации',
    step1: 'Анализ требований',
    step1Desc: 'Детальное изучение требований и проектирование архитектуры',
    step2: 'Проектирование и разработка',
    step2Desc: 'Чистый код с лучшими паттернами проектирования',
    step3: 'Тестирование и оптимизация',
    step3Desc: 'Комплексное тестирование и оптимизация производительности',
    step4: 'Доставка и поддержка',
    step4Desc: 'Своевременная доставка и постоянная поддержка',
    ctaTitle: 'Давайте работать вместе',
    ctaDesc: 'Есть проект, требующий профессиональной разработки? Я готов.',
    ctaCall: 'Позвоните',
    ctaEmail: 'Отправить письмо',
    ctaFastResponse: 'Быстрый ответ',
    ctaQuickStart: 'Быстрый старт проекта',
    ctaFreeConsult: 'Бесплатная консультация',
    ctaResponseTime: 'Среднее время ответа: менее 2 часов',
    aboutP1: 'и архитектор программного обеспечения с блестящим опытом проектирования и внедрения сложных корпоративных систем. Основная специализация — Back-end разработка, проектирование RESTful API, архитектура Microservices и',
    aboutP1Highlight1: 'Старший Python-разработчик',
    aboutP1Highlight2: 'Искусственный интеллект',
    aboutP2: 'На протяжении карьеры имел честь сотрудничать с ведущими промышленными компаниями и реализовывать разнообразные проекты, включая алгоритмические торговые системы, защищённые мессенджеры и программы 3D-анализа',
    aboutP2Highlight: 'успешно',
    aboutP3: 'Мой профессиональный подход основан на принципах программной инженерии,',
    aboutP3Highlight: 'чистого кода (Clean Code)',
    aboutQuote1: 'Я считаю, что лучшее ПО решает реальные проблемы, остаётся простым и надёжным.',
    aboutQuote2: 'Каждая строка кода нацелена на создание реальной ценности для вашего бизнеса.',
    adminPanel: 'Панель управления',
    scroll: 'Прокрутка',
  },
  ar: {
    availableForWork: 'متاح للعمل',
    openToWork: 'Open to Work',
    downloadResume: 'تحميل السيرة الذاتية',
    projects: 'المشاريع',
    email: 'البريد الإلكتروني',
    aboutTitle: 'عني',
    aboutSubtitle: 'مقدمة مهنية',
    projectsDone: 'مشاريع ناجحة',
    yearsExp: 'سنوات خبرة',
    technologies: 'تقنيات',
    clientSatisfaction: 'رضا العملاء',
    quickProblem: 'حل سريع للمشاكل',
    quickProblemDesc: 'تحليل وحل المشاكل التقنية المعقدة بنهج أمثل',
    scalableArch: 'بنية قابلة للتوسع',
    scalableArchDesc: 'تصميم أنظمة تنمو مع عملك',
    flawlessQuality: 'جودة لا تشوبها شائبة',
    flawlessQualityDesc: 'اختبار شامل، موثق وقابل للصيانة',
    skillsTitle: 'المهارات التقنية',
    skillsSubtitle: 'التخصصات',
    workTitle: 'الخبرة العملية',
    workSubtitle: 'الخلفية المهنية',
    responsibilities: 'المسؤوليات',
    backendDev: 'تطوير الخلفية',
    dbOptimize: 'تحسين قاعدة البيانات',
    agileTeam: 'فريق Agile',
    active: 'نشط',
    projectsTitle: 'مشاريع مختارة',
    projectsSubtitle: 'أعمالي',
    inProgress: 'قيد التنفيذ',
    view: 'عرض',
    certsTitle: 'الشهادات',
    certsSubtitle: 'المؤهلات المهنية',
    socialTitle: 'الشبكات الاجتماعية',
    socialSubtitle: 'تواصل معي',
    processTitle: 'منهجية العمل',
    processSubtitle: 'من الفكرة إلى التنفيذ',
    step1: 'تحليل المتطلبات',
    step1Desc: 'مراجعة دقيقة للمتطلبات وتصميم البنية',
    step2: 'التصميم والتطوير',
    step2Desc: 'كتابة كود نظيف بأفضل أنماط التصميم',
    step3: 'الاختبار والتحسين',
    step3Desc: 'اختبار شامل وتحسين الأداء',
    step4: 'التسليم والدعم',
    step4Desc: 'تسليم في الوقت المحدد ودعم مستمر',
    ctaTitle: 'لنعمل معاً',
    ctaDesc: 'لديك مشروع يحتاج تطوير احترافي؟ أنا جاهز.',
    ctaCall: 'اتصل بي',
    ctaEmail: 'أرسل بريداً',
    ctaFastResponse: 'استجابة سريعة',
    ctaQuickStart: 'بدء سريع للمشروع',
    ctaFreeConsult: 'استشارة مجانية',
    ctaResponseTime: 'متوسط وقت الاستجابة: أقل من ساعتين',
    aboutP1: 'ومهندس برمجيات بسجل حافل في تصميم وتنفيذ الأنظمة المؤسسية المعقدة. التخصص الأساسي في تطوير Back-end وتصميم RESTful APIs وهندسة Microservices و',
    aboutP1Highlight1: 'مطور Python أول',
    aboutP1Highlight2: 'الذكاء الاصطناعي',
    aboutP2: 'خلال مسيرتي المهنية، تشرفت بالتعاون مع شركات صناعية مرموقة وتنفيذ مشاريع متنوعة تشمل أنظمة التداول الخوارزمي ومنصات المراسلة الآمنة وبرامج التحليل الصناعي ثلاثي الأبعاد',
    aboutP2Highlight: 'بنجاح',
    aboutP3: 'نهجي المهني مبني على مبادئ هندسة البرمجيات،',
    aboutP3Highlight: 'الكود النظيف (Clean Code)',
    aboutQuote1: 'أؤمن بأن أفضل البرمجيات هي التي تحل المشاكل الحقيقية وتبقى بسيطة وموثوقة.',
    aboutQuote2: 'كل سطر أكتبه يهدف لخلق قيمة حقيقية لعملك.',
    adminPanel: 'لوحة التحكم',
    scroll: 'تمرير',
  },
  tr: {
    availableForWork: 'İşe Açık',
    openToWork: 'Open to Work',
    downloadResume: 'Özgeçmiş İndir',
    projects: 'Projeler',
    email: 'E-posta',
    aboutTitle: 'Hakkımda',
    aboutSubtitle: 'Profesyonel Tanıtım',
    projectsDone: 'Tamamlanan Proje',
    yearsExp: 'Yıl Deneyim',
    technologies: 'Teknoloji',
    clientSatisfaction: 'Müşteri Memnuniyeti',
    quickProblem: 'Hızlı Problem Çözme',
    quickProblemDesc: 'Karmaşık teknik sorunların optimal yaklaşımlarla analizi ve çözümü',
    scalableArch: 'Ölçeklenebilir Mimari',
    scalableArchDesc: 'İşinizle birlikte büyüyen sistemler tasarlama',
    flawlessQuality: 'Kusursuz Kalite',
    flawlessQualityDesc: 'Test odaklı, belgelenmiş ve sürdürülebilir — endişesiz',
    skillsTitle: 'Teknik Beceriler',
    skillsSubtitle: 'Uzmanlıklar',
    workTitle: 'İş Deneyimi',
    workSubtitle: 'Profesyonel Geçmiş',
    responsibilities: 'Sorumluluklar',
    backendDev: 'Backend Geliştirme',
    dbOptimize: 'DB Optimizasyonu',
    agileTeam: 'Agile Ekip',
    active: 'Aktif',
    projectsTitle: 'Seçilmiş Projeler',
    projectsSubtitle: 'Portföy',
    inProgress: 'Devam Ediyor',
    view: 'Görüntüle',
    certsTitle: 'Sertifikalar',
    certsSubtitle: 'Profesyonel Belgeler',
    socialTitle: 'Sosyal Ağlar',
    socialSubtitle: 'Benimle İletişime Geç',
    processTitle: 'Çalışma Sürecim',
    processSubtitle: 'Fikirden Uygulamaya',
    step1: 'İhtiyaç Analizi',
    step1Desc: 'Detaylı gereksinim incelemesi ve mimari tasarım',
    step2: 'Tasarım ve Geliştirme',
    step2Desc: 'En iyi tasarım kalıplarıyla temiz kodlama',
    step3: 'Test ve Optimizasyon',
    step3Desc: 'Kapsamlı test ve performans optimizasyonu',
    step4: 'Teslimat ve Destek',
    step4Desc: 'Zamanında teslimat ve sürekli destek',
    ctaTitle: 'Birlikte Çalışalım',
    ctaDesc: 'Profesyonel geliştirme gerektiren bir projeniz mi var? Hazırım.',
    ctaCall: 'Ara',
    ctaEmail: 'E-posta Gönder',
    ctaFastResponse: 'Hızlı Yanıt',
    ctaQuickStart: 'Hızlı Proje Başlangıcı',
    ctaFreeConsult: 'Ücretsiz Danışmanlık',
    ctaResponseTime: 'Ortalama yanıt süresi: 2 saatten az',
    aboutP1: 've Yazılım Mimarı olarak karmaşık kurumsal sistemlerin tasarımı ve uygulanmasında kanıtlanmış bir geçmişe sahibim. Temel uzmanlığım Back-end geliştirme, RESTful API tasarımı, Microservices mimarisi ve',
    aboutP1Highlight1: 'Kıdemli Python Geliştirici',
    aboutP1Highlight2: 'Yapay Zeka',
    aboutP2: 'Kariyerim boyunca saygın sanayi şirketleriyle işbirliği yapma ve algoritmik ticaret sistemleri, güvenli mesajlaşma platformları ve 3D endüstriyel analiz yazılımları gibi çeşitli projeleri',
    aboutP2Highlight: 'başarıyla',
    aboutP3: 'Profesyonel yaklaşımım yazılım mühendisliği ilkelerine,',
    aboutP3Highlight: 'Temiz Kod (Clean Code)',
    aboutQuote1: 'En iyi yazılımın gerçek sorunları çözen, basit kalan ve güvenilir olan yazılım olduğuna inanıyorum.',
    aboutQuote2: 'Yazdığım her satır kod, işiniz için gerçek değer yaratmayı hedefler.',
    adminPanel: 'Yönetim Paneli',
    scroll: 'Kaydır',
  },
};

export const t = (lang: Lang, key: keyof TranslationKeys): string => {
  return translations[lang]?.[key] || translations.fa[key] || key;
};

export default translations;
