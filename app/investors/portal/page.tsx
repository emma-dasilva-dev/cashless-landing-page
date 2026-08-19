import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/investors.module.css";

export default function InvestorPortalPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/">
          <Image
            src="/images/cashless-mark.png"
            alt="Cashless"
            width={64}
            height={40}
            className={styles.logo}
          />
        </Link>
      </header>

      <section className={styles.portalPlaceholder}>
        <p className={styles.eyebrow}>CASHLESS INVESTORS</p>
        <h1 className={styles.title}>Investor resources</h1>
        <p className={styles.description}>
          This page is ready for the investor data and resources Cashless will provide.
        </p>
      </section>
    </main>
  );
}
