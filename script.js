// Theme toggle (persists per browser)
const root = document.documentElement;
document.getElementById('themeToggle').addEventListener('click', () => {
  const isDark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;
  const next = isDark ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Mobile menu
const navLinks = document.getElementById('navLinks');
document.getElementById('menuToggle').addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Nav border on scroll
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Language. English lives in the HTML; Vietnamese is below.
const vi = {
  navAbout: 'Giới thiệu',
  navSkills: 'Kỹ năng',
  navExperience: 'Kinh nghiệm',
  navProjects: 'Dự án',
  navContact: 'Liên hệ',
  eyebrow: 'Sẵn sàng cho vị trí Senior Software Engineer',
  heroLead: 'Hơn 8 năm thiết kế và mở rộng <strong>hệ thống phân tán chịu tải cao</strong> bằng Go và Java — từ nền tảng telesales phục vụ 1,000+ người dùng đến trading bot độ trễ thấp trên các sàn giao dịch quốc tế.',
  ctaContact: 'Liên hệ',
  ctaExperience: 'Xem kinh nghiệm',
  ctaCv: 'Tải CV',
  location: 'TP. Hồ Chí Minh, Việt Nam',
  statYears: 'Năm kinh nghiệm',
  statUsers: 'Người dùng hoạt động',
  statLeads: 'Lead đã xử lý',
  aboutTag: '01. Giới thiệu',
  aboutTitle: 'Xây dựng hệ thống vẫn nhanh khi traffic không còn yên ả.',
  aboutP1: 'Tôi là Senior Software Engineer tại TP. Hồ Chí Minh, hiện kiêm vai trò Solutions Architect. Trong tám năm qua, tôi thiết kế các nền tảng backend bằng <strong>Golang</strong> và <strong>Java</strong> cho telesales, quản lý nhân sự, logistics, giao dịch tài chính và ERP doanh nghiệp.',
  aboutP2: 'Thế mạnh của tôi nằm ở những phần khó của hệ thống phân tán: <strong>messaging, caching, tối ưu database, observability và độ tin cậy</strong>. Tôi cũng từng là technical lead cho các team backend — đặt chuẩn kiến trúc, điều phối code review và sprint planning.',
  about1: 'Kiến trúc microservices &amp; event-driven',
  about2: 'API gRPC, REST &amp; WebSocket',
  about3: 'Pipeline Kafka / RabbitMQ',
  about4: 'Cache nhiều tầng với Redis',
  about5: 'Distributed tracing với Jaeger',
  about6: 'Dẫn dắt kỹ thuật &amp; code review',
  skillsTag: '02. Kỹ năng',
  skillsTitle: 'Công cụ tôi sử dụng',
  skLang: 'Ngôn ngữ &amp; Framework',
  skArch: 'Kiến trúc &amp; Hạ tầng',
  skData: 'Cơ sở dữ liệu &amp; Messaging',
  skOps: 'DevOps &amp; Best Practices',
  expTag: '03. Kinh nghiệm',
  expTitle: 'Nơi tôi đã làm việc',
  hcmc: '· TP. Hồ Chí Minh',
  j1Date: '01/2024 — Nay',
  j1b1: 'Thiết kế và triển khai <strong>Telesale Management System (TMS)</strong> theo kiến trúc microservices, phục vụ <strong>1,000+ người dùng hoạt động</strong> và xử lý <strong>20,000+ lead</strong>.',
  j1b2: 'Thiết kế nền tảng <strong>Workforce Management (WFM)</strong> với định tuyến message real-time và trao đổi API với TMS, giúp tối ưu lịch làm việc và hiệu quả vận hành.',
  j1b3: 'Dẫn dắt tích hợp API với nhiều đối tác (<strong>J&amp;T, Amilo, Flash, Pinelabs, QuadX</strong>) để tự động theo dõi giao hàng và đồng bộ thanh toán real-time.',
  j1b4: 'Tùy biến hệ thống phê duyệt <strong>Delegation of Authority (DOA)</strong> tự động trên framework ERP mã nguồn mở Axelor, có thông báo qua SMTP.',
  j2b1: 'Tech lead cho team <strong>5 backend developer</strong>; đặt chuẩn kiến trúc, điều phối code review chặt chẽ và sprint planning cho nền tảng giao dịch tự động tần suất cao (<strong>Trade Bot</strong>).',
  j2b2: 'Xây dựng <strong>microservices Golang độ trễ thấp</strong>, bảo mật cao: gRPC giữa các service, message queue cho tác vụ bất đồng bộ và cron job cho lệnh giao dịch theo lịch.',
  j2b3: 'Tăng cường bảo mật và khả năng chịu lỗi với <strong>ký request body bằng RSA</strong>, cân bằng tải Nginx, Docker và cache Redis nhiều tầng.',
  j2b4: 'Tích hợp API giao dịch live real-time với <strong>Binance, BingX và XTB</strong>, đảm bảo không downtime khi thực thi lệnh.',
  j3b1: 'Phát triển hệ thống <strong>Back-Office (BO)</strong> quản lý tài khoản người dùng và theo dõi affiliate.',
  j3b2: 'Tối ưu <strong>pipeline message queue</strong> bất đồng bộ, chịu được các đợt hàng nghìn lượt đăng ký và broadcast cùng lúc.',
  j3b3: 'Triển khai <strong>Jaeger OpenTracing</strong> trên các microservice Golang để chủ động phát hiện bottleneck và tăng khả năng quan sát hệ thống.',
  j4b1: 'Dẫn dắt kỹ thuật cho team <strong>3–4 kỹ sư</strong> phát triển các nền tảng ERP (FPT Member, FTI) quản lý hợp đồng internet, xác thực danh tính và thu cước.',
  j4b2: 'Đồng phát triển <strong>cổng ERP &amp; ứng dụng mobile FPT Education (EFox)</strong>, tự động hóa xử lý học vụ và thư viện số.',
  j4b3: 'Thiết kế session storage dùng chung bằng <strong>Redis</strong>, phân tích log tập trung với <strong>Kafka &amp; Kibana</strong>, và tác vụ định kỳ với Quartz Scheduler.',
  projTag: '04. Hệ thống tiêu biểu',
  projTitle: 'Những hệ thống tôi đã thiết kế',
  p1Title: 'Hệ thống quản lý Telesale',
  p1Desc: 'Nền tảng microservices cho vận hành telesales, phục vụ 1,000+ người dùng và pipeline 20,000+ lead.',
  p2Title: 'Quản lý nhân sự (WFM)',
  p2Desc: 'Nền tảng lập lịch nhân sự với định tuyến message real-time và trao đổi API với TMS.',
  p3Desc: 'Giao dịch tự động tần suất cao trên Binance, BingX và XTB với các service bảo mật, độ trễ thấp, không downtime.',
  p4Title: 'Hub tích hợp vận chuyển',
  p4Desc: 'Lớp tích hợp thống nhất cho J&amp;T, Amilo, Flash, Pinelabs và QuadX — theo dõi giao hàng và đồng bộ thanh toán real-time.',
  p5Title: 'Back-Office &amp; Tracing',
  p5Desc: 'Back-office quản lý tài khoản và affiliate, pipeline queue chịu các đợt đăng ký dồn dập, tracing end-to-end với Jaeger.',
  p6Desc: 'ERP doanh nghiệp quản lý hợp đồng internet và thu cước, cùng cổng thông tin và ứng dụng mobile cho giáo dục.',
  eduTag: '05. Học vấn',
  eduSchool: 'Đại học Văn Lang',
  eduDegree: 'Cử nhân Công nghệ Thông tin · TP. Hồ Chí Minh',
  contactTag: '06. Tiếp theo?',
  contactTitle: 'Cùng xây dựng một hệ thống đáng tin cậy.',
  contactLead: 'Tôi đang tìm cơ hội ở vị trí Senior Software Engineer và Senior Backend. Dù bạn có vị trí phù hợp hay chỉ muốn trao đổi về hệ thống phân tán, hãy liên hệ với tôi.',
  contactBtn: 'Gửi lời chào',
  footer: 'Xây dựng bằng HTML, CSS và một chút JS',
};

const roles = {
  en: ['Senior Software Engineer', 'Backend Tech Lead', 'Golang · Java · Microservices', 'Distributed Systems Engineer'],
  vi: ['Senior Software Engineer', 'Backend Tech Lead', 'Golang · Java · Microservices', 'Kỹ sư hệ thống phân tán'],
};

const i18nEls = [...document.querySelectorAll('[data-i18n]')];
const en = {};
i18nEls.forEach(el => { en[el.dataset.i18n] = el.innerHTML; });
const langBtn = document.getElementById('langToggle');
let lang = 'en';

function setLang(next) {
  lang = next;
  const dict = lang === 'vi' ? vi : en;
  i18nEls.forEach(el => {
    const text = dict[el.dataset.i18n];
    if (text != null) el.innerHTML = text;
  });
  root.lang = lang;
  langBtn.textContent = lang === 'vi' ? 'EN' : 'VI';
  try { localStorage.setItem('lang', lang); } catch (e) {}
}
langBtn.addEventListener('click', () => setLang(lang === 'vi' ? 'en' : 'vi'));

// ?lang=vi in the URL wins, then the visitor's last choice
let initial = new URLSearchParams(location.search).get('lang');
if (!initial) { try { initial = localStorage.getItem('lang'); } catch (e) {} }
if (initial === 'vi') setLang('vi');

// Typing effect for role line
const typed = document.getElementById('typed');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  let r = 0, i = roles[lang][0].length, deleting = true;
  const tick = () => {
    const list = roles[lang];
    const word = list[r % list.length];
    typed.textContent = word.slice(0, i);
    if (deleting) {
      i--;
      if (i < 0) { deleting = false; r = (r + 1) % list.length; i = 0; }
    } else {
      i++;
      if (i > list[r].length) { deleting = true; return setTimeout(tick, 2200); }
    }
    setTimeout(tick, deleting ? 35 : 70);
  };
  setTimeout(tick, 2500);
}

// Reveal on scroll + count-up stats
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    io.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const countIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    const start = performance.now();
    const dur = reduceMotion ? 0 : 1400;
    const step = now => {
      const p = dur ? Math.min((now - start) / dur, 1) : 1;
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    countIO.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => countIO.observe(el));

// Highlight active nav link
const sections = [...document.querySelectorAll('main section[id]')];
const linkFor = id => navLinks.querySelector(`a[href="#${id}"]`);
const secIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const link = linkFor(entry.target.id);
    if (link && entry.isIntersecting) {
      navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => secIO.observe(s));

document.getElementById('year').textContent = new Date().getFullYear();

// Show final numbers when printing
window.addEventListener('beforeprint', () => {
  document.querySelectorAll('[data-count]').forEach(el => el.textContent = (+el.dataset.count).toLocaleString('en-US'));
});
