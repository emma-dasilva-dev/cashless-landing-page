"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function InvestorPortalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error("Investor portal error", error);
  }, [error]);

  return (
    <main className="investor-error-boundary">
      <section>
        <p>CASHLESS INVESTORS</p>
        <h1>Impossible d’afficher le portail</h1>
        <span>
          Une erreur temporaire est survenue pendant le chargement de vos statistiques.
        </span>
        <div>
          <button type="button" onClick={reset}>Réessayer</button>
          <Link href="/investors">Retour à l’accès investor</Link>
        </div>
      </section>
    </main>
  );
}
