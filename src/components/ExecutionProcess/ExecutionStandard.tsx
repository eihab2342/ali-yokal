"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/types/homeApiTypes";
import { ShieldCheck } from "lucide-react";

export default function ExecutionStandard({ sections }: { sections: Section }) {
  const t = useTranslations("home");

  const iconList = [
    (
      <svg key="icon-plus" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-7 h-7">
        <path d="M4 14h20M14 4v20" strokeLinecap="round" />
        <circle cx="14" cy="14" r="3" />
        <path d="M14 4l3 3M14 4l-3 3" strokeLinecap="round" />
      </svg>
    ),
    (
      <svg key="icon-user" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-7 h-7">
        <circle cx="14" cy="9" r="4" />
        <path d="M6 24c0-4.4 3.6-8 8-8s8 3.6 8 8" strokeLinecap="round" />
      </svg>
    ),
    (
      <svg key="icon-card" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-7 h-7">
        <rect x="3" y="5" width="22" height="18" rx="2" />
        <path d="M3 10h22" />
        <path d="M8 15h4M8 19h4" strokeLinecap="round" />
      </svg>
    ),
    (
      <svg key="icon-triangle" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-7 h-7">
        <path d="M14 3l11 19H3L14 3z" />
        <path d="M14 11v5" strokeLinecap="round" />
      </svg>
    ),
    (
      <svg key="icon-target" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-7 h-7">
        <circle cx="7.5" cy="15.5" r="5.5" />
        <path d="m21 2-9.6 9.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m15.5 7.5 3 3L22 7l-3-3-3.5 3.5Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  ];

  const defaultStandards = [
    { id: 1, title: t("Std-Step-01-Title") || "الفحص المجهري واختبار حيوية العصب (Vitality Test)", description: t("Std-Step-01-Desc") || "تشخيص فائق الدقة لحالة العصب والسن قبل البدء لتحديد أقل خطة علاجية تدخلية ممكنة." },
    { id: 2, title: t("Std-Step-02-Title") || "العزل المطاطي الشامل (Rubber Dam Isolation)", description: t("Std-Step-02-Desc") || "عزل السن تماماً عن لعاب وبكتيريا الفم لضمان أعلى مستويات التعقيم وقوة التصاق المواد الترميمية." },
    { id: 3, title: t("Std-Step-03-Title") || "المسح الضوئي الرقمي (3D Intra-Oral Scanner)", description: t("Std-Step-03-Desc") || "أخذ مقاسات الأسنان بدقة ميكرونية عبر كاميرا رقمية متطورة دون الحاجة للمعجون والمقاسات التقليدية المزعجة." },
    { id: 4, title: t("Std-Step-04-Title") || "جلسة هادئة ومخصصة (ساعة كاملة لكل مريض)", description: t("Std-Step-04-Desc") || "لا تسرع ولا ازدحام — نمنح كل مريض الوقت الكافي لتحقيق أدق التفاصيل التشريحية والجمالية للسن." },
    { id: 5, title: t("Std-Step-05-Title") || "المتابعة والضمان طويل الأمد", description: t("Std-Step-05-Desc") || "جلسات مراجعة للتأكد من راحة الإطباق واستقرار الحشوات والتركيبات وصحة اللثة." },
  ];

  const backendItems = sections?.standards?.[0]?.items;
  const isOldContractingData = backendItems?.some((item) =>
    item.title?.includes("الموقع") ||
    item.title?.includes("الميزانية") ||
    item.title?.includes("الامتثال") ||
    item.title?.includes("التنفيذي")
  );

  const standardsData = backendItems && backendItems.length > 0 && !isOldContractingData
    ? backendItems
    : defaultStandards;

  return (
    <div className="pt-16 pb-20 relative">
      {/* Header */}
      <div className="mb-14 text-center">
        <div className="std-label inline-block mb-4">
          <span className="text-xs font-bold tracking-[0.35em] uppercase" style={{ color: "#c9a750" }}>{t("ExecutionStandard-Label")}</span>
          <div className="std-header-line h-0.5 w-full mt-2 bg-gradient-to-r from-transparent via-[#c9a750] to-transparent"></div>
        </div>
        <h2 className="std-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[#e6d5c0] uppercase">
          {t("Our")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a750] via-[#b2913c] to-[#8c6d3b]">
            {t("Execution-Label")}
          </span>{" "}
          {t("Standard-Label")}
        </h2>
      </div>

      {/* Vertical Timeline/Stepper Layout */}
      <div className="relative space-y-12 std-list">
        {/* Central Vertical Line */}
        <div className="std-timeline absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#c9a750] via-[#c9a750]/20 to-transparent -translate-x-1/2 pointer-events-none"></div>

        {standardsData.map((item, i) => (
          <div key={item.id || i} className={`std-item group relative flex flex-col lg:flex-row items-center lg:items-center gap-8 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

            {/* Number/Icon Node */}
            <div className="relative z-10 w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-2xl bg-[#171410] border-2 border-[#c9a750] shadow-[0_0_20px_rgba(201,167,80,0.2)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(201,167,80,0.4)]">
              <span className="absolute -top-6 text-xs font-bold text-[#c9a750] tracking-widest">{String(i + 1).padStart(2, "0")}</span>
              <div className="text-[#c9a750]">{iconList[i] || <ShieldCheck className="w-7 h-7" />}</div>
            </div>

            {/* Content Card */}
            <div className={`flex-1 p-8 rounded-3xl bg-gradient-to-br from-[#171410] to-[#252119] border border-[#c9a750]/10 hover:border-[#c9a750]/40 transition-all duration-500 lg:w-[45%] text-center ${i % 2 !== 0 ? 'lg:text-right' : 'lg:text-left'}`}>
              <h3 className="text-xl md:text-3xl font-bold text-[#e6d5c0] mb-4 text-start">
                {item.title}
              </h3>
              <p className="text-[#e6d5c0]/60 text-base md:text-lg text-start leading-relaxed max-w-lg mx-auto lg:mx-0">
                {item.description}
              </p>

              {/* Decorative detail */}
              <div className={`mt-6 h-1 w-12 bg-[#c9a750] group-hover:w-full transition-all duration-700 mx-auto ${i % 2 !== 0 ? 'lg:ml-auto' : 'lg:mr-auto'}`}></div>
            </div>

            {/* Empty space for alternating layout */}
            <div className="hidden lg:block lg:w-[45%]"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

