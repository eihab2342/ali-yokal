"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp({ whatsappNumber }: { whatsappNumber?: string }) {
  // Normalize number (remove +, spaces, dashes)
  const cleanNumber = whatsappNumber
    ? whatsappNumber.replace(/[^0-9]/g, "")
    : "201000000000";
  const targetNumber = cleanNumber.startsWith("0") ? `2${cleanNumber}` : cleanNumber;
  const defaultMessage = encodeURIComponent("مرحباً دكتور، أود الاستفسار وحجز موعد كشف واستشارة في العيادة.");

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999] group flex items-center justify-center">
      {/* Tooltip on hover (positioned above button, out of flow) */}
      <div className="hidden md:flex items-center absolute bottom-full mb-3 right-0 px-4 py-2 rounded-full bg-[#0c1311]/95 border border-[#52b788]/40 text-[#f8fafc] text-xs font-semibold shadow-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
        <span>تواصل مباشر مع الدكتور عبر الواتساب</span>
      </div>

      {/* Button */}
      <a
        href={`https://wa.me/${targetNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-[0_4px_25px_rgba(37,211,102,0.45)] hover:scale-110 hover:shadow-[0_6px_30px_rgba(37,211,102,0.6)] transition-all duration-300 active:scale-95 cursor-pointer"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white text-transparent" />
      </a>
    </div>
  );
}
