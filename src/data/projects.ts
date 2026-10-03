import { ProjectItem } from "@/types/project";

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-01",
    slug: "villa-solarium-hilltop-residence",
    title: "Villa Solarium Hilltop Residence",
    clientType: "Private Residential Estate",
    category: "Luxury Villa",
    location: "Alibaug Hills, Maharashtra",
    yearCompleted: 2025,
    architect: "Studio K Architecture & Design",
    description: "A cliffside luxury residence designed with continuous 4-meter floor-to-ceiling Horizon ultra-slim sliding glass walls and a bespoke 3.8m Monolith pivot entrance in patinated bronze.",
    mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80"
    ],
    installedProducts: [
      {
        productId: "smc-piv-01",
        productName: "Monolith Architectural Pivot Door",
        sku: "SMC-DR-PVT-01",
        category: "Main Entrance Doors"
      },
      {
        productId: "smc-sld-02",
        productName: "Horizon Ultra-Slim Minimalist Sliding System",
        sku: "SMC-DR-SLD-02",
        category: "Sliding Doors"
      }
    ],
    specifications: {
      glazingSystem: "Triple Glazed Acoustic Low-E (44mm)",
      finishType: "Matte Obsidian Fluorocarbon & Patinated Bronze",
      totalUnits: 28,
      acousticRating: "Rw 43 dB"
    },
    highlightQuote: "SMC Fabrication delivered uncompromising structural precision. The 3.8m entrance pivot door glides like silk despite weighing nearly half a ton."
  },
  {
    id: "proj-02",
    slug: "the-lumina-penthouse-promenade",
    title: "The Lumina Sky Penthouse",
    clientType: "High-Rise Luxury Penthouse",
    category: "High-Rise Penthouse",
    location: "Worli Sea Face, Mumbai",
    yearCompleted: 2025,
    architect: "Morphogenesis Living Labs",
    description: "Perched 42 floors above the Arabian Sea, this penthouse required wind-load certified aluminium tilt-and-turn windows and hurricane-grade sliding glass systems resistant to severe monsoon driving rain.",
    mainImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80"
    ],
    installedProducts: [
      {
        productId: "smc-win-03",
        productName: "Aurora Architectural Tilt & Turn Window",
        sku: "SMC-WN-ALU-03",
        category: "Aluminium Windows"
      },
      {
        productId: "smc-int-06",
        productName: "Invisiline Frameless Interior Flush Door",
        sku: "SMC-DR-INT-06",
        category: "Interior Doors"
      }
    ],
    specifications: {
      glazingSystem: "Laminated Double Solar Control (36mm)",
      finishType: "Anodized Champagne Bronze",
      totalUnits: 34,
      acousticRating: "Rw 45 dB"
    },
    highlightQuote: "The acoustic isolation is staggering. You step in from city roar into a pin-drop silent sanctuary."
  },
  {
    id: "proj-03",
    slug: "atelier-cedar-courtyard-house",
    title: "Atelier Cedar Courtyard Villa",
    clientType: "Bespoke Residence",
    category: "Contemporary Residence",
    location: "Jubilee Hills, Hyderabad",
    yearCompleted: 2024,
    architect: "Vistara Atelier Architects",
    description: "An earthy, biophilic luxury home built around a central rainwater courtyard, featuring Heritage solid Burma Teak fluted entrance portals and seamless sliding doors opening to the water court.",
    mainImage: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80"
    ],
    installedProducts: [
      {
        productId: "smc-wd-04",
        productName: "Heritage Solid Teak Fluted Entrance Door",
        sku: "SMC-DR-WOD-04",
        category: "Wooden Doors"
      },
      {
        productId: "smc-sld-02",
        productName: "Horizon Ultra-Slim Minimalist Sliding System",
        sku: "SMC-DR-SLD-02",
        category: "Sliding Doors"
      }
    ],
    specifications: {
      glazingSystem: "Double Glazed Low-E Clear (32mm)",
      finishType: "Natural Burma Teak & Satin Charcoal Aluminium",
      totalUnits: 22,
      acousticRating: "Rw 39 dB"
    },
    highlightQuote: "The union of seasoned natural teak with industrial-precision aluminium frames gave our project its signature warmth and strength."
  },
  {
    id: "proj-04",
    slug: "nexus-design-centre-commercial-facade",
    title: "Nexus Flagship Design Center",
    clientType: "Commercial Architecture",
    category: "Commercial & Retail",
    location: "Indiranagar, Bengaluru",
    yearCompleted: 2024,
    architect: "Studio Praxis",
    description: "A 4-story flagship retail and design studio featuring a custom curved glass facade, oversized motorized pivot doors, and high-frequency commercial bi-fold glass partitions.",
    mainImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
    ],
    installedProducts: [
      {
        productId: "smc-cst-08",
        productName: "Bespoke Curved Glass & Pivot Facade",
        sku: "SMC-CS-BES-08",
        category: "Custom Solutions"
      },
      {
        productId: "smc-bif-07",
        productName: "PanoView Heavy-Duty Bi-Fold Door System",
        sku: "SMC-DR-BIF-07",
        category: "Sliding Doors"
      }
    ],
    specifications: {
      glazingSystem: "Laminated Structural Insulated Solar Control (42mm)",
      finishType: "Hand-Applied Patinated Liquid Bronze",
      totalUnits: 16,
      acousticRating: "Rw 46 dB"
    },
    highlightQuote: "SMC turned complex parametric architectural sketches into fully compliant, impeccably engineered reality."
  },
  {
    id: "proj-05",
    slug: "heritage-colonial-manor-restoration",
    title: "Colonial Manor Heritage Restoration",
    clientType: "Conservation Heritage Villa",
    category: "Heritage & Restoration",
    location: "Civil Lines, New Delhi",
    yearCompleted: 2023,
    architect: "Heritage Arch Associates",
    description: "Restoring an 80-year-old heritage manor with thermally insulated, historically authentic timber profiles and slimline double-glazed casement windows preserving period sightlines.",
    mainImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=1600&q=80"
    ],
    installedProducts: [
      {
        productId: "smc-wd-04",
        productName: "Heritage Solid Teak Fluted Entrance Door",
        sku: "SMC-DR-WOD-04",
        category: "Wooden Doors"
      },
      {
        productId: "smc-win-03",
        productName: "Aurora Architectural Tilt & Turn Window",
        sku: "SMC-WN-ALU-03",
        category: "Aluminium Windows"
      }
    ],
    specifications: {
      glazingSystem: "Heritage Slim Double Glaze (18mm)",
      finishType: "Seasoned Burma Teak & Aged Brass Hardware",
      totalUnits: 45,
      acousticRating: "Rw 38 dB"
    },
    highlightQuote: "Perfect balance between historical authenticity and modern thermal insulation."
  }
];
