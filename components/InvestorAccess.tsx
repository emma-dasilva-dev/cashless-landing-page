import { HiArrowRight } from "react-icons/hi2";
import type { Language } from "@/components/LandingPage";
import styles from "@/styles/landing.module.css";

type InvestorAccessProps = {
  language: Language;
};

const investorContent = {
  en: {
    label: "FOR INVESTORS",
    description:
      "Access information and resources for Cashless investors.",
    action: "Enter access code",
  },

  fr: {
    label: "POUR LES INVESTISSEURS",
    description:
      "Accédez aux informations et ressources destinées aux investisseurs Cashless.",
    action: "Entrer le code d’accès",
  },
};

export default function InvestorAccess({
  language,
}: InvestorAccessProps) {
  const content = investorContent[language];

  return (
    <section className={styles.investorSection}>
      <div className={styles.investorCopy}>
        <p className={styles.investorLabel}>
          {content.label}
        </p>

        <p className={styles.investorDescription}>
          {content.description}
        </p>
      </div>

      <button
        type="button"
        className={styles.investorButton}
      >
        {content.action}

        <HiArrowRight aria-hidden="true" />
      </button>
    </section>
  );
}