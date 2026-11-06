"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { useLocale, useTranslations } from "next-intl";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { getContent } from "@/lib/content";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills", 1);
  const t = useTranslations("skills");
  const locale = useLocale();
  const { skills } = getContent(locale);

  const groups = [
    { label: t("coreLabel"), items: skills.core, emphasis: true },
    { label: t("familiarLabel"), items: skills.familiar, emphasis: false },
  ];

  return (
    <section
      ref={ref}
      id="skills"
      className="mb-28 max-w-[53rem] scroll-mt-28 sm:mb-40"
    >
      <SectionHeading>{t("title")}</SectionHeading>

      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="mb-3 text-sm uppercase tracking-wider text-gray-500 dark:text-white/50">
              {group.label}
            </p>
            <ul className="flex flex-wrap gap-2 text-lg text-gray-800">
              {group.items.map((skill, index) => (
                <motion.li
                  className={
                    group.emphasis
                      ? "rounded-xl border border-black/[0.1] bg-white px-5 py-3 font-medium dark:bg-white/10 dark:text-white/80"
                      : "rounded-xl border border-black/[0.06] bg-white/60 px-4 py-2 text-base text-gray-600 dark:bg-white/[0.04] dark:text-white/60"
                  }
                  key={skill}
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index}
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
