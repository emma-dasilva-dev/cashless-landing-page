"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import { HiArrowLeft } from "react-icons/hi2";

import InvestorAccessForm from "@/components/InvestorAccessForm";

import {
  BeninFlag,
  NigeriaFlag,
} from "@/components/Header";

import {
  LANGUAGE_STORAGE_KEY,
  type Language,
} from "@/components/LandingPage";

import styles from "@/styles/investors.module.css";

const content = {
  en: {
    back: "Back to Cashless",
    languageLabel: "Language selector",
  },

  fr: {
    back: "Retour à Cashless",
    languageLabel:
      "Sélecteur de langue",
  },
};

function isLanguage(
  value: string | null,
): value is Language {
  return (
    value === "en" ||
    value === "fr"
  );
}

export default function InvestorAccessPage() {
  const [language, setLanguage] =
    useState<Language>("en");

  const [languageReady, setLanguageReady] =
    useState(false);

  useEffect(() => {
    const savedLanguage =
      window.localStorage.getItem(
        LANGUAGE_STORAGE_KEY,
      );

    if (isLanguage(savedLanguage)) {
      setLanguage(savedLanguage);
    }

    setLanguageReady(true);
  }, []);

  const handleLanguageChange = (
    nextLanguage: Language,
  ) => {
    setLanguage(nextLanguage);

    window.localStorage.setItem(
      LANGUAGE_STORAGE_KEY,
      nextLanguage,
    );
  };

  const activeLanguage =
    languageReady
      ? language
      : "en";

  const copy =
    content[activeLanguage];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link
          href="/"
          className={styles.brandLink}
          aria-label={copy.back}
        >
          <Image
            src="/images/cashless-mark.png"
            alt="Cashless"
            width={64}
            height={40}
            className={styles.logo}
            priority
          />
        </Link>

        <div
          className={
            styles.languageControl
          }
          role="group"
          aria-label={
            copy.languageLabel
          }
        >
          <button
            type="button"
            className={`${styles.flagButton} ${
              activeLanguage === "en"
                ? styles.flagButtonActive
                : ""
            }`}
            onClick={() =>
              handleLanguageChange("en")
            }
            aria-pressed={
              activeLanguage === "en"
            }
            aria-label="Switch to English"
          >
            <NigeriaFlag
              className={styles.flag}
            />
          </button>

          <button
            type="button"
            className={`${styles.flagButton} ${
              activeLanguage === "fr"
                ? styles.flagButtonActive
                : ""
            }`}
            onClick={() =>
              handleLanguageChange("fr")
            }
            aria-pressed={
              activeLanguage === "fr"
            }
            aria-label="Passer au français"
          >
            <BeninFlag
              className={styles.flag}
            />
          </button>
        </div>
      </header>

      <section
        className={styles.accessPanel}
      >
        <InvestorAccessForm
          language={activeLanguage}
        />

        <Link
          href="/"
          className={styles.backLink}
        >
          <HiArrowLeft
            aria-hidden="true"
          />

          <span>{copy.back}</span>
        </Link>
      </section>
    </main>
  );
}