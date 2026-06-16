import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useTravel } from "@/context/TravelContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@/types/travel";

export default function AddPackagePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPackage, updatePackage, getPackageById } = useTravel();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: 100,
    category: "beach" as Category,
    imageUrl: "",
    amenities: [] as string[],
    isActive: true,
  });

  useEffect(() => {
    if (id) {
      const pkg = getPackageById(id);
      if (pkg) {
        setFormData({
          title: pkg.title,
          description: pkg.description,
          location: pkg.location,
          price: pkg.price,
          category: pkg.category,
          imageUrl: pkg.imageUrl,
          amenities: pkg.amenities,
          isActive: pkg.isActive,
        });
      }
    }
  }, [id, getPackageById]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.imageUrl) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    if (id) {
      updatePackage(id, formData);
      toast({ title: "✅ Package updated!" });
    } else {
      addPackage(formData);
      toast({ title: "🎉 Package created!" });
    }

    navigate("/provider");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-display font-bold mb-8">
          {id ? "Edit Package" : "Add New Package"}
        </h1>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Package Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Santorini Sunset Escape"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Santorini, Greece"
              />
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your package..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price per Night ($)</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(val) => setFormData({ ...formData, category: val as Category })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beach">🏖️ Beach</SelectItem>
                    <SelectItem value="mountain">⛰️ Mountain</SelectItem>
                    <SelectItem value="city">🏙️ City</SelectItem>
                    <SelectItem value="adventure">🎯 Adventure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Image URL *</Label>
              <Input
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />
              {formData.imageUrl && (
                <img src={formData.imageUrl} alt="Preview" className="mt-2 w-full h-40 object-cover rounded-lg" />
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1 bg-ocean-gradient">
                {id ? "Update Package" : "Create Package"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/provider")}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
