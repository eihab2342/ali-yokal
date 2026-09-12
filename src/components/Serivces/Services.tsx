"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Service } from "@/types/homeApiTypes";
import { cleanImageUrl } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

gsap.registerPlugin(ScrollTrigger);

export default function KoiaServicesSection({ services }: { services: Service[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("home");
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Header Animation
      tl.from(".services-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Header Line Animation
      tl.from(
        ".services-header-line",
        {
          scaleX: 0,
          transformOrigin: "center",
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5",
      );

      // Service Cards Animation
      tl.from(
        ".service-card",
        {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2, // Stagger effect for cards
          ease: "power3.out",
        },
        "-=0.5",
      );

      // Button Animation
      tl.from(
        ".services-btn",
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const defaultServices: Service[] = [
    {
      id: 1,
      name: t("Service-01-Title") || "الحشو التجميلي وحماية العصب",
      short_desc: t("Service-01-Description") || "حشوات كومبوزيت تجميلية متقدمة مع حماية العصب.",
      image_url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
      alt_image: "حشو تجميلي",
    },
    {
      id: 2,
      name: t("Service-02-Title") || "الفينيرز وتصميم الابتسامة",
      short_desc: t("Service-02-Description") || "عدسات خزفية بأقل برد لمينا الأسنان الطبيعية.",
      image_url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
      alt_image: "فينيرز وتجميل",
    },
    {
      id: 3,
      name: t("Service-03-Title") || "تبييض الأسنان الاحترافي",
      short_desc: t("Service-03-Description") || "تبييض آمن وعميق لإعادة الإشراقة الطبيعية لابتسامتك.",
      image_url: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
      alt_image: "تبييض الأسنان",
    },
    {
      id: 4,
      name: t("Service-04-Title") || "علاج الجذور والتركيبات الثابتة",
      short_desc: t("Service-04-Description") || "معالجة دقيقة للجذور وتيجان زركونيا متينة عبر الماسح الرقمي.",
      image_url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
      alt_image: "علاج الجذور والتركيبات",
    },
  ];

  const isOldContracting = services?.some(s => s.name?.includes("الشركات") || s.name?.includes("التجاري") || s.name?.includes("السكني"));
  const displayServices = (services && services.length > 0 && !isOldContracting) ? services : defaultServices;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-fit overflow-hidden lg:pt-8 lg:pb-24 px-6 md:px-12 lg:px-20"
    >
      <div className="relative max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="services-header text-center mb-12">
          <div className="inline-block mb-3">
            <span className="text-[#c9a750] text-xs font-bold tracking-[0.3em] uppercase">
              {t("Our Expertise")}
            </span>
            <div className="services-header-line h-0.5 w-full bg-gradient-to-r from-transparent via-[#c9a750] to-transparent mt-2"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e6d5c0] leading-tight">
            {t("OUR")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a750] via-[#b2913c] to-[#8c6d3b] animate-gradient">
              {t("SERVICES")}
            </span>
          </h2>
        </div>

        {/* Mobile: 3D Coverflow Swiper */}
        <div className="block md:hidden relative pb-10">
          <div className="flex items-center justify-center gap-2 mb-4 text-xs text-[#c9a750]/80">
            <span>👈 اسحب للتنقل بين التخصصات 👉</span>
          </div>

          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 25,
              stretch: 0,
              depth: 120,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full py-4 overflow-visible"
          >
            {displayServices.map((service, i) => (
              <SwiperSlide key={service.id} className="!w-[82vw] max-w-[320px]">
                <div className="relative h-[430px] rounded-3xl overflow-hidden border border-[#c9a750]/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-[#171410]">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={cleanImageUrl(service.image_url)}
                      alt={service.alt_image || "Dental Service"}
                      fill
                      className="w-full h-full object-cover brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#171410]/50 via-[#171410]/80 to-[#171410]"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                    {/* Top: Number Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full border border-[#c9a750]/60 bg-[#171410]/80 flex items-center justify-center">
                        <span className="text-sm font-bold text-[#c9a750]">0{i + 1}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-[#c9a750]/20 border border-[#c9a750]/40 text-[#c9a750]">
                        تخصص دقيق
                      </span>
                    </div>

                    {/* Bottom: Title & Description */}
                    <div>
                      <div className="h-0.5 w-12 bg-[#c9a750] mb-3"></div>
                      <h3 className="text-xl font-bold text-[#e6d5c0] mb-2 leading-snug">
                        {service.name}
                      </h3>
                      <p className="text-[#e6d5c0]/85 text-xs leading-relaxed">
                        {service.short_desc}
                      </p>
                    </div>
                  </div>

                  {/* Gold Border Highlight */}
                  <div className="absolute inset-0 border-2 border-[#c9a750]/30 rounded-3xl pointer-events-none"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop: 4-Column Grid */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
            {displayServices.map((service, i) => (
              <div key={service.id} className="service-card group relative">
                {/* Card Container */}
                <div className="relative h-[460px] rounded-3xl overflow-hidden border border-[#c9a750]/20 hover:border-[#c9a750]/60 transition-all duration-1000 ease-out">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={cleanImageUrl(service.image_url)}
                      alt={service.alt_image || "KOIA Service"}
                      fill
                      className="w-full h-full object-cover transition-all duration-[1500ms] group-hover:scale-110 group-hover:brightness-75 ease-out"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#171410]/60 via-[#171410]/80 to-[#171410]"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    {/* Top: Number */}
                    <div className="relative">
                      <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#c9a750]/30 to-[#8c6d3b]/30 group-hover:from-[#c9a750] group-hover:to-[#8c6d3b] transition-all duration-700 leading-none">
                        {i + 1}
                      </div>
                    </div>

                    {/* Bottom: Title & Description */}
                    <div>
                      {/* Divider Line */}
                      <div className="h-px w-full bg-gradient-to-r from-[#c9a750] to-transparent mb-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-[#e6d5c0] mb-2 tracking-wide leading-snug">
                        {service.name}
                      </h3>

                      {/* Description */}
                      <p className="text-[#e6d5c0]/70 text-sm leading-relaxed transform opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 italic">
                        {service.short_desc}
                      </p>
                    </div>

                    <div></div>
                  </div>

                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#c9a750]/0 via-[#c9a750]/0 to-[#c9a750]/0 group-hover:from-[#c9a750]/10 group-hover:via-[#c9a750]/5 transition-all duration-700 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
