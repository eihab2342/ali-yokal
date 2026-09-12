"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Sparkles, MoveHorizontal } from "lucide-react";

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

export default function BeforeAfterSection() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeCase, setActiveCase] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const currentItem = defaultCases[activeCase];

  return (
    <section id="cases" className="relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden bg-gradient-to-b from-[#171410] via-[#1a1612] to-[#171410]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a750]/30 bg-[#c9a750]/10 text-[#c9a750] text-xs font-bold tracking-[0.25em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>نتائج واقعية حية</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-[#e6d5c0] leading-tight">
            معرض الحالات <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a750] via-[#b2913c] to-[#8c6d3b]">قبل وبعد</span>
          </h2>
          <p className="text-[#e6d5c0]/70 max-w-2xl mx-auto mt-4 text-base md:text-lg">
            شاهد كيف يعيد العلاج التحفظي والحشو التجميلي الميكروني بناء الأسنان التالفة بدقة تحاكي الطبيعة تماماً.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {defaultCases.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveCase(idx);
                setSliderPosition(50);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                activeCase === idx
                  ? "bg-gradient-to-r from-[#c9a750] to-[#b2913c] text-[#171410] border-transparent shadow-[0_0_25px_rgba(201,167,80,0.3)] scale-105"
                  : "bg-[#1a1612] text-[#e6d5c0]/70 border-[#c9a750]/20 hover:border-[#c9a750]/60 hover:text-[#e6d5c0]"
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
              className="relative h-[380px] md:h-[480px] rounded-3xl overflow-hidden border border-[#c9a750]/30 shadow-2xl select-none cursor-ew-resize group"
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
                <div className="absolute top-4 right-4 z-20 px-3.5 py-1 rounded-full bg-[#171410]/80 border border-[#c9a750]/40 text-[#c9a750] text-xs font-bold backdrop-blur-md">
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
                <div className="absolute top-4 left-4 z-20 px-3.5 py-1 rounded-full bg-[#171410]/80 border border-[#e6d5c0]/30 text-[#e6d5c0] text-xs font-bold backdrop-blur-md">
                  قبل العلاج
                </div>
              </div>

              {/* Divider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#c9a750] via-white to-[#c9a750] shadow-[0_0_15px_rgba(201,167,80,0.8)] z-30"
                style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-[#c9a750] to-[#b2913c] text-[#171410] flex items-center justify-center shadow-2xl border-2 border-white cursor-pointer hover:scale-110 transition-transform">
                  <MoveHorizontal className="w-5 h-5" />
                </div>
              </div>

              {/* Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-[#171410]/80 text-[#e6d5c0]/80 text-xs font-medium backdrop-blur-md border border-[#c9a750]/20 pointer-events-none">
                اسحب المؤشر لليمين واليسار لمقارنة النتيجة
              </div>
            </div>
          </div>

          {/* Case Info */}
          <div className="lg:col-span-4 flex flex-col gap-6 p-6 md:p-8 rounded-3xl bg-[#1f1b16]/80 border border-[#c9a750]/20">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#c9a750]/15 text-[#c9a750] text-xs font-bold mb-3 border border-[#c9a750]/30">
                {currentItem.tag}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-[#e6d5c0] mb-2 leading-snug">
                {currentItem.title}
              </h3>
              <p className="text-[#c9a750] text-sm font-medium">
                {currentItem.subtitle}
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-[#c9a750]/30 to-transparent"></div>

            <p className="text-[#e6d5c0]/70 text-sm md:text-base leading-relaxed">
              {currentItem.description}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-[#e6d5c0]/80">
                <span className="w-2 h-2 rounded-full bg-[#c9a750]"></span>
                <span>مدة الجلسة: ساعة كاملة مع العناية الفردية</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#e6d5c0]/80">
                <span className="w-2 h-2 rounded-full bg-[#c9a750]"></span>
                <span>عزل مطاطي تام Rubber Dam لضمان التعقيم</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#e6d5c0]/80">
                <span className="w-2 h-2 rounded-full bg-[#c9a750]"></span>
                <span>حفاظ تام على حيوية العصب وبنية السن</span>
              </div>
            </div>

            <a
              href="#contact-us"
              className="mt-2 text-center py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#c9a750] to-[#b2913c] text-[#171410] font-bold text-sm hover:scale-[1.02] transition-transform duration-300 shadow-lg"
            >
              احجز فحصاً لحالتك الآن
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
