"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HiChevronDown } from "react-icons/hi2";
import type { Language } from "@/components/LandingPage";
import styles from "@/styles/landing.module.css";

type HeaderProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
};

export function NigeriaFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" className={className ?? styles.flag} aria-hidden="true" focusable="false">
      <rect x="0" width="12" height="24" fill="#008751" />
      <rect x="12" width="12" height="24" fill="#ffffff" />
      <rect x="24" width="12" height="24" fill="#008751" />
    </svg>
  );
}

export function BeninFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" className={className ?? styles.flag} aria-hidden="true" focusable="false">
      <rect x="0" width="14" height="24" fill="#008751" />
      <rect x="14" y="0" width="22" height="12" fill="#FCD116" />
      <rect x="14" y="12" width="22" height="12" fill="#E8112D" />
    </svg>
  );
}

export default function Header({ language, onLanguageChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, []);

  const selectLanguage = (nextLanguage: Language) => {
    onLanguageChange(nextLanguage);
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerBrand}>
        <Image
          src="/images/cashless-mark.png"
          alt="Cashless"
          width={64}
          height={40}
          priority
          className={styles.headerLogo}
        />
      </div>

      <div ref={selectorRef} className={styles.desktopLanguageSelector}>
        <button
          type="button"
          className={styles.desktopLanguageButton}
          onClick={() => setIsOpen((current) => !current)}
          aria-label="Change language"
          aria-expanded={isOpen}
        >
          {language === "en" ? <NigeriaFlag /> : <BeninFlag />}
          <HiChevronDown
            aria-hidden="true"
            className={`${styles.languageChevron} ${isOpen ? styles.languageChevronOpen : ""}`}
          />
        </button>

        {isOpen && (
          <div className={styles.languageMenu}>
            <button type="button" className={styles.languageOption} onClick={() => selectLanguage("en")}>
              <NigeriaFlag />
              <span>English</span>
            </button>
            <button type="button" className={styles.languageOption} onClick={() => selectLanguage("fr")}>
              <BeninFlag />
              <span>Français</span>
            </button>
          </div>
        )}
      </div>

      <div className={styles.mobileLanguageControl} aria-label="Language selector">
        <button
          type="button"
          className={`${styles.mobileFlagButton} ${language === "en" ? styles.mobileFlagButtonActive : ""}`}
          onClick={() => onLanguageChange("en")}
          aria-label="Switch to English"
          aria-pressed={language === "en"}
        >
          <NigeriaFlag />
        </button>
        <button
          type="button"
          className={`${styles.mobileFlagButton} ${language === "fr" ? styles.mobileFlagButtonActive : ""}`}
          onClick={() => onLanguageChange("fr")}
          aria-label="Passer au français"
          aria-pressed={language === "fr"}
        >
          <BeninFlag />
        </button>
      </div>
    </header>
  );
}
