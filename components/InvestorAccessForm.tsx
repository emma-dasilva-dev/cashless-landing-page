"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

import type { Language } from "@/components/LandingPage";
import InternationalPhoneInput from "@/components/InternationalPhoneInput";

import styles from "@/styles/investors.module.css";

type InvestorAccessFormProps = {
  language: Language;
};

type InvestorDetails = {
  fullName: string;
  email: string;
  phoneCountry: CountryCode;
  phoneNumber: string;
};

type ValidationErrorCode =
  | "INVALID_DETAILS"
  | "INVALID_EMAIL"
  | "EMAIL_DOMAIN"
  | "INVALID_PHONE"
  | "";

const INVESTOR_DESTINATION_URL =
  "https://staging.merchant/cashlessflo.com/auth/login";

const MAX_ACCESS_CODE_LENGTH = 64;

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

    continue: "Continue",
    checking: "Checking...",

    verifyEyebrow: "PRIVATE ACCESS",
    verifyTitle: "Verify access",

    verifyDescription:
      "Enter the code provided directly by Cashless.",

    code: "Access code",
    codePlaceholder: "Enter your access code",

    enter: "Continue to registration",
    edit: "Edit information",

    invalidDetails:
      "Please complete your name, email and phone number correctly before proceeding to the access code.",

    invalidEmail:
      "Please enter a valid email address.",

    emailDomain:
      "This email domain does not appear to accept email. Please check the address.",

    invalidPhone:
      "Please enter a valid phone number for the selected country.",

    invalidCode:
      "Please enter the access code provided by Cashless.",

    genericError:
      "Unable to verify your information right now. Please try again.",
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

    continue: "Continuer",
    checking: "Vérification...",

    verifyEyebrow: "ACCÈS PRIVÉ",
    verifyTitle: "Vérifier l’accès",

    verifyDescription:
      "Entrez le code fourni directement par Cashless.",

    code: "Code d’accès",
    codePlaceholder: "Entrez votre code d’accès",

    enter: "Continuer vers l’inscription",
    edit: "Modifier les informations",

    invalidDetails:
      "Veuillez renseigner correctement votre nom, votre email et votre numéro de téléphone avant de passer au code d’accès.",

    invalidEmail:
      "Veuillez saisir une adresse email valide.",

    emailDomain:
      "Le domaine de cette adresse email ne semble pas pouvoir recevoir d’emails. Vérifiez l’adresse.",

    invalidPhone:
      "Veuillez saisir un numéro de téléphone valide pour le pays sélectionné.",

    invalidCode:
      "Veuillez saisir le code d’accès fourni par Cashless.",

    genericError:
      "Impossible de vérifier vos informations pour le moment. Veuillez réessayer.",
  },
};

