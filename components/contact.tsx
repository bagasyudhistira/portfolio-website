"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { sendEmail } from "@/actions/sendEmail";
import { CONTACT_EMAIL } from "@/lib/data";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

export default function Contact() {
  const { ref } = useSectionInView("Contact", 0.75);
  const t = useTranslations("contact");

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="mb-20 w-[min(100%,38rem)] text-center sm:mb-28"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <SectionHeading>{t("title")}</SectionHeading>

      <p className="text-gray-700 -mt-6 dark:text-white/75">
        {t("lead")}{" "}
        <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>{" "}
        {t("or")}
      </p>

      <form
        className="mt-10 flex flex-col dark:text-black"
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
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder={t("emailPlaceholder")}
          aria-label={t("emailPlaceholder")}
        />

        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="message"
          required
          maxLength={5000}
          placeholder={t("messagePlaceholder")}
          aria-label={t("messagePlaceholder")}
        />

        <SubmitBtn />
      </form>
    </motion.section>
  );
}
