"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import InvestorAccessForm from "@/components/InvestorAccessForm";
import { NigeriaFlag, BeninFlag } from "@/components/Header";
import type { Language } from "@/components/LandingPage";
import styles from "@/styles/investors.module.css";

const content = {
  en: {
    eyebrow: "FOR INVESTORS",
    title: "Investor access",
    description: "Access information and resources prepared for Cashless investors.",
    back: "Back to Cashless",
  },
  fr: {
    eyebrow: "POUR LES INVESTISSEURS",
    title: "Espace investisseurs",
    description: "Accédez aux informations et ressources préparées pour les investisseurs Cashless.",
    back: "Retour à Cashless",
  },
};

export default function InvestorAccessPage() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = content[language];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brandLink} aria-label={copy.back}>
          <Image
            src="/images/cashless-mark.png"
            alt="Cashless"
            width={64}
            height={40}
            className={styles.logo}
          />
        </Link>

        <div className={styles.languageControl} aria-label="Language selector">
          <button
            type="button"
            className={`${styles.flagButton} ${language === "en" ? styles.flagButtonActive : ""}`}
            onClick={() => setLanguage("en")}
            aria-pressed={language === "en"}
            aria-label="Switch to English"
          >
            <NigeriaFlag className={styles.flag} />
          </button>
          <button
            type="button"
            className={`${styles.flagButton} ${language === "fr" ? styles.flagButtonActive : ""}`}
            onClick={() => setLanguage("fr")}
            aria-pressed={language === "fr"}
            aria-label="Passer au français"
          >
            <BeninFlag className={styles.flag} />
          </button>
        </div>
      </header>

      <section className={styles.accessPanel}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h1 className={styles.title}>{copy.title}</h1>
        <p className={styles.description}>{copy.description}</p>
        <InvestorAccessForm language={language} />
        <Link href="/" className={styles.backLink}>
          <HiArrowLeft aria-hidden="true" />
          <span>{copy.back}</span>
        </Link>
      </section>
    </main>
  );
}
