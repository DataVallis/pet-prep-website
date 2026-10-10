import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, localeMeta } from "@/i18n/config";
import { getDictionary } from "@/content";
import { site } from "@/lib/site";
import { graph, organizationLd, websiteLd } from "@/lib/jsonld";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ConsentAndAnalytics } from "@/components/ConsentAndAnalytics";
import { fontClasses } from "../fonts";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    applicationName: site.name,
    title: { default: dict.meta.siteTitle, template: `%s | ${site.name}` },
    description: dict.meta.siteDescription,
    keywords: dict.meta.keywords,
    authors: [{ name: site.company.name }],
    creator: site.company.name,
    publisher: site.company.name,
    category: "education",
    formatDetection: { telephone: false, email: false, address: false },
    manifest: "/manifest.webmanifest",
  };
}

export const viewport: Viewport = {
  themeColor: "#121614",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return (
    <html lang={localeMeta[locale].htmlLang} className={fontClasses}>
      <head>
        <ConsentAndAnalytics />
      </head>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={graph(organizationLd(dict), websiteLd(dict))} />
        <Header locale={locale} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
