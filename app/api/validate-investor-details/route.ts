import { resolveMx } from "node:dns/promises";

import { NextResponse } from "next/server";

import {
  parsePhoneNumberFromString,
} from "libphonenumber-js";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function isValidEmailSyntax(
  email: string,
): boolean {
  if (email.length > 254) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email,
  );
}

async function domainAcceptsEmail(
  domain: string,
): Promise<boolean> {
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

export async function POST(
  request: Request,
) {
  const body = await request
    .json()
    .catch(() => null);

  const fullName =
    typeof body?.fullName === "string"
      ? body.fullName.trim()
      : "";

  const email =
    typeof body?.email === "string"
      ? body.email
          .trim()
          .toLowerCase()
      : "";

  const phone =
    typeof body?.phone === "string"
      ? body.phone.trim()
      : "";

  const phoneCountry =
    typeof body?.phoneCountry === "string"
      ? body.phoneCountry.trim()
      : "";

  const phoneNumber =
    typeof body?.phoneNumber === "string"
      ? body.phoneNumber.trim()
      : "";

  if (fullName.length < 2) {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_DETAILS",
      },
      {
        status: 400,
      },
    );
  }

  if (!isValidEmailSyntax(email)) {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_EMAIL",
      },
      {
        status: 400,
      },
    );
  }

  const domain = email.split("@")[1];

  if (
    !domain ||
    !(await domainAcceptsEmail(domain))
  ) {
    return NextResponse.json(
      {
        ok: false,
        code: "EMAIL_DOMAIN",
      },
      {
        status: 400,
      },
    );
  }

  const parsedPhone =
    parsePhoneNumberFromString(phone);

  if (!parsedPhone?.isValid()) {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_PHONE",
      },
      {
        status: 400,
      },
    );
  }

  const {
    data,
    error,
  } = await supabaseAdmin
    .from("investor_leads")
    .insert({
      full_name: fullName,

      email,

      phone_country:
        phoneCountry ||
        parsedPhone.country ||
        "",

      phone_number:
        phoneNumber ||
        parsedPhone.nationalNumber,

      phone_e164:
        parsedPhone.number,

      access_verified: false,
    })
    .select("id")
    .single();

  if (error) {
    console.error(
      "Failed to save investor lead:",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        code: "DATABASE_ERROR",
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({
    ok: true,
    leadId: data.id,
  });
}