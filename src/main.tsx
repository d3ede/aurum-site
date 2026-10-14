import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Box,
  Check,
  Github,
  Maximize2,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import "@fontsource-variable/inter";
import { DownloadPattern, TerrainPattern } from "./Patterns";
import { FeatureVisual } from "./FeatureVisuals";
import "./styles.css";

type Language = "ru" | "en";
type Theme = "light" | "dark";
const repo = "https://github.com/d3ede/aurum-launcher";
const releases = `${repo}/releases/latest`;
const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
const copy = {
  ru: {
    features: "Возможности",
    interface: "Интерфейс",
    project: "Проект",
    download: "Скачать",
    eyebrow: "MINECRAFT JAVA · WINDOWS",
    title: "Лаунчер для",
    subtitle:
      "Сборки, моды и скины — в одном месте.\nС отдельными настройками для каждого мира.",
    downloadFull: "Скачать для Windows",
    view: "Посмотреть интерфейс",
    requirements: "Windows 10 / 11 · x64",
    preview: "Интерфейс лаунчера",
    heroCaption: "Ваши сборки. Всё на своём месте.",
    expand: "Открыть скриншот",
    close: "Закрыть",
    loaders: "Выберите свой загрузчик",
    featureItems: [
      [
        "Отдельные сборки",
        "Свои моды, миры и настройки для каждой версии игры.",
      ],
      [
        "Моды и модпаки",
        "Каталог Modrinth, версии и обновление установленного контента.",
      ],
      ["Импорт", "Из Modrinth App, .mrpack, ZIP-сборок и папок с игрой."],
      [
        "Скины и плащи",
        "Библиотека образов и объёмный предпросмотр персонажа.",
      ],
    ],
    galleryEyebrow: "ВНУТРИ AURUM",
    galleryTitle: "Интерфейс лаунчера.",
    galleryText:
      "Светлая и тёмная темы. Быстрый доступ к сборкам, контенту и настройкам.",
    tabs: ["Главная", "Моды", "Скины"],
    demo: "Скриншоты интерфейса с демонстрационными данными.",
    projectEyebrow: "О ПРОЕКТЕ",
    projectTitle: "Aurum Launcher",
    projectText:
      "Независимый лаунчер для Minecraft Java. Проект развивается открыто: код, изменения и установщики доступны на GitHub.",
    source: "Код проекта",
    changes: "История изменений",
    feedback: "Сообщить об ошибке",
    catalogTitle: "Каталоги контента",
    modrinth: "Поиск, установка и обновление контента.",
    curseforge:
      "Интеграция через официальный API. Сейчас требуется собственный ключ; проверка с реальным ключом ещё предстоит.",
    ready: "Скачать Aurum.",
    readyText: "Установщик и новые версии — в GitHub Releases.",
    legal: "Независимый проект. Не связан с Mojang или Microsoft.",
    license: "Source-available · PolyForm Noncommercial",
    theme: "Переключить тему",
    menu: "Открыть меню",
  },
  en: {
    features: "Features",
    interface: "Interface",
    project: "Project",
    download: "Download",
    eyebrow: "MINECRAFT JAVA · WINDOWS",
    title: "A launcher for",
    subtitle:
      "Instances, mods, and skins in one place.\nSeparate settings for every world.",
    downloadFull: "Download for Windows",
    view: "Explore the interface",
    requirements: "Windows 10 / 11 · x64",
    preview: "Launcher interface",
    heroCaption: "Your instances. Everything in place.",
    expand: "Open screenshot",
    close: "Close",
    loaders: "Choose your loader",
    featureItems: [
      [
        "Separate instances",
        "Your own mods, worlds, and settings for every game version.",
      ],
      [
        "Mods and modpacks",
        "Browse Modrinth, choose versions, and update installed content.",
      ],
      ["Import", "From Modrinth App, .mrpack, ZIP modpacks, and game folders."],
      [
        "Skins and capes",
        "A skin library with an animated 3D character preview.",
      ],
    ],
    galleryEyebrow: "INSIDE AURUM",
    galleryTitle: "Launcher interface.",
    galleryText:
      "Light and dark themes. Quick access to instances, content, and settings.",
    tabs: ["Home", "Mods", "Skins"],
    demo: "Interface screenshots with demonstration data.",
    projectEyebrow: "THE PROJECT",
    projectTitle: "Aurum Launcher",
    projectText:
      "An independent Minecraft Java launcher. Follow its development on GitHub, with source code, changes, and installers in one place.",
    source: "Project source",
    changes: "Release notes",
    feedback: "Report an issue",
    catalogTitle: "Content catalogs",
    modrinth: "Find, install, and update content.",
    curseforge:
      "Official API integration. Currently requires your own key; verification with a real key is still pending.",
    ready: "Download Aurum.",
    readyText: "Installers and new versions on GitHub Releases.",
    legal: "An independent project. Not affiliated with Mojang or Microsoft.",
    license: "Source-available · PolyForm Noncommercial",
    theme: "Switch theme",
    menu: "Open menu",
  },
};

