"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Sparkles, MoveHorizontal } from "lucide-react";

import { Project } from "@/types/homeApiTypes";
import { cleanImageUrl } from "@/lib/utils";

interface BeforeAfterItem {
  id: number;
  title: string;
  subtitle: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  tag: string;
}

const defaultCases: BeforeAfterItem[] = [
  {
    id: 1,
    title: "حشو تجميلي أمامي متعدد الطبقات",
    subtitle: "ترميم كسر وتآكل الأسنان الأمامية بدون برد",
    beforeImg: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
    description: "عزل كامل بالـ Rubber Dam وإعادة بناء طبقات المينا والعاج بتقنية الحشو التجميلي الميكروني.",
    tag: "حشو تجميلي كومبوزيت",
  },
  {
    id: 2,
    title: "تغطية العصب في تسوس عميق (Pulp Capping)",
    subtitle: "إنقاذ العصب الحي وتفادي سحب العصب",
    beforeImg: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
    description: "تطبيق مادة محفزة بيولوجية لعلاج وترميم العصب وحشو الضرس بالكامل مع الحفاظ التام على حيويته.",
    tag: "علاج تحفظي دقيق",
  },
  {
    id: 3,
    title: "تصميم الابتسامة بالماسح الرقمي 3D",
    subtitle: "تجميل وتوحيد مظهر الأسنان بأقل تدخل",
    beforeImg: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    description: "مسح ضوئي رقمي بدون مقاسات معجونية مزعجة، وعدسات فينيرز متطابقة مع ملامح الابتسامة الطبيعية.",
    tag: "فينيرز وتجميل رقمي",
  },
];

