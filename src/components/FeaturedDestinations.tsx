import { useRef } from "react";
import { TravelPackage } from "@/types/travel";
import { useTravel } from "@/context/TravelContext";
import { Button } from "@/components/ui/button";
import { StarRating } from "./StarRating";
import { ChevronLeft, ChevronRight, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedDestinationsProps {
  onViewDetails: (pkg: TravelPackage) => void;
}

export function FeaturedDestinations({ onViewDetails }: FeaturedDestinationsProps) {
  const { packages } = useTravel();
  const scrollRef = useRef<HTMLDivElement>(null);

  const featured = packages
    .filter((p) => p.isActive)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth / 3;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2 flex items-center gap-2">
              Featured Destinations <Sparkles className="w-7 h-7 text-sand" />
            </h2>
            <p className="text-muted-foreground">
              Hand-picked adventures waiting for you
            </p>
          </div>
          <div className="hidden sm:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featured.map((pkg, index) => (
            <div
              key={pkg.id}
              className={cn(
                "flex-shrink-0 w-[calc(33.333%-1rem)] min-w-[280px] snap-start animate-fade-in cursor-pointer group"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onViewDetails(pkg)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover-lift">
                <img
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-display font-semibold text-lg mb-1">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm opacity-90 mb-2">
                    <MapPin className="w-3 h-3" />
                    {pkg.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <StarRating rating={pkg.rating} size="sm" />
                    <span className="font-bold">
                      ${pkg.price}
                      <span className="text-xs font-normal opacity-80">/night</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
