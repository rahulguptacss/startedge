import data from '../data/data.json';

export interface LinkType {
  name: string;
  href: string;
  active?: boolean;
}

export interface HeaderData {
  logo: string;
  logo_image?: string;
  logo_white?: string;
  logo_dark?: string;
  logo_text: string;
  links: LinkType[];
  phone: string;
  button_text: string;
  button_link: string;
}

export interface FooterData {
  logo: string;
  logo_image?: string;
  logo_white?: string;
  logo_dark?: string;
  logo_text: string;
  description: string;
  quick_links: LinkType[];
  our_services: LinkType[];
  company: LinkType[];
  headings: { quick_links: string; our_services: string; company: string; contact: string };
  contact: { address: string; email: string; phone: string };
  contact_labels: { address: string; email: string; phone: string };
  copyright: string;
  socials: { name: string; href: string }[];
}

export interface HeroSectionData {
  eyebrow: string;
  title_line1: string;
  title_highlight: string;
  title_line2: string;
  description: string;
  button: { text: string; href: string };
  button_secondary?: { text: string; href: string };
  image: string;
}

export interface AboutSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  image: string;
  image_secondary: string;
  cards: { title: string; description: string; icon: string }[];
  stats: { value: string; label: string }[];
}

export interface CtaSectionData {
  eyebrow: string;
  title_line1: string;
  title_line2: string;
  title_highlight: string;
  description: string;
  button: { text: string; href: string };
  phone_label: string;
  phone: string;
  email_label: string;
  email: string;
  image: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  image: string;
  link: string;
  icon: string;
  button_text?: string;
}

export interface ServicesSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  button?: { text: string; href: string };
  button_text?: string;
  card_button_text?: string;
  items: ServiceItem[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  socials?: { name: string; href: string; icon?: string }[];
}

export interface TeamSectionData {
  subtitle: string;
  title_line1: string;
  title_mobile_line1: string;
  title_mobile_prefix: string;
  title_highlight: string;
  description: string;
  button: { text: string; href: string };
  socials?: { name: string; href: string; icon?: string }[];
  members: TeamMember[];
}

export interface FaqSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  image: string;
  items: { question: string; answer: string }[];
}

export interface TestimonialsSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  image: string;
  reviews: { text: string; author: string; role: string; avatar: string; rating: number }[];
}

export interface BlogItem {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  href: string;
}

export interface BlogsSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  read_more: string;
  button: { text: string; href: string };
  items: BlogItem[];
}

export interface PortfolioItem {
  slug: string;
  title: string;
  category: string;
  image: string;
}

export interface PortfolioDetail {
  slug: string;
  title: string;
  image: string;
  title_line1: string;
  title_highlight: string;
  paragraphs: string[];
  facts_title: string;
  facts_intro: string;
  facts_aside: string;
  facts: string[];
  results_title: string;
  results_text: string;
  gallery: string[];
  client: string;
  project_type: string;
  date: string;
}

export interface PortfolioSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  items: PortfolioItem[];
}

export interface PortfolioDetailsSectionData {
  about_label: string;
  info_title: string;
  client_label: string;
  type_label: string;
  date_label: string;
  items: PortfolioDetail[];
}

export interface ContactSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  map_embed: string;
  cards?: { icon: string; title: string; lines: string[]; href?: string }[];
  form: {
    subtitle: string;
    title: string;
    title_highlight: string;
    description: string;
    button_text: string;
    placeholders: { name: string; email: string; phone: string; subject: string; message: string };
    subjects: string[];
    success_title?: string;
    success_message?: string;
  };
}

export interface ServiceDetailsData {
  slug: string;
  title: string;
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  intro: string;
  image: string;
  description_title: string;
  paragraphs: string[];
  process_title: string;
  process: { number: string; title: string; description: string }[];
}

export interface ServiceSidebarData {
  services_title: string;
  contact_title: string;
  address: string;
  phone: string;
  email: string;
  button: { text: string; href: string };
  project_title: string;
  project_text: string;
  project_button: { text: string; href: string };
}

export interface ThankYouSectionData {
  title: string;
  title_highlight: string;
  description: string;
  button: { text: string; href: string };
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbData {
  title: string;
  items: BreadcrumbItem[];
}

export interface BreadcrumbProps {
  data: BreadcrumbData;
}

export interface HeaderProps { data: HeaderData }
export interface FooterProps { data: FooterData }
export interface HeroProps { data: HeroSectionData }
export interface AboutProps { data: AboutSectionData }
export interface CtaProps { data: CtaSectionData }
export interface ServicesProps { data: ServicesSectionData; limit?: number; showButton?: boolean; paginate?: boolean }
export interface TeamProps { data: TeamSectionData }
export interface FaqProps { data: FaqSectionData }
export interface TestimonialsProps { data: TestimonialsSectionData }
export interface BlogsProps { data: BlogsSectionData; showButton?: boolean; paginate?: boolean; limit?: number }
export interface PortfolioProps { data: PortfolioSectionData }
export interface PortfolioDetailsProps { data: PortfolioDetail; labels: Pick<PortfolioDetailsSectionData, 'about_label' | 'info_title' | 'client_label' | 'type_label' | 'date_label'> }
export interface ContactProps { data: ContactSectionData }
export interface ServiceDetailsProps { data: ServiceDetailsData; allServices: ServiceItem[]; sidebar: ServiceSidebarData }
export interface BlogDetailSection {
  heading: string;
  text: string;
}

export interface BlogDetail {
  slug: string;
  title: string;
  image: string;
  day: string;
  month: string;
  author: string;
  category: string;
  intro: string;
  sections: BlogDetailSection[];
}

export interface BlogDetailsSectionData {
  author_label: string;
  latest_title: string;
  categories_title: string;
  categories: { name: string; href: string }[];
  items: BlogDetail[];
}

export interface BlogDetailsProps {
  data: BlogDetail;
  latest: BlogItem[];
  sidebar: Pick<BlogDetailsSectionData, 'author_label' | 'latest_title' | 'categories_title' | 'categories'>;
}
export interface ThankYouProps { data: ThankYouSectionData }

export interface PageComponent {
  key: string;
  component: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: { title: string };
  components: PageComponent[];
  breadcrumb?: BreadcrumbData;
}

export const siteJson = data;
export const common = data.common;
export const template = data.categories.Finance.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;

export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
