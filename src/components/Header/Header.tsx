"use client";
import { useRef, useState } from "react";
import LanguageSwitcher from "../Custom/LanguageSwitcher";
import DrawerMenu from "./DrawerMenu";
import PopupMenu from "./PopupMenu";
import { Link } from "@/i18n/navigation";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import Image from "next/image";
import staticLogo from "@/assets/logo.png";
import { useGSAP } from "@gsap/react";
import { useLocale, useTranslations } from "next-intl";
import { cleanImageUrl } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  type?: "drawer" | "popup";
  logoSrc?: string | null;
}

const HEADER_HEIGHT = 64;

export default function Header({ type = "popup", logoSrc }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("#home");
  const locale = useLocale();
  const t = useTranslations("home");

  const navItems = [
    { name: t("Home"), href: "#home" },
    { name: t("About"), href: "#about" },
    { name: t("Technology"), href: "#technology" },
    { name: t("Services"), href: "#services" },
    { name: t("Execution Process"), href: "#execution-process" },
    { name: t("Our Work"), href: "#cases" },
    { name: t("Contact"), href: "#contact-us" },
  ];

  useGSAP(() => {
    if (!headerRef.current) return;

    ScrollTrigger.create({
      start: 1,
      onEnter: () => {
        gsap.to(headerRef.current, {
          background: "rgba(12, 19, 17, 0.92)",
          borderBottom: "1px solid rgba(82, 183, 136, 0.2)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(14px)",
          duration: 0.5,
          ease: "power3.inOut",
        });
      },
      onLeaveBack: () => {
        gsap.to(headerRef.current, {
          background: "transparent",
          borderBottom: "1px solid transparent",
          boxShadow: "none",
          backdropFilter: "blur(0px)",
          duration: 0.4,
          ease: "power2.inOut",
        });
      },
    });

    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(item.href),
        onEnterBack: () => setActiveSection(item.href),
      });
    });
  }, {
    scope: headerRef,
  });

  const handleScroll = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    const smoother = ScrollSmoother.get();
    const section = document.querySelector(target);
    if (!smoother || !section) return;

    const top =
      section.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
    const scrollProxy = { y: smoother.scrollTop() };

    gsap.to(scrollProxy, {
      y: top,
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: () => {
        smoother.scrollTo(scrollProxy.y, false);
      },
    });
  };

  return (
    <header
      ref={headerRef}
      data-fixed
      className="fixed top-0 left-0 right-0 z-[999] text-[#f8fafc] transition-all duration-300 md:py-2 animate-header-fade-in opacity-0"
      style={{ backdropFilter: "blur(0px)" }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        {/* Left: Logo */}
        <Link
          ref={logoRef}
          href="#home"
          onClick={(e) => handleScroll(e, "#home")}
          className="flex items-center gap-2 font-bold transition-all duration-300 hover:scale-105 z-10"
        >
          <div className="bg-white/95 px-3 py-1.5 rounded-2xl shadow-[0_0_20px_rgba(82,183,136,0.3)] flex items-center justify-center">
            <Image
              src={logoSrc ? cleanImageUrl(logoSrc) : staticLogo}
              alt="Ali Yakout Dental Clinic"
              width={140}
              height={45}
              className="h-7 sm:h-9 w-auto object-contain cursor-pointer"
            />
          </div>
        </Link>

        {/* Center: Navigation Items */}
        <nav
          ref={navRef}
          className="hidden md:flex items-center gap-5 lg:gap-8 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className={`relative text-sm lg:text-base font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap
                  ${isActive
                    ? "text-[#52b788] font-bold"
                    : "text-[#f8fafc]/80 hover:text-[#52b788]"
                  }
                `}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#52b788] rounded-full transition-all duration-300 ease-out
                    ${isActive ? "w-full opacity-100 shadow-[0_0_10px_#52b788]" : "w-0 opacity-0"}
                  `}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right: Language Switcher & Actions */}
        <div className="hidden md:flex items-center gap-4 z-10">
          <div ref={langRef} className="transition-all duration-300 hover:scale-105">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden z-10">
          {type === "drawer" ? (
            <DrawerMenu navItems={navItems} locale={locale} />
          ) : (
            <PopupMenu navItems={navItems} />
          )}
        </div>
      </div>
    </header>
  );
}