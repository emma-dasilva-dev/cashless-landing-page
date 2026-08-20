import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the investor portal has a recoverable route error boundary", async () => {
  const source = await readFile(new URL("../app/investors/portal/error.tsx", import.meta.url), "utf8");

  assert.ok(source.includes('"use client"'));
  assert.ok(source.includes("reset"));
  assert.ok(source.includes("Réessayer"));
  assert.ok(source.includes('href="/investors"'));
});
