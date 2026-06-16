import { useTravel } from "@/context/TravelContext";
import { StarRating } from "./StarRating";
import { Quote, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export function TestimonialsSection() {
  const { reviews, getPackageById } = useTravel();
  const { t } = useTranslation();

  // Get top reviews
  const topReviews = reviews
    .filter((r) => r.rating >= 4)
    .slice(0, 3);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 flex items-center justify-center gap-2">
            {t("testimonials.title")} <MessageCircle className="w-7 h-7 text-ocean" />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topReviews.map((review, index) => {
            const pkg = getPackageById(review.packageId);
            return (
              <div
                key={review.id}
                className="bg-muted/30 rounded-2xl p-6 relative animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Quote className="absolute top-4 right-4 w-10 h-10 text-ocean/20" />
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-ocean-gradient flex items-center justify-center text-white font-bold text-lg">
                    {review.userName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{review.userName}</h4>
                    <p className="text-xs text-muted-foreground">
                      {pkg ? t(`mock_packages.${pkg.id}.title`, { defaultValue: pkg.title }) : t("testimonials.travel_experience", "Travel Experience")}
                    </p>
                  </div>
                </div>

                <StarRating rating={review.rating} size="sm" />
                
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  "{review.comment}"
                </p>

                <p className="mt-4 text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}