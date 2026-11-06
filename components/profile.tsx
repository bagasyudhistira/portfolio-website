"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useSectionInView } from "@/lib/hooks";
import { getContent } from "@/lib/content";

export default function Profile() {
  const { ref } = useSectionInView("About", 0.5);
  const t = useTranslations("profile");
  const ta = useTranslations("about");
  const locale = useLocale();
  const { hero } = getContent(locale);

  return (
    <section ref={ref} id="about" className="scroll-mt-24">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-dim font-mono text-[0.7rem] uppercase tracking-[0.16em]"
      >
        {t("eyebrow")}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mt-3 max-w-[24ch] text-[clamp(1.8rem,3.4vw,2.5rem)] font-semibold leading-[1.14] tracking-[-0.025em]"
      >
        {t("headlineStart")}{" "}
        <span className="text-accent">{t("headlineAccent")}</span>{" "}
        {t("headlineEnd")}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-muted mt-4 max-w-[60ch] text-[0.97rem] leading-relaxed"
      >
        {ta("p1")}
      </motion.p>

      <dl className="mt-8 flex flex-wrap gap-2.5">
        {hero.metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.05 }}
            className="border-line bg-panel flex-1 basis-[150px] rounded-xl border px-4 py-3.5"
          >
            <dd className="text-[1.25rem] font-semibold tracking-tight">
              {metric.value}
            </dd>
            <dt className="text-dim font-mono text-[0.66rem] uppercase tracking-[0.09em]">
              {metric.label}
            </dt>
          </motion.div>
        ))}
        <div className="border-line bg-panel flex-1 basis-[150px] rounded-xl border px-4 py-3.5">
          <dd className="text-[1.25rem] font-semibold tracking-tight">
            {t("englishValue")}
          </dd>
          <dt className="text-dim font-mono text-[0.66rem] uppercase tracking-[0.09em]">
            {t("englishLabel")}
          </dt>
        </div>
      </dl>

      <p className="text-muted mt-6 max-w-[60ch] text-[0.9rem] leading-relaxed">
        {ta("p2")}
      </p>
    </section>
  );
}
