import ategoImg from "@/public/atego.webp";
import desasitoluhutaImg from "@/public/desasitoluhuta.webp";
import type { SiteContent } from "./types";

export const en: SiteContent = {
  hero: {
    name: "Bagas Yudhistira Fauzi",
    metrics: [
      { value: "2 yrs", label: "building enterprise back-end" },
      { value: "3", label: "systems shipped in finance and government" },
      { value: "3.51", label: "GPA, cum laude at UGM" },
    ],
  },
  projects: [
    {
      slug: "crm-system",
      title: "Customer Relationship Management System",
      org: "Digital banking client, via Ogya Tekno Nusantara",
      period: "Jul 2026 – present",
      summary:
        "Back-end and full-stack work on the core operational modules of a corporate CRM used by a leading Indonesian digital bank.",
      bullets: [
        "Developed task-management and parameter CRUD flows in Java Spring, backed by PostgreSQL",
        "Architected server-rendered interfaces with Spring and Thymeleaf, cutting client-side state overhead",
        "Hardened input validation and error handling across parameter workflows to protect data integrity",
      ],
      stack: ["Spring", "Thymeleaf", "PostgreSQL"],
      confidential: true,
    },
    {
      slug: "digital-library",
      title: "Enterprise Digital Library",
      org: "Digital banking client, via Ogya Tekno Nusantara",
      period: "Jan 2026 – present",
      summary:
        "High-availability document management system for internal knowledge access and regulatory compliance reporting.",
      bullets: [
        "Designed PostgreSQL schemas and indexing strategies for fast retrieval of regulatory documents",
        "Built document lifecycle modules with access control, automated categorisation and secure content handling",
        "Kept the service light on resources by rendering on the server instead of shipping API round-trips",
      ],
      stack: ["Spring", "Thymeleaf", "PostgreSQL"],
      confidential: true,
    },
    {
      slug: "family-data",
      title: "National Family Data Information System",
      org: "Government ministry (population sector), via Ogya Tekno Nusantara",
      period: "Jan 2025 – Dec 2025",
      summary:
        "Reporting and data modules inside a national population system serving high daily volume.",
      bullets: [
        "Built reporting modules with Spring Boot and JasperReports on top of existing back-end workflows",
        "Implemented high-throughput endpoints with strict validation, DTO mapping and a MyBatis data layer",
        "Tuned production queries and debugged live issues to cut server load and protect data accuracy",
      ],
      stack: ["Spring Boot", "MyBatis", "JasperReports", "SQL"],
      confidential: true,
    },
    {
      slug: "atego",
      title: "ATEGO — GPS Attendance App",
      org: "Thesis project, Universitas Gadjah Mada",
      period: "2023 – 2024",
      summary:
        "Mobile attendance application that verifies presence by GPS location, built as my undergraduate thesis.",
      bullets: [
        "Automatic presence detection based on the user's geolocation",
        "Mobile client with Firebase as the backing store",
      ],
      stack: ["Flutter", "Dart", "Firebase"],
      image: ategoImg,
    },
    {
      slug: "hospital-referral",
      title: "Integrated Hospital Referral System",
      org: "Capstone project, Universitas Gadjah Mada",
      period: "2022 – 2023",
      summary:
        "Back-end developer on a web-based system that handles hospital referral flows between healthcare facilities. Capstone project of my degree; the source is not public.",
      bullets: [
        "Built the back-end with Spring Boot: the referral workflow from patient record to receiving facility",
        "Implemented the administration data model and the server-side logic behind it",
      ],
      stack: ["Spring Boot", "Back-end", "Database"],
    },
    {
      slug: "sitoluhuta",
      title: "Sitoluhuta Village Website",
      org: "Community service (KKN-PPM UGM), Samosir",
      period: "2022",
      summary:
        "Information website for a village in Samosir, publishing local programmes and potential to the public.",
      bullets: [
        "Designed and built the site end to end during community service",
        "Produced the supporting visual content for the programme",
      ],
      stack: ["WordPress", "HTML", "CSS"],
      image: desasitoluhutaImg,
    },
  ],
  experiences: [
    {
      title: "Junior Back-End Developer",
      org: "Ogya Tekno Nusantara",
      location: "Jakarta, Indonesia",
      period: "Jan 2025 – present",
      description:
        "Back-end services and APIs for consulting clients in banking and government. Owns business logic, validation standards and performance tuning, and works across back-end and full-stack integration in an agile team.",
      icon: "work",
    },
    {
      title: "Cloud Computing Senior Project Assistant",
      org: "Department of Electrical and Information Engineering, UGM",
      location: "Yogyakarta, Indonesia",
      period: "Feb 2023 – Jun 2023",
      description:
        "Led a student project team on cloud computing, guided integration of Azure Cognitive Services and AI features into their solutions.",
      icon: "cloud",
    },
    {
      title: "IT Intern",
      org: "Ministry of Agrarian Affairs and Spatial Planning",
      location: "Bekasi, Indonesia",
      period: "Jan 2022 – Mar 2022",
      description:
        "Audited the Lampion application's interface, identified pain points and proposed UX improvements to stakeholders.",
      icon: "map",
    },
    {
      title: "Head of Advocacy Division",
      org: "KMTETI UGM",
      location: "Yogyakarta, Indonesia",
      period: "Jul 2021 – Dec 2021",
      description:
        "Represented student welfare concerns — financing, facilities, academics and policy — to department stakeholders.",
      icon: "handshake",
    },
    {
      title: "Bachelor of Engineering, Information Engineering",
      org: "Universitas Gadjah Mada",
      location: "Yogyakarta, Indonesia",
      period: "Aug 2019 – Jan 2024",
      description:
        "Graduated cum laude with a GPA of 3.51/4.00. Thesis on a GPS-based attendance application; capstone on a hospital referral system.",
      icon: "graduation",
    },
  ],
  skills: {
    core: [
      "Java",
      "Spring Boot",
      "Spring MVC",
      "Thymeleaf",
      "MyBatis",
      "JDBC",
      "PostgreSQL",
      "SQL tuning",
      "JasperReports",
      "REST API",
      "Git",
      "Python",
    ],
    familiar: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Flutter",
      "Dart",
      "Firebase",
      "Figma",
      "Cisco Packet Tracer",
    ],
  },
};
