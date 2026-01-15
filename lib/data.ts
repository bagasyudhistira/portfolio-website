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
    title: "Public Relations Staff KMTETI Universitas Gadjah Mada",
    location: "Yogyakarta, Indonesia",
    description:
      "Managed public communications and organized major events for 2 years. Built strong teamwork, project management, and leadership skills through coordinating organizational initiatives and strategic communications.",
    icon: React.createElement(FaHandshake),
    date: "2020 - 2022",
  },
  {
    title: "IT Intern",
    location: "Bekasi, Indonesia",
    description:
      "Completed 2-month IT internship analyzing existing web design and developing an improved design for the office. Gained hands-on experience in area mapping and government office operations.",
    icon: React.createElement(LuMap),
    date: "2022",
  },
  {
    title: "Bachelor of Engineering at Universitas Gadjah Mada",
    location: "Yogyakarta, Indonesia",
    description:
      "Graduated with GPA 3.51/4.00 after 4.5 years of rigorous study in information engineering and computer science.",
    icon: React.createElement(LuGraduationCap),
    date: "2019 - 2024",
  },
  {
    title: "Backend Developer at Ogya Tekno Nusantara",
    location: "Jakarta, Indonesia",
    description:
      "Worked as a backend developer for 2 years at an IT consulting firm serving multiple government and private sector clients. Developed and maintained server-side logic, database management, and API integrations to ensure seamless functionality and performance across various enterprise applications.",
    icon: React.createElement(CgWorkAlt),
    date: "2025 - now",
  }
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
    title: "Attendance on the Go (ATEGO) Mobile App",
    description:
      "I was a mobile app developer to create a mobile app for completing my thesis. The app is an automated presence system using GPS",
    tags: ["Flutter", "Dart", "Firebase"],
    imageUrl: ategoImg,
  },
  {
    title: "Sitoluhuta Village Website",
    description:
      "I worked as a web developer to create website for a small village in 50 days. The website is used to give information of the village and its potentials.",
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
