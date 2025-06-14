
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FurnitureSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FurnitureSearchBar: React.FC<FurnitureSearchBarProps> = ({ searchQuery, setSearchQuery }) => (
  <div className="relative w-full sm:w-64">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
    <Input 
      placeholder="Search furniture..." 
      className="pl-10"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
);

export default FurnitureSearchBar;
