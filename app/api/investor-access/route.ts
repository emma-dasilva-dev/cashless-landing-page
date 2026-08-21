import { NextRequest, NextResponse } from "next/server";

import {
  createInvestorSessionToken,
  INVESTOR_COOKIE_NAME,
  investorCookieOptions,
} from "@/lib/investorAuth";

export const runtime = "nodejs";

function getInvestorIPAddress(request: NextRequest): string {
  return request.headers.get("cf-connecting-ip")
    ?? request.headers.get("x-real-ip")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? "";
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const fullName = typeof body?.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const code = typeof body?.accessCode === "string" ? body.accessCode.trim() : "";

  if (!fullName || !email || !code) {
    return NextResponse.json({ ok: false, error: "Informations incomplètes." }, { status: 400 });
  }

  const backendUrl = process.env.CASHLESS_ADMIN_API_URL;
  const clientToken = process.env.CASHLESS_ADMIN_CLIENT_TOKEN;
  if (!backendUrl || !clientToken) {
    return NextResponse.json({ ok: false, error: "Le portail investisseur n’est pas configuré." }, { status: 503 });
  }

  const apiOrigin = backendUrl.replace(/\/$/, "").replace(/\/api\/v1$/, "");
  const response = await fetch(`${apiOrigin}/api/v1/investor-portal/redeem`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-app-source": "server", "x-client-token": clientToken, "x-investor-ip": getInvestorIPAddress(request), "x-investor-user-agent": request.headers.get("user-agent") ?? "", "x-investor-language": request.headers.get("accept-language")?.slice(0, 32) ?? "", "x-investor-timezone": request.headers.get("x-timezone") ?? "" },
    body: JSON.stringify({ full_name: fullName, email, phone, code, trusted_device: Boolean(body?.trustedDevice) }),
    cache: "no-store",
  });
  const result = await response.json().catch(() => null);
  const data = result?.data?.data ?? result?.data ?? result;
  if (!response.ok || !data?.token) {
    return NextResponse.json({ ok: false, error: result?.message ?? "Code invalide, expiré ou déjà utilisé." }, { status: response.status || 401 });
  }

  const reply = NextResponse.json({ ok: true });
  reply.cookies.set(INVESTOR_COOKIE_NAME, createInvestorSessionToken({ backendToken: data.token, email, sessionId: data.session_id }), investorCookieOptions);
  return reply;
}
