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
  ]) {
    assert.ok(source.includes(requiredElement), `missing ${requiredElement}`);
  }
});
