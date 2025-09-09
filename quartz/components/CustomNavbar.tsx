import React, { useEffect, useMemo, useState } from "react";

const SUPPORTED_LOCALES = ["en", "nl", "fr"] as const;
type Locale = typeof SUPPORTED_LOCALES[number];

// Change if your default locale should be prefixed in URLs
const DEFAULT_LOCALE: Locale = "en";
const PREFIX_DEFAULT_LOCALE_IN_PATH = false;

const UI_LABELS: Record<
  Locale,
  { languageLabel: string; languages: Record<Locale, string> }
> = {
  en: {
    languageLabel: "Language",
    languages: { en: "English", nl: "Nederlands", fr: "Français" },
  },
  nl: {
    languageLabel: "Taal",
    languages: { en: "Engels", nl: "Nederlands", fr: "Frans" },
  },
  fr: {
    languageLabel: "Langue",
    languages: { en: "Anglais", nl: "Néerlandais", fr: "Français" },
  },
};

function detectLocaleFromPath(pathname: string): Locale {
  const first = (pathname.split("/")[1] || "").toLowerCase();
  return (SUPPORTED_LOCALES as readonly string[]).includes(first)
    ? (first as Locale)
    : DEFAULT_LOCALE;
}

function stripLocaleFromPath(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if ((SUPPORTED_LOCALES as readonly string[]).includes((first || "").toLowerCase())) {
    const restPath = `/${rest.join("/")}`;
    return restPath === "//" ? "/" : restPath || "/";
  }
  return pathname || "/";
}

function addLeadingSlash(s: string): string {
  if (!s) return "/";
  return s.startsWith("/") ? s : `/${s}`;
}

function buildLocalizedPath(
  target: Locale,
  currentPathname: string,
  currentSearch: string,
  currentHash: string
): string {
  const rest = stripLocaleFromPath(currentPathname);
  const restNoDoubleSlash = addLeadingSlash(rest).replace(/\/+/g, "/");

  const shouldPrefix =
    target !== DEFAULT_LOCALE || (target === DEFAULT_LOCALE && PREFIX_DEFAULT_LOCALE_IN_PATH);

  const base =
    shouldPrefix
      ? `/${target}${restNoDoubleSlash === "/" ? "" : restNoDoubleSlash}`
      : restNoDoubleSlash;

  return `${base}${currentSearch || ""}${currentHash || ""}`;
}

export default function CustomNavbar() {
  const [loc, setLoc] = useState<{ pathname: string; search: string; hash: string }>({
    pathname: "/",
    search: "",
    hash: "",
  });

  useEffect(() => {
    setLoc({
      pathname: window.location.pathname || "/",
      search: window.location.search || "",
      hash: window.location.hash || "",
    });
  }, []);

  const currentLocale = useMemo(() => detectLocaleFromPath(loc.pathname), [loc.pathname]);
  const labels = UI_LABELS[currentLocale];

  return (
    <nav className="custom-navbar">
      <div className="custom-navbar__inner">
        {/* Left side: keep your existing links or logo here if you have them */}
        <div className="custom-navbar__left">
          {/* Example placeholder - replace with your actual nav items */}
          {/* <a href="/">Home</a> */}
        </div>

        {/* Right side: language switcher */}
        <div className="custom-navbar__right">
          <div className="language-switcher" aria-label={labels.languageLabel}>
            <span className="language-switcher__label">{labels.languageLabel}</span>
            <ul className="language-switcher__list" role="list">
              {SUPPORTED_LOCALES.map((lang) => {
                const href = buildLocalizedPath(lang, loc.pathname, loc.search, loc.hash);
                const isActive = lang === currentLocale;
                return (
                  <li key={lang} className="language-switcher__item">
                    <a
                      href={href}
                      lang={lang}
                      aria-current={isActive ? "true" : undefined}
                      className={isActive ? "is-active" : undefined}
                    >
                      {labels.languages[lang]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
