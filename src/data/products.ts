import { Product } from "@/types/product";

export const PRODUCTS_DATA: Product[] = [
  {
    id: "smc-pvt-01",
    slug: "monolith-oversized-pivot-door",
    name: "Monolith Oversized Architectural Pivot Door",
    sku: "SMC-DR-PVT-01",
    category: "main-entrance-doors",
    categoryName: "Main Entrance Doors",
    tagline: "Monumental pivot entrance portal with concealed floor-integrated hydraulic closing",
    shortDescription: "Engineered for grand entrances up to 4.2m in height. Features a concealed FritsJurgens pivot system, multi-point security locking, and aerospace-grade thermal insulation.",
    detailedDescription: "The Monolith Pivot Door represents the pinnacle of modern architectural entrance engineering. Designed to make a dramatic statement in luxury private villas and contemporary estates, this system rotates smoothly on an invisible vertical axis with zero ground threshold intrusion. Built with structural thermal-break aluminium extrusions clad in architectural finishes.",
    material: "Thermal-Break Aluminium",
    openingType: "Pivot System",
    images: [
      "/images/product-pivot-door.png",
      "/images/door-pivot.png",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80"
    ],
    dimensions: {
      standardWidthMm: 1800,
      standardHeightMm: 3000,
      minWidthMm: 1200,
      maxWidthMm: 2400,
      minHeightMm: 2400,
      maxHeightMm: 4200,
      depthMm: 85,
      unit: "mm"
    },
    finishes: [
      { id: "fin-obsidian", name: "Matte Obsidian Black", hex: "#000000", textureLabel: "Micro-texture Fluorocarbon" },
      { id: "fin-arch-blue", name: "Architectural Emerald Green", hex: "#009886", textureLabel: "Electro-anodized Metallic Satin" },
      { id: "fin-ice-light", name: "Ice Mint Metallic", hex: "#e6f7f5", textureLabel: "Satin Powder Coated Texture" },
      { id: "fin-white", name: "Signal Pure White", hex: "#ffffff", textureLabel: "Smooth Satin Finish" }
    ],
    frameOptions: [
      { id: "frm-concealed", name: "Zero-Sightline Concealed Wall Frame", depthMm: 110, sightlineMm: 0, description: "Fully plastered into wall jambs for a minimalist shadow-gap perimeter." },
      { id: "frm-arch-75", name: "Architectural 75mm Heavy-Duty Jamb", depthMm: 120, sightlineMm: 75, description: "Substantial perimeter frame with dual continuous thermal breaks." }
    ],
    glassOptions: [
      { id: "gl-none", name: "Solid Monolithic Panel (No Glass)", uValue: 0.65, soundReductionDb: 42, description: "High-density polyurethane core with dual structural insulation barriers." },
      { id: "gl-reeded", name: "Vertical Reeded Architectural Insulated Glass", uValue: 1.1, soundReductionDb: 38, description: "Decorative fluted triple safety glass with Low-E coating." },
      { id: "gl-smoked", name: "Smoked Privacy Solar Reflective Glass", uValue: 1.0, soundReductionDb: 40, description: "Tinted laminated security glass reducing 82% solar heat gain." }
    ],
    hardwareOptions: [
      { id: "hd-fullpull", name: "Full-Height Integrated LED Bar Handle (2400mm)", finish: "Matte Black Anodized", type: "Full Length Pull" },
      { id: "hd-recessed", name: "Concealed Finger-Grip Pocket with Biometric Scan", finish: "Architectural Emerald Green", type: "Integrated Smart Access" },
      { id: "hd-minimal", name: "Minimalist Offset Solid Pull (1200mm)", finish: "Solid Black", type: "Offset Pull Handle" }
    ],
    specifications: {
      thermalTransmittance: "Uw = 0.88 W/m²K",
      acousticInsulation: "Rw = 42 dB",
      airPermeability: "Class 4 (EN 12207)",
      waterTightness: "Class 9A (EN 12208)",
      windResistance: "Class C5 / B5 (EN 12210)",
      burglarResistance: "RC3 Security Standard",
      maxPanelWeight: "400 kg",
      standardWarrantyYears: 15
    },
    features: [
      "Concealed FritsJurgens System M+ pivot mechanism with adjustable damping & latching speed",
      "Continuous magnetic perimeter weather seal with double automatic drop-down bottom threshold",
      "Integrated 5-point motorized multipoint security lock with biometric fingerprint access",
      "Structural steel internal skeletal anti-bowing bracing system",
      "Seamless flush floor transition with zero floor pins or trip hazards"
    ],
    installationNotes: [
      "Requires solid reinforced concrete subfloor for floor plate anchoring.",
      "Upper lintel must accommodate structural load without deflection > 2mm.",
      "Pre-wiring required for motorized lock & LED ambient illumination integration."
    ],
    maintenanceGuide: [
      "Wipe powder-coated surfaces with soft microfiber cloth and pH-neutral solution every 6 months.",
      "Pivot hardware is self-lubricating and maintenance-free for 1,000,000 cycles.",
      "Inspect magnetic perimeter seals annually for optimal compression."
    ],
    transparentPngUrl: "/images/product-pivot-door.png",
    pngVariants: [
      { name: "Obsidian Black", pngUrl: "/images/product-pivot-door.png", finishId: "fin-obsidian" },
      { name: "Architectural Emerald Green", pngUrl: "/images/product-pivot-door.png", finishId: "fin-arch-blue" },
      { name: "Pure White", pngUrl: "/images/product-pivot-door.png", finishId: "fin-white" }
    ],
    arAvailable: true,
    featured: true,
    isNewRelease: true,
    badge: "Architectural Flagship"
  },
  {
    id: "smc-sld-02",
    slug: "horizon-ultra-slim-sliding-door",
    name: "Horizon Ultra-Slimline Sliding Glass Wall",
    sku: "SMC-DR-SLD-02",
    category: "sliding-doors",
    categoryName: "Sliding Doors",
    tagline: "Panoramic sliding system with ultra-minimal 20mm interlock sightline",
    shortDescription: "Floor-to-ceiling glass expanses engineered with concealed recessed tracks, heavy-duty stainless roller carriages, and motorized automation options.",
    detailedDescription: "The Horizon Ultra-Slim Sliding System eliminates visual boundaries between luxury interior architecture and outdoor terraces. With interlock sightlines of only 20mm and completely concealed bottom and top outer frames embedded into ceilings and floors, natural light floods living spaces uninterrupted.",
    material: "Thermal-Break Aluminium",
    openingType: "Multi-Slide Telescopic",
    images: [
      "/images/product-sliding-door.png",
      "/images/sliding-door.png",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
    ],
    dimensions: {
      standardWidthMm: 4000,
      standardHeightMm: 2800,
      minWidthMm: 2000,
      maxWidthMm: 12000,
      minHeightMm: 2200,
      maxHeightMm: 3800,
      depthMm: 180,
      unit: "mm"
    },
    finishes: [
      { id: "fin-black", name: "Deep Jet Black", hex: "#000000", textureLabel: "Ultra-Matte Marine Grade" },
      { id: "fin-blue", name: "Architectural Emerald Green", hex: "#009886", textureLabel: "Satin Brushed Metallic" },
      { id: "fin-ice", name: "Ice Mint Tint", hex: "#e6f7f5", textureLabel: "Fine Powder Coated Texture" },
      { id: "fin-white", name: "Signal White", hex: "#ffffff", textureLabel: "Smooth Architectural Powder" }
    ],
    frameOptions: [
      { id: "frm-flush-track", name: "Zero-Barrier Recessed Floor Track", depthMm: 180, sightlineMm: 20, description: "Completely flush with indoor flooring and exterior drainage deck." },
      { id: "frm-stepped-drain", name: "High-Monsoon Stepped Drain Track", depthMm: 210, sightlineMm: 25, description: "Enhanced water evacuation channels for coastal high-wind exposure." }
    ],
    glassOptions: [
      { id: "gl-low-e-triple", name: "Triple Glazed Argon Low-E (44mm)", uValue: 0.75, soundReductionDb: 43, description: "Ultimate solar reflection and thermal isolation." },
      { id: "gl-solar-double", name: "Double Glazed Solar Control (32mm)", uValue: 1.1, soundReductionDb: 38, description: "Optimum balance of clarity and thermal efficiency." }
    ],
    hardwareOptions: [
      { id: "hd-flush-latch", name: "Concealed Flush Magnetic Mortise Latch", finish: "Black Anodized", type: "Recessed Minimal Pull" },
      { id: "hd-motor-auto", name: "Motorized Concealed Belt Drive with App Control", finish: "Internal Concealed", type: "Automated Drive" }
    ],
    specifications: {
      thermalTransmittance: "Uw = 0.95 W/m²K",
      acousticInsulation: "Rw = 41 dB",
      airPermeability: "Class 4 (EN 12207)",
      waterTightness: "Class 9A / E1050 (EN 12208)",
      windResistance: "Class C4 (EN 12210)",
      burglarResistance: "RC2 Standard",
      maxPanelWeight: "500 kg/leaf",
      standardWarrantyYears: 12
    },
    features: [
      "Ultra-narrow 20mm vertical interlock profile",
      "Fully concealed perimeter frame embedded in ceilings and side walls",
      "Precision stainless steel multi-wheel roller carriages",
      "Integrated linear stainless floor drainage trough",
      "Electric motorization and smart-building automation compatible"
    ],
    installationNotes: [
      "Requires structural drainage channel connection beneath floor track.",
      "Ceiling recess box must be framed according to CAD structural drawings."
    ],
    maintenanceGuide: [
      "Vacuum track channel regularly to prevent debris accumulation.",
      "Lubricate roller bearings annually with silicon lubricant spray."
    ],
    transparentPngUrl: "/images/product-sliding-door.png",
    pngVariants: [
      { name: "Black Frame", pngUrl: "/images/product-sliding-door.png", finishId: "fin-black" },
      { name: "Blue Frame", pngUrl: "/images/product-sliding-door.png", finishId: "fin-blue" },
      { name: "White Frame", pngUrl: "/images/product-sliding-door.png", finishId: "fin-white" }
    ],
    arAvailable: true,
    featured: true,
    isNewRelease: false,
    badge: "Best Seller"
  },
  {
    id: "smc-win-03",
    slug: "aurora-tilt-and-turn-aluminium-window",
    name: "Aurora Architectural Tilt & Turn Window",
    sku: "SMC-WN-ALU-03",
    category: "aluminium-windows",
    categoryName: "Aluminium Windows",
    tagline: "Dual-action European precision engineering with structural thermal breaks",
    shortDescription: "High-performance aluminium window combining draft-free micro-tilt ventilation and full interior swing for effortless cleaning and superior weatherproofing.",
    detailedDescription: "The Aurora Series blends sleek industrial profiles with multi-point perimeter compression seals. In the tilt mode, it allows secure, draft-free room ventilation even during light rain. With a single rotation of the architectural handle, it swings inward 90 degrees for panoramic air exchange and maintenance.",
    material: "Thermal-Break Aluminium",
    openingType: "Tilt & Turn",
    images: [
      "/images/product-casement-window.png",
      "/images/product-french-window.png",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80"
    ],
    dimensions: {
      standardWidthMm: 1200,
      standardHeightMm: 1500,
      minWidthMm: 600,
      maxWidthMm: 1800,
      minHeightMm: 800,
      maxHeightMm: 2400,
      depthMm: 75,
      unit: "mm"
    },
    finishes: [
      { id: "fin-blue", name: "Architectural Emerald Green Anodized", hex: "#009886", textureLabel: "Satin Brushed Architectural" },
      { id: "fin-black", name: "Obsidian Black", hex: "#000000", textureLabel: "Matte Powder Coating" },
      { id: "fin-ice", name: "Ice Mint Light", hex: "#e6f7f5", textureLabel: "Fine Textured Coating" },
      { id: "fin-white", name: "Pure Signal White", hex: "#ffffff", textureLabel: "Smooth Satin Finish" }
    ],
    frameOptions: [
      { id: "frm-slim-75", name: "Slimline 75mm Profile with Concealed Hinges", depthMm: 75, sightlineMm: 68, description: "Concealed 180° hinges hidden completely within the profile chamber." },
      { id: "frm-stepped-85", name: "Heavy-Acoustic 85mm Profile", depthMm: 85, sightlineMm: 78, description: "Triple gasket chamber designed for maximum sound attenuation." }
    ],
    glassOptions: [
      { id: "gl-acoustic-double", name: "Double Glazed Acoustic Laminated (36mm)", uValue: 1.1, soundReductionDb: 44, description: "High STC rating for urban noise blocking." },
      { id: "gl-solar-triple", name: "Triple Low-E Solar Control (48mm)", uValue: 0.8, soundReductionDb: 42, description: "Superior thermal retention for variable climates." }
    ],
    hardwareOptions: [
      { id: "hd-secustik-black", name: "Hoppe Secustik Anti-Intrusion Handle", finish: "Matte Black", type: "Security Locking Handle" },
      { id: "hd-secustik-blue", name: "Architectural Emerald Green Lever Handle", finish: "Cobalt Anodized", type: "Luxury Handle" }
    ],
    specifications: {
      thermalTransmittance: "Uw = 0.90 W/m²K",
      acousticInsulation: "Rw = 44 dB",
      airPermeability: "Class 4 (EN 12207)",
      waterTightness: "Class E1200 (EN 12208)",
      windResistance: "Class C5 (EN 12210)",
      burglarResistance: "RC3 Certified",
      maxPanelWeight: "160 kg",
      standardWarrantyYears: 10
    },
    features: [
      "Dual-mode opening: Inward tilt for ventilation, full inward turn for cleaning",
      "Hidden perimeter hardware with Roto / Siegenia German mechanics",
      "Triple continuous vulcanized EPDM center gaskets",
      "Concealed water drainage slots with invisible exterior deflector caps"
    ],
    installationNotes: [
      "Install with continuous vapour-permeable expansion tape on external joint.",
      "Check diagonal squaring within 1.0mm tolerance before anchoring."
    ],
    maintenanceGuide: [
      "Lubricate perimeter locking pins with dry Teflon spray twice yearly.",
      "Clean glass with microfiber cloth and ammonia-free cleaner."
    ],
    transparentPngUrl: "/images/product-casement-window.png",
    pngVariants: [
      { name: "Casement Frame", pngUrl: "/images/product-casement-window.png", finishId: "fin-blue" },
      { name: "French Opened", pngUrl: "/images/product-french-window.png", finishId: "fin-black" },
      { name: "White Frame", pngUrl: "/images/product-casement-window.png", finishId: "fin-white" }
    ],
    arAvailable: true,
    featured: true,
    isNewRelease: false,
    badge: "Energy Star Rated"
  },
  {
    id: "smc-wd-04",
    slug: "heritage-solid-teak-fluted-door",
    name: "Heritage Solid Fluted Entrance Door",
    sku: "SMC-DR-WOD-04",
    category: "wooden-doors",
    categoryName: "Wooden Doors",
    tagline: "Solid seasoned timber with three-dimensional CNC milled fluting",
    shortDescription: "A masterpiece of artisanal woodworking and modern CNC precision. Constructed from sustainably harvested mature timber with cross-laminated structural core to prevent warping.",
    detailedDescription: "The Heritage Solid Fluted Door honors the warmth and nobility of natural timber while adhering to rigorous modern structural specifications. Each vertical flute is milled with sub-millimeter precision before being hand-finished with multiple layers of moisture-resistant polyurethane and UV oils.",
    material: "Solid Seasoned Timber",
    openingType: "Hinged Casement",
    images: [
      "/images/product-wood-door.png",
      "/images/product-timber-window.png",
      "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=1600&q=80"
    ],
    dimensions: {
      standardWidthMm: 1100,
      standardHeightMm: 2400,
      minWidthMm: 900,
      maxWidthMm: 1500,
      minHeightMm: 2100,
      maxHeightMm: 3200,
      depthMm: 65,
      unit: "mm"
    },
    finishes: [
      { id: "fin-black-timber", name: "Obsidian Black Stained Timber", hex: "#000000", textureLabel: "Wire-Brushed Open Pore Finish" },
      { id: "fin-blue-timber", name: "Architectural Emerald Green Lacquer", hex: "#009886", textureLabel: "Matte Sealed Architectural Grain" },
      { id: "fin-ice-timber", name: "Ice Mint Nordic Timber", hex: "#e6f7f5", textureLabel: "Light Stain Open Pore" },
      { id: "fin-white-timber", name: "Pure White Satin Wood", hex: "#ffffff", textureLabel: "Natural Matte Clear Topcoat" }
    ],
    frameOptions: [
      { id: "frm-solid-teak-jamb", name: "Matching Solid Hardwood Jamb", depthMm: 140, sightlineMm: 80, description: "Solid matching timber frame with integrated acoustic compression seal." }
    ],
    glassOptions: [
      { id: "gl-solid-wood", name: "Full Solid Wood Construction", uValue: 1.2, soundReductionDb: 39, description: "High mass solid timber construction with insulating sub-core." }
    ],
    hardwareOptions: [
      { id: "hd-bronze-bar", name: "Solid Cast Rectangular Pull (800mm)", finish: "Matte Black", type: "Solid Pull Bar" },
      { id: "hd-knurled-lever", name: "Architectural Lever Set", finish: "Architectural Emerald Green", type: "Designer Lever Handle" }
    ],
    specifications: {
      thermalTransmittance: "Uw = 1.20 W/m²K",
      acousticInsulation: "Rw = 39 dB",
      airPermeability: "Class 3 (EN 12207)",
      waterTightness: "Class 7A (EN 12208)",
      windResistance: "Class C3 (EN 12210)",
      burglarResistance: "RC2 Standard",
      maxPanelWeight: "140 kg",
      standardWarrantyYears: 10
    },
    features: [
      "100% seasoned, kiln-dried timber treated against moisture and pests",
      "Internal steel reinforcement anti-warp tension rods",
      "Concealed 3D adjustable heavy-duty stainless steel hinges (Simonswerk TECTUS)",
      "Multi-point mechanical latch with magnetic lock cylinder"
    ],
    installationNotes: [
      "Ensure wet masonry work and plastering are completely dry before installation.",
      "Store flat in climate-controlled environment prior to hanging."
    ],
    maintenanceGuide: [
      "Clean with soft cotton cloth and wood nourishing cream.",
      "Apply protective UV topcoat every 3-4 years for exterior exposures."
    ],
    transparentPngUrl: "/images/product-wood-door.png",
    pngVariants: [
      { name: "Teak Hardwood", pngUrl: "/images/product-wood-door.png", finishId: "fin-black-timber" },
      { name: "Timber Detailed", pngUrl: "/images/product-timber-window.png", finishId: "fin-blue-timber" },
      { name: "White Satin", pngUrl: "/images/product-wood-door.png", finishId: "fin-white-timber" }
    ],
    arAvailable: true,
    featured: true,
    isNewRelease: false,
    badge: "Artisanal Woodwork"
  },
  {
    id: "smc-upvc-05",
    slug: "thermo-core-upvc-casement-window",
    name: "Thermo-Core Multi-Chamber UPVC Window",
    sku: "SMC-WN-UPV-05",
    category: "upvc-windows",
    categoryName: "UPVC Windows",
    tagline: "German 6-chamber profile with galvanized steel reinforcement",
    shortDescription: "Ultra-efficient UPVC window system providing exceptional energy savings, noise cancellation, and zero maintenance in coastal or harsh climates.",
    detailedDescription: "Manufactured using lead-free, UV-stabilized German formulation UPVC, the Thermo-Core series delivers maximum thermal performance. The fusion-welded corners form an impenetrable seal against moisture, wind driving rain, and sound vibrations.",
    material: "Precision UPVC",
    openingType: "Hinged Casement",
    images: [
      "/images/product-upvc-window.png",
      "/images/product-sliding-window.png",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80"
    ],
    dimensions: {
      standardWidthMm: 1000,
      standardHeightMm: 1400,
      minWidthMm: 500,
      maxWidthMm: 1600,
      minHeightMm: 600,
      maxHeightMm: 2200,
      depthMm: 80,
      unit: "mm"
    },
    finishes: [
      { id: "fin-upvc-white", name: "Alpine White (Smooth)", hex: "#ffffff", textureLabel: "UV-Resistant Smooth Polymer" },
      { id: "fin-upvc-black", name: "Black Foil", hex: "#000000", textureLabel: "Architectural Embossed Foil" },
      { id: "fin-upvc-blue", name: "Architectural Emerald Green Foil", hex: "#009886", textureLabel: "Realistic Color Film" },
      { id: "fin-upvc-ice", name: "Ice Mint Light Foil", hex: "#e6f7f5", textureLabel: "Embossed Light Finish" }
    ],
    frameOptions: [
      { id: "frm-upvc-80", name: "6-Chamber 80mm Depth Profile", depthMm: 80, sightlineMm: 72, description: "Multi-chamber design with continuous galvanized steel core reinforcement." }
    ],
    glassOptions: [
      { id: "gl-upvc-double", name: "Double Glazed Low-E with Warm Edge Spacer (28mm)", uValue: 1.15, soundReductionDb: 37, description: "High thermal value with condensation prevention." },
      { id: "gl-upvc-triple", name: "Triple Glazed Krypton Gas (40mm)", uValue: 0.85, soundReductionDb: 42, description: "Maximum passive-house thermal rating." }
    ],
    hardwareOptions: [
      { id: "hd-espagnolette-wh", name: "Multi-Point Locking Espagnolette Handle", finish: "Alpine White", type: "Security Keyed Lock" },
      { id: "hd-espagnolette-bk", name: "Matte Black Contemporary Window Handle", finish: "Matte Black", type: "Keyless Ergonomic" }
    ],
    specifications: {
      thermalTransmittance: "Uw = 0.85 W/m²K",
      acousticInsulation: "Rw = 42 dB",
      airPermeability: "Class 4 (EN 12207)",
      waterTightness: "Class 9A (EN 12208)",
      windResistance: "Class C4 (EN 12210)",
      burglarResistance: "RC2 Security Rating",
      maxPanelWeight: "130 kg",
      standardWarrantyYears: 15
    },
    features: [
      "100% Lead-free virgin polymer with high titanium dioxide UV stabilization",
      "Fusion-welded corner joints for lifelong structural integrity",
      "Internal 2.0mm galvanized steel box section reinforcement",
      "Integrated EPDM co-extruded dual weather seals"
    ],
    installationNotes: [
      "Anchor brackets spaced every 600mm around perimeter.",
      "Use low-expansion polyurethane foam and waterproof perimeter flashing."
    ],
    maintenanceGuide: [
      "Clean UPVC profiles with mild soapy water; avoid abrasive pads.",
      "Inspect drainage slots twice a year to ensure free outflow."
    ],
    transparentPngUrl: "/images/product-upvc-window.png",
    pngVariants: [
      { name: "Multi-Chamber UPVC", pngUrl: "/images/product-upvc-window.png", finishId: "fin-upvc-white" },
      { name: "Sliding Profile", pngUrl: "/images/product-sliding-window.png", finishId: "fin-upvc-blue" },
      { name: "Black Foil", pngUrl: "/images/product-upvc-window.png", finishId: "fin-upvc-black" }
    ],
    arAvailable: true,
    featured: false,
    isNewRelease: false,
    badge: "Passive House Standard"
  },
  {
    id: "smc-int-06",
    slug: "invisiline-frameless-interior-flush-door",
    name: "Invisiline Frameless Interior Flush Door",
    sku: "SMC-DR-INT-06",
    category: "interior-doors",
    categoryName: "Interior Doors",
    tagline: "Flush-with-drywall frameless door with magnetic silent lock",
    shortDescription: "A pure minimalist interior door designed to sit entirely flush with the finished drywall plane. Features concealed 3D hinges, a silent magnetic latch, and acoustic core.",
    detailedDescription: "The Invisiline system transforms interior corridors into seamless galleries. The extruded aluminium sub-frame is plastered directly into the wall, eliminating traditional architraves and casing trims. Upon closing, the door aligns flush with the wall face, finished in matching paint or architectural wood veneer.",
    material: "Composite Wood-Aluminium",
    openingType: "Hinged Casement",
    images: [
      "/images/product-interior-door.png",
      "/images/door-interior.png",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80"
    ],
    dimensions: {
      standardWidthMm: 900,
      standardHeightMm: 2400,
      minWidthMm: 700,
      maxWidthMm: 1200,
      minHeightMm: 2000,
      maxHeightMm: 3000,
      depthMm: 50,
      unit: "mm"
    },
    finishes: [
      { id: "fin-primed-paint", name: "Pure White Primer", hex: "#ffffff", textureLabel: "Smooth Sanded Primer" },
      { id: "fin-blue-int", name: "Architectural Emerald Green", hex: "#009886", textureLabel: "Ultra-Matte Blue Lacquer" },
      { id: "fin-black-int", name: "Deep Jet Black", hex: "#000000", textureLabel: "Anti-Fingerprint Nanotech" },
      { id: "fin-ice-int", name: "Ice Mint Soft-Touch", hex: "#e6f7f5", textureLabel: "Velvet Smooth Finish" }
    ],
    frameOptions: [
      { id: "frm-frameless-jamb", name: "Concealed Plaster-In Aluminium Frame", depthMm: 100, sightlineMm: 0, description: "Zero-trim aluminium jamb embedded under plasterboard." }
    ],
    glassOptions: [],
    hardwareOptions: [
      { id: "hd-magnetic-black", name: "Magnetic Silent Strike Latch with Minimal Rose", finish: "Matte Black", type: "Magnetic Privacy Lock" },
      { id: "hd-magnetic-blue", name: "Architectural Emerald Green Lever Handle", finish: "Cobalt Satin", type: "Passage Lever" }
    ],
    specifications: {
      thermalTransmittance: "Uw = 1.4 W/m²K",
      acousticInsulation: "Rw = 36 dB (Acoustic Core)",
      airPermeability: "Class 3",
      waterTightness: "N/A (Interior)",
      windResistance: "N/A (Interior)",
      burglarResistance: "Internal Grade",
      maxPanelWeight: "80 kg",
      standardWarrantyYears: 10
    },
    features: [
      "Zero sightline frame with integrated mesh for crack-free plaster adhesion",
      "Magnetic latch bolt that only extends when door is fully closed (zero strike noise)",
      "High-density sound-dampening acoustic tubular core",
      "Reversible opening direction on site"
    ],
    installationNotes: [
      "Frame must be installed before drywall boards are screwed into metal studs.",
      "Plaster mesh must be taped with fiberglass tape to prevent plaster hairline cracking."
    ],
    maintenanceGuide: [
      "Dust surfaces with dry soft cloth.",
      "Adjust 3D concealed hinges with 4mm hex key if building settles."
    ],
    transparentPngUrl: "/images/product-interior-door.png",
    pngVariants: [
      { name: "White Flush", pngUrl: "/images/product-interior-door.png", finishId: "fin-primed-paint" },
      { name: "Architectural Emerald Green", pngUrl: "/images/product-interior-door.png", finishId: "fin-blue-int" },
      { name: "Deep Jet Black", pngUrl: "/images/product-interior-door.png", finishId: "fin-black-int" }
    ],
    arAvailable: true,
    featured: false,
    isNewRelease: true,
    badge: "Minimalist Award"
  },
  {
    id: "smc-bif-07",
    slug: "panoview-heavy-duty-bifold-door",
    name: "PanoView Heavy-Duty Bi-Fold Door System",
    sku: "SMC-DR-BIF-07",
    category: "sliding-doors",
    categoryName: "Sliding Doors",
    tagline: "Concertina folding glass wall opening up to 95% of aperture width",
    shortDescription: "Concertina folding door system with bottom-weighted heavy duty stainless steel guides and ultra-narrow profile sightlines for seamless outdoor indoor entertaining.",
    detailedDescription: "The PanoView Bi-Fold system allows entire walls of a room to fold away effortlessly. Available in configurations up to 8 panels wide with inward or outward folding options and an integrated traffic pass door for convenient daily access without opening the entire system.",
    material: "Thermal-Break Aluminium",
    openingType: "Bi-Folding System",
    images: [
      "/images/product-bifold-door.png",
      "/images/door-bifold.png",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
    ],
    dimensions: {
      standardWidthMm: 4800,
      standardHeightMm: 2600,
      minWidthMm: 2400,
      maxWidthMm: 8000,
      minHeightMm: 2000,
      maxHeightMm: 3200,
      depthMm: 85,
      unit: "mm"
    },
    finishes: [
      { id: "fin-bif-black", name: "Deep Satin Black", hex: "#000000", textureLabel: "Fluorocarbon 30-Year Coating" },
      { id: "fin-bif-blue", name: "Architectural Emerald Green", hex: "#009886", textureLabel: "Electrochemical Anodized" },
      { id: "fin-bif-ice", name: "Ice Mint Light", hex: "#e6f7f5", textureLabel: "Architectural Matte Finish" },
      { id: "fin-bif-white", name: "Pure Signal White", hex: "#ffffff", textureLabel: "Smooth Satin Finish" }
    ],
    frameOptions: [
      { id: "frm-low-threshold", name: "Low-Profile 15mm Weathered Threshold", depthMm: 85, sightlineMm: 110, description: "Minimal step-over threshold with certified rain seal." },
      { id: "frm-flush-channel", name: "Flush Floor Rebated Track", depthMm: 95, sightlineMm: 110, description: "Completely level indoor to outdoor floor transition." }
    ],
    glassOptions: [
      { id: "gl-bif-double", name: "Double Glazed Toughened Low-E (32mm)", uValue: 1.1, soundReductionDb: 38, description: "High impact safety glass with argon cavity." },
      { id: "gl-bif-solar", name: "Solar Reflective Laminated Triple (44mm)", uValue: 0.8, soundReductionDb: 42, description: "Ultimate acoustic and thermal resistance." }
    ],
    hardwareOptions: [
      { id: "hd-bif-flush-pull", name: "Flush Magnetic Folding Intermediate D-Handle", finish: "Matte Black", type: "Fold-Flat Pull" },
      { id: "hd-bif-master-lever", name: "Multi-Point Shootbolt Master Lever", finish: "Architectural Emerald Green", type: "Master Lock Lever" }
    ],
    specifications: {
      thermalTransmittance: "Uw = 1.05 W/m²K",
      acousticInsulation: "Rw = 40 dB",
      airPermeability: "Class 4 (EN 12207)",
      waterTightness: "Class 9A (EN 12208)",
      windResistance: "Class C4 (EN 12210)",
      burglarResistance: "RC2 / PAS 24 Certified",
      maxPanelWeight: "120 kg/panel",
      standardWarrantyYears: 12
    },
    features: [
      "Bottom-rolling quad stainless steel bogie wheels ensuring effortless gliding",
      "Fold-flat low-profile intermediate handles allowing tight panel stacking",
      "Interlocking shootbolt security at each joint",
      "Continuous quadruple weather gaskets prevent drafts in any folding configuration"
    ],
    installationNotes: [
      "Ensure structural lintel load deflection is strictly under 3mm over total span.",
      "Check sill level with precision laser level prior to fixing frame."
    ],
    maintenanceGuide: [
      "Keep bottom stainless track free of dirt and grit.",
      "Clean running bogie wheels every 6 months."
    ],
    transparentPngUrl: "/images/product-bifold-door.png",
    pngVariants: [
      { name: "Panoramic Bifold", pngUrl: "/images/product-bifold-door.png", finishId: "fin-bif-black" },
      { name: "Blue Frame", pngUrl: "/images/product-bifold-door.png", finishId: "fin-bif-blue" },
      { name: "White Frame", pngUrl: "/images/product-bifold-door.png", finishId: "fin-bif-white" }
    ],
    arAvailable: true,
    featured: false,
    isNewRelease: false,
    badge: "Panoramic Living"
  },
  {
    id: "smc-cst-08",
    slug: "bespoke-curved-facade-and-pivot-portal",
    name: "Bespoke Curved Glass & Pivot Facade",
    sku: "SMC-CS-BES-08",
    category: "custom-solutions",
    categoryName: "Custom Solutions",
    tagline: "Parametric engineered custom curved facade with integrated pivot systems",
    shortDescription: "Custom manufactured architectural facades combining precision-bent insulated glass, liquid metal finishes, and motorized oversized opening elements tailored to bespoke architectural plans.",
    detailedDescription: "For visionary architects and luxury homeowners who refuse compromise, our Custom Solutions division designs and fabricates one-of-a-kind structural entrance systems. Using advanced 3D parametric modeling and 5-axis CNC manufacturing, we translate complex geometric blueprints into structurally certified reality.",
    material: "Architectural Bronze & Steel",
    openingType: "Pivot System",
    images: [
      "/images/product-custom-facade.png",
      "/images/product-antique-window.png",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80"
    ],
    dimensions: {
      standardWidthMm: 3000,
      standardHeightMm: 4500,
      minWidthMm: 1500,
      maxWidthMm: 15000,
      minHeightMm: 2400,
      maxHeightMm: 6000,
      depthMm: 150,
      unit: "mm"
    },
    finishes: [
      { id: "fin-blue-arch", name: "Architectural Emerald Green", hex: "#009886", textureLabel: "Living Architectural Finish" },
      { id: "fin-black-steel", name: "Obsidian Structural Steel", hex: "#000000", textureLabel: "Oxidized Velvet Texture" },
      { id: "fin-ice-steel", name: "Ice Mint Anodized", hex: "#e6f7f5", textureLabel: "Ultra-High Durability Anodizing" },
      { id: "fin-white-steel", name: "Signal Pure White", hex: "#ffffff", textureLabel: "Smooth Weatherproof Coating" }
    ],
    frameOptions: [
      { id: "frm-bespoke-curved", name: "Custom Roll-Bended Structural Box Section", depthMm: 150, sightlineMm: 60, description: "Radius bent steel/aluminium framing engineered to blueprint curves." }
    ],
    glassOptions: [
      { id: "gl-bent-insulated", name: "Curved Insulated Low-E Safety Glass", uValue: 1.0, soundReductionDb: 42, description: "Cylindrically bent laminated double glass." }
    ],
    hardwareOptions: [
      { id: "hd-custom-sculpted", name: "Sculpted Monolithic Pull Handle", finish: "Architectural Emerald Green", type: "One-off Sculptural Casting" }
    ],
    specifications: {
      thermalTransmittance: "Uw = 0.95 W/m²K (Custom)",
      acousticInsulation: "Rw = Up to 46 dB",
      airPermeability: "Class 4 (EN 12207)",
      waterTightness: "Class E1500 (EN 12208)",
      windResistance: "Class C5 (EN 12210)",
      burglarResistance: "RC3 / RC4 Custom Available",
      maxPanelWeight: "800 kg",
      standardWarrantyYears: 20
    },
    features: [
      "Custom parametric 3D CAD/CAM engineering and structural finite element analysis",
      "Oversized curved insulated glass manufacturing up to 6.0m heights",
      "Full laser 3D point-cloud surveying before fabrication",
      "Dedicated senior structural engineer allocated to every bespoke project"
    ],
    installationNotes: [
      "Requires crane access and specialized vacuum glass lifters during installation.",
      "Structural engineering sign-off required for floor anchorage plates."
    ],
    maintenanceGuide: [
      "Annual scheduled inspection service provided by SMC Fabrication master technicians.",
      "Protective ceramic coating maintenance every 3 years."
    ],
    transparentPngUrl: "/images/product-custom-facade.png",
    pngVariants: [
      { name: "Architectural Emerald Green", pngUrl: "/images/product-custom-facade.png", finishId: "fin-blue-arch" },
      { name: "Obsidian Structural Steel", pngUrl: "/images/product-antique-window.png", finishId: "fin-black-steel" },
      { name: "Signal Pure White", pngUrl: "/images/product-custom-facade.png", finishId: "fin-white-steel" }
    ],
    arAvailable: true,
    featured: true,
    isNewRelease: true,
    badge: "Bespoke Engineering"
  }
];
