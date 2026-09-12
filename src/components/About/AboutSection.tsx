"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import doctorAboutImg from "@/assets/_DSC8629 copy.JPG.jpeg";
import { useTranslations } from "next-intl";
import { About, AboutSectionData, Statistic } from "@/types/homeApiTypes";
import { Check } from "lucide-react";
import { cleanImageUrl } from "@/lib/utils";

export default function AboutSection({
  aboutSection,
  about,
  statistics,
}: {
  aboutSection?: AboutSectionData;
  about?: About;
  statistics?: Statistic[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations("home");

  const badgesList = aboutSection?.features && aboutSection.features.length > 0
    ? aboutSection.features
    : about?.badges && about.badges.length > 0
    ? about.badges
    : [
        "دكتوراه في العلاج التحفظي وتجميل الأسنان",
        "تخصيص ساعة كاملة لكل مريض لضمان أعلى دقة",
        "تطبيق بروتوكول العزل الكامل Rubber Dam في كل جلسة",
        "استخدام أحدث ماسح رقمي 3D Scanner بدون مقاسات مزعجة",
        "إنقاذ وحماية العصب الطبيعي في حالات التسوس العميق",
        "خدمة معتمدة لمرتادي نادي سبورتنج وطلبة الجامعة ونقابة المهن الطبية",
      ];

  const defaultStats = [
    { id: 1, title: t("Projects Delivered") || "حالة تجميلية ناجحة", count: aboutSection?.satisfied_cases_count || 250 },
    { id: 2, title: t("Collaborations") || "سنوات خبرة وتميز", count: aboutSection?.experience_years || 12 },
    { id: 3, title: t("Business Clients Reached") || "ساعة رعاية مخصصة", count: 60 },
    { id: 4, title: t("Projects Per Year") || "مرضى يومياً كحد أقصى", count: 4 },
  ];

  const statsList = statistics && statistics.length > 0 ? statistics : defaultStats;

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
            el.innerText = Math.floor(current) + "+";
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

  const values = aboutSection?.features && aboutSection.features.length > 0
    ? aboutSection.features.slice(0, 4).map((f) => (f.length > 28 ? f.substring(0, 28) + "..." : f))
    : ["دقة ميكرونية", "عزل تام RUBBER DAM", "ساعة لكل مريض", "بدون مقاسات مزعجة"];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden pt-28 pb-20 px-6 md:px-12 lg:px-20 bg-[#0c1311]"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="about-header text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#52b788] text-xs font-bold tracking-[0.5em] uppercase">
              {aboutSection?.label || t("About")}
            </span>
            <div className="about-header-line h-0.5 w-full bg-gradient-to-r from-transparent via-[#52b788] to-transparent mt-2" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f8fafc] leading-tight">
            {aboutSection?.title || (
              <>
                فلسفة العيادة{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#52b788] via-[#74c69d] to-[#40916c]">
                  والعلاج التحفظي
                </span>
              </>
            )}
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-20 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 about-description flex flex-col gap-6">
            {/* Mindset Quote Box */}
            <div className="relative p-5 rounded-2xl bg-gradient-to-r from-[#52b788]/15 via-[#141f1b] to-[#141f1b] border-r-4 border-[#52b788]">
              <p className="text-[#52b788] text-base sm:text-lg font-bold leading-relaxed">
                &ldquo;{aboutSection?.description_1 || t("Mindset Quote")}&rdquo;
              </p>
            </div>

            {/* Specialization Description */}
            <p className="text-[#cbd5e1] text-sm sm:text-[15px] leading-relaxed">
              {aboutSection?.description_2 || about?.description || t("Specialization")}
            </p>

            {/* Bullet points grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {badgesList.map((point, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-3 p-3.5 rounded-xl border border-[#52b788]/20 bg-[#141f1b] hover:border-[#52b788]/50 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-[#52b788]/15 text-[#52b788] group-hover:bg-[#52b788] group-hover:text-[#0c1311] transition-colors">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                  <span className="text-[#f8fafc]/90 text-xs sm:text-sm font-semibold leading-snug">
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
                  className="px-4 py-2 rounded-xl border border-[#52b788]/30 bg-[#52b788]/10 text-[#52b788] text-xs font-bold tracking-wider uppercase hover:bg-[#52b788] hover:text-[#0c1311] transition-all cursor-default"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column / Image Card */}
          <div className="lg:col-span-5 about-content-right flex justify-center">
            <div className="relative w-full max-w-[420px] rounded-[2.5rem] overflow-hidden border border-[#52b788]/30 group hover:border-[#52b788]/60 transition-all duration-700 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <div className="relative h-[520px] w-full">
                <Image
                  src={aboutSection?.doctor_image ? cleanImageUrl(aboutSection.doctor_image) : about?.image_url ? cleanImageUrl(about.image_url) : doctorAboutImg}
                  alt="Doctor Portrait"
                  fill
                  className="object-cover object-top brightness-95 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1311] via-transparent to-transparent opacity-80" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0c1311]/90 border border-[#52b788]/30 backdrop-blur-md">
                <p className="text-sm font-bold text-[#f8fafc]">
                  رعاية علاجية وتجميلية متكاملة
                </p>
                <p className="text-xs text-[#52b788] mt-1">
                  أعلى معايير الدقة والتعقيم والنتائج طويلة الأمد
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="about-divider h-px bg-gradient-to-r from-transparent via-[#52b788]/30 to-transparent mb-16" />

        {/* Stats Grid */}
        <div className="about-stats-container grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statsList.map((stat, index) => (
            <div
              key={stat.id || index}
              className="relative text-center py-8 px-4 bg-gradient-to-br from-[#141f1b] to-[#0c1311] rounded-3xl border border-[#52b788]/20 hover:border-[#52b788]/50 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(82,183,136,0.15)] overflow-hidden group"
            >
              <div className="relative z-10">
                <div
                  ref={(el) => {
                    statRefs.current[index] = el;
                  }}
                  data-value={stat.count}
                  className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#52b788] via-[#74c69d] to-[#40916c] mb-2"
                >
                  0+
                </div>
                <div className="h-0.5 w-8 bg-[#52b788] mx-auto mb-2.5 group-hover:w-14 transition-all duration-500" />
                <div className="text-[#cbd5e1] text-xs sm:text-[13px] font-bold uppercase tracking-wider">
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
