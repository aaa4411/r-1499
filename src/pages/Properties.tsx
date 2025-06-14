
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import { SearchForm } from "@/components/properties/SearchForm";
import { FilterSidebar } from "@/components/properties/FilterSidebar";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { useSearchParams } from "react-router-dom";
import { PropertyType } from "@/types/property";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { SlidersHorizontal, Grid3X3, LayoutGrid, MapPin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialType = (searchParams.get("type") as PropertyType) || "all";
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const {
    searchQuery,
    setSearchQuery,
    propertyType,
    setPropertyType,
    priceRange,
    setPriceRange,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    minArea,
    setMinArea,
    maxArea,
    setMaxArea,
    sortBy,
    setSortBy,
    filteredProperties,
    resetFilters,
    loading
  } = usePropertyFilters(initialSearch, initialType);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      searchParams.set("search", searchQuery);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const marketStats = {
    avgPrice: "$3,250,000",
    totalListings: filteredProperties.length,
    newThisWeek: 12,
    priceChange: "+2.3%"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 lg:pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="space-y-6 mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3">
                <h1 className="text-4xl md:text-6xl font-display text-estate-800 mb-2 bg-gradient-to-r from-estate-800 to-estate-600 bg-clip-text text-transparent">
                  Discover Your Perfect Property
                </h1>
                <p className="text-estate-500 text-lg max-w-2xl leading-relaxed">
                  Browse our exclusive collection of premium properties, carefully curated to match your lifestyle and investment goals.
                </p>
              </div>
              
              {/* Market Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium text-estate-500">Avg Price</span>
                  </div>
                  <p className="text-lg font-bold text-estate-800">{marketStats.avgPrice}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-estate-500">Total</span>
                  </div>
                  <p className="text-lg font-bold text-estate-800">{marketStats.totalListings}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs px-2 py-0.5">New</Badge>
                  </div>
                  <p className="text-lg font-bold text-estate-800">{marketStats.newThisWeek}</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-estate-500">Change</span>
                  </div>
                  <p className="text-lg font-bold text-green-600">{marketStats.priceChange}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Search Form */}
          <div className="mb-8">
            <SearchForm 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              propertyType={propertyType}
              setPropertyType={setPropertyType}
              sortBy={sortBy}
              setSortBy={setSortBy}
              handleSearch={handleSearch}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              toggleMobileFilters={toggleMobileFilters}
            />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="sticky top-32">
                <FilterSidebar 
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  bedrooms={bedrooms}
                  setBedrooms={setBedrooms}
                  bathrooms={bathrooms}
                  setBathrooms={setBathrooms}
                  minArea={minArea}
                  setMinArea={setMinArea}
                  maxArea={maxArea}
                  setMaxArea={setMaxArea}
                  propertyType={propertyType}
                  setPropertyType={setPropertyType}
                  resetFilters={resetFilters}
                />
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Enhanced Results Header */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-sm border border-white/20">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-estate-800 font-bold text-xl">
                        {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'}
                      </p>
                      <p className="text-estate-500 text-sm">
                        {searchQuery ? `Found for "${searchQuery}"` : 'Available now'}
                      </p>
                    </div>
                    {propertyType !== "all" && (
                      <Badge variant="secondary" className="bg-estate-100 text-estate-700">
                        {propertyType === "sale" ? "For Sale" : "For Rent"}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {/* View Mode Toggle */}
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="h-8 px-3"
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="h-8 px-3"
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Mobile filters button */}
                    <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                      <SheetTrigger asChild className="lg:hidden">
                        <Button variant="outline" className="flex items-center gap-2">
                          <SlidersHorizontal className="w-4 h-4" />
                          Filters
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <div className="pt-6">
                          <FilterSidebar 
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            bedrooms={bedrooms}
                            setBedrooms={setBedrooms}
                            bathrooms={bathrooms}
                            setBathrooms={setBathrooms}
                            minArea={minArea}
                            setMinArea={setMinArea}
                            maxArea={maxArea}
                            setMaxArea={setMaxArea}
                            propertyType={propertyType}
                            setPropertyType={setPropertyType}
                            resetFilters={resetFilters}
                          />
                        </div>
                      </SheetContent>
                    </Sheet>

                    {/* Sort dropdown */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-[180px] bg-white border-gray-200">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Property Grid/List */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-[400px] shadow-sm"></div>
                  ))}
                </div>
              ) : filteredProperties.length > 0 ? (
                <div className="animate-in fade-in duration-500">
                  <PropertyGrid 
                    properties={filteredProperties} 
                    filterType={propertyType === "all" ? undefined : propertyType}
                    fromSupabase={true}
                  />
                </div>
              ) : (
                <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-estate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-estate-600" />
                    </div>
                    <h3 className="text-2xl font-display text-estate-800 mb-3">No properties found</h3>
                    <p className="text-estate-500 mb-6">Try adjusting your search criteria or browse all available properties</p>
                    <Button onClick={resetFilters} className="bg-estate-800 hover:bg-estate-700">
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Properties;
