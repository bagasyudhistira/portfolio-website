import assert from "node:assert/strict";
import test from "node:test";
import { getCareerYears } from "./career.ts";

test("career duration starts at zero and cannot become negative", () => {
  assert.equal(getCareerYears(new Date("2024-12-31T23:59:59Z")), 0);
  assert.equal(getCareerYears(new Date("2025-01-01T00:00:00Z")), 0);
});

test("career duration rounds at the calendar-year midpoint", () => {
  assert.equal(getCareerYears(new Date("2026-07-02T11:59:59Z")), 1);
  assert.equal(getCareerYears(new Date("2026-07-02T12:00:00Z")), 2);
  assert.equal(getCareerYears(new Date("2026-11-14T00:00:00Z")), 2);
  assert.equal(getCareerYears(new Date("2027-01-01T00:00:00Z")), 2);
});

test("career duration accounts for leap years", () => {
  assert.equal(getCareerYears(new Date("2028-07-01T23:59:59Z")), 3);
  assert.equal(getCareerYears(new Date("2028-07-02T00:00:00Z")), 4);
});
