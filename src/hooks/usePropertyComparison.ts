
import { useState, useCallback } from 'react';
import { Property } from '@/types/property';
import { toast } from '@/hooks/use-toast';

export const usePropertyComparison = () => {
  const [compareList, setCompareList] = useState<Property[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const addToCompare = useCallback((property: Property) => {
    if (compareList.length >= 3) {
      toast({
        title: 'Comparison Limit',
        description: 'You can compare up to 3 properties at once.',
        variant: 'destructive',
      });
      return false;
    }

    if (compareList.find(p => p.id === property.id)) {
      toast({
        title: 'Already Added',
        description: 'This property is already in your comparison list.',
        variant: 'destructive',
      });
      return false;
    }

    setCompareList(prev => [...prev, property]);
    toast({
      title: 'Added to Compare',
      description: `${property.title} added to comparison.`,
    });
    return true;
  }, [compareList]);

  const removeFromCompare = useCallback((propertyId: string) => {
    setCompareList(prev => prev.filter(p => p.id !== propertyId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
    setIsCompareOpen(false);
  }, []);

  const openCompare = useCallback(() => {
    if (compareList.length < 2) {
      toast({
        title: 'Need More Properties',
        description: 'Add at least 2 properties to compare.',
        variant: 'destructive',
      });
      return;
    }
    setIsCompareOpen(true);
  }, [compareList.length]);

  return {
    compareList,
    isCompareOpen,
    setIsCompareOpen,
    addToCompare,
    removeFromCompare,
    clearCompare,
    openCompare,
  };
};
