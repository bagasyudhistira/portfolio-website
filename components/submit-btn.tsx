"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { FaRegPaperPlane } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function SubmitBtn() {
  const { pending } = useFormStatus();
  const t = useTranslations("contact");

  return (
    <button
      className="group flex h-[3rem] w-[11rem] items-center justify-center gap-2 rounded-full bg-gray-900 text-white outline-none transition-all hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105 disabled:scale-100 disabled:bg-opacity-75 dark:bg-white/30 dark:bg-opacity-80"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin border-b-2 border-white"></div>
      ) : (
        <>
          {t("submit")}
          <FaRegPaperPlane className="texts-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
        </>
      )}
    </button>
  );
}
