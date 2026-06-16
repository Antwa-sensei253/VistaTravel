import { TravelPackage } from "@/types/travel";
import { useTravel } from "@/context/TravelContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";
import { MapPin, Users, Calendar, X, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface PackageDetailDrawerProps {
  package_: TravelPackage | null;
  onClose: () => void;
}

export function PackageDetailDrawer({ package_, onClose }: PackageDetailDrawerProps) {
  const { addBooking, getPackageReviews } = useTravel();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: undefined as Date | undefined,
    checkOut: undefined as Date | undefined,
    guests: 2,
  });

  const reviews = package_ ? getPackageReviews(package_.id) : [];

  const handleBooking = () => {
    if (!package_ || !formData.name || !formData.email || !formData.checkIn || !formData.checkOut) {
      toast({ title: t("package_drawer.fill_fields"), variant: "destructive" });
      return;
    }

    const nights = Math.ceil(
      (formData.checkOut.getTime() - formData.checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );

    // For now, we'll confirm the booking context then redirect to payment
    // In a real app, you might want to hold off adding the booking until payment succeeds
    const booking = {
      packageId: package_.id,
      packageTitle: package_.title,
      packageImage: package_.imageUrl,
      userName: formData.name,
      userEmail: formData.email,
      checkIn: formData.checkIn.toISOString(),
      checkOut: formData.checkOut.toISOString(),
      guests: formData.guests,
      totalPrice: package_.price * nights,
      status: "pending", // Set to pending until payment
    };

    // navigate to payment with state
    navigate("/payment", { state: { booking, totalPrice: booking.totalPrice } });

    // Close the drawer
    onClose();
  };

  if (!package_) return null;

  return (
    <Sheet open={!!package_} onOpenChange={() => onClose()}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">{t(`mock_packages.${package_.id}.title`, { defaultValue: package_.title })}</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-6">
          <img
            src={package_.imageUrl}
            alt={package_.title}
            className="w-full h-48 object-cover rounded-xl"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{t(`mock_packages.${package_.id}.location`, { defaultValue: package_.location })}</span>
            </div>
            <div className="flex items-center gap-2">
              <StarRating rating={package_.rating} size="sm" showValue />
              <span className="text-sm text-muted-foreground">({package_.reviewCount})</span>
            </div>
          </div>

          <p className="text-muted-foreground">{t(`mock_packages.${package_.id}.description`, { defaultValue: package_.description })}</p>

          <div>
            <h4 className="font-semibold mb-2">{t("package_drawer.amenities")}</h4>
            <div className="flex flex-wrap gap-2">
              {package_.amenities.map((amenity) => (
                <Badge key={amenity} variant="secondary">{t(`amenities.${amenity}`, { defaultValue: amenity })}</Badge>
              ))}
            </div>
          </div>

          <div className="bg-muted p-4 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-primary">
                ${package_.price}
                <span className="text-sm font-normal text-muted-foreground">{t("package_drawer.per_night")}</span>
              </span>
            </div>

            {!showBookingForm ? (
              <Button onClick={() => setShowBookingForm(true)} className="w-full bg-ocean-gradient">
                {t("package_drawer.book_now")}
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label>{t("package_drawer.full_name")}</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t("placeholders.full_name")}
                  />
                </div>
                <div>
                  <Label>{t("package_drawer.email")}</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t("placeholders.email")}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>{t("package_drawer.check_in")}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formData.checkIn ? format(formData.checkIn, "MMM dd") : t("package_drawer.date")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={formData.checkIn}
                          onSelect={(date) => setFormData({ ...formData, checkIn: date })}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>{t("package_drawer.check_out")}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formData.checkOut ? format(formData.checkOut, "MMM dd") : t("package_drawer.date")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={formData.checkOut}
                          onSelect={(date) => setFormData({ ...formData, checkOut: date })}
                          disabled={(date) => date < (formData.checkIn || new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleBooking} className="flex-1 bg-ocean-gradient">
                    <Check className="w-4 h-4 mr-2" /> {t("package_drawer.confirm")}
                  </Button>
                  <Button variant="outline" onClick={() => setShowBookingForm(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {reviews.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">{t("package_drawer.reviews")} ({reviews.length})</h4>
              <div className="space-y-3">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{review.userName}</span>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
