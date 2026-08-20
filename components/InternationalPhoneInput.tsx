"use client";

import {
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js";
import styles from "@/styles/internationalPhoneInput.module.css";

type InternationalPhoneInputProps = {
  country: CountryCode;
  number: string;
  language: "en" | "fr";
  onCountryChange: (country: CountryCode) => void;
  onNumberChange: (number: string) => void;
};

const countryNames = {
  en: new Intl.DisplayNames(["en"], { type: "region" }),
  fr: new Intl.DisplayNames(["fr"], { type: "region" }),
};

const countries = getCountries();

export default function InternationalPhoneInput({
  country,
  number,
  language,
  onCountryChange,
  onNumberChange,
}: InternationalPhoneInputProps) {
  return (
    <div className={styles.wrapper}>
      <select
        className={styles.countrySelect}
        value={country}
        onChange={(event) =>
          onCountryChange(event.target.value as CountryCode)
        }
        aria-label={
          language === "fr" ? "Choisir le pays" : "Choose country"
        }
      >
        {countries.map((countryCode) => {
          const name =
            countryNames[language].of(countryCode) ?? countryCode;
          const callingCode = getCountryCallingCode(countryCode);

          return (
            <option key={countryCode} value={countryCode}>
              {name} (+{callingCode})
            </option>
          );
        })}
      </select>

      <div className={styles.numberWrap}>
        <span className={styles.callingCode}>
          +{getCountryCallingCode(country)}
        </span>

        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          className={styles.numberInput}
          value={number}
          onChange={(event) => onNumberChange(event.target.value)}
          placeholder={
            language === "fr"
              ? "Numéro de téléphone"
              : "Phone number"
          }
          aria-label={
            language === "fr"
              ? "Numéro de téléphone"
              : "Phone number"
          }
        />
      </div>
    </div>
  );
}
