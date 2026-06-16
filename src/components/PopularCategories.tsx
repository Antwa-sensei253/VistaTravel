import { useNavigate } from "react-router-dom";
import { Palmtree, Mountain, Building2, Compass } from "lucide-react";

const categories = [
  {
    id: "beach",
    name: "Beach",
    icon: Palmtree,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop",
    count: 24,
  },
  {
    id: "mountain",
    name: "Mountain",
    icon: Mountain,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop",
    count: 18,
  },
  {
    id: "city",
    name: "City",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&auto=format&fit=crop",
    count: 32,
  },
  {
    id: "adventure",
    name: "Adventure",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400&auto=format&fit=crop",
    count: 15,
  },
];

export function PopularCategories() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/destinations?category=${categoryId}`);
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Explore by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find your perfect getaway based on the type of experience you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="relative group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <category.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm opacity-80">{category.count} destinations</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}