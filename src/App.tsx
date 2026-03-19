import './App.css'
import type { ReactNode, RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'
import {
  HashRouter,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import heroImage1 from './assets/hero(1).jpg'
import heroImage2 from './assets/horo(2).jpg'
import heroImage3 from './assets/horo(3).jpg'
import careShiftImage from './assets/careshift.png'
import careShiftLogo from './assets/logo.png'
import representativeImage from './assets/daihyou.jpg'

type PageSection = {
  eyebrow?: string
  title: string
  body: string
  items?: string[]
}

type HighlightItem = {
  label: string
  value: string
}

type SpotlightCard = {
  eyebrow: string
  title: string
  body: string
}

type ServiceCard = {
  name: string
  summary: string
  details: string[]
}

type Post = {
  date: string
  title: string
  category: string
  excerpt: string
}

type Job = {
  title: string
  type: string
  summary: string
  points: string[]
}

type HomePhoto = {
  src: string
  alt: string
  caption: string
}

type PageHeroVisual = {
  src: string
  alt: string
  caption?: string
}

type ServiceGroup = {
  eyebrow: string
  title: string
  description: string
  items: {
    name: string
    summary: string
    points: string[]
  }[]
}

const representativeMessage = {
  title: '代表メッセージ',
  name: '加藤竜一',
  role: '代表',
  body: '茅ヶ崎WEBは、ただ見た目を整えるだけではなく、事業の輪郭や現場の温度感まで伝わるサイトづくりを目指しています。小さなチームだからこそ、お客様との会話から必要な要素を丁寧に拾い、素早く形にしていくことができます。地域に根ざした事業者の方々が、もっと本業に集中できるように。Webの力を、難しいものではなく身近で使いやすいものとして届けていきます。',
}

const companyInfoItems = [
  { label: '住所', value: '神奈川県茅ヶ崎市矢畑1045-9' },
  { label: '代表者', value: '加藤竜一' },
  { label: '設立', value: '2026年3月19日' },
  { label: '事業内容', value: 'IT事業' },
]

const navItems = [
  { to: '/', label: 'トップ' },
  { to: '/company', label: '会社概要' },
  { to: '/services', label: 'サービス' },
  { to: '/blog', label: 'お知らせ' },
  { to: '/careers', label: '採用情報' },
  { to: '/contact', label: 'お問い合わせ' },
]

const homeHeroPhotos: HomePhoto[] = [
  {
    src: heroImage1,
    alt: '海辺の街を見下ろす明るいワークスペース',
    caption: 'Office atmosphere',
  },
  {
    src: heroImage2,
    alt: '打ち合わせをしているチームメンバー',
    caption: 'Strategy session',
  },
  {
    src: heroImage3,
    alt: '笑顔で会話しながら作業するチームメンバー',
    caption: 'Team communication',
  },
]

const homeGalleryPhotos: HomePhoto[] = [
  {
    src: heroImage1,
    alt: 'ノートPCと資料が並ぶテーブル',
    caption: 'Planning and structure',
  },
  {
    src: heroImage2,
    alt: '光が差し込むモダンなオフィス空間',
    caption: 'Warm visual tone',
  },
  {
    src: heroImage3,
    alt: '会話しながら作業するメンバー',
    caption: 'Recruit communication',
  },
]

const homeValuePoints = [
  'AIを活用したスピーディーな提供',
  'プロのエンジニアによる迅速なチェック',
  '最短でリリースまで対応',
]

const serviceCards: ServiceCard[] = [
  {
    name: 'ホームページ作成',
    summary:
      '店舗や会社の魅力がしっかり伝わるホームページを、地域に寄り添いながら制作します。',
    details: ['店舗サイト', '企業サイト', '採用ページ', '公開支援'],
  },
  {
    name: 'ウェブアプリケーション作成',
    summary:
      '業務に合わせた使いやすいウェブアプリケーションを、必要な機能に絞って素早く形にします。',
    details: ['業務効率化', '予約システム', '管理画面', '保守対応'],
  },
]

const serviceGroups: ServiceGroup[] = [
  {
    eyebrow: 'Client Work',
    title: '受託開発',
    description:
      '事業者ごとの目的に合わせて、必要な機能と情報だけを整理しながら制作します。まずは「何を伝えるか」「どう使われるか」を明確にすることから始めます。',
    items: [
      {
        name: 'ウェブアプリケーション',
        summary:
          '業務の流れに合わせた管理画面や予約機能など、日々の運用にフィットするアプリケーションを制作します。',
        points: ['業務効率化', '予約・管理機能', '現場に合わせた設計'],
      },
      {
        name: 'ホームページ',
        summary:
          '企業や店舗の魅力がきちんと伝わるように、構成整理から公開まで一貫して対応します。',
        points: ['企業サイト', '店舗サイト', '採用ページ'],
      },
    ],
  },
  {
    eyebrow: 'Own Product',
    title: '自社開発',
    description:
      '現場で本当に必要とされる課題を、自社で継続的に改善しながら形にしています。受託とは別に、運用し続ける前提でアプリケーションを育てています。',
    items: [
      {
        name: 'ケアシフト',
        summary:
          '訪問介護の現場向けに開発しているアプリケーションです。複雑な操作を減らし、ケアそのものに時間を使えるよう設計しています。',
        points: ['訪問介護向け', '学習コストを抑えたUI', '現場運用を前提に改善'],
      },
    ],
  },
]

const blogPosts: Post[] = [
  {
    date: '2026.03.12',
    title: '茅ヶ崎WEBのコーポレートサイトを公開しました。',
    category: 'お知らせ',
    excerpt:
      'サービス内容、会社概要、お問い合わせページを含むコーポレートサイトを公開しました。',
  },
  {
    date: '2026.03.05',
    title: 'ホームページ制作・アプリケーション開発の相談受付を開始しました。',
    category: '受付開始',
    excerpt:
      '地域事業者の方向けに、ホームページ制作と業務アプリケーション開発の相談受付を始めています。',
  },
  {
    date: '2026.02.24',
    title: '訪問介護向けアプリケーション「ケアシフト」の案内を公開しました。',
    category: 'プロダクト',
    excerpt:
      '訪問介護の現場に寄り添う自社アプリケーションとして、ケアシフトの紹介を掲載しました。',
  },
]

const newsItems = blogPosts.slice(0, 3).map(({ date, title }) => ({
  date,
  title,
}))

const jobs: Job[] = [
  {
    title: 'フロントエンドエンジニア',
    type: '正社員 / 業務委託',
    summary:
      'React と静的構成を軸に、企業サイトや採用サイトの実装を担当します。',
    points: ['TypeScript 実務経験', 'UI 実装への責任感', '要件整理への参加意欲'],
  },
  {
    title: 'Webディレクター',
    type: '正社員',
    summary:
      '要件整理、進行管理、コンテンツ設計まで含めてプロジェクトを前に進める役割です。',
    points: ['顧客折衝経験', '情報設計の理解', '制作進行の実務経験'],
  },
]

const companySections: PageSection[] = [
  {
    eyebrow: 'Company',
    title: '小さなチームで、必要なものだけを明確に作る。',
    body: '茅ヶ崎WEBは、企業サイトと採用広報サイトを中心に支援する制作会社です。派手さよりも、事業理解と情報整理を重視して、長く使えるWebサイトをつくります。',
  },
  {
    title: '会社情報',
    body: '所在地は神奈川県茅ヶ崎市。企画、デザイン、フロントエンド実装、公開運用まで一気通貫で対応します。',
    items: [
      '社名: 茅ヶ崎WEB',
      '設立: 2026年',
      '事業内容: Webサイト制作 / 運用支援 / 採用広報支援',
    ],
  },
  {
    title: '制作姿勢',
    body: 'ヒアリングで集めた言葉をそのまま並べるのではなく、誰が何を知れば前に進めるかを整理して設計に落とし込みます。',
    items: [
      '目的から逆算する構成',
      '更新を前提にした運用設計',
      '公開後に改善できる余白を残す実装',
    ],
  },
]

const serviceSections: PageSection[] = [
  {
    eyebrow: 'Services',
    title: '作って終わりではなく、使われる状態まで設計する。',
    body: 'ヒアリング、情報設計、デザイン、フロントエンド実装、公開までを一貫して対応します。小規模チームに必要な速度と意思決定のしやすさを重視しています。',
  },
  {
    title: '進め方',
    body: '最初に目的と優先順位を整理し、必要なページだけを確実に公開します。初回公開後は、記事追加や採用訴求の改善にも対応します。',
    items: [
      '1. ヒアリングと課題整理',
      '2. サイトマップと原稿設計',
      '3. デザインと実装',
      '4. GitHub Pages で公開',
    ],
  },
]

const companyHighlights: HighlightItem[] = [
  { label: 'Base', value: 'Chigasaki / Kanagawa' },
  { label: 'Scope', value: 'Planning to launch support' },
  { label: 'Style', value: 'Small team / clear decisions' },
]

const serviceHighlights: HighlightItem[] = [
  { label: 'Output', value: 'Corporate / Recruit / Web apps' },
  { label: 'Flow', value: 'Hearing, design, build, publish' },
  { label: 'Speed', value: 'Minimum viable launch first' },
]

const blogHighlights: HighlightItem[] = [
  { label: 'Format', value: 'News / updates / announcements' },
  { label: 'Topic', value: 'Site, service, product updates' },
  { label: 'Tone', value: 'Short and practical information' },
]

const careersHighlights: HighlightItem[] = [
  { label: 'Team', value: 'Small and hands-on' },
  { label: 'Work', value: 'Design with implementation in mind' },
  { label: 'Need', value: 'People who can think and ship' },
]

const contactHighlights: HighlightItem[] = [
  { label: 'Reply', value: 'Weekdays 10:00 - 18:00' },
  { label: 'Input', value: 'Current state and goal in a few lines' },
  { label: 'Range', value: 'Planning stage consultations welcome' },
]

const companySpotlight: SpotlightCard = {
  eyebrow: 'Studio Note',
  title: '整理してから、作る。',
  body:
    'ヒアリングでは「何を載せるか」より先に、「誰が見てどう判断するか」を確認します。茅ヶ崎WEBは情報量より解像度を重視して設計します。',
}

const serviceSpotlight: SpotlightCard = {
  eyebrow: 'Production Flow',
  title: '必要なページから先に公開する。',
  body:
    '最初から完璧な大規模構成にせず、いま必要な訴求を先に形にします。公開後に改善しやすい構造を残すのが前提です。',
}

const blogSpotlight: SpotlightCard = {
  eyebrow: 'News View',
  title: '必要な更新を、短く分かりやすく伝える。',
  body:
    'お知らせページでは、サイト公開、受付開始、プロダクト更新など、利用者が把握しておきたい情報を簡潔に整理して届けます。',
}

const careersSpotlight: SpotlightCard = {
  eyebrow: 'Hiring View',
  title: '役割を限定しすぎないチーム。',
  body:
    '小さな制作会社だからこそ、実装だけ、進行だけで終わらず、企画とアウトプットの距離が近い状態で仕事を進めます。',
}

const contactSpotlight: SpotlightCard = {
  eyebrow: 'First Contact',
  title: '相談の粒度は粗くて構いません。',
  body:
    'まだ要件化できていない段階でも、現状の困りごととゴールが見えていれば十分です。最初の壁打ちから整理します。',
}

const contactSections: PageSection[] = [
  {
    eyebrow: 'Contact',
    title: '相談段階でも問題ありません。',
    body: 'サイトリニューアル前の整理、採用ページの追加、公開方法の見直しなど、検討中の段階から相談できます。初回は目的と現状を短く共有してください。',
  },
  {
    title: 'お問い合わせ内容の例',
    body: '相談の起点が曖昧でも進められるよう、よくあるテーマを整理しています。',
    items: [
      '会社サイトを新しくしたい',
      '採用情報ページだけ先に作りたい',
      'GitHub Pages で静的公開したい',
    ],
  },
]

const pageVisuals = {
  company: {
    src: heroImage1,
    alt: '茅ヶ崎の空気を感じる明るいワークスペース',
    caption: 'Local studio / calm planning',
  },
  services: {
    src: heroImage2,
    alt: 'チームで打ち合わせをしている様子',
    caption: 'Strategy / build / publish',
  },
  blog: {
    src: heroImage3,
    alt: '会話をしながら制作を進めるチーム',
    caption: 'Notes from production',
  },
  careers: {
    src: heroImage2,
    alt: 'アイデアを共有しながら働くチーム',
    caption: 'Small team / wide ownership',
  },
  contact: {
    src: heroImage1,
    alt: '相談や企画整理をイメージさせるデスク風景',
    caption: 'Start with a short brief',
  },
} satisfies Record<string, PageHeroVisual>

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/company"
            element={
              <ContentPage
                pageName="company"
                title="会社概要"
                lead="茅ヶ崎WEBの考え方と会社情報を紹介します。"
                intro="湘南・茅ヶ崎を拠点に、企業サイトや採用広報を小さなチームで制作しています。トップページの空気感を保ちながら、内側のページでも判断しやすい情報の並びを重視しました。"
                sections={companySections}
                highlights={companyHighlights}
                spotlight={companySpotlight}
                visual={pageVisuals.company}
                ctaTitle="お問い合わせはこちら"
                ctaBody="制作の相談やご質問があれば、相談段階からお気軽にご連絡ください。"
                ctaLink="/contact"
                ctaLabel="お問い合わせへ"
              />
            }
          />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}

function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="site-shell">
      <div className="site-header-wrap">
        <header className="site-header">
          <div className="brand-block">
            <p className="brand-mark">CHIGASAKI WEB</p>
            <p className="brand-copy">もっと現場にリソースを</p>
          </div>
          <button
            type="button"
            className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label="メニューを開閉"
            onClick={() => setMenuOpen((open) => !open)}
          >
            MENU
          </button>
          <nav
            id="site-nav"
            className={`site-nav${menuOpen ? ' is-open' : ''}`}
            aria-label="主要メニュー"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' is-active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>
      </div>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div>
          <p className="footer-heading">茅ヶ崎WEB</p>
          <p className="footer-copy">
            〒253-0085 神奈川県茅ヶ崎市矢畑1045-9
          </p>
        </div>
        <div className="footer-links">
          <span>©茅ヶ崎WEB</span>
        </div>
      </footer>
    </div>
  )
}

