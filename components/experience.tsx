"use client";

import React from "react";
import { motion } from "framer-motion";
import { CgWorkAlt } from "react-icons/cg";
import { FaCloud, FaHandshake } from "react-icons/fa";
import { LuGraduationCap, LuMap } from "react-icons/lu";
import { useLocale, useTranslations } from "next-intl";
import { getContent, type ExperienceIcon } from "@/lib/content";

const icons: Record<ExperienceIcon, React.ReactElement> = {
  work: <CgWorkAlt />,
  cloud: <FaCloud />,
  map: <LuMap />,
  graduation: <LuGraduationCap />,
  handshake: <FaHandshake />,
};

export default function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale();
  const { experiences } = getContent(locale);

  return (
    <section id="experience" className="scroll-mt-24">
      <div className="mb-4 flex items-end justify-between gap-3">
        <h3 className="text-[0.95rem] font-semibold tracking-tight">
          {t("title")}
        </h3>
        <span className="text-dim font-mono text-[0.68rem] uppercase tracking-[0.1em]">
          {t("hint")}
        </span>
      </div>

      <ol className="border-line relative border-l pl-5">
        {experiences.map((item, index) => (
          <motion.li
            key={`${item.title}-${item.period}`}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.2) }}
            className="relative pb-6 last:pb-0"
          >
            <span className="border-line bg-panel text-accent absolute -left-[30px] grid h-6 w-6 place-items-center rounded-full border text-[0.7rem]">
              {icons[item.icon]}
            </span>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h4 className="text-[0.95rem] font-semibold">{item.title}</h4>
              <span className="text-dim font-mono text-[0.7rem]">
                {item.period}
              </span>
            </div>
            <p className="text-dim mt-0.5 text-[0.82rem]">
              {item.org} · {item.location}
            </p>
            <p className="text-muted mt-1.5 max-w-[64ch] text-[0.86rem] leading-relaxed">
              {item.description}
            </p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
