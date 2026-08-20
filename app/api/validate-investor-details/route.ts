import { resolveMx } from "node:dns/promises";
import { NextResponse } from "next/server";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const runtime = "nodejs";

function isValidEmailSyntax(email: string): boolean {
  if (email.length > 254) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function domainAcceptsEmail(domain: string): Promise<boolean> {
  try {
    const records = await resolveMx(domain);

    return records.some(
      (record) =>
        Number.isFinite(record.priority) &&
        record.exchange.length > 0,
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const fullName =
    typeof body?.fullName === "string"
      ? body.fullName.trim()
      : "";

  const email =
    typeof body?.email === "string"
      ? body.email.trim().toLowerCase()
      : "";

  const phone =
    typeof body?.phone === "string"
      ? body.phone.trim()
      : "";

  if (fullName.length < 2) {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_DETAILS",
      },
      { status: 400 },
    );
  }

  if (!isValidEmailSyntax(email)) {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_EMAIL",
      },
      { status: 400 },
    );
  }

  const domain = email.split("@")[1];

  if (!domain || !(await domainAcceptsEmail(domain))) {
    return NextResponse.json(
      {
        ok: false,
        code: "EMAIL_DOMAIN",
      },
      { status: 400 },
    );
  }

  const parsedPhone = parsePhoneNumberFromString(phone);

  if (!parsedPhone?.isValid()) {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_PHONE",
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
  });
}
