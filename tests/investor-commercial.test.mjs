import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the investor commercial board exposes every commercial section and graph", async () => {
  const source = await readFile(new URL("../components/InvestorCommercialStats.tsx", import.meta.url), "utf8");

  for (const requiredElement of [
    "Acquisition",
    "Utilisateurs actifs",
    "KYC",
    "Comptes",
    "Cartes",
    "Transactions (complétées, période)",
    "Inscriptions par jour",
    "Utilisateurs actifs par jour",
    "Volume des transactions complétées",
    "series_daily",
    "active_users_mode",
    "start_date",
    "end_date",
    "LineChart",
    "CartesianGrid",
    "Tooltip",
    "recharts",
    "AbortController",
    "signal: controller.signal",
    "investor-loading-overlay",
    "Commercial statistics",
    "This month",
  ]) {
    assert.ok(source.includes(requiredElement), `missing ${requiredElement}`);
  }
});

test("the investor portal uses the shared language switch", async () => {
  const source = await readFile(new URL("../components/InvestorPortalClient.tsx", import.meta.url), "utf8");

  for (const requiredElement of [
    "LANGUAGE_STORAGE_KEY",
    "NigeriaFlag",
    "BeninFlag",
    '<InvestorCommercialStats language={activeLanguage}',
  ]) {
    assert.ok(source.includes(requiredElement), `missing ${requiredElement}`);
  }
});

test("the investor phone number is optional", async () => {
  const [form, route, requestType] = await Promise.all([
    readFile(new URL("../components/InvestorAccessForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/investor-access/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../../cashless-cards-admin-backend/types/investor_portal.go", import.meta.url), "utf8"),
  ]);

  assert.ok(form.includes("phone: parsedPhone?.number ?? \"\""));
  assert.ok(!route.includes("!fullName || !email || !phone || !code"));
  assert.match(requestType, /Phone\s+string\s+`json:"phone" validate:"omitempty,min=8,max=20"`/);
});
