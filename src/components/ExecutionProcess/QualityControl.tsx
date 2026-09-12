"use client";

import { Section, QualityControlItem } from "@/types/homeApiTypes";
import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";

export default function QualityControl({
  sections,
  qualityControl,
}: {
  sections?: Section;
  qualityControl?: QualityControlItem[];
}) {
  const t = useTranslations("home");

  const iconList = [
    (
      <svg key="icon-search" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-5 h-5">
        <circle cx="14" cy="14" r="8" />
        <path d="M20 20l6 6" strokeLinecap="round" />
        <path d="M11 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    (
      <svg key="icon-chart" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-5 h-5">
        <path d="M4 26l5-5m0 0l4 4m-4-4l7-7m0 0l4 4m-4-4l6-6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="25" cy="7" r="3" />
        <circle cx="5" cy="27" r="2" />
      </svg>
    ),
    (
      <svg key="icon-report" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-5 h-5">
        <rect x="4" y="5" width="24" height="22" rx="2" />
        <path d="M4 11h24" />
        <path d="M10 17l2 2 4-4M10 22h12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    (
      <svg key="icon-message" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-5 h-5">
        <path d="M8 6h16a2 2 0 012 2v18l-4-3H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
        <path d="M11 13l2 2 5-5M11 19h8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  ];

  const defaultQuality = [
    { id: 1, title: t("QC-Step-01-Title") || "تعقيم أوتوكلاف طبي من الفئة B", description: t("QC-Step-01-Desc") || "تطبيق أعلى بروتوكولات مكافحة العدوى والتعقيم الأوروبي لكل أداة على حدة." },
    { id: 2, title: t("QC-Step-02-Title") || "استخدام خامات وترميمات أوروبية وأمريكية معتمدة", description: t("QC-Step-02-Desc") || "أفضل أنواع الكومبوزيت والسيراميك ذات المتانة العالية والخصائص البيولوجية المتوافقة." },
    { id: 3, title: t("QC-Step-03-Title") || "عزل بكتيري تام أثناء العمل", description: t("QC-Step-03-Desc") || "منع أي تلوث بكتيري للسن أثناء جلسة العلاج لضمان نجاح الحشو واستقرار العصب." },
    { id: 4, title: t("QC-Step-04-Title") || "فحص الإطباق الدقيق والملمس الطبيعي", description: t("QC-Step-04-Desc") || "صقل وتلميع مجهري للأسنان لضمان الراحة التامة ومحاكاة مظهر السن الأصلي." },
  ];

  const backendItems = qualityControl || sections?.quality_control?.[0]?.items;
  const isOldContractingData = backendItems?.some((item) =>
    item.title?.includes("المواد") ||
    item.title?.includes("الموقع") ||
    item.title?.includes("مرحلة بمرحلة")
  );

  const qualityItems = backendItems && backendItems.length > 0 && !isOldContractingData
    ? backendItems
    : defaultQuality;

  return (
    <div className="pt-10 lg:pt-20 pb-10 lg:pb-20 max-w-7xl mx-auto">
      <div className="mb-14 text-center">
        <div className="qc-label inline-block mb-4">
          <span className="text-xs font-bold tracking-[0.35em] uppercase" style={{ color: "#52b788" }}>{t("QualityControl-Label")}</span>
          <div className="qc-header-line h-0.5 w-full mt-2" style={{ background: "linear-gradient(to right, transparent, #52b788, transparent)" }}></div>
        </div>
        <h2 className="qc-title text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight uppercase w-full" style={{ color: "#f8fafc" }}>
          {t("OurQuality")}{" "}
          <span style={{ background: "linear-gradient(135deg, #52b788 0%, #74c69d 50%, #2d6a4f 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {t("ControlProcess")}
          </span>
        </h2>
      </div>

      <div className="qc-list grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {qualityItems.map((item, i) => (
          <div key={item.id || i} className="qc-row group relative p-px rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
            {/* Gradient Border Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#52b788]/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative h-full p-6 sm:p-7 rounded-[1.4rem] bg-[#141f1b]/80 backdrop-blur-xl border border-[#52b788]/15 flex flex-col gap-5">
              {/* Top: Icon & Number */}
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-[#52b788]/20 bg-[#52b788]/5 text-[#52b788] group-hover:scale-110 transition-transform">
                  {iconList[i] || <ShieldCheck className="w-5 h-5" />}
                </div>
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#52b788]/20 to-[#2d6a4f]/10 group-hover:from-[#52b788]/50 group-hover:to-[#74c69d]/30 transition-all duration-700 leading-none">
                  {(i + 1).toString().padStart(2, "0")}
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#f8fafc] mb-2 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-[#f8fafc]/70 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#52b788]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
