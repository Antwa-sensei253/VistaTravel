import { Layout } from "@/components/Layout";
import { useTravel } from "@/context/TravelContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Plus, Package, Star, Edit, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ProviderDashboard() {
  const { packages, deletePackage, bookings, reviews } = useTravel();
  const { t } = useTranslation();

  const totalBookings = bookings.length;
  const avgRating = packages.length
    ? packages.reduce((sum, p) => sum + p.rating, 0) / packages.length
    : 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">{t("provider.title")}</h1>
            <p className="text-muted-foreground">{t("provider.subtitle")}</p>
          </div>
          <Link to="/provider/add">
            <Button className="bg-ocean-gradient gap-2">
              <Plus className="w-4 h-4" /> {t("provider.add_package")}
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center">
            <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{packages.length}</div>
            <div className="text-sm text-muted-foreground">{t("provider.total_packages")}</div>
          </Card>
          <Card className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-sand" />
            <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">{t("provider.avg_rating")}</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold">{totalBookings}</div>
            <div className="text-sm text-muted-foreground">{t("provider.total_bookings")}</div>
          </Card>
        </div>

        {/* Package List */}
        <div className="grid gap-4">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="p-4 flex gap-4 items-center">
              <img src={pkg.imageUrl} alt={pkg.title} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold">{t(`mock_packages.${pkg.id}.title`, { defaultValue: pkg.title })}</h3>
                <div className="text-sm text-muted-foreground">{t(`mock_packages.${pkg.id}.location`, { defaultValue: pkg.location })}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">${pkg.price}{t("provider.per_night")}</Badge>
                  <Badge variant={pkg.isActive ? "default" : "secondary"}>
                    {pkg.isActive ? t("provider.active") : t("provider.inactive")}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to={`/provider/edit/${pkg.id}`}>
                  <Button size="icon" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <Button size="icon" variant="destructive" onClick={() => deletePackage(pkg.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
