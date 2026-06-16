import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "./StarRating";
import { useTravel } from "@/context/TravelContext";
import { useToast } from "@/hooks/use-toast";

interface ReviewModalProps {
  bookingId: string;
  packageId: string;
  packageTitle: string;
  onClose: () => void;
}

export function ReviewModal({ bookingId, packageId, packageTitle, onClose }: ReviewModalProps) {
  const { addReview, markBookingReviewed } = useTravel();
  const { toast } = useToast();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment.trim()) {
      toast({ title: "Please write a comment", variant: "destructive" });
      return;
    }

    addReview({
      packageId,
      userName: "You",
      rating,
      comment,
    });

    markBookingReviewed(bookingId);

    toast({ title: "⭐ Review submitted!", description: "Thank you for your feedback!" });
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review: {packageTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Your Rating</label>
            <StarRating rating={rating} size="lg" interactive onRatingChange={setRating} />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Your Review</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              rows={4}
            />
          </div>
          <Button onClick={handleSubmit} className="w-full bg-ocean-gradient">
            Submit Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
