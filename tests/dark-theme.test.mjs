import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the landing and investor portal define the dark theme palette", async () => {
  const [globalCss, landingCss, investorCss] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../styles/landing.module.css", import.meta.url), "utf8"),
    readFile(new URL("../styles/investors.module.css", import.meta.url), "utf8"),
  ]);

  for (const source of [globalCss, landingCss, investorCss]) {
    assert.ok(source.includes("oklch(0.11 0.005 258)"), "missing dashboard dark background");
  }
});
