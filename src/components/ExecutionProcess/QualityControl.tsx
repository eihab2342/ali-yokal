"use client";

import { Section } from "@/types/homeApiTypes";
import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";

export default function QualityControl({ sections }: { sections: Section }) {
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

  const backendItems = sections?.quality_control?.[0]?.items;
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
          <span className="text-xs font-bold tracking-[0.35em] uppercase" style={{ color: "#c9a750" }}>{t("QualityControl-Label")}</span>
          <div className="qc-header-line h-0.5 w-full mt-2" style={{ background: "linear-gradient(to right, transparent, #c9a750, transparent)" }}></div>
        </div>
        <h2 className="qc-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight uppercase w-full" style={{ color: "#e6d5c0" }}>
          {t("OurQuality")}{" "}
          <span style={{ background: "linear-gradient(135deg, #c9a750 0%, #b2913c 50%, #8c6d3b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {t("ControlProcess")}
          </span>
        </h2>
      </div>

      <div className="qc-list grid grid-cols-1 md:grid-cols-2 gap-6">
        {qualityItems.map((item, i) => (
          <div key={item.id || i} className="qc-row group relative p-px rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
            {/* Gradient Border Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9a750]/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative h-full p-8 rounded-[1.4rem] bg-[#171410]/80 backdrop-blur-xl border border-[#c9a750]/10 flex flex-col gap-6">
              {/* Top: Icon & Number */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-[#c9a750]/20 bg-[#c9a750]/5 text-[#c9a750] group-hover:scale-110 transition-transform">
                  {iconList[i] || <ShieldCheck className="w-5 h-5" />}
                </div>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#c9a750]/20 to-[#8c6d3b]/10 group-hover:from-[#c9a750]/40 group-hover:to-[#8c6d3b]/20 transition-all duration-700 leading-none">
                  {(i + 1).toString().padStart(2, "0")}
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl font-bold text-[#e6d5c0] mb-3 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-[#e6d5c0]/60 text-base leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#c9a750]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
