"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Project as ProjectType } from "@/lib/content";

export default function Project({
  project,
  index,
}: {
  project: ProjectType;
  index: number;
}) {
  const t = useTranslations("projects");

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.2) }}
      className="border-line bg-panel hover:border-accent/45 group rounded-2xl border p-5 transition lg:hover:translate-x-0.5"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="text-[0.98rem] font-semibold tracking-tight">
          {project.title}
        </h4>
        <div className="text-dim flex items-center gap-2 font-mono text-[0.7rem]">
          <span className="whitespace-nowrap">{project.period}</span>
          {project.confidential && (
            <span className="rounded-md border border-[rgba(240,180,41,0.3)] bg-[rgba(240,180,41,0.06)] px-1.5 py-0.5 text-[0.62rem] uppercase tracking-[0.08em] text-[#a97c12] dark:text-[#f0b429]">
              {t("nda")}
            </span>
          )}
        </div>
      </div>

      <p className="text-dim mt-1 text-[0.8rem]">{project.org}</p>

      <p className="text-muted mt-2.5 max-w-[62ch] text-[0.87rem] leading-relaxed">
        {project.summary}
      </p>

      <ul className="mt-3 space-y-1">
        {project.bullets.slice(0, 3).map((bullet) => (
          <li
            key={bullet}
            className="text-muted flex gap-2 text-[0.84rem] leading-relaxed"
          >
            <span aria-hidden="true" className="text-dim">
              ▸
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {project.image && (
        <div className="border-line mt-4 overflow-hidden rounded-xl border">
          <Image
            src={project.image}
            alt={project.title}
            className="h-40 w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
            quality={90}
          />
        </div>
      )}

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tag) => (
          <li
            key={tag}
            className="border-line bg-panel2 text-muted rounded-md border px-2 py-1 font-mono text-[0.64rem] uppercase tracking-[0.06em]"
          >
            {tag}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
