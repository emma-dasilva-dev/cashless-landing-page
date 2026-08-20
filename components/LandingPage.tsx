"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import Hero from "@/components/Hero";

import styles from "@/styles/landing.module.css";

export type Language = "en" | "fr";

export const LANGUAGE_STORAGE_KEY = "cashless-language";

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "fr";
}

export default function LandingPage() {
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

  return (
    <main className={styles.page}>
      <Header
        language={language}
        onLanguageChange={
          handleLanguageChange
        }
      />

      <Hero
        language={
          languageReady
            ? language
            : "en"
        }
      />
    </main>
  );
}