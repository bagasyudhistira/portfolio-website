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
        I am an Information Engineering graduate from Universitas Gadjah Mada
        with GPA 3.51 out of 4.00. Throughout my academic journey, I have
        developed a solid foundation in various aspects of information
        technology, including software development, database management,
        computer network, and system analysis. My coursework has equipped me
        with the technical proficiency to tackle complex IT challenges while
        fostering critical thinking and problem-solving abilities essential in
        the fast-paced IT industry.
      </p>

      <p>
        When I am not coding, I enjoy playing video games, watching movies, and
        hangout with my friends. I am currently learning about investment
        instruments such as stocks and cryptocurrency.
      </p>
    </motion.section>
  );
}
