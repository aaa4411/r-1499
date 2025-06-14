
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
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80" 
      },
      { 
        id: "chair1", 
        name: "Accent Armchair", 
        price: "$499", 
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80" 
      },
      { 
        id: "coffee1", 
        name: "Glass Coffee Table", 
        price: "$349", 
        image: "https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=800&q=80" 
      },
      { 
        id: "lamp1", 
        name: "Floor Lamp", 
        price: "$129", 
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80" 
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
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80" 
      },
      { 
        id: "dresser1", 
        name: "6-Drawer Dresser", 
        price: "$649", 
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80" 
      },
      { 
        id: "nightstand1", 
        name: "Nightstand Set", 
        price: "$299", 
        image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80" 
      },
      { 
        id: "mirror1", 
        name: "Full-Length Mirror", 
        price: "$199", 
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80" 
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
        image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80" 
      },
      { 
        id: "chairs1", 
        name: "Set of 4 Dining Chairs", 
        price: "$599", 
        image: "https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=800&q=80" 
      },
      { 
        id: "buffet1", 
        name: "Sideboard Buffet", 
        price: "$649", 
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80" 
      },
      { 
        id: "bar1", 
        name: "Bar Cart", 
        price: "$249", 
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80" 
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
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80" 
      },
      { 
        id: "chair2", 
        name: "Ergonomic Office Chair", 
        price: "$349", 
        image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?auto=format&fit=crop&w=800&q=80" 
      },
      { 
        id: "bookcase1", 
        name: "5-Shelf Bookcase", 
        price: "$259", 
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" 
      },
      { 
        id: "lamp2", 
        name: "Desk Lamp", 
        price: "$79", 
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80" 
      },
    ]
  }
];
