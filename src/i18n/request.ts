import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const namespaces = ["home"] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "en" | "ar")) {
    locale = routing.defaultLocale;
  }

  const messages = Object.fromEntries(
    await Promise.all(
      namespaces.map(async (ns) => {
        const mod = await import(`../../messages/${locale}/${ns}.json`);
        return [ns, mod.default] as const;
      })
    )
  );

  return { locale, messages };
});
