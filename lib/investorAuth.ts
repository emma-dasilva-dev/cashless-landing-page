import crypto from "crypto";

export const INVESTOR_COOKIE_NAME = "cashless_investor_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 4;

function getSessionSecret(): string {
  const secret = process.env.INVESTOR_SESSION_SECRET;

  if (!secret) {
    throw new Error("INVESTOR_SESSION_SECRET is not configured.");
  }

  return secret;
}

function createSignature(payload: string): string {
  return crypto
    .createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");
}

export type InvestorSession = {
  backendToken: string;
  email: string;
  sessionId: string;
};

export function createInvestorSessionToken(session: InvestorSession): string {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const payload = Buffer.from(JSON.stringify({ ...session, expiresAt })).toString("base64url");
  const signature = createSignature(payload);

  return `${payload}.${signature}`;
}

export function readInvestorSessionToken(token: string | undefined): InvestorSession | null {
  if (!token) return null;

  const [expiresAt, signature] = token.split(".");

  if (!expiresAt || !signature) return null;

  const expectedSignature = createSignature(expiresAt);
  const supplied = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (supplied.length !== expected.length) return null;

  if (!crypto.timingSafeEqual(supplied, expected)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(expiresAt, "base64url").toString("utf8"));
    if (typeof parsed?.expiresAt !== "number" || parsed.expiresAt <= Math.floor(Date.now() / 1000) || typeof parsed?.backendToken !== "string" || typeof parsed?.email !== "string" || typeof parsed?.sessionId !== "string") return null;
    return { backendToken: parsed.backendToken, email: parsed.email, sessionId: parsed.sessionId };
  } catch { return null; }
}

export function verifyInvestorSessionToken(token: string | undefined): boolean {
  return readInvestorSessionToken(token) !== null;
}

export const investorCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  // The protected page is under /investors while its server proxy is under
  // /api/investors. A root path is required for both requests to receive it.
  path: "/",
  maxAge: SESSION_DURATION_SECONDS,
};