function HomePage() {
  const [heroPhotoIndex, setHeroPhotoIndex] = useState(0)
  const [newsVisible, setNewsVisible] = useState(false)
  const [messageVisible, setMessageVisible] = useState(false)
  const [galleryVisible, setGalleryVisible] = useState(false)
  const [storyVisible, setStoryVisible] = useState(false)
  const [recruitVisible, setRecruitVisible] = useState(false)
  const [recruitCopyVisible, setRecruitCopyVisible] = useState(false)
  const newsSectionRef = useRef<HTMLElement | null>(null)
  const messageSectionRef = useRef<HTMLElement | null>(null)
  const gallerySectionRef = useRef<HTMLElement | null>(null)
  const storySectionRef = useRef<HTMLElement | null>(null)
  const recruitSectionRef = useRef<HTMLElement | null>(null)
  const recruitImageRef = useRef<HTMLDivElement | null>(null)
  const recruitCopyRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setHeroPhotoIndex((current) => (current + 1) % homeHeroPhotos.length)
    }, 7000)

    return () => window.clearInterval(timerId)
  }, [])

  useEffect(() => {
    const newsSection = newsSectionRef.current
    if (!newsSection) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return
        setNewsVisible(true)
        observer.disconnect()
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.2,
      },
    )

    observer.observe(newsSection)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const messageSection = messageSectionRef.current
    if (!messageSection) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return
        setMessageVisible(true)
        observer.disconnect()
      },
      {
        threshold: 0.35,
      },
    )

    observer.observe(messageSection)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const gallerySection = gallerySectionRef.current
    if (!gallerySection) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return
        setGalleryVisible(true)
        observer.disconnect()
      },
      {
        threshold: 0.3,
      },
    )

    observer.observe(gallerySection)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const storySection = storySectionRef.current
    if (!storySection) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return
        setStoryVisible(true)
        observer.disconnect()
      },
      {
        threshold: 0.3,
      },
    )

    observer.observe(storySection)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const recruitImage = recruitImageRef.current
    if (!recruitImage) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return
        setRecruitVisible(true)
        observer.disconnect()
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0,
      },
    )

    observer.observe(recruitImage)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const recruitCopy = recruitCopyRef.current
    if (!recruitCopy) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return
        setRecruitCopyVisible(true)
        observer.disconnect()
      },
      {
        rootMargin: '0px 0px -18% 0px',
        threshold: 0,
      },
    )

    observer.observe(recruitCopy)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <PageHero
        eyebrow="Website Development / Web Applications"
        title={
          <>
            <span className="hero-title-line hero-title-line-primary">WEB</span>
            <span className="hero-title-line hero-title-line-secondary">
              もっと身近に、簡単に
            </span>
          </>
        }
        lead="茅ヶ崎WEBは安価で使いやすいサービスを提供いたします。"
        photos={homeHeroPhotos}
        activePhotoIndex={heroPhotoIndex}
      />

      <section
        ref={newsSectionRef}
        className={`home-news-band${newsVisible ? ' is-visible' : ''}`}
        aria-labelledby="home-news-title"
      >
        <div className="home-news-card">
          <div className="home-news-head">
            <p className="eyebrow">News</p>
            <h2 id="home-news-title">お知らせ</h2>
          </div>
          <div className="home-news-list">
            {newsItems.map((item) => (
              <article key={`${item.date}-${item.title}`} className="home-news-item">
                <p className="home-news-date">{item.date}</p>
                <p className="home-news-title">{item.title}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={messageSectionRef}
        className={`home-message${messageVisible ? ' is-visible' : ''}`}
      >
        <div className="home-message-head">
          <p className="eyebrow message-reveal message-reveal-delay-1">Our Philosophy</p>
          <h2 className="message-reveal message-reveal-delay-2">
            現場にもっと時間とリソースを
          </h2>
        </div>
        <div className="home-message-body">
          <p className="message-reveal message-reveal-delay-3">
            従来の高額なWEB制作やアプリ開発は、現場の時間とリソースを大きく圧迫してきました。茅ヶ崎WEBは、AIの活用とエンジニアの確認を組み合わせ、安価で使いやすいサービスをより早く提供します。
          </p>
          <ul className="home-value-list message-reveal message-reveal-delay-4">
            {homeValuePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        ref={gallerySectionRef}
        className={`home-gallery${galleryVisible ? ' is-visible' : ''}`}
      >
        {homeGalleryPhotos.map((photo) => (
          <figure key={photo.src} className="home-gallery-photo">
            <img src={photo.src} alt={photo.alt} />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </section>

      <section
        ref={storySectionRef}
        className={`home-story${storyVisible ? ' is-visible' : ''}`}
      >
        <div className="home-story-copy">
          <p className="eyebrow message-reveal message-reveal-delay-1">Our Services</p>
          <h2 className="message-reveal message-reveal-delay-2">
            湘南・茅ヶ崎から、地域に密着したサービスを。
          </h2>
          <p className="message-reveal message-reveal-delay-3">
            茅ヶ崎WEBは、ただ情報を並べるだけではなく、お客様らしさやその場の空気まで伝わるサービスづくりを大切にしています。必要に応じてプログラマーが直接現地へ伺い、お店の雰囲気や想いを丁寧に汲み取りながら、ホームページやアプリケーション制作に反映します。
          </p>
          <NavLink
            to="/company"
            className="text-link message-reveal message-reveal-delay-4"
          >
            会社概要を見る
          </NavLink>
        </div>
        <div className="home-story-services">
          {serviceCards.map((card, index) => (
            <article
              key={card.name}
              className={`home-service-item message-reveal ${
                index === 0 ? 'message-reveal-delay-3' : 'message-reveal-delay-4'
              }`}
            >
              <p className="eyebrow">Service</p>
              <h3>{card.name}</h3>
              <p>{card.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <PromoBanner
        sectionRef={recruitSectionRef}
        imageRef={recruitImageRef}
        copyRef={recruitCopyRef}
        visible={recruitVisible}
        copyVisible={recruitCopyVisible}
        eyebrow="Our Service"
        title={
          <>
            <img src={careShiftLogo} alt="ケアシフト" />
            <br />
            訪問介護の現場に寄り添うアプリケーション
          </>
        }
        body="ケアシフトは、訪問介護の現場に寄り添い、複雑な操作をできるだけ省いた使いやすいアプリケーションです。リーズナブルに導入でき、学習コストを抑えながら、現場の介護士の方々が本来のケアにより多くの時間とリソースを使えるように設計しています。"
        imageSrc={careShiftImage}
        imageAlt="ケアシフトのアプリケーション画面"
      />
    </>
  )
}

function PageHero({
  eyebrow,
  title,
  lead,
  intro,
  photos,
  activePhotoIndex = 0,
  className = '',
  showCaption = false,
}: {
  eyebrow: string
  title: ReactNode
  lead: string
  intro?: string
  photos: PageHeroVisual[]
  activePhotoIndex?: number
  className?: string
  showCaption?: boolean
}) {
  const heroClassName = className ? `home-hero ${className}` : 'home-hero'

  return (
    <section className={heroClassName}>
      <div className="home-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {intro ? <p className="hero-intro">{intro}</p> : null}
      </div>

      <div
        className="home-hero-visual"
        aria-label={photos[activePhotoIndex]?.alt}
      >
        {photos.map((photo, index) => (
          <figure
            key={`${photo.src}-${index}`}
            className={`home-hero-photo${
              index === activePhotoIndex ? ' is-active' : ''
            }`}
            aria-hidden={index !== activePhotoIndex}
          >
            <img
              src={photo.src}
              alt={index === activePhotoIndex ? photo.alt : ''}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {showCaption && photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    </section>
  )
}

function PromoBanner({
  eyebrow,
  title,
  body,
  imageSrc,
  imageAlt,
  actionLink,
  actionLabel,
  visible = true,
  copyVisible = true,
  className = '',
  copyClassName = '',
  imageClassName = '',
  sectionRef,
  imageRef,
  copyRef,
}: {
  eyebrow: string
  title: ReactNode
  body: string
  imageSrc: string
  imageAlt: string
  actionLink?: string
  actionLabel?: string
  visible?: boolean
  copyVisible?: boolean
  className?: string
  copyClassName?: string
  imageClassName?: string
  sectionRef?: RefObject<HTMLElement | null>
  imageRef?: RefObject<HTMLDivElement | null>
  copyRef?: RefObject<HTMLDivElement | null>
}) {
  const sectionClassName = `home-recruit-banner${visible ? ' is-visible' : ''}${
    className ? ` ${className}` : ''
  }`
  const copyClassNames = `home-recruit-copy${copyVisible ? ' is-visible' : ''}${
    copyClassName ? ` ${copyClassName}` : ''
  }`
  const imageClassNames = `home-recruit-image${
    imageClassName ? ` ${imageClassName}` : ''
  }`

  return (
    <section ref={sectionRef} className={sectionClassName}>
      <div ref={imageRef} className={imageClassNames}>
        <img src={imageSrc} alt={imageAlt} />
      </div>
      <div ref={copyRef} className={copyClassNames}>
        <p className="eyebrow message-reveal message-reveal-delay-1">{eyebrow}</p>
        <h2 className="message-reveal message-reveal-delay-2">{title}</h2>
        <p className="message-reveal message-reveal-delay-3">{body}</p>
        {actionLink && actionLabel ? (
          <NavLink
            to={actionLink}
            className="button button-primary message-reveal message-reveal-delay-3"
          >
            {actionLabel}
          </NavLink>
        ) : null}
      </div>
    </section>
  )
}

function ContentPage({
  pageName,
  title,
  lead,
  intro,
  sections,
  highlights,
  spotlight,
  visual,
  ctaTitle,
  ctaBody,
  ctaLink,
  ctaLabel,
}: {
  pageName: string
  title: string
  lead: string
  intro: string
  sections: PageSection[]
  highlights: HighlightItem[]
  spotlight: SpotlightCard
  visual: PageHeroVisual
  ctaTitle: string
  ctaBody: string
  ctaLink: string
  ctaLabel: string
}) {
  const [companyMessageVisible, setCompanyMessageVisible] = useState(false)
  const [companyPhotoVisible, setCompanyPhotoVisible] = useState(false)
  const companyMessageSectionRef = useRef<HTMLElement | null>(null)
  const companyPhotoRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (pageName !== 'company') return

    const companyMessageSection = companyMessageSectionRef.current
    if (!companyMessageSection) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return
        setCompanyMessageVisible(true)
        observer.disconnect()
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -30% 0px',
      },
    )

    observer.observe(companyMessageSection)

    return () => observer.disconnect()
  }, [pageName])

  useEffect(() => {
    if (pageName !== 'company') return

    const companyPhoto = companyPhotoRef.current
    if (!companyPhoto) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return
        setCompanyPhotoVisible(true)
        observer.disconnect()
      },
      {
        threshold: 0.25,
      },
    )

    observer.observe(companyPhoto)

    return () => observer.disconnect()
  }, [pageName])

  return (
    <InnerPageLayout
      pageName={pageName}
      title={title}
      lead={lead}
      intro={intro}
      highlights={highlights}
      spotlight={spotlight}
      visual={visual}
      ctaTitle={ctaTitle}
      ctaBody={ctaBody}
      ctaLink={ctaLink}
      ctaLabel={ctaLabel}
    >
      {pageName === 'company' ? (
        <>
          <section
            ref={companyMessageSectionRef}
            className="company-message"
            aria-labelledby="company-message-title"
          >
            <div
              className={`company-message-copy page-card${
                companyMessageVisible ? ' is-visible' : ''
              }`}
            >
              <p className="eyebrow">Message</p>
              <h2 id="company-message-title">{representativeMessage.title}</h2>
              <p>{representativeMessage.body}</p>
              <div className="company-message-signature">
                <span>{representativeMessage.role}</span>
                <strong>{representativeMessage.name}</strong>
              </div>
            </div>

            <figure
              ref={companyPhotoRef}
              className={`company-message-photo${
                companyPhotoVisible ? ' is-visible' : ''
              }`}
            >
              <img src={representativeImage} alt="代表の加藤竜一" />
            </figure>
          </section>

          <section className="company-info" aria-labelledby="company-info-title">
            <div className="company-info-header">
              <p className="eyebrow">Company Info</p>
              <h2 id="company-info-title">会社情報</h2>
            </div>
            <dl className="company-info-list">
              {companyInfoItems.map((item) => (
                <div key={item.label} className="company-info-row">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </>
      ) : (
        <div className="stacked-sections inner-page-sections">
          {sections.map((section, index) => (
            <article key={section.title} className={`page-card section-card section-card-${index + 1}`}>
              {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              {section.items ? (
                <ul className="detail-list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </InnerPageLayout>
  )
}

function InnerPageLayout({
  pageName,
  title,
  lead,
  intro,
  highlights,
  spotlight,
  visual,
  ctaTitle,
  ctaBody,
  ctaLink,
  ctaLabel,
  children,
}: {
  pageName: string
  title: string
  lead: string
  intro: string
  highlights: HighlightItem[]
  spotlight: SpotlightCard
  visual: PageHeroVisual
  ctaTitle: string
  ctaBody: string
  ctaLink: string
  ctaLabel: string
  children: ReactNode
}) {
  return (
    <section className={`page-stack inner-page inner-page-${pageName}`}>
      <PageHero
        className={pageName === 'company' ? 'page-hero-company' : 'page-hero-inner'}
        eyebrow="Chigasaki Web"
        title={
          <span className="hero-title-line hero-title-line-primary">
            {title}
          </span>
        }
        lead={lead}
        intro={intro}
        photos={[visual]}
      />

      {children}

      {pageName === 'contact' ? null : (
        <PromoBanner
          className="inner-page-cta"
          copyClassName="inner-page-cta-copy"
          imageClassName="inner-page-cta-image"
          eyebrow="Next Step"
          title={ctaTitle}
          body={ctaBody}
          actionLink={ctaLink}
          actionLabel={ctaLabel}
          imageSrc={visual.src}
          imageAlt={visual.alt}
        />
      )}
    </section>
  )
}

function ServicesPage() {
  return (
    <InnerPageLayout
      pageName="services"
      title="サービス"
      lead="コーポレートサイト、採用広報、公開後の運用改善まで対応します。"
      intro="トップページで見せている軽やかな印象を保ちながら、内側では相談から公開までの流れがひと目で分かる構成にしています。"
      highlights={serviceHighlights}
      spotlight={serviceSpotlight}
      visual={pageVisuals.services}
      ctaTitle="お問い合わせはこちら"
      ctaBody="制作の相談やご質問があれば、相談段階からお気軽にご連絡ください。"
      ctaLink="/contact"
      ctaLabel="お問い合わせへ"
    >
      <div className="service-group-stack">
        {serviceGroups.map((group) => (
          <section key={group.title} className="service-group" aria-labelledby={`service-group-${group.title}`}>
            <div className="service-group-head">
              <p className="eyebrow">{group.eyebrow}</p>
              <h2 id={`service-group-${group.title}`}>{group.title}</h2>
              <p>{group.description}</p>
            </div>

            <div className={`service-group-grid service-group-grid-${group.items.length}`}>
              {group.items.map((item) => (
                item.name === 'ケアシフト' ? (
                  <article key={item.name} className="info-card service-detail-card care-shift-card">
                    <div className="care-shift-card-copy">
                      <p className="eyebrow">Own Product</p>
                      <h3>
                        <img src={careShiftLogo} alt="ケアシフト" className="care-shift-logo" />
                      </h3>
                      <p>{item.summary}</p>
                    </div>
                    <figure className="care-shift-card-visual">
                      <img src={careShiftImage} alt="ケアシフトのアプリケーション画面" />
                    </figure>
                  </article>
                ) : (
                  <article key={item.name} className="info-card service-detail-card">
                    <p className="eyebrow">Service</p>
                    <h3>{item.name}</h3>
                    <p>{item.summary}</p>
                  </article>
                )
              ))}
            </div>
          </section>
        ))}
      </div>
    </InnerPageLayout>
  )
}

function BlogPage() {
  return (
    <InnerPageLayout
      pageName="blog"
      title="お知らせ"
      lead="サイト公開や受付開始、サービス更新などのお知らせを掲載します。"
      intro="制作会社としての更新情報を、短く分かりやすく確認できる一覧ページとして構成しています。"
      highlights={blogHighlights}
      spotlight={blogSpotlight}
      visual={pageVisuals.blog}
      ctaTitle="お問い合わせはこちら"
      ctaBody="制作の相談やご質問があれば、相談段階からお気軽にご連絡ください。"
      ctaLink="/contact"
      ctaLabel="お問い合わせへ"
    >
      <div className="post-list editorial-post-list">
        {blogPosts.map((post) => (
          <article key={post.title} className="post-card editorial-post-card">
            <div className="post-meta">
              <span>{post.date}</span>
              <span>{post.category}</span>
            </div>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <NavLink to="/contact" className="text-link">
              お問い合わせへ
            </NavLink>
          </article>
        ))}
      </div>
    </InnerPageLayout>
  )
}

function CareersPage() {
  return (
    <InnerPageLayout
      pageName="careers"
      title="採用情報"
      lead="少人数で、考えて作る力を持ったメンバーを募集しています。"
      intro="トップページの『現場にもっと時間とリソースを』という考え方を、そのままチームづくりにも接続するページにしています。"
      highlights={careersHighlights}
      spotlight={careersSpotlight}
      visual={pageVisuals.careers}
      ctaTitle="お問い合わせはこちら"
      ctaBody="制作の相談やご質問があれば、相談段階からお気軽にご連絡ください。"
      ctaLink="/contact"
      ctaLabel="お問い合わせへ"
    >
      <div className="card-grid careers-card-grid">
        {jobs.map((job) => (
          <article key={job.title} className="info-card career-card">
            <p className="job-type">{job.type}</p>
            <h2>{job.title}</h2>
            <p>{job.summary}</p>
            <ul className="detail-list">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </InnerPageLayout>
  )
}

function ContactPage() {
  return (
    <InnerPageLayout
      pageName="contact"
      title="お問い合わせ"
      lead="フォーム送信のバックエンドは持たず、初回連絡先を明確にする構成です。"
      intro="トップページの親しみやすさを維持しつつ、連絡前に迷わない情報整理を優先したページ構成にしています。"
      highlights={contactHighlights}
      spotlight={contactSpotlight}
      visual={pageVisuals.contact}
      ctaTitle="先にサービスの範囲を確認する"
      ctaBody="依頼できる内容や進め方を見てから問い合わせたい場合はこちらです。"
      ctaLink="/services"
      ctaLabel="サービスを見る"
    >
      <>
        <article className="contact-card contact-detail-card">
          <p className="eyebrow">Contact Detail</p>
          <h2>連絡先</h2>
          <p>メール: kaigo2013.ryuuiti@gmail.com</p>
          <p>受付時間: 24時間可</p>
          <p>相談のみでも構いません！お気軽にご連絡ください！</p>
        </article>
      </>
    </InnerPageLayout>
  )
}

export default App
