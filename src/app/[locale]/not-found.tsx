import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#0c1311] text-[#f8fafc] flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-bold text-[#52b788] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">الصفحة غير موجودة</h2>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#52b788] to-[#2d6a4f] text-[#0c1311] hover:text-white font-bold transition-all shadow-[0_0_20px_rgba(82,183,136,0.3)]"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
