import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FlowArtwork from "@/components/FlowArtwork";
import InvestorPortalClient from "@/components/InvestorPortalClient";
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

      <InvestorPortalClient />
    </main>
  );
}
