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

const content = {
  en: {
    lineOne: "BUILT BY AFRICA,",
    lineTwo: "FOR AFRICA AND ITS DIASPORA.",
    appStoreSmall: "Download on the",
    appStoreLarge: "App Store",
    playStoreSmall: "Get it on",
    playStoreLarge: "Google Play",
  },

  fr: {
    lineOne: "CONÇUE PAR L’AFRIQUE,",
    lineTwo: "POUR L’AFRIQUE ET SA DIASPORA.",
    appStoreSmall: "Télécharger sur",
    appStoreLarge: "App Store",
    playStoreSmall: "Disponible sur",
    playStoreLarge: "Google Play",
  },
};

export default function Hero({ language }: HeroProps) {
  const copy = content[language];

  return (
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleLineOne}>
            {copy.lineOne}
          </span>

          <span className={styles.heroTitleLineTwo}>
            {copy.lineTwo}
          </span>
        </h1>

        <div className={styles.storeLinks}>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.storeButton} ${styles.storeButtonFirst}`}
          >
            <FaApple
              className={styles.storeIcon}
              aria-hidden="true"
            />

            <span className={styles.storeLabel}>
              <small>{copy.appStoreSmall}</small>
              <strong>{copy.appStoreLarge}</strong>
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
            className={`${styles.storeButton} ${styles.storeButtonSecond}`}
          >
            <FaGooglePlay
              className={styles.storeIcon}
              aria-hidden="true"
            />

            <span className={styles.storeLabel}>
              <small>{copy.playStoreSmall}</small>
              <strong>{copy.playStoreLarge}</strong>
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