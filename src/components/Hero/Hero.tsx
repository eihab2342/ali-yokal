"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useLocale } from "next-intl";
import { Home, HeroSectionData, ClinicInfo } from "@/types/homeApiTypes";
import doctorHeroImg from "@/assets/_DSC1018 copy.jpg.jpeg";
import { Sparkles, Shield, Clock, Scan, Award, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { cleanImageUrl } from "@/lib/utils";

const HEADER_HEIGHT = 64;

export default function HeroSection({
  heroSection,
  clinicInfo,
  home,
}: {
  heroSection?: HeroSectionData;
  clinicInfo?: ClinicInfo;
  home?: Home;
} = {}) {
  const locale = useLocale();

  const handleScroll = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    const smoother = ScrollSmoother.get();
    const section = document.querySelector(target);
    if (!smoother || !section) return;

    const top = section.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
    const scrollProxy = { y: smoother.scrollTop() };

    gsap.to(scrollProxy, {
      y: top,
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: () => {
        smoother.scrollTo(scrollProxy.y, false);
      },
    });
  };

  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ChevronLeft : ChevronRight;

  const badgeText = heroSection?.badge || `${clinicInfo?.doctor_name || "د. علي ياقوت"} — ${clinicInfo?.doctor_title || "دكتوراه في العلاج التحفظي وتجميل الأسنان"}`;
  const titleMain = heroSection?.title_main || (isAr ? "فن الحفاظ على ابتسامتك الطبيعية" : "Preserving Your Natural Smile");
  const titleHighlight = heroSection?.title_highlight || (isAr ? "بأعلى دقة ميكرونية وعناية فردية" : "With Micron Precision & Dedicated Care");
  const descriptionText = heroSection?.description || home?.description || (isAr
    ? "نؤمن بأن أفضل سن هو سنك الطبيعي. نطبق بروتوكول العلاج التحفظي الدقيق مع العزل المطاطي الكامل وحماية العصب، ونخصص ساعة كاملة لكل مريض لضمان أقصى مستويات الراحة والجودة."
    : "We believe your natural tooth is irreplaceable. Applying meticulous conservative dentistry with full rubber dam isolation, pulp protection, and dedicating a full hour per patient for unmatched quality.");

  const whatsappLink = clinicInfo?.whatsapp || (clinicInfo?.phone ? `https://wa.me/${clinicInfo.phone.replace(/[^0-9]/g, "")}` : "https://wa.me/201000000000");

  const defaultPillars = [
    { icon: Shield, label: "عزل Rubber Dam" },
    { icon: Clock, label: "ساعة لكل مريض" },
    { icon: Scan, label: "ماسح رقمي 3D" },
    { icon: Sparkles, label: "حشو تجميلي دقيق" },
  ];

  return (
    <section
      className="relative flex flex-col justify-center min-h-[100svh] w-full pt-28 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden bg-gradient-to-b from-[#080d0b] via-[#0c1311] to-[#0c1311]"
      id="home"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-[#2d6a4f]/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[400px] h-[400px] bg-[#52b788]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left / Info Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            {/* Top Credential Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#52b788]/40 bg-[#2d6a4f]/20 text-[#52b788] text-xs font-bold tracking-wider mb-6 animate-fade-in-up shadow-[0_0_20px_rgba(82,183,136,0.2)]">
              <Award className="w-4 h-4 text-[#52b788]" />
              <span>{badgeText}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#f8fafc] leading-[1.15] mb-6 tracking-tight">
              <span className="block text-[#f8fafc]">
                {titleMain}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#52b788] via-[#74c69d] to-[#40916c] mt-2">
                {titleHighlight}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#cbd5e1] max-w-2xl leading-relaxed mb-8">
              {descriptionText}
            </p>

            {/* Key Quality Pillars / Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-8">
              {heroSection?.stats && heroSection.stats.length > 0 ? (
                heroSection.stats.slice(0, 4).map((st, idx) => (
                  <div key={st.id || idx} className="p-3 rounded-2xl bg-[#141f1b] border border-[#52b788]/20 flex flex-col items-start gap-1 hover:border-[#52b788]/50 transition-colors">
                    <span className="text-lg font-extrabold text-[#52b788]">{st.value}</span>
                    <span className="text-xs font-semibold text-[#f8fafc]/90">{st.label}</span>
                  </div>
                ))
              ) : (
                defaultPillars.map((p, idx) => {
                  const Icon = p.icon;
                  return (
                    <div key={idx} className="p-3 rounded-2xl bg-[#141f1b] border border-[#52b788]/20 flex items-center gap-2.5 hover:border-[#52b788]/50 transition-colors">
                      <Icon className="w-5 h-5 text-[#52b788] flex-shrink-0" />
                      <span className="text-xs font-semibold text-[#f8fafc]/90">{p.label}</span>
                    </div>
                  );
                })
              )}
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                suppressHydrationWarning
                onClick={(e) => handleScroll(e, "#contact-us")}
                className="group relative cursor-pointer px-8 py-4 bg-gradient-to-r from-[#2d6a4f] via-[#40916c] to-[#52b788] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(82,183,136,0.35)] flex items-center gap-3 text-white font-bold text-base tracking-wide"
              >
                <span>{heroSection?.cta_primary_text || "احجز استشارتك الخاصة"}</span>
                <ArrowIcon className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-2xl bg-[#141f1b] border border-[#52b788]/30 hover:border-[#52b788] text-[#f8fafc] font-semibold text-sm transition-all duration-300 flex items-center gap-2.5 hover:bg-[#2d6a4f]/20"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>{heroSection?.cta_whatsapp_text || "تواصل واتساب"}</span>
              </a>
            </div>
          </div>

          {/* Right / Doctor Portrait Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Aura glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2d6a4f]/30 to-[#52b788]/20 rounded-[2.5rem] filter blur-2xl transform scale-95" />

            <div className="relative w-full max-w-[420px] rounded-[2.5rem] overflow-hidden border-2 border-[#52b788]/40 bg-gradient-to-b from-[#141f1b] to-[#0c1311] shadow-[0_20px_60px_rgba(0,0,0,0.7)] group">
              {/* Doctor Image */}
              <div className="relative h-[480px] sm:h-[540px] w-full overflow-hidden">
                <Image
                  src={heroSection?.doctor_image ? cleanImageUrl(heroSection.doctor_image) : doctorHeroImg}
                  alt={clinicInfo?.doctor_name || "د. علي ياقوت - دكتوراه العلاج التحفظي وتجميل الأسنان"}
                  fill
                  priority
                  className="object-cover object-top filter brightness-[0.98] contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                />
                {/* Bottom gradient fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1311] via-[#0c1311]/25 to-transparent" />
              </div>

              {/* Floating Profile Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#0c1311]/95 border border-[#52b788]/35 backdrop-blur-md shadow-2xl">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-[#f8fafc]">
                    {clinicInfo?.name || "عيادة د. علي ياقوت للأسنان"}
                  </h3>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                </div>
                <p className="text-xs text-[#52b788] font-semibold mb-2">
                  {clinicInfo?.doctor_title || "دكتوراه العلاج التحفظي"} • {clinicInfo?.address || "الإسكندرية (سبورتنج)"}
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#cbd5e1] pt-2 border-t border-[#52b788]/20">
                  <span>{clinicInfo?.working_hours || "جلسات مخصصة بمواعيد مسبقة"}</span>
                  <span className="font-bold text-[#52b788]">١ - ٤ مرضى يومياً</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
