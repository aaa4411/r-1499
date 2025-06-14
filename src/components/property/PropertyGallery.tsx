import { useState, useCallback, useEffect, useRef } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi 
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [imageQueue, setImageQueue] = useState<number[]>([0, 1]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Use sample images if no images provided
  const displayImages = images.length > 0 ? images : [
    "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&q=75&fit=crop&w=1200",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&q=75&fit=crop&w=1200",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&q=75&fit=crop&w=1200",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&q=75&fit=crop&w=1200",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&q=75&fit=crop&w=1200"
  ];

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
    api?.scrollTo(index);
    
    // Add the next few images to the queue if they're not already loaded
    const nextImagesToLoad = [index, index + 1, index + 2].filter(
      i => i < displayImages.length && !imagesLoaded[i]
    );
    
    if (nextImagesToLoad.length > 0) {
      setImageQueue(prev => [...new Set([...prev, ...nextImagesToLoad])]);
    }
  };

  // Update the current image index when the carousel slides
  const onSelect = useCallback(() => {
    if (!api) return;
    const selectedIndex = api.selectedScrollSnap();
    setCurrentImage(selectedIndex);
    
    // Load the next few images after the current one
    const nextImagesToLoad = [selectedIndex + 1, selectedIndex + 2, selectedIndex + 3].filter(
      i => i < displayImages.length && !imagesLoaded[i]
    );
    
    if (nextImagesToLoad.length > 0) {
      setImageQueue(prev => [...new Set([...prev, ...nextImagesToLoad])]);
    }
  }, [api, displayImages.length, imagesLoaded]);

  // Image load handler
  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }));
  };

  // Connect the onSelect callback to the carousel's events
  useEffect(() => {
    if (!api) return;
    
    api.on("select", onSelect);
    // Initial call to set the starting slide
    onSelect();

    // Cleanup
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  // Load images in queue progressively
  useEffect(() => {
    if (imageQueue.length === 0) return;
    
    const loadNextImage = () => {
      const indexToLoad = imageQueue[0];
      const img = imageRefs.current[indexToLoad];
      
      if (img && img.dataset.src) {
        const newImg = new Image();
        newImg.onload = () => {
          img.src = img.dataset.src || '';
          img.removeAttribute('data-src');
          handleImageLoad(indexToLoad);
          
          setImageQueue(prev => prev.slice(1));
        };
        newImg.src = img.dataset.src;
      } else {
        setImageQueue(prev => prev.slice(1));
      }
    };
    
    loadNextImage();
  }, [imageQueue]);

  // Initialize image refs
  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, displayImages.length * 2); // For both main carousel and thumbnails
  }, [displayImages.length]);

  return (
    <div className="space-y-4">
      <div className="relative">
        {/* Main carousel */}
        <Carousel 
          className="w-full" 
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
        >
          <CarouselContent>
            {displayImages.map((image, index) => (
              <CarouselItem key={index} className="overflow-hidden rounded-lg aspect-[16/9] relative">
                {!imagesLoaded[index] && (
                  <div className="w-full h-full absolute inset-0 bg-slate-100 animate-pulse">
                    <div className="flex h-full items-center justify-center">
                      <svg className="w-10 h-10 text-slate-300 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  </div>
                )}
                <img 
                  ref={el => imageRefs.current[index] = el}
                  data-src={`${image}?auto=format&q=75&fit=crop&w=1200`}
                  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                  alt={`${title} - view ${index + 1}`} 
                  className={cn(
                    "w-full h-full object-cover transition-opacity duration-300",
                    imagesLoaded[index] ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => handleImageLoad(index)}
                  loading="lazy"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 hover:opacity-100 transition-opacity">
            <CarouselPrevious className="h-9 w-9 rounded-full bg-white/70 backdrop-blur-sm text-estate-800 hover:bg-white hover:text-estate-900" />
            <CarouselNext className="h-9 w-9 rounded-full bg-white/70 backdrop-blur-sm text-estate-800 hover:bg-white hover:text-estate-900" />
          </div>
        </Carousel>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {displayImages.map((image, index) => (
          <div 
            key={index}
            className={cn(
              "aspect-video cursor-pointer rounded-md overflow-hidden transition-all duration-200 border-2",
              currentImage === index ? "border-blue-500 ring-2 ring-blue-300" : "border-transparent opacity-70 hover:opacity-100"
            )}
            onClick={() => handleThumbnailClick(index)}
          >
            <div className="relative w-full h-full">
              {!imagesLoaded[index + displayImages.length] && (
                <Skeleton className="w-full h-full absolute inset-0 bg-gray-200" />
              )}
              <img 
                ref={el => imageRefs.current[index + displayImages.length] = el}
                data-src={`${image}?auto=format&q=60&fit=crop&w=150`}
                src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                alt={`${title} - thumbnail ${index + 1}`} 
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-300",
                  imagesLoaded[index + displayImages.length] ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => handleImageLoad(index + displayImages.length)}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;
