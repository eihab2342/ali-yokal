const NEXT_PUBLIC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchHomeData(lang = "en") {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/${lang}/home`, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
      method: "GET",
      cache: "no-store",
      next: { revalidate: 0 },
    });

    const text = await response.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      console.warn("JSON parse error:", e);
    }

    if (!response.ok || !data) {
      console.error("Failed to fetch home data:", data || text);
      return { success: false, message: "Failed To Fetch Home Data" };
    }

    return data;
  } catch (error) {
    console.error("Error fetching home data:", error);

    return {
      success: false,
      message: "Unable to connect to the server, Please try again later.",
    };
  }
}
