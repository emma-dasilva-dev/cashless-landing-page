"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import FlowArtwork from "@/components/FlowArtwork";
import InvestorAccessForm from "@/components/InvestorAccessForm";
import { BeninFlag, NigeriaFlag } from "@/components/Header";
import type { Language } from "@/components/LandingPage";
import styles from "@/styles/investors.module.css";

const content = {
  en: { back: "Back to Cashless" },
  fr: { back: "Retour à Cashless" },
};

export default function InvestorAccessPage() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = content[language];

  return (
    <main className={styles.page}>
      <FlowArtwork variant="investors" />

      <header className={styles.header}>
        <Link href="/" className={styles.brandLink} aria-label={copy.back}>
          <Image
            src="/images/cashless-mark.png"
            alt="Cashless"
            width={64}
            height={40}
            className={styles.logo}
            priority
          />
        </Link>

        <div className={styles.languageControl} role="group" aria-label="Language selector">
          <button
            type="button"
            className={`${styles.flagButton} ${
              language === "en" ? styles.flagButtonActive : ""
            }`}
            onClick={() => setLanguage("en")}
            aria-pressed={language === "en"}
            aria-label="Switch to English"
          >
            <NigeriaFlag className={styles.flag} />
          </button>

          <button
            type="button"
            className={`${styles.flagButton} ${
              language === "fr" ? styles.flagButtonActive : ""
            }`}
            onClick={() => setLanguage("fr")}
            aria-pressed={language === "fr"}
            aria-label="Passer au français"
          >
            <BeninFlag className={styles.flag} />
          </button>
        </div>
      </header>

      <section className={styles.accessPanel}>
        <InvestorAccessForm language={language} />

        <Link href="/" className={styles.backLink}>
          <HiArrowLeft aria-hidden="true" />
          <span>{copy.back}</span>
        </Link>
      </section>
    </main>
  );
}
