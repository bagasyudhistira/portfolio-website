"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { links } from "@/lib/data";
import { useActiveSectionContext } from "@/context/active-section-context";

/**
 * Floating section navigation. Stays pinned while the page scrolls; the active
 * item is driven by ScrollSpy (see components/scroll-spy.tsx).
 */
export default function FloatingNav() {
  const t = useTranslations("nav");
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <div className="no-scrollbar px-3 pt-3 sm:pt-4 pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <nav
        aria-label={t("home")}
        className="no-scrollbar border-line bg-panel/85 pointer-events-auto flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border px-1.5 py-1.5 shadow-lg shadow-black/5 backdrop-blur-md"
      >
        {links.map((link) => {
          const isActive = link.section === activeSection;
          return (
            <Link
              key={link.hash}
              href={link.hash}
              aria-current={isActive ? "true" : undefined}
              onClick={() => {
                setActiveSection(link.section);
                setTimeOfLastClick(Date.now());
              }}
              className={clsx(
                "relative shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[0.82rem] transition sm:text-[0.86rem]",
                isActive ? "text-fg" : "text-muted hover:text-fg"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="floatingNavActive"
                  className="bg-accent/15 absolute inset-0 -z-10 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {t(link.key)}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
