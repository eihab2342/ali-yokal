export interface HomeResponse {
  status: number;
  data: Data;
  message: string;
}

export interface Data {
  home: Home;
  about: About;
  statistics: Statistic[];
  services: Service[];
  projects: Project[];
  sections: Section;
  contact: Contact;
  social_links: SocialLink[];
  seo: SEO;
}

/* ================= HOME ================= */
export interface Home {
  description: string;
  logo: string | null;
  sliders: Slider[];
}

export interface Slider {
  id: number;
  title: string;
  text: string;
  image_url: string;
  alt_image: string | null;
}

/* ================= ABOUT ================= */
export interface About {
  title: string;
  description: string;
  badges: string[];
  image_url: string | null;
  alt_image: string | null;
}

/* ================= STATISTICS ================= */
export interface Statistic {
  id: number;
  title: string;
  count: number;
  image_url: string | null;
}

/* ================= SERVICES ================= */
export interface Service {
  id: number;
  name: string;
  short_desc: string;
  image_url: string;
  alt_image: string | null;
}

/* ================= PROJECTS ================= */
export interface Project {
  id: number;
  name: string;
  short_desc: string;
  long_desc: string | null;
  type: string | null;
  date: string;
  location: string | null;
  area: string | null;
  client: string | null;
  badges: string[];
  thumbnail_url: string;
  images: ProjectImage[];
}

export interface ProjectImage {
  id: number;
  image_url: string;
  alt: string;
  sort_order: number;
}

/* ================= SECTIONS ================= */
export interface Section {
  standards: SectionItem[];
  step_by_step: SectionItem[];
  quality_control: SectionItem[];
  project_risks: SectionItem[];
}

export interface SectionItem {
  id: number;
  title: string;
  description: string;
  layout: "title_desc" | "title_only"; // can expand if more layouts exist
  items: SectionSubItem[];
}

export interface SectionSubItem {
  id: number;
  title: string;
  description: string;
}

/* ================= CONTACT ================= */
export interface Contact {
  phone: string;
  email: string;
  address: string;
}

/* ================= SOCIAL ================= */
export interface SocialLink {
  platform: string;
  url: string;
}

/* ================= SEO ================= */
export interface SEO {
  meta_tags: MetaTags;
  open_graph: OpenGraph;
  twitter_card: TwitterCard;
  hreflang_tags: HreflangTags;
  schema: Schema[];
}

export interface MetaTags {
  content_type: string;
  title: string;
  author: string;
  description: string;
  canonical: string;
  robots: string;
}

export interface OpenGraph {
  "og:type": string;
  "og:url": string;
  "og:image": string;
  "og:title": string;
  "og:description": string;
}

export interface TwitterCard {
  "twitter:card": string;
  "twitter:image": string;
  "twitter:title": string;
  "twitter:description": string;
}

export interface HreflangTags {
  en: string;
  ar: string;
  "x-default": string;
}

export interface Schema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  contactPoint: ContactPoint;
}

export interface ContactPoint {
  "@type": string;
  telephone: string;
  contactType: string;
}