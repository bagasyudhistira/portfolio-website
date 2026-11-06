import React from "react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">
        {t("copyright", { year })}
      </small>
      <p className="text-xs">{t("builtWith")}</p>
    </footer>
  );
}
