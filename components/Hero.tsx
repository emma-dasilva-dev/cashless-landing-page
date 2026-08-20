import Link from "next/link";

import {
  FaApple,
  FaFacebookF,
  FaGooglePlay,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";

import {
  HiArrowUpRight,
  HiGlobeAlt,
  HiUserGroup,
} from "react-icons/hi2";

import LogoAnimation from "@/components/LogoAnimation";

import type {
  Language,
} from "@/components/LandingPage";

import styles from "@/styles/landing.module.css";

import actionStyles from "@/styles/heroSecondaryActions.module.css";

type HeroProps = {
  language: Language;
};

const APP_STORE_URL =
  "https://apps.apple.com/fr/app/cashless-africa/id6758164587";

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.cashlessapp.africa&pcampaignid=web_share";

const CASHLESS_WEBSITE_URL =
  "https://cashless.africa/fr";

const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61576438792271";

const INSTAGRAM_URL =
  "https://www.instagram.com/cashless.africa?igsh=MTk2eXlnZGdhMHF2ZQ%3D%3D&utm_source=qr&wa_status_inline=true";

const TIKTOK_URL =
  "https://www.tiktok.com/@cashless.africa?_r=1&_t=ZS-94x5FGuEEhY";

const LINKEDIN_URL =
  "https://www.linkedin.com/company/cashlessafrica";

const copy = {
  en: {
    title:
      "MONEY, MADE FOR AFRICA.",

    body:
      "Manage your money with Cashless, wherever you are.",

    appStoreSmall:
      "Download on the",

    appStoreLarge:
      "App Store",

    playStoreSmall:
      "Get it on",

    playStoreLarge:
      "Google Play",

    websiteSmall:
      "Explore Cashless",

    websiteLarge:
      "Visit our website",

    investorSmall:
      "For investors",

    investorLarge:
      "Investor access",

    socialLabel:
      "Follow Cashless on social media",
  },

  fr: {
    title:
      "L’ARGENT, PENSÉ POUR L’AFRIQUE.",

    body:
      "Gérez votre argent avec Cashless, où que vous soyez.",

    appStoreSmall:
      "Télécharger sur",

    appStoreLarge:
      "App Store",

    playStoreSmall:
      "Disponible sur",

    playStoreLarge:
      "Google Play",

    websiteSmall:
      "Découvrir Cashless",

    websiteLarge:
      "Visiter notre site",

    investorSmall:
      "Investisseurs",

    investorLarge:
      "Espace investisseurs",

    socialLabel:
      "Suivez Cashless sur les réseaux sociaux",
  },
};

export default function Hero({
  language,
}: HeroProps) {
  const content =
    copy[language];

  return (
    <section className={styles.hero}>
      <div
        className={
          styles.animationReveal
        }
      >
        <LogoAnimation />
      </div>

      <div
        className={styles.heroCopy}
      >
        <h1
          className={`${styles.heroTitle} ${
            language === "fr"
              ? styles.heroTitleFrench
              : ""
          }`}
        >
          {content.title}
        </h1>

        <p
          className={
            styles.heroDescription
          }
        >
          {content.body}
        </p>
      </div>

      <div
        className={styles.heroActions}
      >
        {/* ROW 1 — APP STORE + GOOGLE PLAY */}
        <div
          className={styles.storeLinks}
        >
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.storeButton} ${styles.storeButtonOne}`}
          >
            <FaApple
              className={
                styles.storeIcon
              }
              aria-hidden="true"
            />

            <span
              className={
                styles.storeLabel
              }
            >
              <small>
                {
                  content.appStoreSmall
                }
              </small>

              <strong>
                {
                  content.appStoreLarge
                }
              </strong>
            </span>

            <HiArrowUpRight
              className={
                styles.storeArrow
              }
              aria-hidden="true"
            />
          </a>

          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.storeButton} ${styles.storeButtonTwo}`}
          >
            <FaGooglePlay
              className={
                styles.storeIcon
              }
              aria-hidden="true"
            />

            <span
              className={
                styles.storeLabel
              }
            >
              <small>
                {
                  content.playStoreSmall
                }
              </small>

              <strong>
                {
                  content.playStoreLarge
                }
              </strong>
            </span>

            <HiArrowUpRight
              className={
                styles.storeArrow
              }
              aria-hidden="true"
            />
          </a>
        </div>

        {/* ROW 2 — WEBSITE + INVESTORS */}
        <div
          className={
            actionStyles.secondaryActions
          }
        >
          <a
            href={
              CASHLESS_WEBSITE_URL
            }
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.storeButton} ${actionStyles.secondaryButton} ${actionStyles.websiteButton}`}
          >
            <HiGlobeAlt
              className={
                styles.storeIcon
              }
              aria-hidden="true"
            />

            <span
              className={
                styles.storeLabel
              }
            >
              <small>
                {
                  content.websiteSmall
                }
              </small>

              <strong>
                {
                  content.websiteLarge
                }
              </strong>
            </span>

            <HiArrowUpRight
              className={
                styles.storeArrow
              }
              aria-hidden="true"
            />
          </a>

          <Link
            href="/investors"
            className={`${styles.storeButton} ${actionStyles.secondaryButton} ${actionStyles.investorButton}`}
          >
            <HiUserGroup
              className={
                styles.storeIcon
              }
              aria-hidden="true"
            />

            <span
              className={
                styles.storeLabel
              }
            >
              <small>
                {
                  content.investorSmall
                }
              </small>

              <strong>
                {
                  content.investorLarge
                }
              </strong>
            </span>

            <HiArrowUpRight
              className={
                styles.storeArrow
              }
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* SOCIAL MEDIA */}
        <div
          className={
            actionStyles.socialLinks
          }
          aria-label={
            content.socialLabel
          }
        >
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={
              actionStyles.socialLink
            }
            aria-label="Facebook"
          >
            <FaFacebookF
              aria-hidden="true"
            />
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={
              actionStyles.socialLink
            }
            aria-label="Instagram"
          >
            <FaInstagram
              aria-hidden="true"
            />
          </a>

          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={
              actionStyles.socialLink
            }
            aria-label="TikTok"
          >
            <FaTiktok
              aria-hidden="true"
            />
          </a>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={
              actionStyles.socialLink
            }
            aria-label="LinkedIn"
          >
            <FaLinkedinIn
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}