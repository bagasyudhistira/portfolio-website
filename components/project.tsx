"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Project as ProjectType } from "@/lib/content";

export default function Project({ project }: { project: ProjectType }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const t = useTranslations("projects");

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="group mb-3 last:mb-0 sm:mb-8"
    >
      <motion.section className="relative max-w-[42rem] overflow-hidden rounded-lg border border-black/5 bg-gray-100 transition hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 sm:h-[22rem] sm:pr-8 sm:group-even:pl-8">
        <div className="flex h-full flex-col px-5 pb-7 pt-4 sm:max-w-[55%] sm:pl-10 sm:pr-2 sm:pt-10 sm:group-even:ml-[18rem]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[0.7rem] uppercase tracking-wider text-gray-600 dark:text-white/60">
              {project.period}
            </span>
            {project.confidential && (
              <span className="rounded-full bg-black/[0.7] px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-white dark:bg-white/20">
                {t("nda")}
              </span>
            )}
          </div>

          <h3 className="mt-1 text-xl font-semibold leading-snug sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-white/60">
            {project.org}
          </p>

          <p className="mt-3 leading-relaxed text-gray-700 dark:text-white/70">
            {project.summary}
          </p>

          <ul className="mt-3 space-y-1 text-sm leading-relaxed text-gray-700 dark:text-white/70">
            {project.bullets.slice(0, 3).map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <span aria-hidden="true" className="text-gray-400">
                  ▸
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-4 flex flex-wrap gap-2 sm:mt-auto">
            {project.stack.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white dark:text-white/70"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            quality={95}
            className="absolute -right-40 top-8 hidden w-[28.25rem] rounded-t-lg shadow-2xl transition group-hover:-translate-x-3 group-hover:-rotate-2 group-hover:scale-[1.04] group-hover:translate-y-3 group-even:-left-40 group-even:right-[initial] group-even:group-hover:translate-x-3 group-even:group-hover:rotate-2 sm:block"
          />
        )}
      </motion.section>
    </motion.div>
  );
}
