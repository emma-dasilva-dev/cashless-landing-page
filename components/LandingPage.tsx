"use client";

import { useState } from "react";
import FlowArtwork from "@/components/FlowArtwork";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import styles from "@/styles/landing.module.css";

export type Language = "en" | "fr";

export default function LandingPage() {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <main className={styles.page}>
      <FlowArtwork variant="landing" />
      <Header language={language} onLanguageChange={setLanguage} />
      <Hero language={language} />
    </main>
  );
}
