
import { TrendingUp, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MarketStatsProps {
  avgPrice: string;
  totalListings: number;
  newThisWeek: number;
  priceChange: string;
}

const MarketStats = ({ avgPrice, totalListings, newThisWeek, priceChange }: MarketStatsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-xs font-medium text-estate-500">Avg Price</span>
        </div>
        <p className="text-lg font-bold text-estate-800">{avgPrice}</p>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-medium text-estate-500">Total</span>
        </div>
        <p className="text-lg font-bold text-estate-800">{totalListings}</p>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="text-xs px-2 py-0.5">New</Badge>
        </div>
        <p className="text-lg font-bold text-estate-800">{newThisWeek}</p>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-estate-500">Change</span>
        </div>
        <p className="text-lg font-bold text-green-600">{priceChange}</p>
      </div>
    </div>
  );
};

export default MarketStats;
