
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import { SearchForm } from "@/components/properties/SearchForm";
import AdvancedSearchModal from "@/components/property/AdvancedSearchModal";
import PropertyComparisonBar from "@/components/property/PropertyComparisonBar";
import PropertyComparisonModal from "@/components/property/PropertyComparisonModal";
import PropertiesHeader from "@/components/properties/PropertiesHeader";
import ResultsHeader from "@/components/properties/ResultsHeader";
import PropertiesLayout from "@/components/properties/PropertiesLayout";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { usePropertyComparison } from "@/hooks/usePropertyComparison";
import { useSearchParams } from "react-router-dom";
import { PropertyType } from "@/types/property";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const {
    compareList,
    isCompareOpen,
    setIsCompareOpen,
    addToCompare,
    removeFromCompare,
    clearCompare,
    openCompare,
  } = usePropertyComparison();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      searchParams.set("search", searchQuery);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  const handleAdvancedSearch = (filters: any) => {
    // Apply advanced search filters
    if (filters.keywords) setSearchQuery(filters.keywords);
    if (filters.propertyType) setPropertyType(filters.propertyType as PropertyType);
    if (filters.minPrice || filters.maxPrice) {
      const min = filters.minPrice ? parseInt(filters.minPrice.replace(/[^0-9]/g, '')) : priceRange[0];
      const max = filters.maxPrice ? parseInt(filters.maxPrice.replace(/[^0-9]/g, '')) : priceRange[1];
      setPriceRange([min, max]);
    }
    if (filters.bedrooms) setBedrooms(filters.bedrooms);
    if (filters.bathrooms) setBathrooms(filters.bathrooms);
    if (filters.minArea) setMinArea(parseInt(filters.minArea));
    if (filters.maxArea) setMaxArea(parseInt(filters.maxArea));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 lg:pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <PropertiesHeader totalListings={filteredProperties.length} />
          
          {/* Enhanced Search Form with Advanced Search */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-end">
              <div className="flex-1">
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
                  toggleMobileFilters={() => setShowMobileFilters(!showMobileFilters)}
                />
              </div>
              <AdvancedSearchModal onSearch={handleAdvancedSearch} />
            </div>
          </div>
          
          <PropertiesLayout
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
          >
            <ResultsHeader
              propertiesCount={filteredProperties.length}
              searchQuery={searchQuery}
              propertyType={propertyType}
              viewMode={viewMode}
              setViewMode={setViewMode}
              sortBy={sortBy}
              setSortBy={setSortBy}
              showMobileFilters={showMobileFilters}
              setShowMobileFilters={setShowMobileFilters}
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
              setPropertyType={setPropertyType}
              resetFilters={resetFilters}
            />

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
                  onAddToCompare={addToCompare}
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
          </PropertiesLayout>
        </div>
      </div>
      
      {/* Property Comparison Features */}
      <PropertyComparisonBar
        properties={compareList}
        onRemoveProperty={removeFromCompare}
        onCompare={openCompare}
        onClearAll={clearCompare}
      />
      
      <PropertyComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        properties={compareList}
        onRemoveProperty={removeFromCompare}
        onClearAll={clearCompare}
      />
      
      <Footer />
    </div>
  );
};

export default Properties;
