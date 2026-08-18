"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InvestorAccess from "@/components/InvestorAccess";
import styles from "@/styles/landing.module.css";

export type Language = "en" | "fr";

export default function LandingPage() {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <main className={styles.page}>
      <Header
        language={language}
        onLanguageChange={setLanguage}
      />

      <div className={styles.content}>
        <Hero language={language} />

        <InvestorAccess language={language} />
      </div>
    </main>
  );
}