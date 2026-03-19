import './App.css'
import { useEffect, useState } from 'react'
import {
  HashRouter,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'
import heroImage1 from './assets/hero(1).jpg'
import heroImage2 from './assets/horo(2).jpg'
import heroImage3 from './assets/horo(3).jpg'
import careShiftImage from './assets/careshift.png'
import careShiftLogo from './assets/logo.png'

type PageSection = {
  eyebrow?: string
  title: string
  body: string
  items?: string[]
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

type NewsItem = {
  date: string
  title: string
}

const navItems = [
  { to: '/', label: 'トップ' },
  { to: '/company', label: '会社概要' },
  { to: '/services', label: 'サービス' },
  { to: '/blog', label: 'ブログ' },
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

const newsItems: NewsItem[] = [
  {
    date: '2026.03.18',
    title: '茅ヶ崎WEBのコーポレートサイトを公開しました。',
  },
  {
    date: '2026.03.11',
    title: '地域事業者向けのホームページ制作相談を開始しました。',
  },
  {
    date: '2026.03.04',
    title: 'アプリケーション開発の初回ヒアリング受付を始めました。',
  },
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

const blogPosts: Post[] = [
  {
    date: '2026.03.12',
    title: '会社サイトを「営業資料」として機能させる情報設計の考え方',
    category: 'コーポレート',
    excerpt:
      'ファーストビュー、実績、会社情報の並びを見直すだけでも商談前の理解度は大きく変わります。',
  },
  {
    date: '2026.03.05',
    title: 'GitHub Pages で公開する小規模サイトの運用メリット',
    category: '運用',
    excerpt:
      'サーバ保守を持たずに更新を回したいチームに向く理由を、制作現場の視点で整理しました。',
  },
  {
    date: '2026.02.24',
    title: '採用ページで伝えるべきなのは条件よりも仕事の輪郭',
    category: '採用',
    excerpt:
      '応募前後のミスマッチを減らすには、仕事内容の曖昧さをなくすことが先です。',
  },
]

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
                title="会社概要"
                lead="茅ヶ崎WEBの考え方と会社情報を紹介します。"
                sections={companySections}
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

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setHeroPhotoIndex((current) => (current + 1) % homeHeroPhotos.length)
    }, 7000)

    return () => window.clearInterval(timerId)
  }, [])

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">Website Development / Web Applications</p>
          <h1>
            WEB
            <br />
            もっと身近に、簡単に
          </h1>
          <p className="lead">
            茅ヶ崎WEBは安価で使いやすいサービスを提供いたします。
          </p>
        </div>

        <div
          className="home-hero-visual"
          aria-label={homeHeroPhotos[heroPhotoIndex].alt}
        >
          {homeHeroPhotos.map((photo, index) => (
            <figure
              key={photo.src}
              className={`home-hero-photo${
                index === heroPhotoIndex ? ' is-active' : ''
              }`}
              aria-hidden={index !== heroPhotoIndex}
            >
              <img
                src={photo.src}
                alt={index === heroPhotoIndex ? photo.alt : ''}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="home-news-band" aria-labelledby="home-news-title">
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

      <section className="home-message">
        <div className="home-message-head">
          <p className="eyebrow">Our Philosophy</p>
          <h2>現場にもっと時間とリソースを</h2>
        </div>
        <div className="home-message-body">
          <p>
            従来の高額なWEB制作やアプリ開発は、現場の時間とリソースを大きく圧迫してきました。茅ヶ崎WEBは、AIの活用とエンジニアの確認を組み合わせ、安価で使いやすいサービスをより早く提供します。
          </p>
          <ul className="home-value-list">
            {homeValuePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-gallery">
        {homeGalleryPhotos.map((photo) => (
          <figure key={photo.src} className="home-gallery-photo">
            <img src={photo.src} alt={photo.alt} />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </section>

      <section className="home-story">
        <div className="home-story-copy">
          <p className="eyebrow">Our Services</p>
          <h2>湘南・茅ヶ崎から、地域に密着したサービスを。</h2>
          <p>
            茅ヶ崎WEBは、ただ情報を並べるだけではなく、お客様らしさやその場の空気まで伝わるサービスづくりを大切にしています。必要に応じてプログラマーが直接現地へ伺い、お店の雰囲気や想いを丁寧に汲み取りながら、ホームページやアプリケーション制作に反映します。
          </p>
          <NavLink to="/company" className="text-link">
            会社概要を見る
          </NavLink>
        </div>
        <div className="home-story-services">
          {serviceCards.map((card) => (
            <article key={card.name} className="home-service-item">
              <p className="eyebrow">Service</p>
              <h3>{card.name}</h3>
              <p>{card.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-recruit-banner">
        <div className="home-recruit-image">
          <img src={careShiftImage} alt="ケアシフトのアプリケーション画面" />
        </div>
        <div className="home-recruit-copy">
          <p className="eyebrow">Our Service</p>
          <h2>
            <img src={careShiftLogo} alt="ケアシフト" />
            <br />
            訪問介護の現場に寄り添うアプリケーション
          </h2>
          <p>
            ケアシフトは、訪問介護の現場に寄り添い、複雑な操作をできるだけ省いた使いやすいアプリケーションです。リーズナブルに導入でき、学習コストを抑えながら、現場の介護士の方々が本来のケアにより多くの時間とリソースを使えるように設計しています。
          </p>
        </div>
      </section>
    </>
  )
}

function ContentPage({
  title,
  lead,
  sections,
}: {
  title: string
  lead: string
  sections: PageSection[]
}) {
  return (
    <section className="page-stack">
      <div className="page-hero">
        <p className="eyebrow">Chigasaki Web</p>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
      </div>

      <div className="stacked-sections">
        {sections.map((section) => (
          <article key={section.title} className="page-card">
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
    </section>
  )
}

function ServicesPage() {
  return (
    <section className="page-stack">
      <div className="page-hero">
        <p className="eyebrow">Services</p>
        <h1>サービス</h1>
        <p className="lead">
          コーポレートサイト、採用広報、公開後の運用改善まで対応します。
        </p>
      </div>

      <div className="stacked-sections">
        {serviceSections.map((section) => (
          <article key={section.title} className="page-card">
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

      <div className="card-grid">
        {serviceCards.map((card) => (
          <article key={card.name} className="info-card">
            <h3>{card.name}</h3>
            <p>{card.summary}</p>
            <ul className="detail-list">
              {card.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function BlogPage() {
  return (
    <section className="page-stack">
      <div className="page-hero">
        <p className="eyebrow">Blog</p>
        <h1>ブログ</h1>
        <p className="lead">
          制作や運用の考え方を、会社ブログとして発信する想定の一覧です。
        </p>
      </div>

      <div className="post-list">
        {blogPosts.map((post) => (
          <article key={post.title} className="post-card">
            <div className="post-meta">
              <span>{post.date}</span>
              <span>{post.category}</span>
            </div>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <NavLink to="/contact" className="text-link">
              記事制作を相談する
            </NavLink>
          </article>
        ))}
      </div>
    </section>
  )
}

function CareersPage() {
  return (
    <section className="page-stack">
      <div className="page-hero">
        <p className="eyebrow">Careers</p>
        <h1>採用情報</h1>
        <p className="lead">
          少人数で、考えて作る力を持ったメンバーを募集しています。
        </p>
      </div>

      <div className="card-grid">
        {jobs.map((job) => (
          <article key={job.title} className="info-card">
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
    </section>
  )
}

function ContactPage() {
  return (
    <section className="page-stack">
      <div className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>お問い合わせ</h1>
        <p className="lead">
          フォーム送信のバックエンドは持たず、初回連絡先を明確にする構成です。
        </p>
      </div>

      <div className="stacked-sections">
        {contactSections.map((section) => (
          <article key={section.title} className="page-card">
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

      <article className="contact-card">
        <h2>連絡先</h2>
        <p>メール: hello@chigasakiweb.jp</p>
        <p>受付時間: 平日 10:00 - 18:00</p>
        <p>
          初回相談では、現状のサイトURLと相談内容を3行ほどで送ってください。
        </p>
      </article>
    </section>
  )
}

export default App
