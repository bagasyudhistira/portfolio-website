"use client";

import React from "react";
import Image from "next/image";
import personPicture from "@/public/person.jpg";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/data";
import { getContent } from "@/lib/content";

export default function Intro() {
  const { ref } = useSectionInView("Home", 1);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const t = useTranslations("intro");
  const locale = useLocale();
  const { hero } = getContent(locale);

  return (
    <section
      ref={ref}
      id="home"
      className="relative mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <Image
              src={personPicture}
              alt={hero.name}
              width="300"
              height="300"
              quality="95"
              priority={true}
              className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
            />
            <motion.span
              className="absolute bottom-0 right-0 text-4xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 125,
                delay: 0.5,
                duration: 0.7,
              }}
            >
              👍
            </motion.span>
          </motion.div>
        </div>
      </div>

      <motion.h1
        className="mb-6 mt-4 px-4 text-2xl font-medium leading-[1.5]"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="font-bold">{t("hello")}</span> — {t("role")}
      </motion.h1>

      <motion.p
        className="mx-auto mb-8 max-w-[42rem] px-4 leading-relaxed text-gray-700 dark:text-white/75"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        {t("body")}
      </motion.p>

      <motion.dl
        className="mb-10 grid grid-cols-1 gap-4 px-4 sm:grid-cols-3"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {hero.metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-black/[0.08] bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/[0.06]"
          >
            <dd className="text-lg font-semibold">{metric.value}</dd>
            <dt className="text-xs text-gray-600 dark:text-white/60">
              {metric.label}
            </dt>
          </div>
        ))}
      </motion.dl>

      <motion.div
        className="flex flex-col items-center justify-center gap-3 px-4 text-lg font-medium sm:flex-row"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Link
          href="#contact"
          className="group flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3 text-white outline-none transition hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          {t("contactCta")}
          <BsArrowRight className="opacity-75 transition group-hover:translate-x-1" />
        </Link>

        <a
          className="borderBlack flex cursor-pointer items-center gap-2 rounded-full bg-white p-4 text-gray-700 transition hover:scale-110 focus:scale-110 active:scale-105 dark:bg-white/10 dark:text-white/60"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("linkedin")}
        >
          <BsLinkedin />
          <span className="sm:hidden">{t("linkedin")}</span>
        </a>

        <a
          className="borderBlack flex cursor-pointer items-center gap-2 rounded-full bg-white p-4 text-gray-700 transition hover:scale-110 focus:scale-110 active:scale-105 dark:bg-white/10 dark:text-white/60"
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("github")}
        >
          <FaGithubSquare />
          <span className="sm:hidden">{t("github")}</span>
        </a>
      </motion.div>
    </section>
  );
}
