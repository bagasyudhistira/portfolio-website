"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getCareerYears } from "@/lib/career";

export default function CareerDuration() {
  const t = useTranslations("profile");
  const [years, setYears] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setYears(getCareerYears());
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return years === null ? "—" : t("careerYears", { count: years });
}
