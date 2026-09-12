"use client";

import { Scan, ShieldCheck, Zap, Smile, CheckCircle2 } from "lucide-react";
import Image from "next/image";

import { ScannerTechnologySectionData } from "@/types/homeApiTypes";
import { cleanImageUrl } from "@/lib/utils";

export default function ScannerSection({
  scannerSection,
}: {
  scannerSection?: ScannerTechnologySectionData;
}) {
  const defaultFeatures = [
    {
      icon: Smile,
      title: "وداعاً للمقاسات المعجونية المزعجة",
      description: "تجربة فحص مريحة بدون أي شعور بالغثيان أو الطعم غير المريح للمقاسات التقليدية القديمة.",
    },
    {
      icon: Zap,
      title: "مسح ضوئي ثلاثي الأبعاد في ثوانٍ",
      description: "كاميرا رقمية دقيقة تلتقط آلاف الصور الميكرونية للأسنان لتوليد نموذج ثلاثي الأبعاد فوري بدقة متناهية.",
    },
    {
      icon: ShieldCheck,
      title: "دقة متناهية تلغي الخطأ البشري",
      description: "تطابق تام للفينيرز والتركيبات والحشوات من أول جلسة، مما يوفر وقتك ويضمن إطباقاً مريحاً وطبيعياً.",
    },
    {
      icon: Scan,
      title: "محاكاة فورية للابتسامة",
      description: "رؤية النتيجة المتوقعة للابتسامة والتركيبات على الشاشة الرقمية قبل البدء في التنفيذ.",
    },
  ];

  const icons = [Smile, Zap, ShieldCheck, Scan];

  const featuresToDisplay = scannerSection?.features && scannerSection.features.length > 0
    ? scannerSection.features.map((f, idx) => ({
        icon: icons[idx % icons.length],
        title: f.title,
        description: f.description,
      }))
    : defaultFeatures;

  const headerLabel = scannerSection?.label || "التكنولوجيا الرقمية في خدمتكم";
  const headerTitle = scannerSection?.title || "الماسح الفموي الرقمي 3D Scanner";
  const headerDesc = scannerSection?.description || scannerSection?.subtitle || "نستثمر في أحدث الأجهزة والتقنيات الطبية لنضمن لك تجربة علاجية استثنائية تجمع بين الراحة التامة وأعلى معايير الدقة العلمية.";
  const sectionImage = scannerSection?.image ? cleanImageUrl(scannerSection.image) : "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80";

  return (
    <section id="technology" className="relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#52b788]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#52b788]/40 bg-[#2d6a4f]/20 text-[#52b788] text-xs font-bold tracking-[0.25em] uppercase mb-4 shadow-[0_0_15px_rgba(82,183,136,0.15)]">
            <Scan className="w-3.5 h-3.5" />
            <span>{headerLabel}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f8fafc] leading-tight">
            {headerTitle}
          </h2>
          <p className="text-[#cbd5e1] max-w-2xl mx-auto mt-3.5 text-sm sm:text-[15px]">
            {headerDesc}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 sm:gap-5">
            {featuresToDisplay.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group p-5 rounded-2xl bg-gradient-to-br from-[#141f1b] to-[#0c1311] border border-[#52b788]/20 hover:border-[#52b788]/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(82,183,136,0.15)] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#52b788]/15 border border-[#52b788]/30 flex items-center justify-center text-[#52b788] group-hover:bg-[#52b788] group-hover:text-[#0c1311] transition-all duration-500 mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#f8fafc] mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[#94a3b8] text-xs sm:text-[13px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#52b788]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>معيار العيادة المعتمد</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Visual Box */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#52b788]/30 bg-gradient-to-br from-[#141f1b] to-[#0c1311] p-8 shadow-2xl">
              <div className="relative h-[260px] rounded-2xl overflow-hidden mb-6 border border-[#52b788]/20">
                <Image
                  src={sectionImage}
                  alt="Intra-Oral 3D Scanner"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1311] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#0c1311]/80 border border-[#52b788]/30 backdrop-blur-md">
                  <p className="text-xs font-bold text-[#52b788] text-center">
                    دقة ميكرونية فائقة للأنسجة والأسنان
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[#f8fafc]">
                  لماذا يفضل مرضانا المقاس الرقمي؟
                </h4>
                <ul className="space-y-2 text-sm text-[#cbd5e1]">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#52b788]" />
                    <span>مدة الفحص لا تتجاوز دقائق معدودة</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#52b788]" />
                    <span>إمكانية التوقف والاستراحة في أي لحظة أثناء المسح</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#52b788]" />
                    <span>إرسال الملف الرقمي مباشرة للمختبر المتخصص إلكترونياً</span>
                  </li>
                </ul>

                <a
                  href="#contact-us"
                  className="block text-center w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2d6a4f] via-[#40916c] to-[#52b788] text-white font-bold text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(82,183,136,0.3)]"
                >
                  تجربة فحص رقمي متطورة
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
