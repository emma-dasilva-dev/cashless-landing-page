"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HiChevronDown } from "react-icons/hi2";
import AfricaMark from "@/components/AfricaMark";
import type { Language } from "@/components/LandingPage";
import styles from "@/styles/landing.module.css";

type HeaderProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
};

function NigeriaFlag() {
  return (
    <svg
      viewBox="0 0 36 24"
      className={styles.flag}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="12" height="24" x="0" fill="#008751" />
      <rect width="12" height="24" x="12" fill="#ffffff" />
      <rect width="12" height="24" x="24" fill="#008751" />
    </svg>
  );
}

function BeninFlag() {
  return (
    <svg
      viewBox="0 0 36 24"
      className={styles.flag}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="14" height="24" x="0" fill="#008751" />
      <rect width="22" height="12" x="14" y="0" fill="#FCD116" />
      <rect width="22" height="12" x="14" y="12" fill="#E8112D" />
    </svg>
  );
}

export default function Header({
  language,
  onLanguageChange,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsidePointer = (event: PointerEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointer);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsidePointer,
      );
    };
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

      <div className={styles.desktopHeaderControls}>
        <div
          ref={selectorRef}
          className={styles.desktopLanguageSelector}
        >
          <button
            type="button"
            className={styles.languageButton}
            onClick={() => setIsOpen((current) => !current)}
            aria-label="Change language"
            aria-expanded={isOpen}
          >
            {language === "en" ? <NigeriaFlag /> : <BeninFlag />}

            <HiChevronDown
              className={`${styles.languageChevron} ${
                isOpen ? styles.languageChevronOpen : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {isOpen && (
            <div className={styles.languageMenu}>
              <button
                type="button"
                className={styles.languageOption}
                onClick={() => selectLanguage("en")}
              >
                <NigeriaFlag />
                <span>English</span>
              </button>

              <button
                type="button"
                className={styles.languageOption}
                onClick={() => selectLanguage("fr")}
              >
                <BeninFlag />
                <span>Français</span>
              </button>
            </div>
          )}
        </div>

        <AfricaMark className={styles.africaMark} />
      </div>

      <div className={styles.mobileLanguageControl}>
        <button
          type="button"
          className={`${styles.mobileFlagButton} ${
            language === "en"
              ? styles.mobileFlagButtonActive
              : ""
          }`}
          onClick={() => onLanguageChange("en")}
          aria-label="Switch to English"
          aria-pressed={language === "en"}
        >
          <NigeriaFlag />
        </button>

        <button
          type="button"
          className={`${styles.mobileFlagButton} ${
            language === "fr"
              ? styles.mobileFlagButtonActive
              : ""
          }`}
          onClick={() => onLanguageChange("fr")}
          aria-label="Passer au français"
          aria-pressed={language === "fr"}
        >
          <BeninFlag />
        </button>
      </div>

      <AfricaMark className={styles.mobileAfricaMark} />
    </header>
  );
}