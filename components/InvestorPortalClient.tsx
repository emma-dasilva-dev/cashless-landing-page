"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InvestorCommercialStats from "@/components/InvestorCommercialStats";
import { BeninFlag, NigeriaFlag } from "@/components/Header";
import { LANGUAGE_STORAGE_KEY, type Language } from "@/components/LandingPage";
import styles from "@/styles/investors.module.css";

const isLanguage = (value: string | null): value is Language => value === "en" || value === "fr";

export default function InvestorPortalClient() {
  const [language, setLanguage] = useState<Language>("en");
  const [ready, setReady] = useState(false);
  useEffect(() => { const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY); if (isLanguage(saved)) setLanguage(saved); setReady(true); }, []);
  const changeLanguage = (nextLanguage: Language) => { setLanguage(nextLanguage); window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage); };
  const activeLanguage = ready ? language : "en";
  return <><header className={styles.header}><Link href="/" className={styles.brandLink} aria-label="Cashless"><Image src="/images/cashless-mark.png" alt="Cashless" width={64} height={40} className={styles.logo} priority /></Link><div className={styles.languageControl} role="group" aria-label={activeLanguage === "fr" ? "Sélecteur de langue" : "Language selector"}><button type="button" className={`${styles.flagButton} ${activeLanguage === "en" ? styles.flagButtonActive : ""}`} onClick={() => changeLanguage("en")} aria-pressed={activeLanguage === "en"} aria-label="Switch to English"><NigeriaFlag className={styles.flag} /></button><button type="button" className={`${styles.flagButton} ${activeLanguage === "fr" ? styles.flagButtonActive : ""}`} onClick={() => changeLanguage("fr")} aria-pressed={activeLanguage === "fr"} aria-label="Passer au français"><BeninFlag className={styles.flag} /></button></div></header><InvestorCommercialStats language={activeLanguage} /></>;
}
