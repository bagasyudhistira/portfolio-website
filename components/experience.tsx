"use client";

import React from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { CgWorkAlt } from "react-icons/cg";
import { FaCloud, FaHandshake } from "react-icons/fa";
import { LuGraduationCap, LuMap } from "react-icons/lu";
import { useLocale, useTranslations } from "next-intl";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { getContent, type ExperienceIcon } from "@/lib/content";

const icons: Record<ExperienceIcon, React.ReactElement> = {
  work: <CgWorkAlt />,
  cloud: <FaCloud />,
  map: <LuMap />,
  graduation: <LuGraduationCap />,
  handshake: <FaHandshake />,
};

export default function Experience() {
  const { ref } = useSectionInView("Experience", 0.5);
  const { theme } = useTheme();
  const t = useTranslations("experience");
  const locale = useLocale();
  const { experiences } = getContent(locale);

  return (
    <section ref={ref} id="experience" className="relative scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>{t("title")}</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiences.map((item) => (
          <VerticalTimelineElement
            key={`${item.title}-${item.period}`}
            visible={true}
            contentStyle={{
              background: theme === "light" ? "#f3f4f6" : "#1f2937",
              boxShadow: "none",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              textAlign: "left",
              padding: "1.3rem 2rem",
            }}
            contentArrowStyle={{
              borderRight:
                theme == "light"
                  ? "0.4rem solid #9ca3af"
                  : "0.4rem solid rgba(255, 255, 255, 0.5)",
            }}
            date={item.period}
            icon={icons[item.icon]}
            iconStyle={{
              background: theme === "light" ? "white" : "rgb(17, 24, 39)",
              fontSize: "1.5rem",
            }}
          >
            <h3 className="font-semibold">{item.title}</h3>
            <p className="font-normal !mt-0">
              {item.org} · {item.location}
            </p>
            <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
              {item.description}
            </p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  );
}
