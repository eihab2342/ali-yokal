"use client";

import { useRef, useState } from "react";
import { z } from "zod";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLocale, useTranslations } from "next-intl";
import { Contact, ClinicInfo, Service } from "@/types/homeApiTypes";
import { sendContactData } from "@/api/contactService";

gsap.registerPlugin(ScrollTrigger);

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  job_title?: string;
  company_name?: string;
  message: string;
};

export default function KoiaContactSection({
  contact,
  clinicInfo,
}: {
  contact?: Contact;
  clinicInfo?: ClinicInfo;
  services?: Service[];
}) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    job_title: "",
    company_name: "",
    message: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("home");
  const locale = useLocale();

  // Zod validation schema defined inside to use translations
  const contactSchema = z.object({
    name: z.string().min(2, t("Name must be at least 2 characters")),
    email: z.string().email(t("Please enter a valid email address")),
    phone: z.string().min(10, t("Please enter a valid phone number")),
    job_title: z.string().optional(),
    company_name: z.string().optional(),
    message: z.string().min(10, t("Message must be at least 10 characters")),
  });

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Header Animation
    tl.from(".contact-header", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    });

    // Header Line Animation - growing from center
    tl.from(
      ".contact-header-line",
      {
        scaleX: 0,
        transformOrigin: "center",
        duration: 1,
        ease: "power2.inOut",
      },
      "-=0.4",
    );

    // Title Animation
    tl.from(
      ".contact-title",
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.6",
    );

    // Contact Info Cards (Left Side) and Form (Right Side) - simultaneous
    tl.from(
      ".contact-info-card",
      {
        x: -30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.inOut",
      },
      "-=0.6",
    );

    // Contact Form (Right Side) - starts at same time as cards
    tl.from(
      ".contact-form",
      {
        x: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power4.inOut",
      },
      "-=1.3",
    );

    // Decorative Quote - comes in last
    tl.from(
      ".contact-quote",
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut",
      },
      "-=0.6",
    );
  }, { scope: sectionRef });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Call the API service
      const result = await sendContactData(validatedData as ContactFormData);

      if (result.success) {
        setSubmitStatus("success");
        setErrorMessage(
          result.data?.message || t("Message sent successfully!"),
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          job_title: "",
          company_name: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.message || t("FAILED-TO-SEND-MESSAGE"));
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Set validation errors
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.issues.forEach((issue) => {
          const path = issue.path[0] as keyof ContactFormData;
          if (path) {
            fieldErrors[path] = issue.message;
          }
        });
        setErrors(fieldErrors);
        // We don't set a general error message here as per user request
      } else {
        console.error("Unexpected error:", error);
        setSubmitStatus("error");
        setErrorMessage(t("FAILED-TO-SEND-MESSAGE"));
      }
    } finally {
      setIsSubmitting(false);
      // Make the message last for 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
        setErrorMessage(null);
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: t("Phone-Label"),
      value: clinicInfo?.phone || contact?.phone || "+20 100 000 0000",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: t("Email-Label"),
      value: clinicInfo?.email || contact?.email || "info@cosmetic-dentistry.com",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: t("Location-Label"),
      value: clinicInfo?.address || contact?.address || (locale === "ar" ? "الإسكندرية - منطقة سبورتنج (بالقرب من نادي سبورتنج وجامعة الإسكندرية)" : "Alexandria - Sporting Area (Near Sporting Club & Alexandria University)"),
    },
  ];

  return (
    <section
      id="contact-us"
      ref={sectionRef}
      className="relative min-h-fit overflow-hidden py-12 px-6 md:px-12 lg:px-20 bg-[#0c1311]"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <div className="contact-header inline-block mb-4">
            <span className="text-[#52b788] text-xs font-bold tracking-[0.3em] uppercase">
              {t("Get In Touch")}
            </span>
            <div className="contact-header-line h-0.5 w-full bg-gradient-to-r from-transparent via-[#52b788] to-transparent mt-2"></div>
          </div>
          <h2 className="contact-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#f8fafc] leading-tight mb-4">
            {t("LETS")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#52b788] via-[#74c69d] to-[#40916c] animate-gradient">
              {t("CONNECT-section")}
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="contact-info-card group relative p-6 bg-gradient-to-r from-[#141f1b] to-[#1b2a24] rounded-xl border border-[#52b788]/20 hover:border-[#52b788]/60 transition-all duration-500 hover:scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#52b788]/15 flex items-center justify-center text-[#52b788] group-hover:bg-[#52b788] group-hover:text-[#0c1311] transition-all duration-500">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-[#52b788] text-sm font-semibold uppercase tracking-wider mb-1">
                        {info.title}
                      </h3>
                      <p className="text-[#f8fafc] text-lg">{info.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Quote */}
            <div className="contact-quote relative p-7 bg-gradient-to-br from-[#141f1b]/80 to-transparent rounded-xl border border-[#52b788]/20">
              <div
                className={`absolute ${locale === "en" ? "left-4 top-4" : "right-4 top-4.5"} text-6xl text-[#52b788]/20`}
              >
                &quot;
              </div>
              <p className="relative z-10 text-[#cbd5e1] text-lg italic leading-relaxed ps-5">
                {t(
                  "Quality is not an act, it is a habit Lets build something exceptional together",
                )}
              </p>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="contact-form relative p-8 md:p-12 bg-gradient-to-br from-[#141f1b] to-[#1b2a24]/90 rounded-2xl border border-[#52b788]/25 backdrop-blur-sm shadow-2xl"
            >
              {/* Success Message */}
              {submitStatus === "success" && errorMessage && (
                <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg">
                  <p className="text-emerald-400 text-center font-semibold">
                    {errorMessage}
                  </p>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === "error" && errorMessage && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-400 text-center font-semibold">
                    {errorMessage}
                  </p>
                </div>
              )}

              <div className="space-y-7">
                {/* Name Field */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={`absolute ${locale === "en" ? "left-4" : "right-4"} transition-all duration-300 pointer-events-none ${
                      focusedField === "name" || formData.name
                        ? "-top-6 text-[#52b788]"
                        : "top-4 text-base text-[#94a3b8]"
                    }`}
                  >
                    {t("Full Name")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-4 bg-[#0c1311]/70 border ${
                      errors.name ? "border-red-500" : "border-[#52b788]/30"
                    } rounded-lg text-[#f8fafc] focus:border-[#52b788] focus:outline-none transition-all duration-300 ${locale === "ar" ? "text-right" : "text-left"}`}
                    suppressHydrationWarning
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email and Phone Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Email Field */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className={`absolute ${locale === "en" ? "left-4" : "right-4"} transition-all duration-300 pointer-events-none ${
                        focusedField === "email" || formData.email
                          ? "-top-6 text-[#52b788]"
                          : "top-4 text-base text-[#94a3b8]"
                      }`}
                    >
                      {t("Email Address")} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-4 bg-[#0c1311]/70 border ${
                        errors.email ? "border-red-500" : "border-[#52b788]/30"
                      } rounded-lg text-[#f8fafc] focus:border-[#52b788] focus:outline-none transition-all duration-300 ${locale === "ar" ? "text-right" : "text-left"}`}
                      suppressHydrationWarning
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="relative">
                    <label
                      htmlFor="phone"
                      className={`absolute ${locale === "en" ? "left-4" : "right-4"} transition-all duration-300 pointer-events-none ${
                        focusedField === "phone" || formData.phone
                          ? "-top-6 text-[#52b788]"
                          : "top-4 text-base text-[#94a3b8]"
                      }`}
                    >
                      {t("Phone Number")} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-4 bg-[#0c1311]/70 border ${
                        errors.phone ? "border-red-500" : "border-[#52b788]/30"
                      } rounded-lg text-[#f8fafc] focus:border-[#52b788] focus:outline-none transition-all duration-300 ${locale === "ar" ? "text-right" : "text-left"}`}
                      suppressHydrationWarning
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Job Title and Company Name Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Job Title Field */}
                  <div className="relative">
                    <label
                      htmlFor="job_title"
                      className={`absolute ${locale === "en" ? "left-4" : "right-4"} transition-all duration-300 pointer-events-none ${
                        focusedField === "job_title" || formData.job_title
                          ? "-top-6 text-[#52b788]"
                          : "top-4 text-base text-[#94a3b8]"
                      }`}
                    >
                      {t("Job Title")}
                    </label>
                    <input
                      type="text"
                      id="job_title"
                      name="job_title"
                      value={formData.job_title || ""}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("job_title")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-4 bg-[#0c1311]/70 border border-[#52b788]/30 rounded-lg text-[#f8fafc] focus:border-[#52b788] focus:outline-none transition-all duration-300 ${locale === "ar" ? "text-right" : "text-left"}`}
                      suppressHydrationWarning
                    />
                  </div>

                  {/* Company Name Field */}
                  <div className="relative">
                    <label
                      htmlFor="company_name"
                      className={`absolute ${locale === "en" ? "left-4" : "right-4"} transition-all duration-300 pointer-events-none ${
                        focusedField === "company_name" || formData.company_name
                          ? "-top-6 text-[#52b788]"
                          : "top-4 text-base text-[#94a3b8]"
                      }`}
                    >
                      {t("Company Name")}
                    </label>
                    <input
                      type="text"
                      id="company_name"
                      name="company_name"
                      value={formData.company_name || ""}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("company_name")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-4 bg-[#0c1311]/70 border border-[#52b788]/30 rounded-lg text-[#f8fafc] focus:border-[#52b788] focus:outline-none transition-all duration-300 ${locale === "ar" ? "text-right" : "text-left"}`}
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className={`absolute ${locale === "en" ? "left-4" : "right-4"} transition-all duration-300 pointer-events-none ${
                      focusedField === "message" || formData.message
                        ? "-top-6 text-[#52b788]"
                        : "top-4 text-base text-[#94a3b8]"
                    }`}
                  >
                    {t("Message")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    rows={6}
                    className={`w-full px-4 py-4 bg-[#0c1311]/70 border ${
                      errors.message ? "border-red-500" : "border-[#52b788]/30"
                    } rounded-lg text-[#f8fafc] focus:border-[#52b788] focus:outline-none transition-all duration-300 resize-none ${locale === "ar" ? "text-right" : "text-left"}`}
                    suppressHydrationWarning
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative cursor-pointer w-full px-8 py-4 bg-gradient-to-r from-[#2d6a4f] via-[#40916c] to-[#52b788] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(82,183,136,0.35)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base tracking-wide"
                  suppressHydrationWarning
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("SENDING")}...
                      </>
                    ) : (
                      <>{t("SEND MESSAGE")}</>
                    )}
                  </span>
                </button>
              </div>
            </form>
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
