import { TravelPackage } from "@/types/travel";
import { useTravel } from "@/context/TravelContext";
import { StarRating } from "./StarRating";
import { MapPin, Percent, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DealsSectionProps {
  onViewDetails: (pkg: TravelPackage) => void;
}

export function DealsSection({ onViewDetails }: DealsSectionProps) {
  const { packages } = useTravel();

  // Get packages with lowest prices as "deals"
  const deals = packages
    .filter((p) => p.isActive)
    .sort((a, b) => a.price - b.price)
    .slice(0, 3);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-coral/10 via-background to-sand/10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-coral/20 text-coral px-4 py-2 rounded-full mb-4">
            <Percent className="w-4 h-4" />
            <span className="font-semibold text-sm">Limited Time Offers</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Hot Deals & Discounts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Grab these amazing offers before they're gone! Save big on your dream destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((pkg, index) => (
            <div
              key={pkg.id}
              className="relative bg-background rounded-2xl overflow-hidden shadow-lg hover-lift animate-fade-in cursor-pointer group"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onViewDetails(pkg)}
            >
              {/* Discount Badge */}
              <Badge className="absolute top-4 left-4 z-10 bg-coral text-white font-bold px-3 py-1">
                {20 + index * 5}% OFF
              </Badge>
              
              {/* Timer Badge */}
              <div className="absolute top-4 right-4 z-10 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {3 - index}d left
              </div>

              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-5">
                <h3 className="font-display font-semibold text-lg mb-1">
                  {pkg.title}
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-3 h-3" />
                  {pkg.location}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <StarRating rating={pkg.rating} size="sm" />
                    <span className="text-xs text-muted-foreground">({pkg.reviewCount})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-muted-foreground line-through text-sm">
                      ${Math.round(pkg.price * 1.3)}
                    </span>
                    <span className="text-2xl font-bold text-coral ml-2">
                      ${pkg.price}
                    </span>
                    <span className="text-xs text-muted-foreground">/night</span>
                  </div>
                  <Button size="sm" className="bg-ocean hover:bg-ocean/90">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}