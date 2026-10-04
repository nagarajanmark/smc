import { Product, ColorFinishOption, ProductDimensions } from "./product";
import { QuoteRecord, UserProfile } from "./auth";

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "New" | "Contacted" | "In Discussion" | "Resolved";
  notes?: string;
}

export interface AdminQuoteRecord extends QuoteRecord {
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  estimatedPrice?: string;
  assignedEngineer?: string;
  adminNotes?: string;
  updatedAt?: string;
}

export interface AdminStats {
  totalQuotes: number;
  pendingQuotes: number;
  approvedQuotes: number;
  totalUsers: number;
  totalInquiries: number;
  totalProducts: number;
  estimatedPipelineValue: number;
}
