import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  createInvestorSessionToken,
  INVESTOR_COOKIE_NAME,
  investorCookieOptions,
} from "@/lib/investorAuth";

import {
  supabaseAdmin,
} from "@/lib/supabaseAdmin";

type RateLimitRecord = {
  count: number;
  resetAt: number;
  blockedUntil?: number;
};

const attempts =
  new Map<
    string,
    RateLimitRecord
  >();

const WINDOW_MS =
  15 * 60 * 1000;

const MAX_ATTEMPTS = 5;

const BLOCK_MS =
  15 * 60 * 1000;

/*
 * Access codes may contain both
 * letters and numbers.
 *
 * We normalize them to uppercase
 * so "abc123" and "ABC123" are
 * treated consistently.
 *
 * Spaces and hyphens are removed
 * before comparison.
 */
function normalizeAccessCode(
  value: string,
): string {
  return value
    .trim()
    .toUpperCase()
    .replace(/[\s-]/g, "");
}

function getClientKey(
  request: NextRequest,
): string {
  const forwarded =
    request.headers.get(
      "x-forwarded-for",
    );

  return (
    forwarded
      ?.split(",")[0]
      ?.trim() ||
    "unknown"
  );
}

function getRateLimitRecord(
  clientKey: string,
): RateLimitRecord {
  const now = Date.now();

  const current =
    attempts.get(clientKey);

  if (
    !current ||
    now > current.resetAt
  ) {
    const fresh: RateLimitRecord = {
      count: 0,

      resetAt:
        now + WINDOW_MS,
    };

    attempts.set(
      clientKey,
      fresh,
    );

    return fresh;
  }

  return current;
}

export async function POST(
  request: NextRequest,
) {
  const clientKey =
    getClientKey(request);

  const record =
    getRateLimitRecord(
      clientKey,
    );

  const now = Date.now();

  if (
    record.blockedUntil &&
    now < record.blockedUntil
  ) {
    return NextResponse.json(
      {
        ok: false,

        error:
          "Too many attempts. Please try again later.",
      },
      {
        status: 429,
      },
    );
  }

  const body =
    await request
      .json()
      .catch(() => null);

  const fullName =
    typeof body?.fullName ===
    "string"
      ? body.fullName.trim()
      : "";

  const email =
    typeof body?.email ===
    "string"
      ? body.email
          .trim()
          .toLowerCase()
      : "";

  const phone =
    typeof body?.phone ===
    "string"
      ? body.phone.trim()
      : "";

  const accessCode =
    typeof body?.accessCode ===
    "string"
      ? normalizeAccessCode(
          body.accessCode,
        )
      : "";

  const leadId =
    typeof body?.leadId ===
    "string"
      ? body.leadId.trim()
      : "";

  if (
    !fullName ||
    !email ||
    !phone ||
    !accessCode ||
    !leadId
  ) {
    return NextResponse.json(
      {
        ok: false,

        error:
          "Missing required information.",
      },
      {
        status: 400,
      },
    );
  }

  const configuredCode =
    process.env
      .INVESTOR_ACCESS_CODE;

  if (!configuredCode) {
    return NextResponse.json(
      {
        ok: false,

        error:
          "Investor access is not configured yet.",
      },
      {
        status: 503,
      },
    );
  }

  const normalizedConfiguredCode =
    normalizeAccessCode(
      configuredCode,
    );

  if (
    accessCode !==
    normalizedConfiguredCode
  ) {
    record.count += 1;

    if (
      record.count >=
      MAX_ATTEMPTS
    ) {
      record.blockedUntil =
        now + BLOCK_MS;
    }

    attempts.set(
      clientKey,
      record,
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          record.count >=
          MAX_ATTEMPTS
            ? "Too many attempts. Please try again later."
            : "Invalid access code.",
      },
      {
        status:
          record.count >=
          MAX_ATTEMPTS
            ? 429
            : 401,
      },
    );
  }

  attempts.delete(clientKey);

  const {
    data: updatedLead,
    error: updateError,
  } = await supabaseAdmin
    .from("investor_leads")
    .update({
      access_verified: true,

      updated_at:
        new Date().toISOString(),
    })
    .eq(
      "id",
      leadId,
    )
    .eq(
      "email",
      email,
    )
    .select("id")
    .maybeSingle();

  if (updateError) {
    console.error(
      "Failed to mark investor as verified:",
      updateError,
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          "Unable to complete investor verification.",
      },
      {
        status: 500,
      },
    );
  }

  if (!updatedLead) {
    return NextResponse.json(
      {
        ok: false,

        error:
          "Investor record could not be found.",
      },
      {
        status: 404,
      },
    );
  }

  const response =
    NextResponse.json({
      ok: true,

      leadId:
        updatedLead.id,
    });

  response.cookies.set(
    INVESTOR_COOKIE_NAME,

    createInvestorSessionToken(),

    investorCookieOptions,
  );

  return response;
}