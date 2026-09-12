"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { X, ArrowRight, MapPin, ArrowLeft, Calendar } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Project } from "@/types/homeApiTypes";
import { cleanImageUrl } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

gsap.registerPlugin(ScrollTrigger);

export default function Projects({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("home");
  const locale = useLocale();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Header Animation
      tl.from(".projects-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Header Line Animation
      tl.from(
        ".projects-header-line",
        {
          scaleX: 0,
          transformOrigin: "center",
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // Project Cards Animation
      tl.from(
        ".project-card",
        {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedProject) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedProject]);

  // Modal animations
  useEffect(() => {
    if (selectedProject && modalRef.current) {
      // Animate modal entrance
      gsap.fromTo(
        modalRef.current,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
        }
      );

      // Animate modal content
      gsap.from(".modal-content > *", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2,
      });
    }
  }, [selectedProject]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setActiveImage(project.thumbnail_url);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setSelectedProject(null);
          document.body.style.overflow = "unset";
        },
      });
    }
  };

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden lg:pb-20 pt-5 lg:pt-20 px-6 md:px-12 lg:px-20"
      >
        <div className="relative max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="projects-header text-center mb-12">
            <div className="inline-block mb-3">
              <span className="text-[#52b788] text-xs font-bold tracking-[0.3em] uppercase">
                {t("Portfolio")}
              </span>
              <div className="projects-header-line h-0.5 w-full bg-gradient-to-r from-transparent via-[#52b788] to-transparent mt-2"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f8fafc] leading-tight uppercase">
              {t("Selected")}{" "}
              <span className="text-transparent uppercase bg-clip-text bg-gradient-to-r from-[#52b788] via-[#74c69d] to-[#2d6a4f] animate-gradient">
                {t("Projects")}
              </span>
            </h2>
          </div>

          {/* Mobile: 3D Coverflow Swiper */}
          <div className="block md:hidden relative pb-10">
            <div className="flex items-center justify-center gap-2 mb-4 text-xs text-[#52b788]/90 font-medium">
              <span>👈 اسحب للتنقل بين الحالات العلاجية 👉</span>
            </div>

            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 20,
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
                delay: 4000,
                disableOnInteraction: false,
              }}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="w-full py-4 overflow-visible"
            >
              {projects.map((project, index) => (
                <SwiperSlide key={project.id || index} className="!w-[84vw] max-w-[330px]">
                  <div
                    onClick={() => openModal(project)}
                    className="relative h-[450px] rounded-3xl overflow-hidden border border-[#52b788]/40 shadow-[0_12px_35px_rgba(0,0,0,0.6)] cursor-pointer bg-[#141f1b]"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={cleanImageUrl(project.thumbnail_url)}
                        alt={project.name}
                        fill
                        className="object-cover brightness-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1311]/40 via-[#0c1311]/70 to-[#0c1311]"></div>
                    </div>

                    {/* Content */}
                    <div
                      className="absolute inset-0 p-6 flex flex-col justify-between z-10"
                      dir={locale === "ar" ? "rtl" : "ltr"}
                    >
                      {/* Top: Number & Category */}
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-full border border-[#52b788]/60 bg-[#0c1311]/85 flex items-center justify-center">
                          <span className="text-sm font-bold text-[#52b788]">
                            {(index + 1).toString().padStart(2, "0")}
                          </span>
                        </div>
                        <span className="px-3 py-1 bg-[#52b788]/20 border border-[#52b788]/40 rounded-full text-[#52b788] text-[10px] font-bold">
                          {project.type}
                        </span>
                      </div>

                      {/* Bottom: Title & Info */}
                      <div>
                        <div className="h-0.5 w-12 bg-[#52b788] mb-3"></div>
                        <h3 className="text-xl font-bold text-[#f8fafc] mb-2 leading-snug">
                          {project.name}
                        </h3>
                        <p className="text-xs text-[#f8fafc]/75 line-clamp-2 mb-4">
                          {project.short_desc}
                        </p>

                        <div className="flex items-center justify-between text-xs text-[#52b788] font-semibold pt-2 border-t border-[#52b788]/20">
                          <span>اضغط لعرض تفاصيل الحالة</span>
                          {locale === "en" ? (
                            <ArrowRight className="w-4 h-4" />
                          ) : (
                            <ArrowLeft className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Border Frame */}
                    <div className="absolute inset-0 border-2 border-[#52b788]/30 rounded-3xl pointer-events-none"></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:block relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="project-card group relative cursor-pointer"
                  onClick={() => openModal(project)}
                >
                  {/* Card Container */}
                  <div className="relative h-[480px] rounded-3xl overflow-hidden border border-[#52b788]/20 hover:border-[#52b788]/60 transition-all duration-700 bg-[#141f1b]">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <div className="w-full h-full transition-all duration-[1500ms] group-hover:scale-110">
                        <Image
                          src={cleanImageUrl(project.thumbnail_url)}
                          alt={project.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1311]/20 via-[#0c1311]/60 to-[#0c1311]"></div>
                    </div>

                    {/* Content */}
                    <div
                      className="absolute inset-0 p-8 flex flex-col justify-between"
                      dir={locale === "ar" ? "rtl" : "ltr"}
                    >
                      {/* Top: Number & Category */}
                      <div className="relative">
                        <div className="text-6xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#52b788]/30 to-[#2d6a4f]/30 group-hover:from-[#52b788] group-hover:to-[#74c69d] transition-all duration-700 leading-none">
                          {(index + 1).toString().padStart(2, "0")}
                        </div>
                        <div className="mt-4">
                          <span className="inline-block px-4 py-1 bg-[#52b788]/10 border border-[#52b788]/30 rounded-full text-[#52b788] text-xs font-semibold tracking-wider">
                            {project.type}
                          </span>
                        </div>
                      </div>

                      {/* Bottom: Title & Info */}
                      <div>
                        {/* Divider Line */}
                        <div
                          className={`h-px w-full bg-gradient-to-r from-[#52b788] to-transparent mb-4 transform ${locale === "ar" ? "origin-right" : "origin-left"} scale-x-0 group-hover:scale-x-100 transition-transform duration-700`}
                        ></div>

                        {/* Title */}
                        <h3
                          className={`text-2xl font-bold text-[#f8fafc] mb-3 tracking-wide leading-snug ${locale === "ar" ? "text-right" : "text-left"}`}
                        >
                          {project.name}
                        </h3>

                        {/* Location & Year */}
                        <div className="flex items-center gap-4 text-[#f8fafc]/70 text-sm mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#52b788]" />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#52b788]" />
                            <span>{project.date}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                          {project.badges?.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-[#52b788] border border-[#52b788]/20 px-3 py-1 rounded-full bg-[#52b788]/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* View More Indicator */}
                        <div
                          className={`mt-4 flex items-center gap-2 text-[#52b788] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200`}
                        >
                          <span className="text-sm font-semibold tracking-wider">
                            {t("VIEW PROJECT")}
                          </span>
                          {locale === "en" ? (
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                          ) : (
                            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-2 transition-transform duration-300 mt-1 ms-2" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#52b788]/0 via-[#52b788]/0 to-[#52b788]/0 group-hover:from-[#52b788]/10 group-hover:via-[#52b788]/5 transition-all duration-700 pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Footer Text — Scientific Affiliations */}
          <div className="mt-12">
            <div className="mx-auto flex flex-col items-center text-center gap-4">
              <h4 className={`${locale === "en" ? "text-xs" : "text-sm"} md:text-xl font-semibold text-[#f8fafc]/80 tracking-[0.2em] uppercase`}>
                اعتماد وتجهيزات متوافقة مع أعلى المعايير الدولية لطب وتجميل الأسنان
              </h4>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#52b788] to-transparent"></div>

              <div className={`text-[#f8fafc]/70 ${locale === "en" ? "text-xs" : "text-sm"} md:text-base flex flex-wrap justify-center gap-x-3 gap-y-2`}>
                <span>3Shape TRIOS® 3D Scanner</span>
                <span>•</span>
                <span>Rubber Dam Isolation System</span>
                <span>•</span>
                <span>Conservative & Biomimetic Dentistry</span>
                <span>•</span>
                <span>Microscopic Precision Care</span>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#52b788] to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {mounted &&
        selectedProject &&
        createPortal(
          <div
            className="fixed top-0 left-0 w-full h-full z-[1100] flex items-center justify-center p-4 bg-[#0c1311]/90 backdrop-blur-md"
            onClick={closeModal}
          >
            <div
              ref={modalRef}
              className="modal-content relative w-full max-w-6xl max-h-[90vh] bg-[#141f1b] rounded-[2rem] border border-[#52b788]/25 overflow-hidden shadow-[0_0_80px_rgba(82,183,136,0.15)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute cursor-pointer top-6 right-6 z-[1110] w-12 h-12 flex items-center justify-center bg-[#0c1311]/80 hover:bg-[#52b788] border border-[#52b788]/30 rounded-full transition-all duration-500 group"
              >
                <X className="w-6 h-6 text-[#52b788] group-hover:text-[#0c1311] group-hover:rotate-90 transition-all duration-500" />
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto custom-scrollbar">
                <div className="flex flex-col md:flex-row">
                  {/* Left: Image Gallery Section */}
                  <div className="w-full md:w-[45%] bg-[#0c1311]">
                    <div className="sticky top-0 p-8">
                      {/* Main Image */}
                      <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-4">
                        <Image
                          src={cleanImageUrl(activeImage || selectedProject.thumbnail_url)}
                          alt={selectedProject.name}
                          fill
                          className="object-cover transition-all duration-500"
                        />
                        {/* Floating Number */}
                        <div className="absolute bottom-6 left-6">
                          <span className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#52b788]/60 to-[#2d6a4f]/40 leading-none select-none">
                            {projects.findIndex(p => p.id === selectedProject.id) !== -1 ? (projects.findIndex(p => p.id === selectedProject.id) + 1).toString().padStart(2, "0") : "01"}
                          </span>
                        </div>
                      </div>

                      {/* Gallery Images */}
                      <div className="grid grid-cols-3 gap-3">
                        {selectedProject.images?.map((img, idx) => (
                          <div
                            key={idx}
                            onClick={() => setActiveImage(img.image_url)}
                            className={`relative h-24 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                              activeImage === img.image_url
                                ? "border-[#52b788] scale-95 shadow-[0_0_15px_rgba(82,183,136,0.3)]"
                                : "border-[#52b788]/10 hover:border-[#52b788]/40"
                            }`}
                          >
                            <Image
                              src={cleanImageUrl(img.image_url)}
                              alt={`${selectedProject.name} - Image ${idx + 1}`}
                              fill
                              className="object-cover hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Content Section */}
                  <div
                    className="flex-1 p-8 md:p-12 lg:p-16"
                    dir={locale === "ar" ? "rtl" : "ltr"}
                  >
                    <div className="max-w-2xl">
                      {/* Header */}
                      <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="h-px w-8 bg-[#52b788]"></span>
                          <span className="text-[#52b788] text-sm font-bold tracking-[0.2em] uppercase">
                            {selectedProject.type}
                          </span>
                        </div>
                        <h2
                          className={`text-4xl md:text-5xl font-bold text-[#f8fafc] mb-6 tracking-tight leading-tight ${locale === "ar" ? "text-right" : "text-left"}`}
                        >
                          {selectedProject.name}
                        </h2>
                        <div
                          className={`flex flex-wrap items-center gap-6 text-[#f8fafc]/60 ${locale === "ar" ? "justify-start" : ""}`}
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#52b788]" />
                            <span className="text-sm uppercase tracking-wider">
                              {selectedProject.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#52b788]" />
                            <span className="text-sm uppercase tracking-wider">
                              {selectedProject.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Client Objective */}
                      <div className="mb-12">
                        <h4 className="text-[#52b788] text-sm font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
                          {t("ClientObjective")}
                          <span
                            className={`flex-1 h-px ${locale === "ar" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-[#52b788]/20 to-transparent`}
                          ></span>
                        </h4>
                        <p
                          className={`text-[#f8fafc]/80 text-lg leading-relaxed italic ${locale === "ar" ? "text-right" : "text-left"}`}
                        >
                          &quot;{selectedProject.short_desc}&quot;
                        </p>
                      </div>

                      {/* Info Grid */}
                      <div
                        className={`grid grid-cols-2 md:grid-cols-3 gap-8 mb-12 py-8 border-y border-[#52b788]/10 text-center ${locale === "ar" ? "md:text-right" : "md:text-left"}`}
                      >
                        <div>
                          <h4 className="text-[#52b788]/60 text-xs font-bold tracking-[0.2em] uppercase mb-2">
                            {t("Scope")}
                          </h4>
                          <p className="text-[#f8fafc] font-medium text-sm">
                            {selectedProject.type}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-[#52b788]/60 text-xs font-bold tracking-[0.2em] uppercase mb-2">
                            {t("SizeArea")}
                          </h4>
                          <p className="text-[#f8fafc] font-medium text-sm">
                            {selectedProject.area}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-[#52b788]/60 text-xs font-bold tracking-[0.2em] uppercase mb-2 whitespace-nowrap">
                            {t("Client")}
                          </h4>
                          <p className="text-[#f8fafc] font-medium text-sm">
                            {selectedProject.client}
                          </p>
                        </div>
                      </div>

                      {/* Highlights */}
                      {selectedProject.badges && selectedProject.badges.length > 0 && (
                        <div className="mb-12">
                          <h4 className="text-[#52b788] text-sm font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                            {t("Key Highlights")}
                            <span
                              className={`flex-1 h-px ${locale === "ar" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-[#52b788]/20 to-transparent`}
                            ></span>
                          </h4>
                          <div className="grid grid-cols-1 gap-4">
                            {selectedProject.badges.map((highlight, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3 p-4 bg-[#0c1311]/40 border border-[#52b788]/10 rounded-2xl hover:border-[#52b788]/30 transition-all duration-300"
                              >
                                <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-[#52b788] rounded-full"></div>
                                <p
                                  className={`text-[#f8fafc]/70 text-sm leading-relaxed ${locale === "ar" ? "text-right" : "text-left"}`}
                                >
                                  {highlight}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Result */}
                      {selectedProject.long_desc && (
                        <div className="mb-6">
                          <h4 className="text-[#52b788] text-sm font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
                            {t("Result")}
                            <span
                              className={`flex-1 h-px ${locale === "ar" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-[#52b788]/20 to-transparent`}
                            ></span>
                          </h4>
                          <div className="p-5 rounded-2xl bg-[#52b788]/10 border border-[#52b788]/20">
                            <p
                              className={`text-[#f8fafc] text-base leading-relaxed font-medium ${locale === "ar" ? "text-right" : "text-left"}`}
                            >
                              {selectedProject.long_desc}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

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

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0c1311;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #52b788;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #74c69d;
        }
      `}</style>
    </>
  );
}