export default function BeforeAfterSection({
  cases,
  projects,
}: {
  cases?: Project[];
  projects?: Project[];
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeCase, setActiveCase] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const rawList = cases && cases.length > 0 ? cases : projects || [];

  const apiCases: BeforeAfterItem[] = rawList
    .map((p, idx) => {
      const before = p.before_image_url || p.before_image || (p.images && p.images[0]?.image_url) || p.thumbnail_url;
      const after = p.after_image_url || p.after_image || (p.images && p.images[1]?.image_url) || (p.images && p.images[0]?.image_url) || p.thumbnail_url;

      return {
        id: p.id || idx + 1,
        title: p.name || p.title || "حالة تجميلية",
        subtitle: p.subtitle || p.type || p.category || "حالة علاجية تخصصية",
        beforeImg: cleanImageUrl(before),
        afterImg: cleanImageUrl(after),
        description: p.short_desc || p.description || p.long_desc || "",
        tag: p.tag || p.type || p.category || "علاج تحفظي وتجميل",
      };
    })
    .filter((c) => Boolean(c.beforeImg) && Boolean(c.afterImg));

  const isOldContracting = rawList.some((p) =>
    p.name?.includes("Be group") ||
    p.name?.includes("شقة سكنية") ||
    p.name?.includes("مكتب إداري") ||
    p.name?.includes("غرف معقمة")
  );

  const casesToDisplay = apiCases.length > 0 && !isOldContracting ? apiCases : defaultCases;
  const currentItem = casesToDisplay[activeCase] || casesToDisplay[0] || defaultCases[0];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="cases" className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden bg-gradient-to-b from-[#0c1311] via-[#101915] to-[#0c1311]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#52b788]/40 bg-[#2d6a4f]/20 text-[#52b788] text-xs font-bold tracking-[0.25em] uppercase mb-4 shadow-[0_0_15px_rgba(82,183,136,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>نتائج واقعية حية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f8fafc] leading-tight">
            معرض الحالات <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#52b788] via-[#74c69d] to-[#40916c]">قبل وبعد</span>
          </h2>
          <p className="text-[#cbd5e1] max-w-2xl mx-auto mt-4 text-base md:text-lg">
            شاهد كيف يعيد العلاج التحفظي والحشو التجميلي الميكروني بناء الأسنان التالفة بدقة تحاكي الطبيعة تماماً.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {casesToDisplay.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveCase(idx);
                setSliderPosition(50);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                activeCase === idx
                  ? "bg-gradient-to-r from-[#2d6a4f] via-[#40916c] to-[#52b788] text-white border-transparent shadow-[0_0_25px_rgba(82,183,136,0.35)] scale-105"
                  : "bg-[#141f1b] text-[#cbd5e1] border-[#52b788]/20 hover:border-[#52b788]/60 hover:text-white"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Comparison Viewer */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Slider Container */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              className="relative h-[380px] md:h-[480px] rounded-3xl overflow-hidden border border-[#52b788]/30 shadow-2xl select-none cursor-ew-resize group"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* After Image (Full width background) */}
              <div className="absolute inset-0">
                <Image
                  src={currentItem.afterImg}
                  alt={`${currentItem.title} - بعد العلاج`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 right-4 z-20 px-3.5 py-1 rounded-full bg-[#0c1311]/85 border border-[#52b788]/40 text-[#52b788] text-xs font-bold backdrop-blur-md">
                  بعد العلاج
                </div>
              </div>

              {/* Before Image (Clipped overlay) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <Image
                  src={currentItem.beforeImg}
                  alt={`${currentItem.title} - قبل العلاج`}
                  fill
                  className="object-cover brightness-95"
                  priority
                />
                <div className="absolute top-4 left-4 z-20 px-3.5 py-1 rounded-full bg-[#0c1311]/85 border border-white/30 text-white text-xs font-bold backdrop-blur-md">
                  قبل العلاج
                </div>
              </div>

              {/* Divider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#52b788] via-white to-[#52b788] shadow-[0_0_15px_rgba(82,183,136,0.8)] z-30"
                style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-[#2d6a4f] to-[#52b788] text-white flex items-center justify-center shadow-2xl border-2 border-white cursor-pointer hover:scale-110 transition-transform">
                  <MoveHorizontal className="w-5 h-5" />
                </div>
              </div>

              {/* Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-[#0c1311]/85 text-[#cbd5e1] text-xs font-medium backdrop-blur-md border border-[#52b788]/20 pointer-events-none">
                اسحب المؤشر لليمين واليسار لمقارنة النتيجة
              </div>
            </div>
          </div>

          {/* Case Info */}
          <div className="lg:col-span-4 flex flex-col gap-6 p-6 md:p-8 rounded-3xl bg-[#141f1b]/90 border border-[#52b788]/25 shadow-xl">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#52b788]/15 text-[#52b788] text-xs font-bold mb-3 border border-[#52b788]/30">
                {currentItem.tag}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-[#f8fafc] mb-2 leading-snug">
                {currentItem.title}
              </h3>
              <p className="text-[#52b788] text-sm font-medium">
                {currentItem.subtitle}
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-[#52b788]/30 to-transparent"></div>

            <p className="text-[#cbd5e1] text-sm md:text-base leading-relaxed">
              {currentItem.description}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-[#cbd5e1]">
                <span className="w-2 h-2 rounded-full bg-[#52b788]"></span>
                <span>مدة الجلسة: ساعة كاملة مع العناية الفردية</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#cbd5e1]">
                <span className="w-2 h-2 rounded-full bg-[#52b788]"></span>
                <span>عزل مطاطي تام Rubber Dam لضمان التعقيم</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#cbd5e1]">
                <span className="w-2 h-2 rounded-full bg-[#52b788]"></span>
                <span>حفاظ تام على حيوية العصب وبنية السن</span>
              </div>
            </div>

            <a
              href="#contact-us"
              className="mt-2 text-center py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#2d6a4f] via-[#40916c] to-[#52b788] text-white font-bold text-sm hover:scale-[1.02] transition-transform duration-300 shadow-[0_0_20px_rgba(82,183,136,0.3)]"
            >
              احجز فحصاً لحالتك الآن
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
