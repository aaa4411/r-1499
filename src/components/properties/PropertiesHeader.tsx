
import MarketStats from "./MarketStats";

interface PropertiesHeaderProps {
  totalListings: number;
}

const PropertiesHeader = ({ totalListings }: PropertiesHeaderProps) => {
  const marketStats = {
    avgPrice: "$3,250,000",
    totalListings,
    newThisWeek: 12,
    priceChange: "+2.3%"
  };

  return (
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
        
        <MarketStats {...marketStats} />
      </div>
    </div>
  );
};

export default PropertiesHeader;
