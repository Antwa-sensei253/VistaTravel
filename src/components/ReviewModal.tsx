import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTravel } from "@/context/TravelContext";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface ReviewModalProps {
  bookingId: string;
  packageId: string;
  packageTitle: string;
  onClose: () => void;
}

export function ReviewModal({ bookingId, packageId, packageTitle, onClose }: ReviewModalProps) {
  const { addReview, markBookingReviewed } = useTravel();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment.trim()) {
      toast({ title: t("review_modal.toast_error"), variant: "destructive" });
      return;
    }

    addReview({
      packageId,
      userName: "You",
      rating,
      comment,
    });

    markBookingReviewed(bookingId);

    toast({ title: t("review_modal.toast_title"), description: t("review_modal.toast_desc") });
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("review_modal.review")}: {packageTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block">{t("review_modal.your_rating")}</label>
            <StarRating rating={rating} size="lg" interactive onRatingChange={setRating} />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">{t("review_modal.your_review")}</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t("review_modal.placeholder")}
              rows={4}
            />
          </div>
          <Button onClick={handleSubmit} className="w-full bg-ocean-gradient">
            {t("review_modal.submit")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
