import ategoImg from "@/public/atego.webp";
import desasitoluhutaImg from "@/public/desasitoluhuta.webp";
import type { SiteContent } from "./types";

export const id: SiteContent = {
  hero: {
    name: "Bagas Yudhistira Fauzi",
    metrics: [
      { value: "2 tahun", label: "membangun back-end enterprise" },
      { value: "3", label: "sistem di sektor keuangan dan pemerintahan" },
      { value: "3,51", label: "IPK, cum laude UGM" },
    ],
  },
  projects: [
    {
      slug: "crm-system",
      title: "Sistem Customer Relationship Management",
      org: "Klien bank digital, melalui Ogya Tekno Nusantara",
      period: "Jul 2026 – sekarang",
      summary:
        "Pekerjaan back-end dan full-stack pada modul operasional inti CRM korporat yang dipakai salah satu bank digital terkemuka di Indonesia.",
      bullets: [
        "Membangun modul manajemen tugas dan alur CRUD parameter dengan Java Spring dan PostgreSQL",
        "Merancang antarmuka server-side rendering memakai Thymeleaf dan Spring MVC untuk menekan beban state di klien",
        "Memperkuat validasi input dan penanganan galat pada alur parameter agar integritas data terjaga",
      ],
      stack: ["Java", "Spring", "Spring MVC", "Thymeleaf", "PostgreSQL"],
      confidential: true,
    },
    {
      slug: "digital-library",
      title: "Enterprise Digital Library",
      org: "Klien bank digital, melalui Ogya Tekno Nusantara",
      period: "Jan 2026 – sekarang",
      summary:
        "Sistem manajemen dokumen berketersediaan tinggi untuk akses pengetahuan internal dan pelaporan kepatuhan regulasi.",
      bullets: [
        "Merancang skema PostgreSQL dan strategi indeks untuk pengambilan dokumen regulasi secara cepat",
        "Membangun modul siklus hidup dokumen dengan kontrol akses, kategorisasi otomatis, dan penanganan konten yang aman",
        "Menjaga konsumsi sumber daya tetap ringan dengan rendering di sisi server alih-alih lalu lintas API berulang",
      ],
      stack: ["Java", "Spring", "PostgreSQL", "Thymeleaf"],
      confidential: true,
    },
    {
      slug: "family-data",
      title: "Sistem Informasi Data Keluarga Nasional",
      org: "Kementerian sektor kependudukan, melalui Ogya Tekno Nusantara",
      period: "Jan 2025 – Des 2025",
      summary:
        "Modul pelaporan dan pengolahan data dalam sistem kependudukan nasional yang melayani volume harian tinggi.",
      bullets: [
        "Membangun modul pelaporan dengan Spring Boot dan JasperReports di atas alur back-end yang sudah berjalan",
        "Menerapkan endpoint berthroughput tinggi dengan validasi ketat, pemetaan DTO, dan lapisan data MyBatis",
        "Menala query produksi dan menelusuri masalah langsung untuk menekan beban server serta menjaga akurasi data",
      ],
      stack: ["Spring Boot", "MyBatis", "JasperReports", "SQL"],
      confidential: true,
    },
    {
      slug: "hospital-referral",
      title: "Sistem Administrasi Rujukan Rumah Sakit",
      org: "Proyek capstone, Universitas Gadjah Mada",
      period: "2022 – 2023",
      summary:
        "Sistem administrasi berbasis web untuk alur rujukan antar fasilitas kesehatan. Dibangun sebagai proyek capstone akhir masa studi; kode tidak dipublikasikan.",
      bullets: [
        "Memodelkan alur rujukan dari rekam pasien hingga fasilitas penerima",
        "Membangun sisi administrasi sebagai aplikasi web full-stack",
      ],
      stack: ["Web", "Basis data", "Full-stack"],
    },
    {
      slug: "atego",
      title: "ATEGO — Aplikasi Presensi GPS",
      org: "Proyek skripsi, Universitas Gadjah Mada",
      period: "2023 – 2024",
      summary:
        "Aplikasi presensi bergerak yang memverifikasi kehadiran berdasarkan lokasi GPS, dibangun sebagai skripsi.",
      bullets: [
        "Deteksi kehadiran otomatis berdasarkan geolokasi pengguna",
        "Klien mobile dengan Firebase sebagai penyimpanan data",
      ],
      stack: ["Flutter", "Dart", "Firebase"],
      image: ategoImg,
    },
    {
      slug: "sitoluhuta",
      title: "Website Desa Sitoluhuta",
      org: "Pengabdian masyarakat (KKN-PPM UGM), Samosir",
      period: "2022",
      summary:
        "Situs informasi desa di Samosir yang memublikasikan program dan potensi lokal kepada publik.",
      bullets: [
        "Merancang dan membangun situs dari awal selama pengabdian masyarakat",
        "Membuat konten visual pendukung untuk program tersebut",
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
      period: "Jan 2025 – sekarang",
      description:
        "Layanan dan API back-end untuk klien konsultan di sektor perbankan dan pemerintahan. Menangani logika bisnis, standar validasi, dan penalaan performa, serta bekerja lintas back-end dan integrasi full-stack dalam tim agile.",
      icon: "work",
    },
    {
      title: "Asisten Proyek Senior Cloud Computing",
      org: "Departemen Teknik Elektro dan Teknologi Informasi, UGM",
      location: "Yogyakarta, Indonesia",
      period: "Feb 2023 – Jun 2023",
      description:
        "Memimpin tim proyek mahasiswa pada topik cloud computing dan mengarahkan integrasi Azure Cognitive Services serta fitur AI ke solusi mereka.",
      icon: "cloud",
    },
    {
      title: "Magang Teknologi Informasi",
      org: "Kementerian Agraria dan Tata Ruang",
      location: "Bekasi, Indonesia",
      period: "Jan 2022 – Mar 2022",
      description:
        "Menganalisis antarmuka aplikasi Lampion, mengidentifikasi titik keluhan pengguna, dan mengusulkan perbaikan UX kepada pemangku kepentingan.",
      icon: "map",
    },
    {
      title: "Sarjana Teknik, Teknik Informasi",
      org: "Universitas Gadjah Mada",
      location: "Yogyakarta, Indonesia",
      period: "2019 – 2024",
      description:
        "Lulus cum laude dengan IPK 3,51/4,00. Skripsi tentang aplikasi presensi berbasis GPS; capstone tentang sistem rujukan rumah sakit.",
      icon: "graduation",
    },
    {
      title: "Kepala Divisi Advokasi",
      org: "KMTETI UGM",
      location: "Yogyakarta, Indonesia",
      period: "Jul 2021 – Des 2021",
      description:
        "Memperjuangkan aspirasi kesejahteraan mahasiswa — pembiayaan, fasilitas, akademik, dan kebijakan — kepada pemangku kepentingan departemen.",
      icon: "handshake",
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
      "Penalaan SQL",
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
