import Image from "next/image";
import styles from "@/styles/landing.module.css";

export default function CashlessMotion() {
  return (
    <div className={styles.motionArea} aria-label="Cashless visual">
      <div className={styles.motionLineTop}>
        <span className={styles.motionDot} />
      </div>

      <Image
        src="/images/cashless-logo.png"
        alt="Cashless"
        width={460}
        height={160}
        priority
        className={styles.motionLogo}
      />

      <div className={styles.motionLineBottom}>
        <span className={styles.motionDot} />
      </div>
    </div>
  );
}