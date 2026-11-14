export function getCareerYears(now = new Date()): number {
  const startYear = 2025;
  const year = now.getUTCFullYear();
  const yearStart = Date.UTC(year, 0, 1);
  const nextYearStart = Date.UTC(year + 1, 0, 1);
  const elapsed = year - startYear +
    (now.getTime() - yearStart) / (nextYearStart - yearStart);

  return Math.max(0, Math.round(elapsed));
}
