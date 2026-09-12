"use client";

import { Scan, ShieldCheck, Zap, Smile, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function ScannerSection() {
  const features = [
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

  return (
    <section id="technology" className="relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a750]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a750]/30 bg-[#c9a750]/10 text-[#c9a750] text-xs font-bold tracking-[0.25em] uppercase mb-4">
            <Scan className="w-3.5 h-3.5" />
            <span>التكنولوجيا الرقمية في خدمتكم</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-[#e6d5c0] leading-tight">
            الماسح الفموي الرقمي <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a750] via-[#b2913c] to-[#8c6d3b]">3D Scanner</span>
          </h2>
          <p className="text-[#e6d5c0]/70 max-w-2xl mx-auto mt-4 text-base md:text-lg">
            نستثمر في أحدث الأجهزة والتقنيات الطبية لنضمن لك تجربة علاجية استثنائية تجمع بين الراحة التامة وأعلى معايير الدقة العلمية.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group p-6 rounded-3xl bg-gradient-to-br from-[#1f1b16] to-[#171410] border border-[#c9a750]/15 hover:border-[#c9a750]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(201,167,80,0.1)] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#c9a750]/10 border border-[#c9a750]/20 flex items-center justify-center text-[#c9a750] group-hover:bg-[#c9a750] group-hover:text-[#171410] transition-all duration-500 mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#e6d5c0] mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[#e6d5c0]/65 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#c9a750]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>معيار العيادة المعتمد</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Showcase Box */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#c9a750]/30 bg-gradient-to-br from-[#1f1b16] to-[#171410] p-8 shadow-2xl">
              <div className="relative h-[320px] rounded-2xl overflow-hidden mb-6 border border-[#c9a750]/20">
                <Image
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
                  alt="Intra-Oral 3D Scanner"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171410] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#171410]/80 border border-[#c9a750]/30 backdrop-blur-md">
                  <p className="text-xs font-bold text-[#c9a750] text-center">
                    دقة ميكرونية فائقة للأنسجة والأسنان
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-[#e6d5c0]">
                  لماذا يفضل مرضانا المقاس الرقمي؟
                </h4>
                <ul className="space-y-2 text-sm text-[#e6d5c0]/80">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#c9a750]" />
                    <span>مدة الفحص لا تتجاوز دقائق معدودة</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#c9a750]" />
                    <span>إمكانية التوقف والاستراحة في أي لحظة أثناء المسح</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#c9a750]" />
                    <span>إرسال الملف الرقمي مباشرة للمختبر المتخصص إلكترونياً</span>
                  </li>
                </ul>

                <a
                  href="#contact-us"
                  className="block text-center w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-[#c9a750] to-[#b2913c] text-[#171410] font-bold text-sm hover:scale-105 transition-all shadow-lg"
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
