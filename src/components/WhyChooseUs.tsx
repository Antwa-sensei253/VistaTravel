import { Plane, Shield, Clock, Heart, Star } from "lucide-react";

const features = [
  {
    id: "deals",
    icon: Plane,
  },
  {
    id: "secure",
    icon: Shield,
  },
  {
    id: "support",
    icon: Clock,
  },
  {
    id: "curated",
    icon: Heart,
  },
];

import { useTranslation } from "react-i18next";

export function WhyChooseUs() {
  const { t } = useTranslation();
  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-2 flex items-center justify-center gap-2">
            {t("why_choose_us.title")} <Star className="w-7 h-7 text-sand fill-sand" />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("why_choose_us.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 text-center shadow-sm hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-ocean-gradient flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                {t(`why_choose_us.features.${feature.id}_title`)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(`why_choose_us.features.${feature.id}_desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
