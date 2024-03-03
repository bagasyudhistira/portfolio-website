import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaHandshake, FaReact } from "react-icons/fa";
import { LuGraduationCap, LuHelpingHand, LuMap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";
import desasitoluhutaImg from "@/public/desasitoluhuta.png";
import ategoImg from "@/public/atego.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Public Relations Staff KMTETI UGM",
    location: "Universitas Gadjah Mada, Indonesia",
    description:
      "I worked as a public relations staff for 2 years. I learned about working in a team, project management, and responsibility.",
    icon: React.createElement(FaHandshake),
    date: "2020-2022",
  },
  {
    title: "IT Intern",
    location: "BPN Kabupaten Bekasi, Indonesia",
    description:
      "I worked as an IT intern for 2 months. I analyzed the current web design and made a new web design for the office. I also learned about the area mapping and how to work in a government office.",
    icon: React.createElement(LuMap),
    date: "2022",
  },
  {
    title: "Bachelor of Engineering in Information Engineering",
    location: "Universitas Gadjah Mada, Indonesia",
    description:
      "I graduated after 4.5 years of studying with GPA 3.51 out of 4.00.",
    icon: React.createElement(LuGraduationCap),
    date: "2019-2024",
  },
  // {
  //   title: "Front-End Developer",
  //   location: "Orlando, FL",
  //   description:
  //     "I worked as a front-end developer for 2 years in 1 job and 1 year in another job. I also upskilled to the full stack.",
  //   icon: React.createElement(CgWorkAlt),
  //   date: "2019 - 2021",
  // },
  // {
  //   title: "Full-Stack Developer",
  //   location: "Houston, TX",
  //   description:
  //     "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
  //   icon: React.createElement(FaReact),
  //   date: "2021 - present",
  // },
] as const;

export const projectsData = [
  // {
  //   title: "CorpComment",
  //   description:
  //     "I worked as a full-stack developer on this startup project for 2 years. Users can give public feedback to companies.",
  //   tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma"],
  //   imageUrl: corpcommentImg,
  // },
  {
    title: "ATEGO",
    description:
      "I was a mobile app developer to create a mobile app for completing my thesis. The app is an automated presence system using GPS",
    tags: ["Flutter", "Dart", "Firebase"],
    imageUrl: ategoImg,
  },
  {
    title: "Sitoluhuta Website",
    description:
      "I worked as a web developer to create a village's website in 50 days. The website is used to introduce the village to the world.",
    tags: ["Wordpress", "HTML", "CSS"],
    imageUrl: desasitoluhutaImg,
  },

  // {
  //   title: "rmtDev",
  //   description:
  //     "Job board for remote developer jobs. I was the front-end developer. It has features like filtering, sorting and pagination.",
  //   tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
  //   imageUrl: rmtdevImg,
  // },
  // {
  //   title: "Word Analytics",
  //   description:
  //     "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
  //   tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
  //   imageUrl: wordanalyticsImg,
  // },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "Java",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "Python",
  "Flutter",
  "Dart",
  "Firebase",
  "Figma",
] as const;
