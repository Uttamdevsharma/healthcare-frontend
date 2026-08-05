"use client"

import { giveReviewAction } from "@/app/_actions/review.actions"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { IAppointment } from "@/types/appointment.types"
import { useQueryClient } from "@tanstack/react-query"
import { Loader2, Star } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface GiveReviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  appointment: IAppointment | null
}

const REVIEW_COMMENTS = [
  "Very professional and thorough consultation.",
  "Listened to my concerns and explained everything clearly.",
  "Great experience, highly recommended.",
  "Excellent diagnosis and treatment plan.",
  "Friendly, caring, and knowledgeable doctor.",
]

const GiveReviewModal = ({ open, onOpenChange, appointment }: GiveReviewModalProps) => {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!appointment) {
      return
    }

    if (rating < 1) {
      toast.error("Please select a rating between 1 and 5 stars.")
      return
    }

    setLoading(true)
    try {
      const res = await giveReviewAction({
        appointmentId: appointment.id,
        rating,
        comment: comment.trim() || undefined,
      })

      if (res.success) {
        toast.success("Thank you! Your review has been submitted.")
        onOpenChange(false)
        setRating(0)
        setComment("")
        queryClient.invalidateQueries({ queryKey: ["my-appointments"] })
        queryClient.invalidateQueries({ queryKey: ["my-reviews"] })
      } else {
        toast.error(res.message || "Failed to submit review.")
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const selectableRating = hoveredRating || rating

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Rate your consultation</DialogTitle>
          <DialogDescription>
            How was your experience with Dr. {appointment?.doctor?.name || "the doctor"}? Your
            feedback helps other patients make informed decisions.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          <div className="space-y-2">
            <Label>Your rating</Label>
            <div className="flex items-center justify-center gap-2 rounded-2xl border bg-muted/20 py-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={cn(
                      "size-8 transition-colors",
                      value <= selectableRating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/40",
                    )}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-xs text-muted-foreground">
                {rating === 5
                  ? "Excellent!"
                  : rating === 4
                    ? "Great!"
                    : rating === 3
                      ? "Good"
                      : rating === 2
                        ? "Fair"
                        : "Poor"}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-comment">Written review (optional)</Label>
            <Textarea
              id="review-comment"
              rows={4}
              placeholder="Share details about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {REVIEW_COMMENTS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setComment(suggestion)}
                className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || rating < 1}>
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default GiveReviewModal
