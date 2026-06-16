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
import { useTranslation } from "react-i18next";

export default function AddPackagePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPackage, updatePackage, getPackageById } = useTravel();
  const { toast } = useToast();
  const { t } = useTranslation();

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
      toast({ title: t("add_package.fill_required"), variant: "destructive" });
      return;
    }

    if (id) {
      updatePackage(id, formData);
      toast({ title: t("add_package.package_updated") });
    } else {
      addPackage(formData);
      toast({ title: t("add_package.package_created") });
    }

    navigate("/provider");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-display font-bold mb-8">
          {id ? t("add_package.edit_title") : t("add_package.add_title")}
        </h1>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>{t("add_package.title_label")}</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={t("placeholders.package_title")}
              />
            </div>

            <div>
              <Label>{t("add_package.location_label")}</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder={t("placeholders.location")}
              />
            </div>

            <div>
              <Label>{t("add_package.description_label")}</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t("placeholders.description")}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t("add_package.price_label")}</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label>{t("add_package.category_label")}</Label>
                <Select
                  value={formData.category}
                  onValueChange={(val) => setFormData({ ...formData, category: val as Category })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beach">🏖️ {t("categories.beach")}</SelectItem>
                    <SelectItem value="mountain">⛰️ {t("categories.mountain")}</SelectItem>
                    <SelectItem value="city">🏙️ {t("categories.city")}</SelectItem>
                    <SelectItem value="adventure">🎯 {t("categories.adventure")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>{t("add_package.image_label")}</Label>
              <Input
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder={t("placeholders.image_url")}
              />
              {formData.imageUrl && (
                <img src={formData.imageUrl} alt="Preview" className="mt-2 w-full h-40 object-cover rounded-lg" />
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1 bg-ocean-gradient">
                {id ? t("add_package.update_btn") : t("add_package.create_btn")}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/provider")}>
                {t("add_package.cancel_btn")}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
