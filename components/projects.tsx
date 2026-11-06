"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { useTranslations } from "next-intl";
import { useSectionInView } from "@/lib/hooks";
import { getContent } from "@/lib/content";
import { useLocale } from "next-intl";
import Project from "./project";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);
  const t = useTranslations("projects");
  const locale = useLocale();
  const { projects } = getContent(locale);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>{t("title")}</SectionHeading>
      <p className="-mt-4 mb-8 text-center text-sm text-gray-600 dark:text-white/60">
        {t("confidential")}
      </p>
      <div>
        {projects.map((project) => (
          <Project key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
