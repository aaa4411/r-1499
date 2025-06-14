
import { Sofa, BedDouble, BookOpen, LampFloor } from "lucide-react";

export const furnitureCategories = [
  {
    id: "living",
    name: "Living Room",
    icon: Sofa,
    items: [
      { 
        id: "sofa1", 
        name: "Modern Sectional Sofa", 
        price: "$1,299", 
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
        description: "A spacious and comfortable sectional sofa perfect for modern living rooms. Features premium fabric upholstery and sturdy construction.",
        dimensions: "108\" W x 78\" D x 32\" H",
        materials: "Solid wood frame, high-density foam, polyester fabric",
        features: ["Removable cushions", "Stain-resistant fabric", "5-year warranty"],
        inStock: true
      },
      { 
        id: "chair1", 
        name: "Accent Armchair", 
        price: "$499", 
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
        description: "Elegant accent armchair with contemporary design. Perfect for adding style and comfort to any room.",
        dimensions: "32\" W x 34\" D x 36\" H",
        materials: "Hardwood frame, velvet upholstery, foam padding",
        features: ["360-degree swivel", "Easy assembly", "Spot clean only"],
        inStock: true
      },
      { 
        id: "coffee1", 
        name: "Glass Coffee Table", 
        price: "$349", 
        image: "https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=800&q=80",
        description: "Sleek glass coffee table with modern metal legs. Adds elegance and functionality to your living space.",
        dimensions: "48\" W x 24\" D x 16\" H",
        materials: "Tempered glass top, stainless steel legs",
        features: ["Scratch-resistant surface", "Easy to clean", "Modern design"],
        inStock: false
      },
      { 
        id: "lamp1", 
        name: "Floor Lamp", 
        price: "$129", 
        image: "https://images.unsplash.com/photo-1544275223-c2450944d8b9?auto=format&fit=crop&w=800&q=80",
        description: "Contemporary floor lamp with adjustable brightness. Perfect for reading or ambient lighting.",
        dimensions: "12\" Base x 60\" H",
        materials: "Metal base, fabric shade, LED bulb included",
        features: ["Dimmable LED", "Touch control", "Energy efficient"],
        inStock: true
      },
    ]
  },
  {
    id: "bedroom",
    name: "Bedroom",
    icon: BedDouble,
    items: [
      { 
        id: "bed1", 
        name: "Queen Platform Bed", 
        price: "$899", 
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        description: "Minimalist platform bed with clean lines and solid construction. No box spring required.",
        dimensions: "64\" W x 84\" D x 12\" H",
        materials: "Solid wood construction, natural finish",
        features: ["No box spring needed", "Easy assembly", "Sustainable materials"],
        inStock: true
      },
      { 
        id: "dresser1", 
        name: "6-Drawer Dresser", 
        price: "$649", 
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        description: "Spacious 6-drawer dresser with smooth-gliding drawers and elegant hardware.",
        dimensions: "58\" W x 18\" D x 32\" H",
        materials: "Engineered wood, metal hardware",
        features: ["Soft-close drawers", "Anti-tip safety", "Spacious storage"],
        inStock: true
      },
      { 
        id: "nightstand1", 
        name: "Nightstand Set", 
        price: "$299", 
        image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80",
        description: "Set of two matching nightstands with convenient storage and charging station.",
        dimensions: "18\" W x 16\" D x 24\" H (each)",
        materials: "Solid wood, brushed metal handles",
        features: ["Built-in USB ports", "Drawer storage", "Cable management"],
        inStock: true
      },
      { 
        id: "mirror1", 
        name: "Full-Length Mirror", 
        price: "$199", 
        image: "https://images.unsplash.com/photo-1618221319989-8a41753459d1?auto=format&fit=crop&w=800&q=80",
        description: "Elegant full-length mirror with decorative frame. Perfect for bedrooms or dressing areas.",
        dimensions: "24\" W x 66\" H x 1\" D",
        materials: "High-quality glass, wooden frame",
        features: ["Shatter-resistant", "Wall mounting hardware", "Elegant design"],
        inStock: false
      },
    ]
  },
  {
    id: "dining",
    name: "Dining Room",
    icon: BookOpen,
    items: [
      { 
        id: "table1", 
        name: "Expandable Dining Table", 
        price: "$799", 
        image: "https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=800&q=80",
        description: "Versatile expandable dining table that grows with your needs. Perfect for entertaining.",
        dimensions: "60\"-84\" W x 36\" D x 30\" H",
        materials: "Solid oak, smooth finish",
        features: ["Expandable design", "Seats 6-8 people", "Durable construction"],
        inStock: true
      },
      { 
        id: "chairs1", 
        name: "Set of 4 Dining Chairs", 
        price: "$599", 
        image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable dining chairs with ergonomic design and premium upholstery.",
        dimensions: "18\" W x 20\" D x 32\" H (each)",
        materials: "Hardwood frame, padded seat, fabric upholstery",
        features: ["Ergonomic design", "Easy to clean", "Stackable"],
        inStock: true
      },
      { 
        id: "buffet1", 
        name: "Sideboard Buffet", 
        price: "$649", 
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        description: "Elegant sideboard buffet with ample storage for dining room essentials.",
        dimensions: "60\" W x 18\" D x 32\" H",
        materials: "Solid wood, soft-close hinges",
        features: ["Adjustable shelves", "Wine storage", "Cable management"],
        inStock: true
      },
      { 
        id: "bar1", 
        name: "Bar Cart", 
        price: "$249", 
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
        description: "Stylish mobile bar cart perfect for entertaining guests.",
        dimensions: "30\" W x 16\" D x 32\" H",
        materials: "Metal frame, glass shelves, gold finish",
        features: ["Rolling wheels", "Multiple shelves", "Elegant design"],
        inStock: false
      },
    ]
  },
  {
    id: "office",
    name: "Home Office",
    icon: LampFloor,
    items: [
      { 
        id: "desk1", 
        name: "Writing Desk", 
        price: "$399", 
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
        description: "Clean and functional writing desk perfect for home offices and study spaces.",
        dimensions: "48\" W x 24\" D x 30\" H",
        materials: "Engineered wood, metal legs",
        features: ["Built-in drawers", "Cable management", "Spacious surface"],
        inStock: true
      },
      { 
        id: "chair2", 
        name: "Ergonomic Office Chair", 
        price: "$349", 
        image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?auto=format&fit=crop&w=800&q=80",
        description: "Professional ergonomic office chair designed for all-day comfort and productivity.",
        dimensions: "26\" W x 26\" D x 40\"-44\" H",
        materials: "Mesh back, padded seat, aluminum base",
        features: ["Height adjustable", "Lumbar support", "360-degree swivel"],
        inStock: true
      },
      { 
        id: "bookcase1", 
        name: "5-Shelf Bookcase", 
        price: "$259", 
        image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=800&q=80",
        description: "Tall bookcase with five adjustable shelves for books, decor, and storage.",
        dimensions: "32\" W x 12\" D x 72\" H",
        materials: "Engineered wood, adjustable shelves",
        features: ["Adjustable shelves", "Anti-tip safety", "Large capacity"],
        inStock: true
      },
      { 
        id: "lamp2", 
        name: "Desk Lamp", 
        price: "$79", 
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
        description: "Adjustable desk lamp with LED lighting for focused task illumination.",
        dimensions: "8\" Base x 18\" H (adjustable)",
        materials: "Metal construction, LED bulb included",
        features: ["Adjustable arm", "Touch dimmer", "Energy efficient LED"],
        inStock: true
      },
    ]
  }
];
