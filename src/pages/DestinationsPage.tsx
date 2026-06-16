import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Footer } from "@/components/Footer";
import { PackageCard } from "@/components/PackageCard";
import { PackageDetailDrawer } from "@/components/PackageDetailDrawer";
import { useTravel } from "@/context/TravelContext";
import { TravelPackage, Category } from "@/types/travel";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories: { value: Category; label: string; icon: string }[] = [
  { value: "beach", label: "Beach", icon: "🏖️" },
  { value: "mountain", label: "Mountain", icon: "⛰️" },
  { value: "city", label: "City", icon: "🏙️" },
  { value: "adventure", label: "Adventure", icon: "🎯" },
];

export default function DestinationsPage() {
  const { packages } = useTravel();
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const toggleCategory = (cat: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredPackages = packages.filter((pkg) => {
    if (!pkg.isActive) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(pkg.category)) return false;
    if (pkg.price < priceRange[0] || pkg.price > priceRange[1]) return false;
    return true;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-2">Explore Destinations</h1>
        <p className="text-muted-foreground mb-8">Find your perfect getaway</p>

        {/* Filters */}
        <div className="bg-muted/50 rounded-2xl p-4 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <Badge
                  key={cat.value}
                  variant={selectedCategories.includes(cat.value) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer px-3 py-1.5 text-sm",
                    selectedCategories.includes(cat.value) && "bg-primary"
                  )}
                  onClick={() => toggleCategory(cat.value)}
                >
                  {cat.icon} {cat.label}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-sm text-muted-foreground">Price: ${priceRange[0]} - ${priceRange[1]}</span>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={1000}
                step={50}
                className="w-40"
              />
            </div>
          </div>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} package_={pkg} onViewDetails={setSelectedPackage} />
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No packages match your filters. Try adjusting your criteria.
          </div>
        )}
      </div>

      <Footer />
      <PackageDetailDrawer package_={selectedPackage} onClose={() => setSelectedPackage(null)} />
    </Layout>
  );
}
