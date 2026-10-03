export type ProductCategory =
  | "main-entrance-doors"
  | "interior-doors"
  | "wooden-doors"
  | "aluminium-doors"
  | "sliding-doors"
  | "aluminium-windows"
  | "upvc-windows"
  | "sliding-windows"
  | "custom-solutions";

export type MaterialType =
  | "Solid Seasoned Timber"
  | "Thermal-Break Aluminium"
  | "Precision UPVC"
  | "Composite Wood-Aluminium"
  | "Architectural Bronze & Steel";

export type OpeningMechanism =
  | "Pivot System"
  | "Hinged Casement"
  | "Multi-Slide Telescopic"
  | "Tilt & Turn"
  | "Bi-Folding System"
  | "Concealed Pocket Slide"
  | "Fixed Architectural Picture";

export interface ColorFinishOption {
  id: string;
  name: string;
  hex: string;
  textureLabel: string;
  imageUrl?: string;
  extraLeadTimeWeeks?: number;
}

export interface FrameOption {
  id: string;
  name: string;
  depthMm: number;
  sightlineMm: number;
  description: string;
}

export interface GlassOption {
  id: string;
  name: string;
  uValue: number;
  soundReductionDb: number;
  description: string;
}

export interface HardwareOption {
  id: string;
  name: string;
  finish: string;
  type: string;
  imageUrl?: string;
}

export interface TechnicalSpecifications {
  thermalTransmittance: string; // e.g. "Uw = 0.85 W/m²K"
  acousticInsulation: string; // e.g. "Rw up to 44 dB"
  airPermeability: string; // e.g. "Class 4 (EN 12207)"
  waterTightness: string; // e.g. "Class E1200 (EN 12208)"
  windResistance: string; // e.g. "Class C5 (EN 12210)"
  burglarResistance: string; // e.g. "RC2 / RC3 Certified"
  maxPanelWeight: string; // e.g. "400 kg"
  standardWarrantyYears: number;
}

export interface ProductDimensions {
  standardWidthMm: number;
  standardHeightMm: number;
  minWidthMm: number;
  maxWidthMm: number;
  minHeightMm: number;
  maxHeightMm: number;
  depthMm: number;
  unit: "mm" | "in";
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  category: ProductCategory;
  categoryName: string;
  tagline: string;
  shortDescription: string;
  detailedDescription: string;
  material: MaterialType;
  openingType: OpeningMechanism;
  images: string[];
  dimensions: ProductDimensions;
  finishes: ColorFinishOption[];
  frameOptions: FrameOption[];
  glassOptions: GlassOption[];
  hardwareOptions: HardwareOption[];
  specifications: TechnicalSpecifications;
  features: string[];
  installationNotes: string[];
  maintenanceGuide: string[];
  transparentPngUrl?: string;
  pngVariants?: { name: string; finishId: string; pngUrl: string }[];
  arAvailable: boolean;
  featured: boolean;
  isNewRelease?: boolean;
  badge?: string;
}

export interface ProductConfigurationState {
  productId: string;
  selectedFinish: ColorFinishOption;
  selectedFrame: FrameOption;
  selectedGlass?: GlassOption;
  selectedHardware: HardwareOption;
  widthMm: number;
  heightMm: number;
  quantity: number;
  customNotes?: string;
}

export interface CategoryInfo {
  id: ProductCategory;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  heroImage: string;
  iconName: string;
  keyHighlights: string[];
  count: number;
}
