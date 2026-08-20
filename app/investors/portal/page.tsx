import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FlowArtwork from "@/components/FlowArtwork";
import InvestorCommercialStats from "@/components/InvestorCommercialStats";
import {
  INVESTOR_COOKIE_NAME,
  verifyInvestorSessionToken,
} from "@/lib/investorAuth";
import styles from "@/styles/investors.module.css";

export default async function InvestorPortalPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(INVESTOR_COOKIE_NAME)?.value;

  if (!verifyInvestorSessionToken(session)) {
    redirect("/investors");
  }

  return (
    <main className={`${styles.page} ${styles.investorPortal}`}>
      <FlowArtwork variant="investors" />

      <header className={styles.header}>
        <Link href="/" className={styles.brandLink}>
          <Image
            src="/images/cashless-mark.png"
            alt="Cashless"
            width={64}
            height={40}
            className={styles.logo}
            priority
          />
        </Link>
      </header>

      <InvestorCommercialStats />
    </main>
  );
}
