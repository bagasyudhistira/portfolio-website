"use client";

import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "@/context/theme-context";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/data";
import { getContent } from "@/lib/content";
import personPicture from "@/public/person.webp";
import LanguageSwitcher from "./language-switcher";

export default function Rail() {
  const tr = useTranslations("rail");
  const locale = useLocale();
  const { toggleTheme } = useTheme();
  const { hero } = getContent(locale);

  return (
    <aside
      id="home"
      className="border-line bg-panel/60 flex flex-col gap-5 border-b px-6 pb-5 pt-20 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:px-7 lg:py-8"
    >
      <div className="flex items-center gap-4 lg:block">
        <div className="border-line relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border lg:h-24 lg:w-24">
          <Image
            src={personPicture}
            alt={hero.name}
            width={128}
            height={128}
            sizes="(min-width: 1024px) 96px, 64px"
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <div className="lg:mt-4">
          <h1 className="text-[1.12rem] font-semibold tracking-tight">
            {hero.name}
          </h1>
          <p className="text-muted font-mono text-[0.82rem]">{tr("role")}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <span className="inline-flex items-center gap-2 rounded-full border border-[color:rgb(126_226_184_/_0.25)] bg-[rgba(126,226,184,0.08)] px-2.5 py-1 font-mono text-[0.7rem] text-[#2f9e6b] dark:text-[#7ee2b8]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ec08a] shadow-[0_0_8px_#4ec08a]" />
          {tr("status")}
        </span>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={tr("theme")}
          className="border-line text-dim hover:text-fg hover:border-accent rounded-full border p-1.5 transition"
        >
          <svg
            className="block h-3.5 w-3.5 dark:hidden"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
          <svg
            className="hidden h-3.5 w-3.5 dark:block"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
          </svg>
        </button>
        <LanguageSwitcher />
      </div>

      <div className="border-line mt-1 hidden flex-col gap-6 border-t pt-5 lg:flex">
        <p className="text-muted text-[0.85rem] leading-relaxed">
          {tr("blurb")}
        </p>
        <div className="text-dim mt-auto flex flex-col gap-2 font-mono text-[0.74rem]">
          <a
            className="hover:text-accent truncate border-b border-dashed border-transparent transition hover:border-current"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
          <a
            className="hover:text-accent w-max border-b border-dashed border-transparent transition hover:border-current"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin/in/bagasyudhistira
          </a>
          <a
            className="hover:text-accent w-max border-b border-dashed border-transparent transition hover:border-current"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            github/bagasyudhistira
          </a>
        </div>
      </div>
    </aside>
  );
}
