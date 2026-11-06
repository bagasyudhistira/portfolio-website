import type { StaticImageData } from "next/image";

export type Locale = "en" | "id";

export type Project = {
  slug: string;
  title: string;
  org: string;
  period: string;
  summary: string;
  bullets: string[];
  stack: string[];
  confidential?: boolean;
  image?: StaticImageData;
  link?: string;
};

export type ExperienceIcon = "work" | "cloud" | "map" | "graduation" | "handshake";

export type ExperienceItem = {
  title: string;
  org: string;
  location: string;
  period: string;
  description: string;
  icon: ExperienceIcon;
};

export type Metric = {
  value: string;
  label: string;
};

export type SiteContent = {
  hero: {
    name: string;
    metrics: Metric[];
  };
  projects: Project[];
  experiences: ExperienceItem[];
  skills: {
    core: string[];
    familiar: string[];
  };
};
