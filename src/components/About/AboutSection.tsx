"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import doctorAboutImg from "@/assets/_DSC8629 copy.JPG.jpeg";
import { useTranslations } from "next-intl";
import { About, Statistic } from "@/types/homeApiTypes";
import { Check } from "lucide-react";
import { cleanImageUrl } from "@/lib/utils";

export default function AboutSection({ about, statistics }: { about: About; statistics: Statistic[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations("home");

  const defaultBadges = [
    "دكتوراه في العلاج التحفظي وتجميل الأسنان",
    "تخصيص ساعة كاملة لكل مريض لضمان أعلى دقة",
    "تطبيق بروتوكول العزل الكامل Rubber Dam في كل جلسة",
    "استخدام أحدث ماسح رقمي 3D Scanner بدون مقاسات مزعجة",
    "إنقاذ وحماية العصب الطبيعي في حالات التسوس العميق",
    "خدمة معتمدة لمرتادي نادي سبورتنج وطلبة الجامعة ونقابة المهن الطبية",
  ];

  const defaultStats = statistics && statistics.length > 0 ? statistics.map((s) => ({
    id: s.id,
    title: s.title,
    count: s.count,
    suffix: "+",
  })) : [
    { id: 1, title: "دكتوراه في العلاج التحفظي", count: 1, suffix: "" },
    { id: 2, title: "ساعة مخصصة لكل مريض", count: 60, suffix: " دقيقة" },
    { id: 3, title: "نسبة نجاح الحفاظ على العصب", count: 98, suffix: "%" },
    { id: 4, title: "مرضى يومياً لضمان الدقة", count: 4, suffix: " كحد أقصى" },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
      onComplete: () => {
        statRefs.current.forEach((el) => {
          if (!el) return;

          const endValue = Number(el.dataset.value) || 0;
          let current = 0;
          const duration = 1800;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = endValue / steps;

          const counter = setInterval(() => {
            current += increment;
            if (current >= endValue) {
              current = endValue;
              clearInterval(counter);
            }
            const suffix = el.dataset.suffix || "+";
            el.innerText = Math.floor(current) + suffix;
          }, stepTime);
        });
      },
    });

    // Header
    tl.from(".about-header", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    tl.from(
      ".about-header-line",
      {
        scaleX: 0,
        transformOrigin: "center",
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5"
    );

    // Content
    tl.from(
      ".about-description",
      {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5"
    );

    tl.from(
      ".about-content-right",
      {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.8"
    );
  }, []);

  const values = ["دقة ميكرونية", "عزل تام RUBBER DAM", "ساعة لكل مريض", "بدون مقاسات مزعجة"];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden pt-28 pb-20 px-6 md:px-12 lg:px-20 bg-[#171410]"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="about-header text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#c9a750] text-xs font-bold tracking-[0.5em] uppercase">
              {t("About")}
            </span>
            <div className="about-header-line h-0.5 w-full bg-gradient-to-r from-transparent via-[#c9a750] to-transparent mt-2" />
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#e6d5c0] leading-tight">
            فلسفة العيادة{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a750] via-[#b2913c] to-[#8c6d3b]">
              والعلاج التحفظي
            </span>
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-20 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 about-description flex flex-col gap-8">
            {/* Mindset Quote Box */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-r from-[#c9a750]/10 via-[#1f1b16] to-[#1f1b16] border-r-4 border-[#c9a750]">
              <p className="text-[#c9a750] text-lg sm:text-xl font-bold leading-relaxed">
                &ldquo;{t("Mindset Quote")}&rdquo;
              </p>
            </div>

            {/* Specialization Description */}
            <p className="text-[#e6d5c0]/75 text-base sm:text-lg leading-relaxed">
              {t("Specialization")}
            </p>

            {/* Bullet points grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {(about?.badges && about.badges.length > 0 ? about.badges : defaultBadges).map((point, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-3 p-3.5 rounded-xl border border-[#c9a750]/15 bg-[#1a1712] hover:border-[#c9a750]/40 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-[#c9a750]/10 text-[#c9a750] group-hover:bg-[#c9a750] group-hover:text-[#171410] transition-colors">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                  <span className="text-[#e6d5c0]/85 text-xs sm:text-sm font-semibold leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Value Pills */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {values.map((v) => (
                <span
                  key={v}
                  className="px-4 py-2 rounded-xl border border-[#c9a750]/20 bg-[#c9a750]/5 text-[#c9a750] text-xs font-bold tracking-wider uppercase hover:bg-[#c9a750] hover:text-[#171410] transition-all cursor-default"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column / Image Card */}
          <div className="lg:col-span-5 about-content-right flex justify-center">
            <div className="relative w-full max-w-[420px] rounded-[2.5rem] overflow-hidden border border-[#c9a750]/30 group hover:border-[#c9a750]/60 transition-all duration-700 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <div className="relative h-[520px] w-full">
                <Image
                  src={about?.image_url ? cleanImageUrl(about.image_url) : doctorAboutImg}
                  alt="Doctor Portrait"
                  fill
                  className="object-cover object-top brightness-95 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171410] via-transparent to-transparent opacity-80" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#171410]/90 border border-[#c9a750]/30 backdrop-blur-md">
                <p className="text-sm font-bold text-[#e6d5c0]">
                  رعاية علاجية وتجميلية متكاملة
                </p>
                <p className="text-xs text-[#c9a750] mt-1">
                  أعلى معايير الدقة والتعقيم والنتائج طويلة الأمد
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="about-divider h-px bg-gradient-to-r from-transparent via-[#c9a750]/30 to-transparent mb-16" />

        {/* Stats Grid */}
        <div className="about-stats-container grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {defaultStats.map((stat, index) => (
            <div
              key={stat.id}
              className="relative text-center py-8 px-4 bg-gradient-to-br from-[#1f1b16] to-[#171410] rounded-3xl border border-[#c9a750]/15 hover:border-[#c9a750]/40 transition-all duration-500 hover:shadow-2xl overflow-hidden group"
            >
              <div className="relative z-10">
                <div
                  ref={(el) => {
                    statRefs.current[index] = el;
                  }}
                  data-value={stat.count}
                  data-suffix={stat.suffix}
                  className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#c9a750] via-[#b2913c] to-[#8c6d3b] mb-3"
                >
                  0{stat.suffix}
                </div>
                <div className="h-0.5 w-10 bg-[#c9a750] mx-auto mb-3 group-hover:w-16 transition-all duration-500" />
                <div className="text-[#e6d5c0]/70 text-xs sm:text-sm font-bold uppercase tracking-wider">
                  {stat.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
