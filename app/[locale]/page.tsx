import { setRequestLocale } from "next-intl/server";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Footer from "@/components/footer";
import Profile from "@/components/profile";
import Projects from "@/components/projects";
import Skills from "@/components/skills";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Keeps the route statically prerendered: the server-rendered Footer reads
  // translations, which would otherwise switch the page to request-time
  // rendering.
  setRequestLocale(locale);

  return (
    <div className="flex flex-col gap-12">
      <Profile />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
