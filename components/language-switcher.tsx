"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTransition } from "react";
import clsx from "clsx";

export default function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: (typeof routing.locales)[number]) => {
    if (next === locale) return;

    const hash = typeof window === "undefined" ? "" : window.location.hash;

    startTransition(() => {
      router.replace(`${pathname}${hash}`, { locale: next });
    });
  };

  return (
    <div
      className="border-line flex items-center gap-0.5 rounded-lg border p-0.5"
      aria-label={t("label")}
    >
      {routing.locales.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => switchTo(option)}
          disabled={isPending}
          aria-current={option === locale ? "true" : undefined}
          className={clsx(
            "rounded-md px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.06em] transition",
            option === locale
              ? "bg-accent text-white"
              : "text-dim hover:text-fg"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
