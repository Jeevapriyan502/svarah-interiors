export type ProjectType =
  | "Residential"
  | "Commercial"
  | "Hospitality"
  | "Renovation"
  | "Full Interior"
  | "Consultation";

export interface LeadFormData {
  client_name: string;
  email: string;
  project_type: ProjectType;
  phone_number: string;
  message?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  aspectRatio: "tall" | "wide" | "square";
}

export interface GalleryMemory {
  id: string;
  title: string;
  category: string;
  year: string;
  location: string;
  image: string;
  memory: string;
  span: "normal" | "wide" | "tall" | "featured";
}
