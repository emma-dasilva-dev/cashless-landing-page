import { FaApple, FaGooglePlay } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import CashlessMotion from "@/components/CashlessMotion";
import type { Language } from "@/components/LandingPage";
import styles from "@/styles/landing.module.css";

type HeroProps = {
  language: Language;
};

const APP_STORE_URL =
  "https://apps.apple.com/fr/app/cashless-africa/id6758164587";

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.cashlessapp.africa&pcampaignid=web_share";

export default function Hero({ language }: HeroProps) {
  const content =
    language === "en"
      ? {
          welcome: "WELCOME TO",
          description:
            "The fintech built by Africa, for Africa and its diaspora.",
          appStoreSmall: "Download on the",
          appStoreLarge: "App Store",
          playStoreSmall: "Get it on",
          playStoreLarge: "Google Play",
        }
      : {
          welcome: "BIENVENUE",
          description:
            "La fintech pensée par l’Afrique, pour l’Afrique et sa diaspora.",
          appStoreSmall: "Télécharger sur",
          appStoreLarge: "App Store",
          playStoreSmall: "Disponible sur",
          playStoreLarge: "Google Play",
        };

  return (
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <h1 className={styles.welcomeTitle}>{content.welcome}</h1>

        <p className={styles.heroDescription}>{content.description}</p>

        <div className={styles.storeLinks}>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.storeButton}
          >
            <FaApple className={styles.storeIcon} aria-hidden="true" />

            <span className={styles.storeLabel}>
              <small>{content.appStoreSmall}</small>
              <strong>{content.appStoreLarge}</strong>
            </span>

            <HiArrowUpRight
              className={styles.storeArrow}
              aria-hidden="true"
            />
          </a>

          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.storeButton}
          >
            <FaGooglePlay className={styles.storeIcon} aria-hidden="true" />

            <span className={styles.storeLabel}>
              <small>{content.playStoreSmall}</small>
              <strong>{content.playStoreLarge}</strong>
            </span>

            <HiArrowUpRight
              className={styles.storeArrow}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      <CashlessMotion />
    </section>
  );
}