const screens = [
  { light: "demo-home-light.png", dark: "demo-home-dark.png" },
  { light: "content-light.png", dark: "content-dark.png" },
  { light: "skins-light.png", dark: "skins-dark.png" },
];

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem("aurum-site-language") === "en" ? "en" : "ru";
    } catch {
      return "ru";
    }
  });
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [screen, setScreen] = useState(0);
  const [expanded, setExpanded] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const model = useRef<HTMLButtonElement>(null);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem("aurum-site-language", language);
    } catch {
      /* Storage is optional. */
    }
  }, [language]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#181d1c" : "#faf8f2");
    try {
      localStorage.setItem("aurum-site-theme", theme);
    } catch {
      /* Storage is optional. */
    }
  }, [theme]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  const showImage = (index: number) => {
    setExpanded(index);
    dialog.current?.showModal();
  };
  const tilt = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (
      event.pointerType === "touch" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    model.current?.style.setProperty(
      "--tilt-x",
      `${(-(event.clientY - bounds.top - bounds.height / 2) / bounds.height) * 7}deg`,
    );
    model.current?.style.setProperty(
      "--tilt-y",
      `${((event.clientX - bounds.left - bounds.width / 2) / bounds.width) * 8}deg`,
    );
  };
  const resetTilt = () => {
    model.current?.style.setProperty("--tilt-x", "0deg");
    model.current?.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <>
      <a className="skip-link" href="#main">
        {language === "ru" ? "К содержимому" : "Skip to content"}
      </a>
      <header className="header">
        <div className="container header-inner">
          <a href="#" className="brand" aria-label="Aurum Launcher">
            <img src={asset("aurum.svg")} alt="" width="38" height="38" />
            <span>
              Aurum<span className="brand-dot">.</span>
            </span>
          </a>
          <nav
            aria-label={language === "ru" ? "Навигация" : "Navigation"}
            className={menuOpen ? "navigation open" : "navigation"}
          >
            {(["features", "interface", "project"] as const).map((id) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {t[id]}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="language-button"
              onClick={() => setLanguage(language === "ru" ? "en" : "ru")}
              aria-label={
                language === "ru"
                  ? "Switch to English"
                  : "Переключить на русский"
              }
            >
              {language === "ru" ? "EN" : "RU"}
            </button>
            <button
              className="icon-button theme-button"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label={t.theme}
              title={t.theme}
            >
              {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
            </button>
            <a className="button small header-download" href={releases}>
              {t.download}
              <ArrowUpRight size={16} />
            </a>
            <button
              className="icon-button menu-button"
              aria-label={t.menu}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="status-dot" />
              {t.eyebrow}
            </div>
            <h1>
              {t.title}
              <br />
              <span>
                Minecraft
                <br className="title-break" /> Java
                <span className="title-period">.</span>
              </span>
            </h1>
            <p className="hero-description">{t.subtitle}</p>
            <div className="hero-actions">
              <a className="button primary" href={releases}>
                <ArrowDownToLine size={18} />
                {t.downloadFull}
                <ArrowUpRight className="button-arrow" size={18} />
              </a>
              <a className="text-link" href="#interface">
                {t.view}
                <ArrowRight size={17} />
              </a>
            </div>
            <div className="requirements">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M0 2.2 6.5 1.3v6.1H0zm7.4-1 8.6-1.2v7.4H7.4zM0 8.3h6.5v6.1L0 13.5zm7.4 0H16v7.4l-8.6-1.2z"
                  fill="currentColor"
                />
              </svg>
              {t.requirements}
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-stage">
              <TerrainPattern />
              <div className="stage-grid" />
              <span className="stage-corner corner-top" />
              <span className="stage-corner corner-bottom" />
              <span className="stage-label">AU / LAUNCHER</span>
              <span className="stage-coordinate">01 — JAVA EDITION</span>
            </div>
            <div className="model-wrap">
              <button
                className="launcher-model"
                ref={model}
                onPointerMove={tilt}
                onPointerLeave={resetTilt}
                onClick={() => showImage(0)}
                aria-label={t.expand}
              >
                <img
                  src={asset(screens[0][theme])}
                  alt={t.preview}
                  width="1280"
                  height="820"
                  fetchPriority="high"
                />
                <span className="model-expand">
                  <Maximize2 size={16} />
                </span>
              </button>
            </div>
            <div className="floating-tag">
              <span className="tag-icon">
                <Box size={21} />
              </span>
              <div>
                <strong>Aurum Launcher</strong>
                <span>Minecraft Java Edition</span>
              </div>
              <Check size={17} className="tag-check" />
            </div>
          </div>
        </section>
        <section className="loaders container" aria-label={t.loaders}>
          <div>
            {[
              { name: "Vanilla", icon: "vanilla.png" },
              { name: "Fabric", icon: "fabric.png" },
              { name: "Forge", icon: "forge.svg" },
              { name: "NeoForge", icon: "neoforge.svg" },
              { name: "Quilt", icon: "quilt.svg" },
            ].map(({ name, icon }) => (
              <span key={name} className="loader-item">
                <span className="loader-mark">
                  <img
                    className={`loader-icon loader-icon-${name.toLowerCase()}`}
                    src={asset(`loaders/${icon}`)}
                    alt=""
                    width="72"
                    height="72"
                    aria-hidden="true"
                  />
                </span>
                <span className="loader-name">{name}</span>
              </span>
            ))}
          </div>
        </section>
        <section
          id="features"
          className="features container reveal"
          aria-label={t.features}
        >
          {t.featureItems.map(([title, text], i) => (
            <article key={i} className={`feature-card feature-card-${i}`}>
              <div className="feature-copy">
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
              <FeatureVisual kind={i} language={language} />
            </article>
          ))}
        </section>
        <section id="interface" className="interface-section container reveal">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.galleryEyebrow}</p>
              <h2>{t.galleryTitle}</h2>
            </div>
            <p>{t.galleryText}</p>
          </div>
          <div className="gallery">
            <div className="gallery-toolbar">
              <div role="tablist" aria-label={t.interface}>
                {t.tabs.map((tab, i) => (
                  <button
                    key={i}
                    id={`screen-tab-${i}`}
                    role="tab"
                    aria-selected={screen === i}
                    aria-controls="screen-panel"
                    tabIndex={screen === i ? 0 : -1}
                    className={screen === i ? "active" : ""}
                    onClick={() => setScreen(i)}
                    onKeyDown={(event) => {
                      if (
                        ["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                          event.key,
                        )
                      ) {
                        event.preventDefault();
                        const next =
                          event.key === "Home"
                            ? 0
                            : event.key === "End"
                              ? 2
                              : (i + (event.key === "ArrowRight" ? 1 : 2)) % 3;
                        setScreen(next);
                        document.getElementById(`screen-tab-${next}`)?.focus();
                      }
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button
                className="icon-button"
                onClick={() => showImage(screen)}
                aria-label={t.expand}
              >
                <Maximize2 size={17} />
              </button>
            </div>
            <div
              id="screen-panel"
              role="tabpanel"
              aria-labelledby={`screen-tab-${screen}`}
              className="gallery-screen"
            >
              <button onClick={() => showImage(screen)} aria-label={t.expand}>
                <img
                  key={`${screen}-${theme}`}
                  src={asset(screens[screen][theme])}
                  alt={`${t.preview} — ${t.tabs[screen]}`}
                  loading="lazy"
                />
              </button>
            </div>
          </div>
          <div className="gallery-caption">
            <span>{t.demo}</span>
            <span>
              <i className="status-dot" />
              {theme === "light"
                ? language === "ru"
                  ? "Светлая тема"
                  : "Light theme"
                : language === "ru"
                  ? "Тёмная тема"
                  : "Dark theme"}
            </span>
          </div>
        </section>
        <section id="project" className="project-section container reveal">
          <div className="project-copy">
            <p className="eyebrow">{t.projectEyebrow}</p>
            <h2>
              {t.projectTitle}
              <span className="brand-dot">.</span>
            </h2>
            <p>{t.projectText}</p>
            <a className="text-link" href={repo}>
              <Github size={18} />
              {t.source}
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="catalogs">
            <h3>{t.catalogTitle}</h3>
            <div className="catalog">
              <img src={asset("modrinth.svg")} alt="" width="30" height="30" />
              <div>
                <strong>Modrinth</strong>
                <p>{t.modrinth}</p>
              </div>
              <Check size={17} />
            </div>
            <div className="catalog">
              <img
                src={asset("curseforge.svg")}
                alt=""
                width="30"
                height="30"
              />
              <div>
                <strong>CurseForge</strong>
                <p>{t.curseforge}</p>
              </div>
              <span className="api-label">API</span>
            </div>
          </div>
        </section>
        <section className="download-section container reveal">
          <DownloadPattern />
          <div>
            <span className="eyebrow">AURUM / WINDOWS</span>
            <h2>{t.ready}</h2>
            <p>{t.readyText}</p>
          </div>
          <a href={releases} className="button primary">
            <ArrowDownToLine size={18} />
            {t.downloadFull}
            <ArrowUpRight size={18} />
          </a>
        </section>
      </main>
      <footer className="footer container">
        <div className="footer-top">
          <a className="brand" href="#">
            <img src={asset("aurum.svg")} alt="" width="29" height="29" />
            <span>
              Aurum<span className="brand-dot">.</span>
            </span>
          </a>
          <div>
            <a href={`${repo}/releases`}>
              {t.changes}
              <ArrowUpRight size={13} />
            </a>
            <a href={`${repo}/issues`}>
              {t.feedback}
              <ArrowUpRight size={13} />
            </a>
            <a href={repo}>
              GitHub
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 d3ede. {t.legal}</span>
          <a href={`${repo}/blob/main/LICENSE`}>{t.license}</a>
        </div>
      </footer>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={t.preview}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onClose={() => document.body.style.removeProperty("overflow")}
      >
        <div className="lightbox-inner">
          <div className="lightbox-toolbar">
            <span>Aurum / {t.tabs[expanded]}</span>
            <button
              className="icon-button"
              onClick={() => dialog.current?.close()}
              aria-label={t.close}
            >
              <X size={23} />
            </button>
          </div>
          <img
            src={asset(screens[expanded][theme])}
            alt={`${t.preview} — ${t.tabs[expanded]}`}
          />
        </div>
      </dialog>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
