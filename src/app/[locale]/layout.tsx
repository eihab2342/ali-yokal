import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import SmoothScrollProvider from "@/app/Providers/SmoothScrollProvider";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import Header from "@/components/Header/Header";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "عيادة دكتوراه العلاج التحفظي وتجميل الأسنان | دقة ميكرونية وعناية فردية",
  description:
    "عيادة متخصصة في العلاج التحفظي وتجميل الأسنان بالإسكندرية. حشوات تجميلية متقدمة، فينيرز، تبييض، علاج جذور وتركيبات وزراعة بأحدث التقنيات الرقمية والمسح ثلاثي الأبعاد 3D Intra-Oral Scanner.",
};

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
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header type="drawer" />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <Toaster position="top-center" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
