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

export function createInvestorSessionToken(): string {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const payload = String(expiresAt);
  const signature = createSignature(payload);

  return `${payload}.${signature}`;
}

export function verifyInvestorSessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const [expiresAt, signature] = token.split(".");

  if (!expiresAt || !signature) return false;

  const expiry = Number(expiresAt);

  if (!Number.isFinite(expiry) || expiry <= Math.floor(Date.now() / 1000)) {
    return false;
  }

  const expectedSignature = createSignature(expiresAt);
  const supplied = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (supplied.length !== expected.length) return false;

  return crypto.timingSafeEqual(supplied, expected);
}

export const investorCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/investors",
  maxAge: SESSION_DURATION_SECONDS,
};
