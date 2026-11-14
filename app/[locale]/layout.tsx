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
import MotionProvider from "@/components/motion-provider";
import { siteUrl } from "@/lib/site";
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
    metadataBase: siteUrl,
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
      locale: locale === "id" ? "id_ID" : "en_US",
      url: `/${locale}`,
      type: "website",
      images: [{ url: "/og", width: 1200, height: 630, alt: t("title") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [{ url: "/og", alt: t("title") }],
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
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-fg font-sans antialiased">
        <a href="#main-content" className="skip-link">
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <MotionProvider>
            <ThemeContextProvider>
              <ActiveSectionContextProvider>
                <FloatingNav />
                <ScrollSpy />
                <div className="lg:grid lg:grid-cols-[320px_1fr]">
                  <Rail />
                  <main
                    id="main-content"
                    tabIndex={-1}
                    className="mx-auto w-full max-w-[900px] scroll-mt-24 px-5 pb-16 pt-24 sm:px-8 lg:px-12 lg:pt-24"
                  >
                    {children}
                  </main>
                </div>
                <Toaster position="top-right" />
              </ActiveSectionContextProvider>
            </ThemeContextProvider>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
