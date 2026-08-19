import { NextRequest, NextResponse } from "next/server";
import {
  createInvestorSessionToken,
  INVESTOR_COOKIE_NAME,
  investorCookieOptions,
} from "@/lib/investorAuth";

type RateLimitRecord = {
  count: number;
  resetAt: number;
  blockedUntil?: number;
};

const attempts = new Map<string, RateLimitRecord>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const BLOCK_MS = 15 * 60 * 1000;

function normalizeAccessCode(value: string): string {
  return value.trim().toUpperCase();
}

function getClientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function getRateLimitRecord(clientKey: string): RateLimitRecord {
  const now = Date.now();
  const current = attempts.get(clientKey);

  if (!current || now > current.resetAt) {
    const fresh = {
      count: 0,
      resetAt: now + WINDOW_MS,
    };

    attempts.set(clientKey, fresh);
    return fresh;
  }

  return current;
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);
  const record = getRateLimitRecord(clientKey);
  const now = Date.now();

  if (record.blockedUntil && now < record.blockedUntil) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many attempts. Please try again later.",
      },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);

  const fullName =
    typeof body?.fullName === "string" ? body.fullName.trim() : "";
  const email =
    typeof body?.email === "string" ? body.email.trim() : "";
  const phone =
    typeof body?.phone === "string" ? body.phone.trim() : "";
  const accessCode =
    typeof body?.accessCode === "string"
      ? normalizeAccessCode(body.accessCode)
      : "";

  if (!fullName || !email || !phone || !accessCode) {
    return NextResponse.json(
      { ok: false, error: "Missing required information." },
      { status: 400 },
    );
  }

  const configuredCode = process.env.INVESTOR_ACCESS_CODE;

  if (!configuredCode) {
    return NextResponse.json(
      {
        ok: false,
        error: "Investor access is not configured yet.",
      },
      { status: 503 },
    );
  }

  if (accessCode !== normalizeAccessCode(configuredCode)) {
    record.count += 1;

    if (record.count >= MAX_ATTEMPTS) {
      record.blockedUntil = now + BLOCK_MS;
    }

    attempts.set(clientKey, record);

    return NextResponse.json(
      {
        ok: false,
        error:
          record.count >= MAX_ATTEMPTS
            ? "Too many attempts. Please try again later."
            : "Invalid access code.",
      },
      { status: record.count >= MAX_ATTEMPTS ? 429 : 401 },
    );
  }

  attempts.delete(clientKey);

  const response = NextResponse.json({ ok: true });

  response.cookies.set(
    INVESTOR_COOKIE_NAME,
    createInvestorSessionToken(),
    investorCookieOptions,
  );

  return response;
}
