"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { getContent } from "@/lib/content";

export default function Skills() {
  const t = useTranslations("skills");
  const locale = useLocale();
  const { skills } = getContent(locale);

  const groups = [
    { label: t("coreLabel"), items: skills.core, primary: true },
    { label: t("familiarLabel"), items: skills.familiar, primary: false },
  ];

  return (
    <section id="skills" className="scroll-mt-24">
      <div className="mb-3 flex items-end justify-between gap-3">
        <h3 className="text-[0.95rem] font-semibold tracking-tight">
          {t("title")}
        </h3>
        <span className="text-dim font-mono text-[0.68rem] uppercase tracking-[0.1em]">
          {t("hint")}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {groups.map((group) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-line bg-panel rounded-2xl border p-4"
          >
            <h4 className="text-dim mb-2.5 font-mono text-[0.66rem] uppercase tracking-[0.12em]">
              {group.label}
            </h4>
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((skill) => (
                <li
                  key={skill}
                  className={
                    group.primary
                      ? "border-line bg-panel2 text-fg rounded-md border px-2.5 py-1 text-[0.82rem]"
                      : "border-line bg-panel2 text-muted rounded-md border px-2 py-0.5 text-[0.78rem]"
                  }
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
