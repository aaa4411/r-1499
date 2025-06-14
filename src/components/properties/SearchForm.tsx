
import { Search, MapPin, SlidersHorizontal, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface SearchFormProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  propertyType: "sale" | "rent" | "all";
  setPropertyType: React.Dispatch<React.SetStateAction<"sale" | "rent" | "all">>;
  sortBy: string;
  setSortBy: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
  toggleMobileFilters?: () => void;
}

export const SearchForm = ({
  searchQuery,
  setSearchQuery,
  propertyType,
  setPropertyType,
  sortBy,
  setSortBy,
  handleSearch,
  searchParams,
  setSearchParams,
  toggleMobileFilters
}: SearchFormProps) => {
  const popularSearches = ["Beverly Hills", "Manhattan", "Miami Beach", "Aspen"];

  return (
    <div className="space-y-4">
      {/* Main Search Form */}
      <form onSubmit={handleSearch} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-grow relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-estate-400 w-5 h-5 transition-colors group-focus-within:text-estate-600" />
            <Input
              type="text"
              placeholder="Search by location, neighborhood, or property name..."
              className="pl-12 pr-4 py-7 w-full border-2 border-gray-200 focus:border-estate-300 rounded-xl text-base placeholder:text-gray-400 bg-white/50 backdrop-blur-sm transition-all duration-200 hover:border-estate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
                onClick={() => setSearchQuery("")}
              >
                ×
              </Button>
            )}
          </div>
          
          <div className="flex gap-3 flex-wrap lg:flex-nowrap">
            <Select 
              value={propertyType} 
              onValueChange={(value: "sale" | "rent" | "all") => {
                setPropertyType(value);
                if (value === "all") {
                  searchParams.delete("type");
                } else {
                  searchParams.set("type", value);
                }
                setSearchParams(searchParams);
              }}
            >
              <SelectTrigger className="w-full lg:w-[180px] h-14 bg-white/70 border-2 border-gray-200 hover:border-estate-200 rounded-xl">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              type="submit" 
              size="lg" 
              className="bg-gradient-to-r from-estate-800 to-estate-700 hover:from-estate-700 hover:to-estate-600 text-white px-8 py-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </form>

      {/* Popular Searches */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-estate-600 flex items-center gap-1">
          <Sparkles className="w-4 h-4" />
          Popular:
        </span>
        {popularSearches.map((search) => (
          <Button
            key={search}
            variant="outline"
            size="sm"
            className="bg-white/70 hover:bg-white border-gray-200 hover:border-estate-300 text-estate-700 hover:text-estate-800 rounded-full px-4 py-2 text-xs font-medium transition-all duration-200"
            onClick={() => setSearchQuery(search)}
          >
            {search}
          </Button>
        ))}
      </div>
    </div>
  );
};
