import Link from "next/link";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { HiArrowRight, HiArrowUpRight } from "react-icons/hi2";
import LogoAnimation from "@/components/LogoAnimation";
import type { Language } from "@/components/LandingPage";
import styles from "@/styles/landing.module.css";

type HeroProps = { language: Language };

const APP_STORE_URL = "https://apps.apple.com/fr/app/cashless-africa/id6758164587";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.cashlessapp.africa&pcampaignid=web_share";

const copy = {
  en: {
    title: "MONEY, MADE FOR AFRICA.",
    body: "Send, spend and manage your money with Cashless, wherever life takes you.",
    appStoreSmall: "Download on the",
    appStoreLarge: "App Store",
    playStoreSmall: "Get it on",
    playStoreLarge: "Google Play",
    investor: "Investor access",
  },
  fr: {
    title: "L’ARGENT, PENSÉ POUR L’AFRIQUE.",
    body: "Envoyez, dépensez et gérez votre argent avec Cashless, où que la vie vous mène.",
    appStoreSmall: "Télécharger sur",
    appStoreLarge: "App Store",
    playStoreSmall: "Disponible sur",
    playStoreLarge: "Google Play",
    investor: "Espace investisseurs",
  },
};

export default function Hero({ language }: HeroProps) {
  const content = copy[language];

  return (
    <section className={styles.hero}>
      <div className={styles.animationReveal}>
        <LogoAnimation />
      </div>

      <div className={styles.heroCopy}>
        <h1 className={styles.heroTitle}>{content.title}</h1>
        <p className={styles.heroDescription}>{content.body}</p>
      </div>

      <div className={styles.heroActions}>
        <div className={styles.storeLinks}>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={`${styles.storeButton} ${styles.storeButtonOne}`}>
            <FaApple className={styles.storeIcon} aria-hidden="true" />
            <span className={styles.storeLabel}>
              <small>{content.appStoreSmall}</small>
              <strong>{content.appStoreLarge}</strong>
            </span>
            <HiArrowUpRight className={styles.storeArrow} aria-hidden="true" />
          </a>

          <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className={`${styles.storeButton} ${styles.storeButtonTwo}`}>
            <FaGooglePlay className={styles.storeIcon} aria-hidden="true" />
            <span className={styles.storeLabel}>
              <small>{content.playStoreSmall}</small>
              <strong>{content.playStoreLarge}</strong>
            </span>
            <HiArrowUpRight className={styles.storeArrow} aria-hidden="true" />
          </a>
        </div>

        <Link href="/investors" className={styles.investorLink}>
          <span>{content.investor}</span>
          <HiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
