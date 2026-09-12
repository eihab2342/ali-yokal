export interface HomeResponse {
  status: number;
  data: Data;
  message?: string;
}

export interface Data {
  clinic_info?: ClinicInfo;
  hero_section?: HeroSectionData;
  about_section?: AboutSectionData;
  scanner_technology_section?: ScannerTechnologySectionData;
  services?: Service[];
  step_by_step_execution?: StepExecutionItem[];
  standards?: StandardItem[];
  quality_control?: QualityControlItem[];
  risk_prevention?: RiskPreventionItem[];
  cases?: CaseItem[];
  
  // Legacy / Alternate mappings
  home?: Home;
  about?: About;
  statistics?: Statistic[];
  projects?: Project[];
  sections?: Section;
  contact?: Contact;
  social_links?: SocialLink[] | Record<string, string>;
  seo?: SEO;
}

/* ================= CLINIC INFO ================= */
export interface ClinicInfo {
  name?: string;
  description?: string;
  doctor_name?: string;
  doctor_title?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  google_maps_url?: string;
  working_hours?: string;
  logo?: string | null;
  light_logo?: string | null;
  dark_logo?: string | null;
  white_logo?: string | null;
  fav_icon?: string | null;
  social_links?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
    linkedin?: string;
    whatsapp?: string;
  };
}

/* ================= HERO SECTION ================= */
export interface HeroStat {
  id?: number;
  value: string;
  label: string;
}

export interface HeroSectionData {
  badge?: string;
  title_main?: string;
  title_highlight?: string;
  description?: string;
  doctor_image?: string;
  stats?: HeroStat[];
  cta_primary_text?: string;
  cta_whatsapp_text?: string;
}

/* ================= ABOUT SECTION ================= */
export interface AboutSectionData {
  label?: string;
  title?: string;
  description_1?: string;
  description_2?: string;
  doctor_image?: string;
  features?: string[];
  experience_years?: number;
  satisfied_cases_count?: number;
}

/* ================= SCANNER SECTION ================= */
export interface ScannerFeature {
  id?: number;
  title: string;
  description: string;
}

export interface ScannerTechnologySectionData {
  label?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  features?: ScannerFeature[];
}

/* ================= SERVICES ================= */
export interface Service {
  id: number;
  name: string;
  title?: string;
  short_desc?: string;
  description?: string;
  image_url: string;
  alt_image?: string | null;
  order?: number;
}

/* ================= CASES & PROJECTS ================= */
export interface CaseImage {
  id?: number;
  image_url: string;
  alt?: string;
  sort_order?: number;
}

export interface CaseItem {
  id: number;
  name: string;
  title?: string;
  category?: string;
  type?: string | null;
  tag?: string;
  short_desc?: string;
  description?: string;
  subtitle?: string;
  long_desc?: string | null;
  date?: string;
  location?: string | null;
  area?: string | null;
  client?: string | null;
  badges?: string[];
  thumbnail_url: string;
  before_image?: string;
  before_image_url?: string;
  after_image?: string;
  after_image_url?: string;
  images?: CaseImage[];
  gallery_images?: CaseImage[];
}

export type Project = CaseItem;
export type ProjectImage = CaseImage;

/* ================= EXECUTION & PROTOCOLS ================= */
export interface StepExecutionItem {
  id?: number;
  step_number?: string;
  title: string;
  description?: string;
  icon_key?: string;
}

export interface StandardItem {
  id?: number;
  title: string;
  description?: string;
  icon_key?: string;
}

export interface QualityControlItem {
  id?: number;
  title: string;
  description?: string;
}

export interface RiskPreventionItem {
  id?: number;
  title: string;
  description?: string;
}

/* ================= LEGACY TYPES ================= */
export interface Home {
  description?: string;
  logo?: string | null;
  sliders?: Slider[];
}

export interface Slider {
  id: number;
  title: string;
  text: string;
  image_url: string;
  alt_image?: string | null;
}

export interface About {
  title?: string;
  description?: string;
  badges?: string[];
  image_url?: string | null;
  alt_image?: string | null;
}

export interface Statistic {
  id: number;
  title: string;
  count: number;
  image_url?: string | null;
}

export interface Section {
  standards?: SectionItem[];
  step_by_step?: SectionItem[];
  quality_control?: SectionItem[];
  project_risks?: SectionItem[];
}

export interface SectionItem {
  id?: number;
  title?: string;
  description?: string;
  layout?: "title_desc" | "title_only";
  items?: (SectionSubItem | StandardItem | StepExecutionItem | QualityControlItem | RiskPreventionItem)[];
}

export interface SectionSubItem {
  id?: number;
  title: string;
  description?: string;
}

export interface Contact {
  phone?: string;
  email?: string;
  address?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SEO {
  meta_tags?: MetaTags;
  open_graph?: OpenGraph;
  twitter_card?: TwitterCard;
  hreflang_tags?: HreflangTags;
  schema?: Schema[];
}

export interface MetaTags {
  content_type?: string;
  title?: string;
  author?: string;
  description?: string;
  canonical?: string;
  robots?: string;
}

export interface OpenGraph {
  "og:type"?: string;
  "og:url"?: string;
  "og:image"?: string;
  "og:title"?: string;
  "og:description"?: string;
}

export interface TwitterCard {
  "twitter:card"?: string;
  "twitter:image"?: string;
  "twitter:title"?: string;
  "twitter:description"?: string;
}

export interface HreflangTags {
  en?: string;
  ar?: string;
  "x-default"?: string;
}

export interface Schema {
  "@context"?: string;
  "@type"?: string;
  name?: string;
  url?: string;
  logo?: string;
}