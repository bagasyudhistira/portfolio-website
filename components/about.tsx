"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About", 1);

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        I am a passionate Backend Developer with a degree in Information
        Engineering from Universitas Gadjah Mada. I possess a solid foundation
        in web development, database management, and system architecture. My
        current focus is on creating robust and scalable backend systems, while
        I also have a keen interest in DevOps practices. I strive to optimize
        infrastructure and implement best practices in deployment and monitoring
        to ensure seamless operations and high performance.
      </p>

      <p>
        Outside of coding, I am an avid gamer and a movie enthusiast. I cherish
        quality time with friends and family. Currently, I am expanding my
        knowledge in investment instruments, focusing on stocks, bonds, and
        mutual funds, to better understand financial markets and make informed
        decisions.
      </p>
    </motion.section>
  );
}
