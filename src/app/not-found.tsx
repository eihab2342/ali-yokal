import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#171410] text-[#e6d5c0] flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <h1 className="text-6xl font-bold text-[#c9a750] mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">الصفحة غير موجودة</h2>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c9a750] to-[#b2913c] text-[#171410] font-bold"
        >
          العودة للرئيسية
        </Link>
      </body>
    </html>
  );
}
