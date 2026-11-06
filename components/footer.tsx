import React from "react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-line text-dim mt-10 flex flex-wrap items-center justify-between gap-3 border-t pt-5 font-mono text-[0.7rem]">
      <span>{t("copyright", { year })}</span>
      <span>{t("builtWith")}</span>
    </footer>
  );
}
