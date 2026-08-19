"use client";

import { FormEvent, useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import styles from "@/styles/investors.module.css";

export default function InvestorAccessForm() {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Code verification will be connected after Cashless approves the access method.");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="investor-code">Access code</label>
      <input
        id="investor-code"
        name="investor-code"
        type="password"
        autoComplete="off"
        className={styles.input}
        placeholder="Enter your access code"
        required
      />
      <button className={styles.submitButton} type="submit">
        <span>Continue</span>
        <HiArrowRight aria-hidden="true" />
      </button>
      {message && <p className={styles.status} role="status">{message}</p>}
    </form>
  );
}
