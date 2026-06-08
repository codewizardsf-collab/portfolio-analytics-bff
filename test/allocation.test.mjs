import test from "node:test";
import assert from "node:assert/strict";
import { buildAllocationResponse, performanceAttribution } from "../src/allocation.mjs";

test("allocation response groups exposure by sector", () => {
  const result = buildAllocationResponse([
    { symbol: "AAPL", sector: "Technology", marketValue: 120000 },
    { symbol: "MSFT", sector: "Technology", marketValue: 80000 },
    { symbol: "JPM", sector: "Financials", marketValue: -50000 }
  ]);

  assert.equal(result.grossExposure, 250000);
  assert.equal(result.sectors[0].sector, "Technology");
  assert.equal(result.sectors[0].weight, 80);
});

test("performance attribution sorts largest contributors first", () => {
  const result = performanceAttribution([
    { symbol: "AAPL", quantity: 100, marketPrice: 110, previousClose: 105, returnPercent: 2.1, benchmarkReturnPercent: 1.7 },
    { symbol: "JPM", quantity: 10, marketPrice: 100, previousClose: 99, returnPercent: 0.4, benchmarkReturnPercent: 0.8 }
  ]);

  assert.equal(result[0].symbol, "AAPL");
  assert.equal(result[0].contribution, 500);
});
