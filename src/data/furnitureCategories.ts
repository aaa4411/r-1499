
import { Sofa, BedDouble, BookOpen, LampFloor } from "lucide-react";

export const furnitureCategories = [
  {
    id: "living",
    name: "Living Room",
    icon: Sofa,
    items: [
      { id: "sofa1", name: "Modern Sectional Sofa", price: "$1,299", image: "placeholder.svg" },
      { id: "chair1", name: "Accent Armchair", price: "$499", image: "placeholder.svg" },
      { id: "coffee1", name: "Glass Coffee Table", price: "$349", image: "placeholder.svg" },
      { id: "lamp1", name: "Floor Lamp", price: "$129", image: "placeholder.svg" },
    ]
  },
  {
    id: "bedroom",
    name: "Bedroom",
    icon: BedDouble,
    items: [
      { id: "bed1", name: "Queen Platform Bed", price: "$899", image: "placeholder.svg" },
      { id: "dresser1", name: "6-Drawer Dresser", price: "$649", image: "placeholder.svg" },
      { id: "nightstand1", name: "Nightstand Set", price: "$299", image: "placeholder.svg" },
      { id: "mirror1", name: "Full-Length Mirror", price: "$199", image: "placeholder.svg" },
    ]
  },
  {
    id: "dining",
    name: "Dining Room",
    icon: BookOpen,
    items: [
      { id: "table1", name: "Expandable Dining Table", price: "$799", image: "placeholder.svg" },
      { id: "chairs1", name: "Set of 4 Dining Chairs", price: "$599", image: "placeholder.svg" },
      { id: "buffet1", name: "Sideboard Buffet", price: "$649", image: "placeholder.svg" },
      { id: "bar1", name: "Bar Cart", price: "$249", image: "placeholder.svg" },
    ]
  },
  {
    id: "office",
    name: "Home Office",
    icon: LampFloor,
    items: [
      { id: "desk1", name: "Writing Desk", price: "$399", image: "placeholder.svg" },
      { id: "chair2", name: "Ergonomic Office Chair", price: "$349", image: "placeholder.svg" },
      { id: "bookcase1", name: "5-Shelf Bookcase", price: "$259", image: "placeholder.svg" },
      { id: "lamp2", name: "Desk Lamp", price: "$79", image: "placeholder.svg" },
    ]
  }
];
