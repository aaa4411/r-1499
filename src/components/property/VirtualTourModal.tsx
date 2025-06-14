
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

interface VirtualTourModalProps {
  propertyTitle: string;
  tourUrl?: string;
  images: string[];
}

const VirtualTourModal = ({ propertyTitle, tourUrl, images }: VirtualTourModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const rooms = [
    { name: 'Living Room', image: images[0] || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7' },
    { name: 'Kitchen', image: images[1] || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136' },
    { name: 'Master Bedroom', image: images[2] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af' },
    { name: 'Bathroom', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a' },
    { name: 'Exterior', image: images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Video className="w-4 h-4" />
          Virtual Tour
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Virtual Tour - {propertyTitle}
            <Badge variant="outline" className="bg-green-50 text-green-700">
              360° View Available
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Main Tour Area */}
          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
            <img 
              src={rooms[currentImageIndex]?.image}
              alt={rooms[currentImageIndex]?.name}
              className="w-full h-full object-cover"
            />
            
            {/* Tour Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  
                  <div className="text-white text-sm">
                    {rooms[currentImageIndex]?.name}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  >
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Navigation Dots */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {rooms.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? 'bg-white' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Room Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {rooms.map((room, index) => (
              <button
                key={room.name}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative rounded-lg overflow-hidden aspect-video transition-all ${
                  index === currentImageIndex 
                    ? 'ring-2 ring-blue-500 scale-105' 
                    : 'hover:scale-102'
                }`}
              >
                <img 
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-sm font-medium truncate">{room.name}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Tour Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Interactive Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Click and drag to look around
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Use arrow keys to navigate
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Click hotspots for details
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VirtualTourModal;
