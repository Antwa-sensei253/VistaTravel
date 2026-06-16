import { Plane, Shield, Clock, Heart, Star } from "lucide-react";

const features = [
  {
    icon: Plane,
    title: "Best Flight Deals",
    description: "We partner with top airlines to bring you unbeatable prices",
  },
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Your payment and personal data are always protected",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our travel experts are here whenever you need help",
  },
  {
    icon: Heart,
    title: "Curated Experiences",
    description: "Handpicked adventures tailored just for you",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-2 flex items-center justify-center gap-2">
            Why Choose VistaTravel? <Star className="w-7 h-7 text-sand fill-sand" />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're not just another travel agency. We're your partners in creating
            unforgettable memories.
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
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
