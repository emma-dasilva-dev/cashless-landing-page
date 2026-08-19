"use client";

import { FormEvent, useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import type { Language } from "@/components/LandingPage";
import styles from "@/styles/investors.module.css";

type InvestorAccessFormProps = { language: Language };

const copy = {
  en: {
    label: "Access code",
    placeholder: "Enter your access code",
    submit: "Continue",
    pending: "Code verification will be connected after Cashless approves the access method.",
  },
  fr: {
    label: "Code d’accès",
    placeholder: "Entrez votre code d’accès",
    submit: "Continuer",
    pending: "La vérification du code sera connectée après validation du mode d’accès par Cashless.",
  },
};

export default function InvestorAccessForm({ language }: InvestorAccessFormProps) {
  const [message, setMessage] = useState("");
  const content = copy[language];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(content.pending);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="investor-code">{content.label}</label>
      <input
        id="investor-code"
        name="investor-code"
        type="password"
        autoComplete="off"
        className={styles.input}
        placeholder={content.placeholder}
        required
      />
      <button className={styles.submitButton} type="submit">
        <span>{content.submit}</span>
        <HiArrowRight aria-hidden="true" />
      </button>
      {message && <p className={styles.status} role="status">{message}</p>}
    </form>
  );
}
