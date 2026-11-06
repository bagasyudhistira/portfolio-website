"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useSectionInView } from "@/lib/hooks";
import { useLocale } from "next-intl";
import { getContent } from "@/lib/content";
import Project from "./project";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.4);
  const t = useTranslations("projects");
  const locale = useLocale();
  const { projects } = getContent(locale);

  return (
    <section ref={ref} id="projects" className="scroll-mt-24">
      <div className="mb-3 flex items-end justify-between gap-3">
        <h3 className="text-[0.95rem] font-semibold tracking-tight">
          {t("title")}
        </h3>
        <span className="text-dim font-mono text-[0.68rem] uppercase tracking-[0.1em]">
          {t("count", { count: projects.length })}
        </span>
      </div>
      <p className="text-dim mb-5 text-[0.78rem]">{t("confidential")}</p>

      <div className="space-y-3">
        {projects.map((project, index) => (
          <Project key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
