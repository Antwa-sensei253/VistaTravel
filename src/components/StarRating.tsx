import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  interactive = false,
  onRatingChange,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, index) => {
          const isFilled = index < fullStars;
          const isHalf = index === fullStars && hasHalfStar;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(index)}
              disabled={!interactive}
              className={cn(
                "transition-transform",
                interactive && "hover:scale-110 cursor-pointer disabled:cursor-default"
              )}
            >
              {isHalf ? (
                <div className="relative">
                  <Star
                    className={cn(sizeClasses[size], "text-muted stroke-sand fill-muted")}
                  />
                  <StarHalf
                    className={cn(
                      sizeClasses[size],
                      "absolute top-0 left-0 text-sand fill-sand"
                    )}
                  />
                </div>
              ) : (
                <Star
                  className={cn(
                    sizeClasses[size],
                    isFilled
                      ? "text-sand fill-sand"
                      : "text-muted-foreground/30 fill-muted-foreground/10"
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-muted-foreground ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
