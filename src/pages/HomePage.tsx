import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SearchWidget } from "@/components/SearchWidget";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { DealsSection } from "@/components/DealsSection";
import { PopularCategories } from "@/components/PopularCategories";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";
import { PackageDetailDrawer } from "@/components/PackageDetailDrawer";
import { TravelPackage } from "@/types/travel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const { t } = useTranslation();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in">
            {t("home.hero_title_1")}
            <span className="block text-sand">{t("home.hero_title_2")}</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in">
            {t("home.hero_subtitle")}
          </p>

          <div className="mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <SearchWidget />
          </div>

          <Link to="/destinations">
            <Button
              size="lg"
              className="bg-coral hover:bg-coral/90 text-white gap-2 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              {t("home.explore_all")}
              <ArrowRight className="w-5 h-5 rtl:-scale-x-100" />
            </Button>
          </Link>
        </div>
      </section>

      <FeaturedDestinations onViewDetails={setSelectedPackage} />
      <DealsSection onViewDetails={setSelectedPackage} />
      <PopularCategories />
      <TestimonialsSection />
      <WhyChooseUs />
      <NewsletterSection />
      <Footer />

      <PackageDetailDrawer
        package_={selectedPackage}
        onClose={() => setSelectedPackage(null)}
      />
    </Layout>
  );
}
