"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useLocale } from "next-intl";
import { Home } from "@/types/homeApiTypes";
import doctorHeroImg from "@/assets/_DSC1018 copy.jpg.jpeg";
import { Sparkles, Shield, Clock, Scan, Award, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

const HEADER_HEIGHT = 64;

export default function HeroSection({ home: _unusedHome }: { home?: Home; [key: string]: unknown } = {}) {
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

  return (
    <section
      className="relative flex flex-col justify-center min-h-[100svh] w-full pt-28 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden bg-gradient-to-b from-[#13110d] via-[#1a1612] to-[#171410]"
      id="home"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-[#c9a750]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[400px] h-[400px] bg-[#b2913c]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left / Info Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            {/* Top Credential Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#c9a750]/30 bg-[#c9a750]/10 text-[#c9a750] text-xs font-bold tracking-wider mb-6 animate-fade-in-up">
              <Award className="w-4 h-4 text-[#c9a750]" />
              <span>دكتوراه في العلاج التحفظي وتجميل الأسنان</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#e6d5c0] leading-[1.15] mb-6 tracking-tight">
              <span className="block text-[#e6d5c0]">
                {isAr ? "فن الحفاظ على ابتسامتك الطبيعية" : "Preserving Your Natural Smile"}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c9a750] via-[#d4b568] to-[#8c6d3b] mt-2">
                {isAr ? "بأعلى دقة ميكرونية وعناية فردية" : "With Micron Precision & Dedicated Care"}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#e6d5c0]/75 max-w-2xl leading-relaxed mb-8">
              {isAr
                ? "نؤمن بأن أفضل سن هو سنك الطبيعي. نطبق بروتوكول العلاج التحفظي الدقيق مع العزل المطاطي الكامل وحماية العصب، ونخصص ساعة كاملة لكل مريض لضمان أقصى مستويات الراحة والجودة."
                : "We believe your natural tooth is irreplaceable. Applying meticulous conservative dentistry with full rubber dam isolation, pulp protection, and dedicating a full hour per patient for unmatched quality."}
            </p>

            {/* Key Quality Pillars / Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-8">
              <div className="p-3 rounded-2xl bg-[#1f1b16] border border-[#c9a750]/15 flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-[#c9a750] flex-shrink-0" />
                <span className="text-xs font-semibold text-[#e6d5c0]/90">عزل Rubber Dam</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1f1b16] border border-[#c9a750]/15 flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#c9a750] flex-shrink-0" />
                <span className="text-xs font-semibold text-[#e6d5c0]/90">ساعة لكل مريض</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1f1b16] border border-[#c9a750]/15 flex items-center gap-2.5">
                <Scan className="w-5 h-5 text-[#c9a750] flex-shrink-0" />
                <span className="text-xs font-semibold text-[#e6d5c0]/90">ماسح رقمي 3D</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1f1b16] border border-[#c9a750]/15 flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#c9a750] flex-shrink-0" />
                <span className="text-xs font-semibold text-[#e6d5c0]/90">حشو تجميلي دقيق</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                suppressHydrationWarning
                onClick={(e) => handleScroll(e, "#contact-us")}
                className="group relative cursor-pointer px-8 py-4 bg-gradient-to-r from-[#c9a750] via-[#b2913c] to-[#8c6d3b] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(201,167,80,0.25)] flex items-center gap-3"
              >
                <span className="relative z-10 text-[#171410] font-bold text-base tracking-wide">
                  احجز استشارتك الخاصة
                </span>
                <ArrowIcon className="w-5 h-5 text-[#171410] group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/201000000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D9%88%D8%AD%D8%AC%D8%B2%20%D9%85%D9%88%D8%B9%D8%AF%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%B9%D9%8A%D8%A7%D8%AF%D8%A9."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-2xl bg-[#1f1b16] border border-[#c9a750]/30 hover:border-[#c9a750] text-[#e6d5c0] font-semibold text-sm transition-all duration-300 flex items-center gap-2.5 hover:bg-[#c9a750]/10"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>تواصل واتساب</span>
              </a>
            </div>
          </div>

          {/* Right / Doctor Portrait Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Aura glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#c9a750]/20 to-transparent rounded-[2.5rem] filter blur-2xl transform scale-95" />

            <div className="relative w-full max-w-[420px] rounded-[2.5rem] overflow-hidden border-2 border-[#c9a750]/40 bg-gradient-to-b from-[#1f1b16] to-[#171410] shadow-[0_20px_60px_rgba(0,0,0,0.6)] group">
              {/* Doctor Image */}
              <div className="relative h-[480px] sm:h-[540px] w-full overflow-hidden">
                <Image
                  src={doctorHeroImg}
                  alt="Doctor Portrait - Conservative & Cosmetic Dentistry"
                  fill
                  priority
                  className="object-cover object-top filter brightness-[0.98] contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                />
                {/* Bottom gradient fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#171410] via-[#171410]/20 to-transparent" />
              </div>

              {/* Floating Profile Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#171410]/90 border border-[#c9a750]/30 backdrop-blur-md shadow-2xl">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-[#e6d5c0]">
                    عيادة العلاج التحفظي وتجميل الأسنان
                  </h3>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                </div>
                <p className="text-xs text-[#c9a750] font-semibold mb-2">
                  دكتوراه العلاج التحفظي • الإسكندرية (سبورتنج)
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#e6d5c0]/70 pt-2 border-t border-[#c9a750]/15">
                  <span>جلسات مخصصة بمواعيد مسبقة</span>
                  <span className="font-bold text-[#c9a750]">١ - ٤ مرضى يومياً</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
