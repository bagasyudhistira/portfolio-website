import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Rail from "@/components/rail";
import FloatingNav from "@/components/floating-nav";
import ScrollSpy from "@/components/scroll-spy";
import ThemeContextProvider from "@/context/theme-context";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ??
        "https://portfolio-website-bagas-yudhistira-fauzis-projects.vercel.app"
    ),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        id: "/id",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${mono.variable} !scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-fg font-sans antialiased">
        <NextIntlClientProvider>
          <ThemeContextProvider>
            <ActiveSectionContextProvider>
              <FloatingNav />
              <ScrollSpy />
              <div className="lg:grid lg:grid-cols-[320px_1fr]">
                <Rail />
                <main className="mx-auto w-full max-w-[900px] px-5 pb-16 pt-24 sm:px-8 lg:px-12 lg:pt-24">
                  {children}
                </main>
              </div>
              <Toaster position="top-right" />
            </ActiveSectionContextProvider>
          </ThemeContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
