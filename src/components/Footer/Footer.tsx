"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import logo from "@/assets/logo.png";
import { Link } from "@/i18n/navigation";
import ScrollSmoother from "gsap/ScrollSmoother";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { SocialLink, Service, ClinicInfo } from "@/types/homeApiTypes";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Github, 
  Globe, 
  Mail, 
  Send,
  Link as LinkIcon,
  Phone,
  Slack,
  MapPin
} from "lucide-react";

const HEADER_HEIGHT = 64;

interface FooterProps {
  social_links?: SocialLink[] | Record<string, string>;
  services?: Service[];
  clinicInfo?: ClinicInfo;
  logoSrc?: string | StaticImageData | null;
}

export default function Footer({ social_links, services = [], clinicInfo, logoSrc }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("home");

  // Normalize social links whether array or object
  const normalizedSocials: { platform: string; url: string }[] = [];
  const rawSocials = social_links || clinicInfo?.social_links;

  if (Array.isArray(rawSocials)) {
    rawSocials.forEach((item) => {
      if (item && item.url) {
        normalizedSocials.push({
          platform: item.platform || "website",
          url: item.url,
        });
      }
    });
  } else if (rawSocials && typeof rawSocials === "object") {
    Object.entries(rawSocials).forEach(([key, val]) => {
      if (typeof val === "string" && val) {
        normalizedSocials.push({
          platform: key,
          url: val,
        });
      }
    });
  }

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    if (elementsRef.current) {
      const animatedElements =
        elementsRef.current.querySelectorAll(".animate-on-scroll");
      animatedElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const footerLinks = {
    company: [
      { name: t("Home"), href: "#home" },
      { name: t("About"), href: "#about" },
      { name: t("Services"), href: "#services" },
      { name: t("Execution Process"), href: "#execution-process" },
      { name: t("Projects"), href: "#projects" },
      { name: t("Contact"), href: "#contact-us" },
    ],
  };

  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase().trim();
    switch (p) {
      case "facebook":
        return <Facebook size={20} />;
      case "instagram":
        return <Instagram size={20} />;
      case "linkedin":
        return <Linkedin size={20} />;
      case "twitter":
      case "x":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
          </svg>
        );
      case "youtube":
        return <Youtube size={20} />;
      case "github":
        return <Github size={20} />;
      case "whatsapp":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393.015 12.03a11.811 11.811 0 011.592 5.918L0 24l6.135-1.61a11.771 11.771 0 005.911 1.592h.004c6.634 0 12.032-5.394 12.035-12.032a11.761 11.761 0 00-3.528-8.485" />
          </svg>
        );
      case "tiktok":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.31-.75.42-1.24 1.25-1.33 2.1-.1 1.1.26 2.22.99 3.03.73.83 1.83 1.34 2.94 1.36 1.17.02 2.34-.48 3.1-1.36.78-.88 1.13-2.06 1.03-3.23.04-4.83.02-9.66.05-14.49z" />
          </svg>
        );
      case "pinterest":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.62 0 12-5.38 12-12S18.637 0 12.017 0z" />
          </svg>
        );
      case "snapchat":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M15.943 11.526c-.111-.303-.323-.465-.564-.599a1 1 0 0 0-.123-.064l-.219-.111c-.752-.399-1.339-.902-1.746-1.498a3.4 3.4 0 0 1-.3-.531c-.034-.1-.032-.156-.008-.207a.3.3 0 0 1 .097-.1c.129-.086.262-.173.352-.231.162-.104.289-.187.371-.245.309-.216.525-.446.66-.702a1.4 1.4 0 0 0 .069-1.16c-.205-.538-.713-.872-1.329-.872a1.8 1.8 0 0 0-.487.065c.006-.368-.002-.757-.035-1.139-.116-1.344-.587-2.048-1.077-2.61a4.3 4.3 0 0 0-1.095-.881C9.764.216 8.92 0 7.999 0s-1.76.216-2.505.641c-.412.232-.782.53-1.097.883-.49.562-.96 1.267-1.077 2.61-.033.382-.04.772-.036 1.138a1.8 1.8 0 0 0-.487-.065c-.615 0-1.124.335-1.328.873a1.4 1.4 0 0 0 .067 1.161c.136.256.352.486.66.701.082.058.21.14.371.246l.339.221a.4.4 0 0 1 .109.11c.026.053.027.11-.012.217a3.4 3.4 0 0 1-.295.52c-.398.583-.968 1.077-1.696 1.472-.385.204-.786.34-.955.8-.128.348-.044.743.28 1.075q.18.189.409.31a4.4 4.4 0 0 0 1 .4.7.7 0 0 1 .202.09c.118.104.102.26.259.488q.12.178.296.3c.33.229.701.243 1.095.258.355.014.758.03 1.217.18.19.064.389.186.618.328.55.338 1.305.802 2.566.802 1.262 0 2.02-.466 2.576-.806.227-.14.424-.26.609-.321.46-.152.863-.168 1.218-.181.393-.015.764-.03 1.095-.258a1.14 1.14 0 0 0 .336-.368c.114-.192.11-.327.217-.42a.6.6 0 0 1 .19-.087 4.5 4.5 0 0 0 1.014-.404c.16-.087.306-.2.429-.336l.004-.005c.304-.325.38-.709.256-1.047m-1.121.602c-.684.378-1.139.337-1.493.565-.3.193-.122.61-.34.76-.269.186-1.061-.012-2.085.326-.845.279-1.384 1.082-2.903 1.082s-2.045-.801-2.904-1.084c-1.022-.338-1.816-.14-2.084-.325-.218-.15-.041-.568-.341-.761-.354-.228-.809-.187-1.492-.563-.436-.24-.189-.39-.044-.46 2.478-1.199 2.873-3.05 2.89-3.188.022-.166.045-.297-.138-.466-.177-.164-.962-.65-1.18-.802-.36-.252-.52-.503-.402-.812.082-.214.281-.295.49-.295a1 1 0 0 1 .197.022c.396.086.78.285 1.002.338q.04.01.082.011c.118 0 .16-.06.152-.195-.026-.433-.087-1.277-.019-2.066.094-1.084.444-1.622.859-2.097.2-.229 1.137-1.22 2.93-1.22 1.792 0 2.732.987 2.931 1.215.416.475.766 1.013.859 2.098.068.788.009 1.632-.019 2.065-.01.142.034.195.152.195a.4.4 0 0 0 .082-.01c.222-.054.607-.253 1.002-.338a1 1 0 0 1 .197-.023c.21 0 .409.082.49.295.117.309-.04.56-.401.812-.218.152-1.003.638-1.18.802-.184.169-.16.3-.139.466.018.14.413 1.991 2.89 3.189.147.073.394.222-.041.464" />
          </svg>
        );
      case "threads":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161"/>
          </svg>
        );
      case "discord":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.966 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
        );
      case "behance":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 7.686h-6.195V9.03h6.195V7.686zm-18.32 4.417h2.809c.074.49-.074.96-.445 1.41-.371.451-.883.676-1.536.676-1.039 0-1.666-.63-1.88-1.886.04-.047.452-.204.452-.2zm.178-2.193h2.32c.104.385.05.748-.163 1.096-.214.348-.521.522-.924.522-.72 0-1.224-.46-1.51-1.385l.277-.233zm5.799 1.979c.67.625 1.004 1.464 1.004 2.517 0 1.15-.367 2.062-1.1 2.735-.733.672-1.821 1.008-3.262 1.008H0V3.75h6.136c1.282 0 2.251.272 2.906.816.654.544.981 1.258.981 2.143 0 .807-.266 1.455-.798 1.944-.531.49-1.264.736-2.198.736.877.106 1.543.435 1.998.986.455.551.682 1.258.682 2.122 0 .885-.198 1.6-.593 2.145-.395.545-.968.818-1.72.818-.838 0-1.42-.424-1.745-1.27l.001-.15zm-2.92-3.834h-.924V5.414h.924c.732 0 1.098.272 1.098.816 0 .544-.366.816-1.098.816zM13.623 15.01c.21 1.149.784 2.144 1.722 2.986.938.841 2.053 1.261 3.344 1.261 1.076 0 2.016-.302 2.82-.906.804-.604 1.353-1.417 1.646-2.438h-2.502c-.156.406-.411.728-.767.966-.356.238-.795.357-1.317.357s-.9-.12-1.133-.36c-.233-.24-.35-.615-.35-1.127H24c.02-.303.03-.541.03-.715 0-2.022-.507-3.619-1.522-4.79C21.493 9.074 20.038 8.489 18.143 8.489c-1.808 0-3.327.604-4.555 1.813-1.228 1.209-1.842 2.766-1.842 4.671 0 1.905.621 3.486 1.877 4.743" />
          </svg>
        );
      case "slack":
        return <Slack size={20} />;
      case "telegram":
        return <Send size={20} />;
      case "email":
      case "mail":
        return <Mail size={20} />;
      case "phone":
        return <Phone size={20} />;
      case "globe":
      case "website":
        return <Globe size={20} />;
      default:
        return <LinkIcon size={20} />;
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 5px rgba(82, 183, 136, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(82, 183, 136, 0.4);
          }
        }

        .animate-on-scroll {
          opacity: 0;
        }

        .animate-on-scroll.animate-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-on-scroll.delay-1 {
          animation-delay: 0.1s;
        }

        .animate-on-scroll.delay-2 {
          animation-delay: 0.2s;
        }

        .animate-on-scroll.delay-3 {
          animation-delay: 0.3s;
        }

        .animate-on-scroll.delay-4 {
          animation-delay: 0.4s;
        }

        .shimmer-line {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(82, 183, 136, 0.3),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      <footer
        ref={footerRef}
        id="footer"
        className="relative border-t border-[#52b788]/20 bg-[#0c1311] overflow-hidden"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #52b788 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Main Footer Content */}
        <div
          ref={elementsRef}
          className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-6"
        >
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-4 animate-on-scroll">
              <div className="mb-6">
                <div className="transform transition-all duration-500 hover:scale-105 inline-block">
                  <div className="bg-white/95 px-3 py-1.5 rounded-2xl shadow-[0_0_20px_rgba(82,183,136,0.25)] flex items-center justify-center">
                    {logoSrc && typeof logoSrc === "string" ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={logoSrc}
                        alt={clinicInfo?.name || "Ali Yakout Dental Clinic"}
                        className="h-8 w-auto object-contain"
                      />
                    ) : (
                      <Image
                        src={logo}
                        alt="Ali Yakout Dental Clinic"
                        width={140}
                        height={45}
                        className="h-8 w-auto object-contain"
                      />
                    )}
                  </div>
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-[#52b788] to-transparent mt-3 animate-on-scroll delay-1"></div>
              </div>
              <p className="text-[#cbd5e1] text-base leading-relaxed mb-6 animate-on-scroll delay-2">
                {clinicInfo?.description || t("Footer-Description")}
              </p>

              {/* Clinic Quick Info */}
              {(clinicInfo?.phone || clinicInfo?.address) && (
                <div className="space-y-2 mb-6 text-sm text-[#94a3b8] animate-on-scroll delay-2">
                  {clinicInfo?.address && (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-[#52b788] flex-shrink-0" />
                      <span className="line-clamp-1">{clinicInfo.address}</span>
                    </div>
                  )}
                  {clinicInfo?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-[#52b788] flex-shrink-0" />
                      <a href={`tel:${clinicInfo.phone}`} className="hover:text-[#52b788] transition-colors" dir="ltr">
                        {clinicInfo.phone}
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Social Links */}
              {normalizedSocials.length > 0 && (
                <div className="grid grid-cols-5 gap-3 max-w-fit animate-on-scroll delay-3 p-1">
                  {normalizedSocials.map((social, index) => (
                    <Link
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-10 h-10 rounded-lg bg-[#141f1b] border border-[#52b788]/20 flex items-center justify-center text-[#52b788] hover:bg-[#52b788] hover:text-[#0c1311] hover:border-[#52b788] transition-all duration-300 hover:scale-110"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      aria-label={social.platform}
                    >
                      <div className="transform transition-transform duration-300 group-hover:scale-110">
                        {getSocialIcon(social.platform)}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Company Links */}
            <div className="lg:col-span-4 animate-on-scroll delay-2">
              <h4 className="text-[#f8fafc] text-lg font-bold mb-6 uppercase tracking-wider relative inline-block">
                {t("Sections")}
                <div className="absolute -bottom-2 left-0 h-0.5 w-12 bg-[#52b788] shimmer-line"></div>
              </h4>
              <ul className="grid grid-cols-3">
                {footerLinks.company.map((link, index) => (
                  <li
                    key={link.name}
                    className="animate-on-scroll"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="group text-[#cbd5e1] hover:text-[#52b788] transition-all duration-300 flex items-center gap-2 py-1"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[#52b788] transition-all duration-300"></span>
                      <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div className="lg:col-span-4 animate-on-scroll delay-3">
              <h4 className="text-[#f8fafc] text-lg font-bold mb-6 uppercase tracking-wider relative inline-block">
                {t("Services")}
                <div className="absolute -bottom-2 left-0 h-0.5 w-12 bg-[#52b788] shimmer-line"></div>
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li
                    key={service.id}
                    className="animate-on-scroll"
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    <div className="text-[#cbd5e1] flex items-center gap-2 py-1">
                      <span className="w-1 h-px bg-[#52b788]/40"></span>
                      <span>{service.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#52b788]/30 to-transparent mb-6 animate-on-scroll delay-4 shimmer-line"></div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 animate-on-scroll delay-4">
            <p className="text-[#94a3b8] text-sm">
              {t("All Rights Reserved")}{" "}
              <span className="text-[#52b788] font-bold">
                {clinicInfo?.name || "عيادة د. علي ياقوت لطب وتجميل الأسنان"}
              </span>{" "}
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* Decorative Bottom Accent */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#52b788] to-transparent shimmer-line"></div>
      </footer>
    </>
  );
}
