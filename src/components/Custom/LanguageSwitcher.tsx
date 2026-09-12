"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleSwitch}
      disabled={isPending}
      className="cursor-pointer bg-[#52b788] hover:bg-[#40916c] text-[#0c1311] hover:text-[#f8fafc] font-bold transition-all shadow-[0_0_15px_rgba(82,183,136,0.3)]"
      title={locale === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      <Languages className="h-5 w-5" />
      <span className="sr-only">Switch Language</span>
    </Button>
  );
}
