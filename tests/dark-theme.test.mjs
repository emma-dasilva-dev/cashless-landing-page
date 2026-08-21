import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the landing and investor portal keep the approved light palette", async () => {
  const [globalCss, landingCss, investorCss] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../styles/landing.module.css", import.meta.url), "utf8"),
    readFile(new URL("../styles/investors.module.css", import.meta.url), "utf8"),
  ]);

  assert.ok(globalCss.includes('background: #ffffff'), "the site background must remain light");
  assert.ok(landingCss.includes("background: #ffffff"), "the landing artwork must remain light");
  assert.ok(investorCss.includes("background: #ffffff"), "the investor access page must remain light");

  for (const source of [globalCss, landingCss, investorCss]) {
    assert.ok(!source.includes("oklch(0.11 0.005 258)"), "dashboard dark palette leaked into the landing");
  }
});

test("secondary landing actions use the outlined treatment", async () => {
  const [hero, secondaryCss] = await Promise.all([
    readFile(new URL("../components/Hero.tsx", import.meta.url), "utf8"),
    readFile(new URL("../styles/heroSecondaryActions.module.css", import.meta.url), "utf8"),
  ]);

  assert.match(hero, /secondaryButton.*websiteButton/);
  assert.match(hero, /secondaryButton.*investorButton/);
  assert.match(secondaryCss, /\.secondaryButton\s*\{[\s\S]*border: 1px solid #111111;[\s\S]*background: #ffffff;[\s\S]*color: #111111;/);
});
