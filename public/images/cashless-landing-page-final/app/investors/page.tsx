import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import InvestorAccessForm from "@/components/InvestorAccessForm";
import styles from "@/styles/investors.module.css";

export default function InvestorsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" aria-label="Back to Cashless">
          <Image src="/images/cashless-mark.png" alt="Cashless" width={64} height={40} className={styles.logo} />
        </Link>
      </header>

      <section className={styles.accessPanel}>
        <p className={styles.eyebrow}>FOR INVESTORS</p>
        <h1 className={styles.title}>Investor access</h1>
        <p className={styles.description}>Access information and resources prepared for Cashless investors.</p>
        <InvestorAccessForm />
        <Link href="/" className={styles.backLink}>
          <HiArrowLeft aria-hidden="true" />
          <span>Back to Cashless</span>
        </Link>
      </section>
    </main>
  );
}
