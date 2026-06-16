import { TravelPackage } from "@/types/travel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";
import { MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  package_: TravelPackage;
  onViewDetails: (pkg: TravelPackage) => void;
}

const categoryIcons: Record<string, string> = {
  beach: "🏖️",
  mountain: "⛰️",
  city: "🏙️",
  adventure: "🎯",
};

export function PackageCard({ package_, onViewDetails }: PackageCardProps) {
  return (
    <Card className="group overflow-hidden hover-lift cursor-pointer border-0 shadow-md">
      <div className="relative overflow-hidden">
        <img
          src={package_.imageUrl}
          alt={package_.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-background/90 text-foreground hover:bg-background">
          {categoryIcons[package_.category]} {package_.category.charAt(0).toUpperCase() + package_.category.slice(1)}
        </Badge>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full font-bold text-sm">
          From ${package_.price}
          <span className="text-xs font-normal opacity-80">/night</span>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {package_.title}
        </h3>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-3 h-3" />
          <span>{package_.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating rating={package_.rating} size="sm" />
            <span className="text-sm text-muted-foreground">
              ({package_.reviewCount})
            </span>
          </div>

          <Button
            size="sm"
            variant="ghost"
            className="group/btn hover:text-primary"
            onClick={() => onViewDetails(package_)}
          >
            Details
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
