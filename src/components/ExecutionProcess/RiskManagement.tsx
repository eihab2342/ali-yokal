"use client";

import { Section, RiskPreventionItem } from "@/types/homeApiTypes";
import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";

export default function RiskManagement({
  sections,
  riskPrevention,
}: {
  sections?: Section;
  riskPrevention?: RiskPreventionItem[];
}) {
  const t = useTranslations("home");

  const iconList = [
    (
      <svg key="icon-clock" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
        <circle cx="16" cy="16" r="11" />
        <path d="M16 9v7l4 4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 6l2.5 2.5M23.5 6L26 8.5" strokeLinecap="round" />
      </svg>
    ),
    (
      <svg key="icon-calendar" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
        <rect x="4" y="6" width="24" height="20" rx="2" />
        <path d="M4 11h24" />
        <path d="M10 16h4M10 20h4M18 16h4M18 20h4" strokeLinecap="round" />
      </svg>
    ),
    (
      <svg key="icon-shield" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
        <path d="M16 4l10 5v9c0 5-10 10-10 10S6 23 6 18V9l10-5z" />
        <path d="M11 16l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    (
      <svg key="icon-comment" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-6 h-6">
        <path d="M26 6H6a2 2 0 00-2 2v14l4-4h18a2 2 0 002-2V8a2 2 0 00-2-2z" />
        <path d="M10 13h12M10 17h7" strokeLinecap="round" />
      </svg>
    ),
  ];

  const defaultRisks = [
    { id: 1, title: t("Risk-Step-01-Title") || "الحفاظ على السن الطبيعي ومنع البرد الجائر", description: "" },
    { id: 2, title: t("Risk-Step-02-Title") || "تغطية العصب وتفادي علاج الجذور غير الضروري", description: "" },
    { id: 3, title: t("Risk-Step-03-Title") || "مقاسات رقمية بدون طبعات معجونية تسبب الغثيان", description: "" },
    { id: 4, title: t("Risk-Step-04-Title") || "مواعيد محددة بدقة وراحة تامة بدون انتظار", description: "" },
  ];

  const backendItems = riskPrevention || sections?.project_risks?.[0]?.items;
  const isOldContractingData = backendItems?.some((item) =>
    item.title?.includes("الموقع") ||
    item.title?.includes("الميزانية") ||
    item.title?.includes("أسبوعية")
  );

  const riskDataItems = backendItems && backendItems.length > 0 && !isOldContractingData
    ? backendItems
    : defaultRisks;

  return (
    <div className="pt-6 lg:pt-16 pb-10 lg:pb-20">
      <div className="mb-14 text-center">
        <div className="risk-label inline-block mb-4">
          <span className="text-xs font-bold tracking-[0.35em] uppercase" style={{ color: "#52b788" }}>{t("RiskManagement-Label")}</span>
          <div className="risk-header-line h-0.5 w-full mt-2" style={{ background: "linear-gradient(to right, transparent, #52b788, transparent)" }}></div>
        </div>
        <h2 className="risk-title text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight uppercase" style={{ color: "#f8fafc" }}>
          {t("HowWeControl")}{" "}
          <span style={{ background: "linear-gradient(135deg, #52b788 0%, #74c69d 50%, #2d6a4f 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {t("ProjectRisks")}
          </span>
        </h2>
      </div>

      <div className="risk-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {riskDataItems.map((item, i) => (
          <div key={item.id || i} className="risk-card group relative rounded-2xl border overflow-hidden"
            style={{ borderColor: "rgba(82,183,136,0.25)", background: "linear-gradient(145deg, rgba(82,183,136,0.08) 0%, rgba(12,19,17,0.7) 100%)" }}>
            <div className="h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
              style={{ background: "linear-gradient(to right, #52b788, #2d6a4f)" }} />
            <div className="p-7 flex flex-col gap-5">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 group-hover:border-[rgba(82,183,136,0.6)] group-hover:bg-[rgba(82,183,136,0.12)]"
                  style={{ borderColor: "rgba(82,183,136,0.25)", color: "#52b788", background: "rgba(82,183,136,0.05)" }}>
                  {iconList[i] || <ShieldCheck className="w-6 h-6" />}
                </div>
                <span className="text-5xl font-bold leading-none select-none"
                  style={{ background: "linear-gradient(135deg, rgba(82,183,136,0.25), rgba(45,106,79,0.1))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-base font-semibold leading-snug transition-colors duration-500 group-hover:opacity-100"
                style={{ color: "#f8fafc", opacity: 0.85 }}>
                {item.title}
              </h3>
              <div className="h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 mt-1"
                style={{ background: "linear-gradient(to right, rgba(82,183,136,0.45), transparent)" }} />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(82,183,136,0.1) 0%, transparent 70%)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
