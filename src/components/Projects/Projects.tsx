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
              <span className="text-[#c9a750] text-xs font-bold tracking-[0.3em] uppercase">
                {t("Portfolio")}
              </span>
              <div className="projects-header-line h-0.5 w-full bg-gradient-to-r from-transparent via-[#c9a750] to-transparent mt-2"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e6d5c0] leading-tight uppercase">
              {t("Selected")}{" "}
              <span className="text-transparent uppercase bg-clip-text bg-gradient-to-r from-[#c9a750] via-[#b2913c] to-[#8c6d3b] animate-gradient">
                {t("Projects")}
              </span>
            </h2>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-card group relative cursor-pointer"
                onClick={() => openModal(project)}
              >
                {/* Card Container */}
                <div className="relative h-[480px] rounded-3xl overflow-hidden border border-[#c9a750]/20 hover:border-[#c9a750]/60 transition-all duration-700">
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
                    <div className="absolute inset-0 bg-gradient-to-b from-[#171410]/20 via-[#171410]/60 to-[#171410]"></div>
                  </div>

                  {/* Content */}
                  <div
                    className="absolute inset-0 p-8 flex flex-col justify-between"
                    dir={locale === "ar" ? "rtl" : "ltr"}
                  >
                    {/* Top: Number & Category */}
                    <div className="relative">
                      <div className="text-6xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#c9a750]/30 to-[#8c6d3b]/30 group-hover:from-[#c9a750] group-hover:to-[#8c6d3b] transition-all duration-700 leading-none">
                        {(index + 1).toString().padStart(2, "0")}
                      </div>
                      <div className="mt-4">
                        <span className="inline-block px-4 py-1 bg-[#c9a750]/10 border border-[#c9a750]/30 rounded-full text-[#c9a750] text-xs font-semibold tracking-wider">
                          {project.type}
                        </span>
                      </div>
                    </div>

                    {/* Bottom: Title & Info */}
                    <div>
                      {/* Divider Line */}
                      <div
                        className={`h-px w-full bg-gradient-to-r from-[#c9a750] to-transparent mb-4 transform ${locale === "ar" ? "origin-right" : "origin-left"} scale-x-0 group-hover:scale-x-100 transition-transform duration-700`}
                      ></div>

                      {/* Title */}
                      <h3
                        className={`text-2xl font-bold text-[#e6d5c0] mb-3 tracking-wide leading-snug ${locale === "ar" ? "text-right" : "text-left"}`}
                      >
                        {project.name}
                      </h3>

                      {/* Location & Year */}
                      <div className="flex items-center gap-4 text-[#e6d5c0]/70 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{project.date}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        {project.badges?.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-[#c9a750] border border-[#c9a750]/20 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* View More Indicator */}
                      <div
                        className={`mt-4 flex items-center gap-2 text-[#c9a750] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200`}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#c9a750]/0 via-[#c9a750]/0 to-[#c9a750]/0 group-hover:from-[#c9a750]/10 group-hover:via-[#c9a750]/5 transition-all duration-700 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
          {/* Section Footer Text — Stacked */}
          <div className="mt-12">
            <div className="mx-auto flex flex-col items-center text-center gap-4">
              {/* Headline */}
              {/* <h3 className="text-4xl font-bold text-[#e6d5c0] tracking-wide leading-tight">
                END TO END EXECUTION
              </h3> */}

              <h4 className={`${locale === "en" ? "text-xs" : "text-sm"} md:text-2xl font-semibold text-[#e6d5c0]/80 tracking-[0.2em]`}>
                {t("END TO END EXECUTION COLLABORATION WITH OTHER COMPANIES")}
              </h4>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a750] to-transparent"></div>

              <div className={`text-[#e6d5c0]/70 ${locale === "en" ? "text-xs" : "text-sm"} md:text-base flex flex-wrap justify-center gap-x-2 gap-y-2`}>
                <span>Magrabi</span>
                <span>-</span>
                <span>PAUL Restaurant & Cafe</span>
                <span>-</span>
                <span>DREAM 2000</span>
                <span>-</span>
                <span>FEROZAH Jewelry Shop</span>
                <span>-</span>
                <span>American Eagle — Magenta</span>
                <span>-</span>
                <span>Butcher’s Burger & Chicken & Ribs</span>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a750] to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {mounted &&
        selectedProject &&
        createPortal(
          <div
            className="fixed top-0 left-0 w-full h-full z-[1100] flex items-center justify-center p-4 bg-[#171410]/90"
            onClick={closeModal}
          >
            <div
              ref={modalRef}
              className="modal-content relative w-full max-w-6xl max-h-[90vh] bg-[#1f1b16] rounded-[2rem] border border-[#c9a750]/20 overflow-hidden shadow-[0_0_80px_rgba(201,167,80,0.15)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute cursor-pointer top-6 right-6 z-[1110] w-12 h-12 flex items-center justify-center bg-[#171410]/80 hover:bg-[#c9a750] border border-[#c9a750]/30 rounded-full transition-all duration-500 group"
              >
                <X className="w-6 h-6 text-[#c9a750] group-hover:text-[#171410] group-hover:rotate-90 transition-all duration-500" />
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto custom-scrollbar">
                <div className="flex flex-col md:flex-row">
                  {/* Left: Image Gallery Section */}
                  <div className="w-full md:w-[45%] bg-[#171410]">
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
                          <span className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#c9a750]/60 to-[#8c6d3b]/40 leading-none select-none">
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
                                ? "border-[#c9a750] scale-95 shadow-[0_0_15px_rgba(201,167,80,0.3)]"
                                : "border-[#c9a750]/10 hover:border-[#c9a750]/40"
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
                          <span className="h-px w-8 bg-[#c9a750]"></span>
                          <span className="text-[#c9a750] text-sm font-bold tracking-[0.2em] uppercase">
                            {selectedProject.type}
                          </span>
                        </div>
                        <h2
                          className={`text-4xl md:text-5xl font-bold text-[#e6d5c0] mb-6 tracking-tight leading-tight ${locale === "ar" ? "text-right" : "text-left"}`}
                        >
                          {selectedProject.name}
                        </h2>
                        <div
                          className={`flex flex-wrap items-center gap-6 text-[#e6d5c0]/60 ${locale === "ar" ? "justify-start" : ""}`}
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#c9a750]" />
                            <span className="text-sm uppercase tracking-wider">
                              {selectedProject.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#c9a750]" />
                            <span className="text-sm uppercase tracking-wider">
                              {selectedProject.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Client Objective */}
                      <div className="mb-12">
                        <h4 className="text-[#c9a750] text-sm font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
                          {t("ClientObjective")}
                          <span
                            className={`flex-1 h-px ${locale === "ar" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-[#c9a750]/20 to-transparent`}
                          ></span>
                        </h4>
                        <p
                          className={`text-[#e6d5c0]/80 text-lg leading-relaxed italic ${locale === "ar" ? "text-right" : "text-left"}`}
                        >
                          &quot;{selectedProject.short_desc}&quot;
                        </p>
                      </div>

                      {/* Info Grid */}
                      <div
                        className={`grid grid-cols-2 md:grid-cols-3 gap-8 mb-12 py-8 border-y border-[#c9a750]/10 text-center ${locale === "ar" ? "md:text-right" : "md:text-left"}`}
                      >
                        <div>
                          <h4 className="text-[#c9a750]/50 text-xs font-bold tracking-[0.2em] uppercase mb-2">
                            {t("Scope")}
                          </h4>
                          <p className="text-[#e6d5c0] font-medium text-sm">
                            {selectedProject.type}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-[#c9a750]/50 text-xs font-bold tracking-[0.2em] uppercase mb-2">
                            {t("SizeArea")}
                          </h4>
                          <p className="text-[#e6d5c0] font-medium text-sm">
                            {selectedProject.area}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-[#c9a750]/50 text-xs font-bold tracking-[0.2em] uppercase mb-2 whitespace-nowrap">
                            {t("Client")}
                          </h4>
                          <p className="text-[#e6d5c0] font-medium text-sm">
                            {selectedProject.client}
                          </p>
                        </div>
                      </div>

                      {/* Highlights */}
                      {selectedProject.badges && selectedProject.badges.length > 0 && (
                        <div className="mb-12">
                          <h4 className="text-[#c9a750] text-sm font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                            {t("Key Highlights")}
                            <span
                              className={`flex-1 h-px ${locale === "ar" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-[#c9a750]/20 to-transparent`}
                            ></span>
                          </h4>
                          <div className="grid grid-cols-1 gap-4">
                            {selectedProject.badges.map((highlight, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3 p-4 bg-[#171410]/30 border border-[#c9a750]/5 rounded-2xl hover:border-[#c9a750]/20 transition-all duration-300"
                              >
                                <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-[#c9a750] rounded-full"></div>
                                <p
                                  className={`text-[#e6d5c0]/70 text-sm leading-relaxed ${locale === "ar" ? "text-right" : "text-left"}`}
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
                          <h4 className="text-[#c9a750] text-sm font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
                            {t("Result")}
                            <span
                              className={`flex-1 h-px ${locale === "ar" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-[#c9a750]/20 to-transparent`}
                            ></span>
                          </h4>
                          <div className="p-5 rounded-2xl bg-[#c9a750]/5 border border-[#c9a750]/10">
                            <p
                              className={`text-[#e6d5c0] text-base leading-relaxed font-medium ${locale === "ar" ? "text-right" : "text-left"}`}
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
          background: #171410;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c9a750;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b2913c;
        }
      `}</style>
    </>
  );
}