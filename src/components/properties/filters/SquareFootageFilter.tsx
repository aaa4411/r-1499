
import { Input } from "@/components/ui/input";

interface SquareFootageFilterProps {
  minArea: number | null;
  setMinArea: (value: number | null) => void;
  maxArea: number | null;
  setMaxArea: (value: number | null) => void;
}

export const SquareFootageFilter = ({ minArea, setMinArea, maxArea, setMaxArea }: SquareFootageFilterProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-estate-700">Square Footage</h3>
      <div className="grid grid-cols-2 gap-2">
        <Input
          type="number"
          placeholder="Min sq ft"
          className="w-full transition-all duration-200 hover:border-estate-300 focus:border-estate-400"
          value={minArea || ''}
          onChange={(e) => setMinArea(e.target.value ? Number(e.target.value) : null)}
        />
        <Input
          type="number"
          placeholder="Max sq ft"
          className="w-full transition-all duration-200 hover:border-estate-300 focus:border-estate-400"
          value={maxArea || ''}
          onChange={(e) => setMaxArea(e.target.value ? Number(e.target.value) : null)}
        />
      </div>
    </div>
  );
};
