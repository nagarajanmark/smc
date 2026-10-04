export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  createdAt: string;
}

export interface SavedItem {
  id: string;
  productId: string;
  productName: string;
  category: string;
  sku: string;
  image: string;
  savedAt: string;
}

export interface QuoteRecord {
  id: string;
  userId: string;
  createdAt: string;
  productName: string;
  projectType: string;
  dimensions: string;
  quantity: string | number;
  hasLoft?: boolean;
  status: string;
  city: string;
  notes?: string;
  image?: string;
}
