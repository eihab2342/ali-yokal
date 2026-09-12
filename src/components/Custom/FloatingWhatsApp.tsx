"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const whatsappNumber = "201000000000"; // fallback or can be customized
  const defaultMessage = encodeURIComponent("مرحباً دكتور، أود الاستفسار وحجز موعد كشف واستشارة في العيادة.");

  return (
    <div className="fixed bottom-6 right-6 z-[9999] group flex items-center gap-3">
      {/* Tooltip on hover */}
      <div className="hidden md:flex items-center px-4 py-2 rounded-full bg-[#171410]/95 border border-[#c9a750]/40 text-[#e6d5c0] text-xs font-semibold shadow-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span>تواصل مباشر مع الدكتور عبر الواتساب</span>
      </div>

      {/* Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-[0_4px_25px_rgba(37,211,102,0.4)] hover:scale-110 transition-all duration-300 active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white text-transparent" />
      </a>
    </div>
  );
}