export default function InvestorAccessForm({
  language,
}: InvestorAccessFormProps) {
  const [step, setStep] =
    useState<"details" | "code">("details");

  const [details, setDetails] = useState<InvestorDetails>({
    fullName: "",
    email: "",
    phoneCountry: "NG",
    phoneNumber: "",
  });

  const [leadId, setLeadId] = useState("");

  const [accessCode, setAccessCode] = useState("");

  const [error, setError] = useState("");

  const [validationError, setValidationError] =
    useState<ValidationErrorCode>("");

  const [codeValidationError, setCodeValidationError] =
    useState(false);

  const [isCheckingDetails, setIsCheckingDetails] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const copy = content[language];

  const parsedPhone = useMemo(
    () =>
      parsePhoneNumberFromString(
        details.phoneNumber,
        details.phoneCountry,
      ),
    [details.phoneCountry, details.phoneNumber],
  );

  const localDetailsValid = useMemo(() => {
    const nameValid =
      details.fullName.trim().length >= 2;

    const emailValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        details.email.trim(),
      );

    const phoneValid = Boolean(
      parsedPhone?.isValid(),
    );

    return {
      nameValid,
      emailValid,
      phoneValid,
    };
  }, [
    details.fullName,
    details.email,
    parsedPhone,
  ]);

  const validationMessage = (() => {
    switch (validationError) {
      case "INVALID_EMAIL":
        return copy.invalidEmail;

      case "EMAIL_DOMAIN":
        return copy.emailDomain;

      case "INVALID_PHONE":
        return copy.invalidPhone;

      case "INVALID_DETAILS":
        return copy.invalidDetails;

      default:
        return "";
    }
  })();

  const handleDetailsSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");
    setValidationError("");
    setCodeValidationError(false);

    if (!localDetailsValid.nameValid) {
      setValidationError("INVALID_DETAILS");
      return;
    }

    if (!localDetailsValid.emailValid) {
      setValidationError("INVALID_EMAIL");
      return;
    }

    if (
      !localDetailsValid.phoneValid ||
      !parsedPhone
    ) {
      setValidationError("INVALID_PHONE");
      return;
    }

    setIsCheckingDetails(true);

    try {
      const response = await fetch(
        "/api/validate-investor-details",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fullName:
              details.fullName.trim(),

            email:
              details.email.trim(),

            phoneCountry:
              details.phoneCountry,

            phoneNumber:
              details.phoneNumber.trim(),

            phone:
              parsedPhone.number,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.ok) {
        if (result?.code === "INVALID_EMAIL") {
          setValidationError("INVALID_EMAIL");
        } else if (
          result?.code === "EMAIL_DOMAIN"
        ) {
          setValidationError("EMAIL_DOMAIN");
        } else if (
          result?.code === "INVALID_PHONE"
        ) {
          setValidationError("INVALID_PHONE");
        } else if (
          result?.code === "INVALID_DETAILS"
        ) {
          setValidationError("INVALID_DETAILS");
        } else {
          setError(copy.genericError);
        }

        return;
      }

      if (
        typeof result?.leadId !== "string" ||
        !result.leadId
      ) {
        setError(copy.genericError);
        return;
      }

      setLeadId(result.leadId);

      setStep("code");
    } catch {
      setError(copy.genericError);
    } finally {
      setIsCheckingDetails(false);
    }
  };

  const handleCodeSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");
    setValidationError("");
    setCodeValidationError(false);

    if (!accessCode.trim()) {
      setCodeValidationError(true);
      return;
    }

    if (!parsedPhone) {
      setValidationError("INVALID_PHONE");
      return;
    }

    if (!leadId) {
      setError(copy.genericError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "/api/investor-access",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fullName:
              details.fullName.trim(),

            email:
              details.email.trim(),

            phone:
              parsedPhone.number,

            accessCode,

            leadId,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setError(
          typeof result?.error === "string"
            ? result.error
            : copy.genericError,
        );

        return;
      }

      window.location.assign(
        INVESTOR_DESTINATION_URL,
      );
    } catch {
      setError(copy.genericError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formShell}>
      <div
        key={step}
        className={styles.stepTransition}
      >
        {step === "details" ? (
          <>
            <div className={styles.headingBlock}>
              <p className={styles.eyebrow}>
                {copy.eyebrow}
              </p>

              <h1 className={styles.title}>
                {copy.title}
              </h1>

              <p className={styles.description}>
                {copy.description}
              </p>
            </div>

            <form
              className={styles.form}
              onSubmit={handleDetailsSubmit}
              noValidate
            >
              <div className={styles.field}>
                <label
                  className={styles.label}
                  htmlFor="full-name"
                >
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
                <label
                  className={styles.label}
                  htmlFor="email"
                >
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
                <span className={styles.label}>
                  {copy.phone} *
                </span>

                <InternationalPhoneInput
                  country={details.phoneCountry}
                  number={details.phoneNumber}
                  language={language}
                  onCountryChange={(phoneCountry) =>
                    setDetails((current) => ({
                      ...current,
                      phoneCountry,
                      phoneNumber: "",
                    }))
                  }
                  onNumberChange={(phoneNumber) =>
                    setDetails((current) => ({
                      ...current,
                      phoneNumber,
                    }))
                  }
                />
              </div>

              <button
                className={styles.submitButton}
                type="submit"
                disabled={isCheckingDetails}
              >
                <span>
                  {isCheckingDetails
                    ? copy.checking
                    : copy.continue}
                </span>

                <HiArrowRight aria-hidden="true" />
              </button>

              {(validationMessage || error) && (
                <p
                  className={styles.statusError}
                  role="alert"
                >
                  {validationMessage || error}
                </p>
              )}
            </form>
          </>
        ) : (
          <>
            <div className={styles.headingBlock}>
              <p className={styles.eyebrow}>
                {copy.verifyEyebrow}
              </p>

              <h1 className={styles.title}>
                {copy.verifyTitle}
              </h1>

              <p className={styles.description}>
                {copy.verifyDescription}
              </p>
            </div>

            <form
              className={styles.form}
              onSubmit={handleCodeSubmit}
              noValidate
            >
              <div className={styles.field}>
                <label
                  className={styles.label}
                  htmlFor="access-code"
                >
                  {copy.code} *
                </label>

                <input
                  id="access-code"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  className={`${styles.input} ${styles.codeInput}`}
                  placeholder={copy.codePlaceholder}
                  value={accessCode}
                  onChange={(event) => {
                    setAccessCode(
                      event.target.value.slice(
                        0,
                        MAX_ACCESS_CODE_LENGTH,
                      ),
                    );

                    setCodeValidationError(false);
                    setError("");
                  }}
                  maxLength={MAX_ACCESS_CODE_LENGTH}
                />
              </div>

              <button
                className={styles.submitButton}
                type="submit"
                disabled={isSubmitting}
              >
                <span>
                  {isSubmitting
                    ? "..."
                    : copy.enter}
                </span>

                <HiArrowRight aria-hidden="true" />
              </button>

              <button
                type="button"
                className={styles.editButton}
                onClick={() => {
                  setError("");
                  setValidationError("");
                  setCodeValidationError(false);
                  setStep("details");
                }}
              >
                <HiArrowLeft aria-hidden="true" />

                <span>
                  {copy.edit}
                </span>
              </button>

              {codeValidationError && (
                <p
                  className={styles.statusError}
                  role="alert"
                >
                  {copy.invalidCode}
                </p>
              )}

              {error && (
                <p
                  className={styles.statusError}
                  role="alert"
                >
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