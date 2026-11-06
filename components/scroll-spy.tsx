"use client";

import { useEffect } from "react";
import { links } from "@/lib/data";
import type { SectionName } from "@/lib/types";
import { useActiveSectionContext } from "@/context/active-section-context";

/**
 * Keeps the active section in sync with the scroll position.
 *
 * Uses a probe line at ~35% of the viewport: the active section is the last one
 * whose top edge has crossed it. A click on the nav wins for 1.2s so the
 * highlight does not fight the smooth scroll that follows.
 */
export default function ScrollSpy() {
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    const onScroll = () => {
      if (Date.now() - timeOfLastClick < 1200) return;

      const probe = window.innerHeight * 0.35;
      let current: SectionName = links[0].section;

      for (const link of links) {
        const element = document.getElementById(link.hash.slice(1));
        if (!element) continue;
        if (element.getBoundingClientRect().top <= probe) {
          current = link.section;
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) {
        current = links[links.length - 1].section;
      }

      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, [setActiveSection, timeOfLastClick]);

  return null;
}
