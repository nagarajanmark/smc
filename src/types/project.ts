export type ProjectCategory =
  | "Luxury Villa"
  | "Contemporary Residence"
  | "Commercial & Retail"
  | "High-Rise Penthouse"
  | "Heritage & Restoration";

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  clientType: string;
  category: ProjectCategory;
  location: string;
  yearCompleted: number;
  architect?: string;
  description: string;
  mainImage: string;
  galleryImages: string[];
  installedProducts: {
    productId?: string;
    productName: string;
    sku: string;
    category: string;
  }[];
  specifications: {
    glazingSystem: string;
    finishType: string;
    totalUnits: number;
    acousticRating?: string;
  };
  highlightQuote?: string;
}
