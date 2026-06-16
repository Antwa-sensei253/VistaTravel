import { Layout } from "@/components/Layout";
import { useTravel } from "@/context/TravelContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, MapPin, X, Star } from "lucide-react";
import { useState } from "react";
import { ReviewModal } from "@/components/ReviewModal";
import { useTranslation } from "react-i18next";

export default function BookingsPage() {
  const { bookings, cancelBooking } = useTravel();
  const [reviewBookingId, setReviewBookingId] = useState<string | null>(null);
  const { t } = useTranslation();

  const activeBooking = bookings.find((b) => b.id === reviewBookingId);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-2">{t("bookings.title")}</h1>
        <p className="text-muted-foreground mb-8">{t("bookings.subtitle")}</p>

        {bookings.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            {t("bookings.no_bookings")}
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="p-4 flex gap-4">
                <img
                  src={booking.packageImage}
                  alt={booking.packageTitle}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{booking.packageTitle}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(booking.checkIn), "MMM dd")} -{" "}
                        {format(new Date(booking.checkOut), "MMM dd, yyyy")}
                      </div>
                    </div>
                    <Badge
                      variant={
                        booking.status === "confirmed"
                          ? "default"
                          : booking.status === "completed"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {t(`bookings.status_${booking.status}`)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold">${booking.totalPrice}</span>
                    {booking.status === "confirmed" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => cancelBooking(booking.id)}
                      >
                        <X className="w-4 h-4 mx-1" /> {t("bookings.cancel")}
                      </Button>
                    )}
                    {booking.status === "completed" && !booking.hasReview && (
                      <Button size="sm" variant="outline" onClick={() => setReviewBookingId(booking.id)}>
                        <Star className="w-4 h-4 mx-1" /> {t("bookings.leave_review")}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {activeBooking && (
        <ReviewModal
          bookingId={activeBooking.id}
          packageId={activeBooking.packageId}
          packageTitle={activeBooking.packageTitle}
          onClose={() => setReviewBookingId(null)}
        />
      )}
    </Layout>
  );
}
