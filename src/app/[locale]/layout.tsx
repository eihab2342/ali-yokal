import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import SmoothScrollProvider from "@/app/Providers/SmoothScrollProvider";
import "@/styles/globals.css";
import { Toaster } from "sonner";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "عيادة دكتوراه العلاج التحفظي وتجميل الأسنان | دقة ميكرونية وعناية فردية",
  description:
    "عيادة متخصصة في العلاج التحفظي وتجميل الأسنان بالإسكندرية. حشوات تجميلية متقدمة، فينيرز، تبييض، علاج جذور وتركيبات وزراعة بأحدث التقنيات الرقمية والمسح ثلاثي الأبعاد 3D Intra-Oral Scanner.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={cairo.variable}>
      <body
        className="font-sans antialiased"
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <Toaster position="top-center" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
