
export const parsePrice = (priceString: string): number => {
  return parseInt(priceString.replace(/[^0-9]/g, ''));
};

export const formatPrice = (value: number): string => {
  return `$${(value / 1000000).toFixed(1)}M`;
};
