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
      className="flex items-center gap-1 rounded-full border border-black/10 bg-white/70 p-1 text-[0.75rem] font-medium dark:border-white/15 dark:bg-white/10"
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
            "rounded-full px-2 py-1 uppercase transition",
            option === locale
              ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
