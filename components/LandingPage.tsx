"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import styles from "@/styles/landing.module.css";
import { useState } from "react";

export type Language = "en" | "fr";

export default function LandingPage() {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <main className={styles.page}

    >
      {/* <FlowArtwork variant="landing" /> */}
      {/* <div className={styles.bcg} /> */}
      <Header language={language} onLanguageChange={setLanguage} />
      <Hero language={language} />
    </main>
  );
}
