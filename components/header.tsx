"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { links } from "@/lib/data";
import { useActiveSectionContext } from "@/context/active-section-context";
import LanguageSwitcher from "./language-switcher";

export default function Header() {
  const t = useTranslations("nav");
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <header className="z-[999]">
      <motion.div
        className="fixed left-1/2 top-0 w-full -translate-x-1/2 sm:top-6 sm:w-auto sm:max-w-[95vw]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <nav className="flex items-center gap-2 border border-white/40 bg-white/80 px-2 py-2 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:border-black/40 dark:bg-gray-950/75 sm:rounded-full sm:px-4">
          <ul className="no-scrollbar flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto text-[0.85rem] font-medium text-gray-500 sm:flex-none sm:gap-2 sm:text-[0.9rem]">
            {links.map((link) => (
              <li key={link.hash} className="shrink-0">
                <Link
                  className={clsx(
                    "relative flex items-center whitespace-nowrap rounded-full px-2.5 py-2 transition hover:text-gray-950 dark:text-gray-500 dark:hover:text-gray-300 sm:px-3",
                    {
                      "text-gray-950 dark:text-gray-200":
                        activeSection === link.section,
                    }
                  )}
                  href={link.hash}
                  onClick={() => {
                    setActiveSection(link.section);
                    setTimeOfLastClick(Date.now());
                  }}
                >
                  {t(link.key)}
                  {link.section === activeSection && (
                    <motion.span
                      className="absolute inset-0 -z-10 rounded-full bg-gray-100 dark:bg-gray-800"
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    ></motion.span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <div className="shrink-0">
            <LanguageSwitcher />
          </div>
        </nav>
      </motion.div>
    </header>
  );
}
