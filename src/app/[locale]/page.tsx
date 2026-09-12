import Header from "@/components/Header/Header";
import { fetchHomeData } from "@/api/homeService";
import AboutSection from "@/components/About/AboutSection";
import ContactSection from "@/components/Contact/ContactUs";
import ExecutionProcess from "@/components/ExecutionProcess/page";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects/Projects";
import ServicesSection from "@/components/Serivces/Services";
import ScannerSection from "@/components/Custom/ScannerSection";
import BeforeAfterSection from "@/components/Custom/BeforeAfterSlider";
import FloatingWhatsApp from "@/components/Custom/FloatingWhatsApp";
import { HomeResponse } from "@/types/homeApiTypes";

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const homeApiData: HomeResponse = await fetchHomeData(locale);
  const data = homeApiData?.data || {};
  const {
    home = { description: "", logo: null, sliders: [] },
    about = { title: "", description: "", badges: [], image_url: null, alt_image: null },
    statistics = [],
    services = [],
    sections = { standards: [], step_by_step: [], quality_control: [], project_risks: [] },
    projects = [],
    contact = { phone: "", email: "", address: "" },
    social_links = [],
  } = data;

  return (
    <main className="bg-[#171410] text-[#e6d5c0] min-h-screen">
      <Header logoSrc={home.logo} />
      <Hero home={home} />
      <AboutSection about={about} statistics={statistics} />
      <ScannerSection />
      <ServicesSection services={services} />
      <ExecutionProcess sections={sections} />
      <BeforeAfterSection />
      <Projects projects={projects} />
      <ContactSection contact={contact} />
      <Footer social_links={social_links} services={services} />
      <FloatingWhatsApp />
    </main>
  );
}