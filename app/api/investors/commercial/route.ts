import { NextRequest, NextResponse } from "next/server";

import { INVESTOR_COOKIE_NAME, readInvestorSessionToken } from "@/lib/investorAuth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const session = readInvestorSessionToken(request.cookies.get(INVESTOR_COOKIE_NAME)?.value);
  if (!session) return NextResponse.json({ ok: false, error: "Session expirée." }, { status: 401 });

  const backendUrl = process.env.CASHLESS_ADMIN_API_URL;
  const clientToken = process.env.CASHLESS_ADMIN_CLIENT_TOKEN;
  if (!backendUrl || !clientToken) return NextResponse.json({ ok: false, error: "Le portail investisseur n’est pas configuré." }, { status: 503 });

  const apiOrigin = backendUrl.replace(/\/$/, "").replace(/\/api\/v1$/, "");
  const sessionCheck = await fetch(`${apiOrigin}/api/v1/investor-portal/sessions/${session.sessionId}/validate`, { method: "POST", headers: { "x-app-source": "server", "x-client-token": clientToken }, cache: "no-store" });
  if (!sessionCheck.ok) return NextResponse.json({ ok: false, error: "Session expirée ou révoquée." }, { status: 401 });

  const params = new URLSearchParams();
  for (const key of ["period", "start_date", "end_date", "active_users_mode"]) {
    const value = request.nextUrl.searchParams.get(key);
    if (value) params.set(key, value);
  }
  const response = await fetch(`${apiOrigin}/api/v1/investor-portal/commercial?${params}`, {
    headers: { Authorization: `Bearer ${session.backendToken}`, "x-app-source": "server", "x-client-token": clientToken },
    cache: "no-store",
  });
  const result = await response.json().catch(() => null);
  if (!response.ok) return NextResponse.json({ ok: false, error: result?.message ?? "Impossible de récupérer les statistiques." }, { status: response.status });
  return NextResponse.json({ ok: true, data: result?.data?.data ?? result?.data ?? result });
}
