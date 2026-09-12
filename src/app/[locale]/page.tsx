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

  const clinicInfo = data.clinic_info;
  const heroSection = data.hero_section;
  const aboutSection = data.about_section;
  const scannerSection = data.scanner_technology_section;
  const services = data.services || [];
  const cases = data.cases || data.projects || [];
  const stepByStep = data.step_by_step_execution;
  const standards = data.standards;
  const qualityControl = data.quality_control;
  const riskPrevention = data.risk_prevention;
  const sections = data.sections || {
    standards: standards ? [{ id: 1, title: "", description: "", layout: "title_desc" as const, items: standards }] : [],
    step_by_step: stepByStep ? [{ id: 1, title: "", description: "", layout: "title_desc" as const, items: stepByStep }] : [],
    quality_control: qualityControl ? [{ id: 1, title: "", description: "", layout: "title_desc" as const, items: qualityControl }] : [],
    project_risks: riskPrevention ? [{ id: 1, title: "", description: "", layout: "title_only" as const, items: riskPrevention }] : [],
  };

  const about = data.about || {
    title: aboutSection?.title || "",
    description: aboutSection?.description_1 || aboutSection?.description_2 || "",
    badges: aboutSection?.features || [],
    image_url: aboutSection?.doctor_image || null,
    alt_image: null,
  };

  const statistics = data.statistics || (heroSection?.stats
    ? heroSection.stats.map((s, idx) => ({
        id: s.id || idx + 1,
        title: s.label,
        count: parseInt(s.value.replace(/[^0-9]/g, "")) || 10,
        image_url: null,
      }))
    : []);

  const contact = data.contact || {
    phone: clinicInfo?.phone || "",
    email: clinicInfo?.email || "",
    address: clinicInfo?.address || "",
  };

  const socialLinks = data.social_links || clinicInfo?.social_links || [];
  const logoSrc = clinicInfo?.light_logo || clinicInfo?.white_logo || clinicInfo?.logo || data.home?.logo;

  return (
    <main className="bg-[#0c1311] text-[#f8fafc] min-h-screen">
      <Header logoSrc={logoSrc} clinicInfo={clinicInfo} />
      <Hero heroSection={heroSection} clinicInfo={clinicInfo} home={data.home} />
      <AboutSection aboutSection={aboutSection} about={about} statistics={statistics} />
      <ScannerSection scannerSection={scannerSection} />
      <ServicesSection services={services} />
      <ExecutionProcess
        sections={sections}
        stepByStep={stepByStep}
        standards={standards}
        qualityControl={qualityControl}
        riskPrevention={riskPrevention}
      />
      <BeforeAfterSection cases={cases} projects={cases} />
      <Projects projects={cases} />
      <ContactSection contact={contact} clinicInfo={clinicInfo} services={services} />
      <Footer social_links={socialLinks} services={services} clinicInfo={clinicInfo} logoSrc={logoSrc} />
      <FloatingWhatsApp whatsappNumber={clinicInfo?.phone || clinicInfo?.whatsapp} />
    </main>
  );
}