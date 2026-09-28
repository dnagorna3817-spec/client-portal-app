import Image from "next/image";
import { DeviceOptions } from "@/components/device-options";
import { CalendarIcon, ChatIcon, ClockIcon, DocumentIcon, RequestIcon, ShieldIcon, StarIcon, UsersIcon } from "@/components/icons";
import { CLIENT_PORTAL_URL } from "@/lib/config";

const featureTags = [
  { label: "Документи", Icon: DocumentIcon },
  { label: "Запити", Icon: RequestIcon },
  { label: "Чат", Icon: ChatIcon },
  { label: "Календар", Icon: CalendarIcon }
];

const benefits = [
  { title: "Швидкий доступ", text: "Усі послуги та документи в кілька кліків.", Icon: ClockIcon },
  { title: "Безпечно", text: "Ваші дані захищені сучасними технологіями.", Icon: ShieldIcon },
  { title: "Завжди на зв’язку", text: "Прямий контакт із менеджером АКЦ у застосунку.", Icon: UsersIcon },
  { title: "Зручно", text: "Вся важлива інформація в одному місці, без зайвих листів і дзвінків.", Icon: StarIcon }
];

const features = [
  { title: "Документи", text: "Переглядайте та завантажуйте всі важливі файли.", image: "/screenshots/documents-mobile.jpg", imageClass: "feature-image-documents", imageWidth: 589, imageHeight: 1280, alt: "Реальний мобільний екран Документи по папках AKC Client Portal", Icon: DocumentIcon },
  { title: "Запити", text: "Отримуйте запити від менеджера та виконуйте необхідні дії.", image: "/screenshots/requests-mobile.jpg", imageClass: "feature-image-requests", imageWidth: 589, imageHeight: 1280, alt: "Реальний мобільний екран запитів, що потребують уваги", Icon: RequestIcon },
  { title: "Комунікація", text: "Спілкуйтеся з командою АКЦ у захищеному чаті.", image: "/screenshots/chat-mobile.png", imageClass: "feature-image-chat", imageWidth: 1206, imageHeight: 2622, alt: "Реальний мобільний екран Чат з компанією AKC Client Portal", Icon: ChatIcon },
  { title: "Календар", text: "Переглядайте податкові нагадування та важливі дати.", image: "/screenshots/calendar-mobile.png", imageClass: "feature-image-calendar", imageWidth: 1206, imageHeight: 2622, alt: "Реальний мобільний екран Загальний податковий календар", Icon: CalendarIcon }
];

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="AKC Client Portal — на початок сторінки">
      <span className="brand-mark"><Image src="/brand/akc-logo.png" alt="" width={54} height={52} priority /></span>
      <span><strong>Client Portal AKC</strong><small>Клієнтський портал</small></span>
    </a>
  );
}

export default function AppIntroductionPage() {
  return (
    <main id="top">
      <section className="hero">
        <div className="hero-orbit" aria-hidden="true" />
        <div className="shell hero-shell">
          <header className="site-header">
            <Brand />
            <a className="browser-link" href={CLIENT_PORTAL_URL} target="_blank" rel="noreferrer">Відкрити в браузері <span aria-hidden="true">→</span></a>
          </header>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">КЛІЄНТСЬКИЙ ПОРТАЛ</p>
              <h1><span>AKC</span><span>Client Portal</span></h1>
              <p className="hero-description">Усі ваші документи, запити та комунікація з командою АКЦ — в одному зручному застосунку.</p>
              <a className="primary-button" href="#download">Завантажити застосунок <span aria-hidden="true">↓</span></a>
              <ul className="feature-tags desktop-feature-tags" aria-label="Основні можливості Client Portal">
                {featureTags.map(({ label, Icon }) => <li key={label}><i><Icon /></i><span>{label}</span></li>)}
              </ul>
            </div>

            <div className="device-composition" aria-label="AKC Client Portal на телефоні та комп’ютері">
              <div className="laptop-frame">
                <span className="laptop-camera" />
                <Image src="/screenshots/desktop-dashboard.webp" alt="Реальний екран AKC Client Portal на комп’ютері" width={1600} height={900} priority sizes="(max-width: 760px) 0px, 52vw" />
              </div>
              <div className="laptop-base" />
              <div className="phone-frame">
                <span className="phone-speaker" />
                <Image src="/screenshots/mobile-dashboard.png" alt="Реальний мобільний екран AKC Client Portal" width={1206} height={2622} priority sizes="(max-width: 760px) 84vw, 19vw" />
              </div>
            </div>
            <ul className="feature-tags mobile-feature-tags" aria-label="Основні можливості Client Portal">
              {featureTags.map(({ label, Icon }) => <li key={label}><i><Icon /></i><span>{label}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="shell about-grid">
          <div className="about-copy">
            <p className="eyebrow">ПРО ЗАСТОСУНОК</p>
            <h2>Зручний інструмент<br />для клієнтів АКЦ</h2>
            <p>AKC Client Portal об’єднує всі ключові сервіси в одному місці. Переглядайте статус робіт, отримуйте документи, створюйте запити та спілкуйтеся з командою АКЦ швидко та зручно.</p>
          </div>
          <div className="benefit-list">
            {benefits.map(({ title, text, Icon }) => (
              <article className="benefit-item" key={title}>
                <span className="benefit-icon"><Icon /></span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section functions-section" id="functions">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">МОЖЛИВОСТІ</p>
            <h2>Що можна робити<br />в Client Portal</h2>
          </div>
          <div className="feature-grid" role="region" aria-label="Можливості Client Portal" tabIndex={0}>
            {features.map(({ title, text, image, imageClass, imageWidth, imageHeight, alt, Icon }) => (
              <article className="feature-card" key={title}>
                <div className={`feature-image ${imageClass}`}><Image src={image} alt={alt} width={imageWidth} height={imageHeight} sizes="(max-width: 767px) 86vw, (max-width: 1100px) 72vw, 24vw" /></div>
                <div className="feature-card-copy"><span className="card-icon"><Icon /></span><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section download-section" id="download">
        <div className="shell">
          <div className="download-heading">
            <p className="eyebrow">ПОЧНІТЬ КОРИСТУВАТИСЯ</p>
            <h2>Оберіть свій пристрій</h2>
            <p>Завантажте застосунок на телефон або відкрийте Client Portal у браузері на комп’ютері.</p>
          </div>
          <DeviceOptions />
        </div>
      </section>
    </main>
  );
}
