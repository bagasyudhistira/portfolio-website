"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/data";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

export default function Contact() {
  const { ref } = useSectionInView("Contact", 0.6);
  const t = useTranslations("contact");

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="mb-4 flex items-end justify-between gap-3">
        <h3 className="text-[0.95rem] font-semibold tracking-tight">
          {t("title")}
        </h3>
        <span className="text-dim font-mono text-[0.68rem] uppercase tracking-[0.1em]">
          {t("hint")}
        </span>
      </div>

      <p className="text-muted max-w-[56ch] text-[0.9rem]">
        {t("lead")}{" "}
        <a
          className="text-accent underline decoration-dotted underline-offset-2"
          href={`mailto:${CONTACT_EMAIL}`}
        >
          {CONTACT_EMAIL}
        </a>{" "}
        {t("or")}
      </p>

      <form
        className="border-line bg-panel mt-5 flex max-w-[38rem] flex-col rounded-2xl border p-4"
        action={async (formData) => {
          const { error } = await sendEmail(formData);
          if (error) {
            toast.error(t("error"));
            return;
          }
          toast.success(t("success"));
        }}
      >
        <input
          className="border-line bg-panel2 text-fg placeholder:text-dim focus:border-accent h-11 rounded-lg border px-3 text-[0.88rem] outline-none transition"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder={t("emailPlaceholder")}
          aria-label={t("emailPlaceholder")}
        />
        <textarea
          className="border-line bg-panel2 text-fg placeholder:text-dim focus:border-accent my-2.5 h-36 rounded-lg border p-3 text-[0.88rem] outline-none transition"
          name="message"
          required
          maxLength={5000}
          placeholder={t("messagePlaceholder")}
          aria-label={t("messagePlaceholder")}
        />
        <div className="flex flex-wrap items-center gap-3">
          <SubmitBtn />
          <div className="text-dim flex gap-3 font-mono text-[0.72rem]">
            <a className="hover:text-accent transition" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className="hover:text-accent transition" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </form>
    </motion.section>
  );
}
