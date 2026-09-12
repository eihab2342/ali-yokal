"use client";

import { Section } from "@/types/homeApiTypes";
import { useLocale, useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

export default function StepByStepExecution({ sections }: { sections: Section }) {
  const t = useTranslations("home");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const iconList = [
    (
      <svg key="icon-search-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-9 h-9">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" strokeLinecap="round" />
        <path d="M8 11h6M11 8v6" strokeLinecap="round" />
      </svg>
    ),
    (
      <svg key="icon-edit" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-9 h-9">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    (
      <svg key="icon-layers" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-9 h-9">
        <path d="M12 2 2 7l10 5 10-5-10-5Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m2 17 10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    (
      <svg key="icon-check-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-9 h-9">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m9 11 3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  ];

  const defaultSteps = [
    { id: 1, title: t("Execution-Step-1") || "الفحص والتشخيص الرقمي الدقيق" },
    { id: 2, title: t("Execution-Step-2") || "العزل الكامل Rubber Dam وتطبيق البروتوكول" },
    { id: 3, title: t("Execution-Step-3") || "العلاج الميكروني وترميم السن الطبيعي" },
    { id: 4, title: t("Execution-Step-4") || "المسح ثلاثي الأبعاد والتسليم النهائي" },
  ];

  const backendItems = sections?.step_by_step?.[0]?.items;
  const isOldContractingData = backendItems?.some((item) =>
    item.title?.includes("النطاق") ||
    item.title?.includes("التصميم") ||
    item.title?.includes("الإحاطة") ||
    item.title?.includes("الموقع")
  );

  const executionStepsData = backendItems && backendItems.length > 0 && !isOldContractingData
    ? backendItems
    : defaultSteps;

  return (
    <div className="py-10 lg:py-20">
      <div className="mb-14 text-center">
        <div className="ep-label inline-block mb-4">
          <span className="text-xs font-bold tracking-[0.35em] uppercase" style={{ color: "#c9a750" }}>{t("Our Process")}</span>
          <div className="ep-header-line h-0.5 w-full mt-2" style={{ background: "linear-gradient(to right, transparent, #c9a750, transparent)" }}></div>
        </div>
        <h2 className="ep-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4 uppercase" style={{ color: "#e6d5c0" }}>
          {t("Step-by-Step")}{" "}
          <span style={{ background: "linear-gradient(135deg, #c9a750 0%, #b2913c 50%, #8c6d3b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {t("Execution")}
          </span>
        </h2>
      </div>

      {/* Desktop */}
      <div className="exec-steps hidden lg:block">
        <div className="relative flex items-start">
          {executionStepsData.map((step, i) => (
            <div key={step.id || i} className="relative flex items-center flex-1 min-w-0">
              <div className="exec-card flex flex-col items-center text-center flex-1 min-w-0 px-4">
                <div className="relative mb-8">
                  <div className="absolute rounded-full border" style={{ inset: "-18px", borderColor: "rgba(201,167,80,0.12)" }} />
                  <div className="absolute rounded-full border" style={{ inset: "-8px", borderColor: "rgba(201,167,80,0.28)" }} />
                  <div className="relative w-24 h-24 rounded-full flex items-center justify-center"
                    style={{ border: "1.5px solid rgba(201,167,80,0.8)", background: "linear-gradient(135deg, rgba(201,167,80,0.12), rgba(140,109,59,0.06))", boxShadow: "0 0 40px rgba(201,167,80,0.18), inset 0 0 20px rgba(201,167,80,0.05)" }}>
                    <div style={{ color: "#c9a750" }}>{iconList[i] || <ShieldCheck className="w-9 h-9" />}</div>
                  </div>
                  <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "#171410", border: "1px solid rgba(201,167,80,0.8)" }}>
                    <span className="text-[9px] font-black tabular-nums" style={{ color: "#c9a750" }}>{(i + 1).toString().padStart(2, "0")}</span>
                  </div>
                </div>
                <h3 className="text-sm font-semibold leading-snug max-w-[140px]" style={{ color: "#e6d5c0" }}>
                  {step.title}
                </h3>
                <div className="mt-3 h-px" style={{ width: "40px", background: "#c9a750" }} />
              </div>
              {i < executionStepsData.length - 1 && (
                <div className={`exec-connector flex-shrink-0 flex items-center ${isRtl ? 'scale-x-[-1]' : ''}`} style={{ marginTop: "-60px", width: "80px" }}>
                  <svg width="80" height="48" viewBox="0 0 80 48" fill="none" style={{ overflow: "visible" }}>
                    <defs>
                      <linearGradient id={`cg${i}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#c9a750" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#c9a750" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    <path d="M0 24 C18 24, 18 36, 40 36 C62 36, 62 24, 80 24" stroke={`url(#cg${i})`} strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" fill="none" />
                    <path d="M73 20 L80 24 L73 28" stroke="#c9a750" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: 3D Step-by-Step Swiper */}
      <div className="lg:hidden relative pb-8">
        <div className="flex items-center justify-center gap-2 mb-4 text-xs text-[#c9a750]/80">
          <span>👈 اسحب للتنقل بين مراحل العلاج 👉</span>
        </div>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[EffectCoverflow, Pagination]}
          className="w-full py-4 overflow-visible"
        >
          {executionStepsData.map((step, i) => (
            <SwiperSlide key={step.id || i} className="!w-[85vw] max-w-[340px]">
              <div
                className="relative rounded-3xl p-7 border overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                style={{
                  borderColor: "rgba(201,167,80,0.6)",
                  background: "linear-gradient(145deg, rgba(31,27,22,0.95), rgba(23,20,16,0.98))",
                }}
              >
                {/* Top Accent Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: "linear-gradient(90deg, #c9a750, #8c6d3b, #c9a750)",
                  }}
                />

                {/* Step Header */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      border: "1.5px solid rgba(201,167,80,0.8)",
                      background: "linear-gradient(135deg, rgba(201,167,80,0.18), rgba(140,109,59,0.08))",
                      boxShadow: "0 0 25px rgba(201,167,80,0.25)",
                      color: "#c9a750",
                    }}
                  >
                    {iconList[i] || <ShieldCheck className="w-8 h-8" />}
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase block text-[#c9a750]">
                      {t("Step")}
                    </span>
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#c9a750] to-[#e6d5c0]">
                      0{i + 1}
                    </span>
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-bold text-[#e6d5c0] leading-snug mb-3">
                  {step.title}
                </h3>

                {/* Protocol Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c9a750]/10 border border-[#c9a750]/30 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9a750] animate-pulse"></span>
                  <span className="text-xs text-[#c9a750] font-medium">بروتوكول تخصصي دقيق</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
