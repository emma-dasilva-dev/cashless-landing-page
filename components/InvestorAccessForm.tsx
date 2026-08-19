"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import type { Language } from "@/components/LandingPage";
import styles from "@/styles/investors.module.css";

type InvestorAccessFormProps = {
  language: Language;
};

type InvestorDetails = {
  fullName: string;
  email: string;
  phone: string;
};

const content = {
  en: {
    eyebrow: "FOR INVESTORS",
    title: "Investor access",
    description:
      "Enter your details to continue to Cashless investor access.",
    fullName: "Full name",
    fullNamePlaceholder: "Your full name",
    email: "Email",
    emailPlaceholder: "you@example.com",
    phone: "Phone number",
    phonePlaceholder: "+229 00 00 00 00",
    continue: "Continue",
    verifyEyebrow: "PRIVATE ACCESS",
    verifyTitle: "Verify access",
    verifyDescription: "Enter the code provided directly by Cashless.",
    code: "Access code",
    codePlaceholder: "XXXX-XXX-XX",
    enter: "Enter investor space",
    edit: "Edit information",
    invalidDetails: "Please complete your name, email and phone number correctly before proceeding to the access code.",
    genericError: "Unable to verify access right now.",
  },
  fr: {
    eyebrow: "POUR LES INVESTISSEURS",
    title: "Espace investisseurs",
    description:
      "Renseignez vos informations pour continuer vers l’espace investisseurs Cashless.",
    fullName: "Nom complet",
    fullNamePlaceholder: "Votre nom complet",
    email: "Email",
    emailPlaceholder: "vous@exemple.com",
    phone: "Numéro de téléphone",
    phonePlaceholder: "+229 00 00 00 00",
    continue: "Continuer",
    verifyEyebrow: "ACCÈS PRIVÉ",
    verifyTitle: "Vérifier l’accès",
    verifyDescription: "Entrez le code fourni directement par Cashless.",
    code: "Code d’accès",
    codePlaceholder: "XXXX-XXX-XX",
    enter: "Entrer dans l’espace investisseurs",
    edit: "Modifier les informations",
    invalidDetails:
      "Veuillez renseigner correctement votre nom, votre email et votre numéro de téléphone avant de passer au code d’accès.",
    genericError: "Impossible de vérifier l’accès pour le moment.",
  },
};

function formatAccessCode(value: string): string {
  const cleaned = value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 9);

  const first = cleaned.slice(0, 4);
  const second = cleaned.slice(4, 7);
  const third = cleaned.slice(7, 9);

  return [first, second, third].filter(Boolean).join("-");
}

export default function InvestorAccessForm({
  language,
}: InvestorAccessFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<"details" | "code">("details");
  const [details, setDetails] = useState<InvestorDetails>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [detailsValidationError, setDetailsValidationError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copy = content[language];

  const isDetailsValid = useMemo(() => {
    const nameValid = details.fullName.trim().length >= 2;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim());
    const phoneDigits = details.phone.replace(/\D/g, "");
    const phoneValid = phoneDigits.length >= 8 && phoneDigits.length <= 15;

    return nameValid && emailValid && phoneValid;
  }, [details]);

  const handleDetailsSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setDetailsValidationError(false);

    if (!isDetailsValid) {
      setDetailsValidationError(true);
      return;
    }

    setStep("code");
  };

  const handleCodeSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setDetailsValidationError(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/investor-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...details,
          accessCode,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setError(
          typeof result?.error === "string" ? result.error : copy.genericError,
        );
        return;
      }

      router.push("/investors/portal");
      router.refresh();
    } catch {
      setError(copy.genericError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formShell}>
      <div key={step} className={styles.stepTransition}>
        {step === "details" ? (
          <>
            <div className={styles.headingBlock}>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1 className={styles.title}>{copy.title}</h1>
              <p className={styles.description}>{copy.description}</p>
            </div>

            <form className={styles.form} onSubmit={handleDetailsSubmit} noValidate>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="full-name">
                  {copy.fullName} *
                </label>
                <input
                  id="full-name"
                  type="text"
                  autoComplete="name"
                  className={styles.input}
                  placeholder={copy.fullNamePlaceholder}
                  value={details.fullName}
                  onChange={(event) =>
                    setDetails((current) => ({
                      ...current,
                      fullName: event.target.value,
                    }))
                  }
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">
                  {copy.email} *
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={styles.input}
                  placeholder={copy.emailPlaceholder}
                  value={details.email}
                  onChange={(event) =>
                    setDetails((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="phone">
                  {copy.phone} *
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className={styles.input}
                  placeholder={copy.phonePlaceholder}
                  value={details.phone}
                  onChange={(event) =>
                    setDetails((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                />
              </div>

              <button className={styles.submitButton} type="submit">
                <span>{copy.continue}</span>
                <HiArrowRight aria-hidden="true" />
              </button>

              {(detailsValidationError || error) && (
                <p className={styles.statusError} role="alert">
                  {detailsValidationError ? copy.invalidDetails : error}
                </p>
              )}
            </form>
          </>
        ) : (
          <>
            <div className={styles.headingBlock}>
              <p className={styles.eyebrow}>{copy.verifyEyebrow}</p>
              <h1 className={styles.title}>{copy.verifyTitle}</h1>
              <p className={styles.description}>{copy.verifyDescription}</p>
            </div>

            <form className={styles.form} onSubmit={handleCodeSubmit}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="access-code">
                  {copy.code} *
                </label>
                <input
                  id="access-code"
                  type="text"
                  inputMode="text"
                  autoCapitalize="characters"
                  autoComplete="off"
                  spellCheck={false}
                  className={`${styles.input} ${styles.codeInput}`}
                  placeholder={copy.codePlaceholder}
                  value={accessCode}
                  onChange={(event) =>
                    setAccessCode(formatAccessCode(event.target.value))
                  }
                  maxLength={11}
                  required
                />
              </div>

              <button
                className={styles.submitButton}
                type="submit"
                disabled={isSubmitting || accessCode.length !== 11}
              >
                <span>{isSubmitting ? "..." : copy.enter}</span>
                <HiArrowRight aria-hidden="true" />
              </button>

              <button
                type="button"
                className={styles.editButton}
                onClick={() => {
                  setError("");
                  setStep("details");
                }}
              >
                <HiArrowLeft aria-hidden="true" />
                <span>{copy.edit}</span>
              </button>

              {error && (
                <p className={styles.statusError} role="alert">
                  {error}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
