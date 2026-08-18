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

function NigeriaFlag() {
  return (
    <svg
      viewBox="0 0 36 24"
      className={styles.flag}
      aria-hidden="true"
    >
      <rect x="0" y="0" width="12" height="24" fill="#008751" />
      <rect x="12" y="0" width="12" height="24" fill="#FFFFFF" />
      <rect x="24" y="0" width="12" height="24" fill="#008751" />
    </svg>
  );
}

function BeninFlag() {
  return (
    <svg
      viewBox="0 0 36 24"
      className={styles.flag}
      aria-hidden="true"
    >
      <rect x="0" y="0" width="14" height="24" fill="#008751" />
      <rect x="14" y="0" width="22" height="12" fill="#FCD116" />
      <rect x="14" y="12" width="22" height="12" fill="#E8112D" />
    </svg>
  );
}

export default function Header({
  language,
  onLanguageChange,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  const selectLanguage = (nextLanguage: Language) => {
    onLanguageChange(nextLanguage);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <header className={styles.header}>
      <Image
        src="/images/cashless-mark.png"
        alt="Cashless"
        width={64}
        height={40}
        priority
        className={styles.headerLogo}
      />

      <div
        ref={selectorRef}
        className={styles.languageSelector}
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
    </header>
  );
}