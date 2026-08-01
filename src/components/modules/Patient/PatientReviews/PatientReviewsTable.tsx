"use client"

import { deleteReviewAction, updateReviewAction } from "@/app/_actions/review.actions"
import DataTable from "@/components/shared/table/DataTable"
import DateCell from "@/components/shared/cell/DateCell"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { getMyReviews } from "@/services/review.services"
import type { IReview } from "@/types/review.types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Star, Stethoscope, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const patientReviewsColumns: ColumnDef<IReview>[] = [
  {
    id: "doctor",
    accessorKey: "doctor.name",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = row.original.doctor
      return (
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-primary" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Dr. {doctor?.name || "Doctor"}</span>
            <span className="text-xs text-muted-foreground">{doctor?.email || ""}</span>
          </div>
        </div>
      )
    },
  },
  {
    id: "rating",
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <span className="text-sm font-semibold">{row.original.rating.toFixed(1)}</span>
      </div>
    ),
  },
  {
    id: "comment",
    accessorKey: "comment",
    header: "Your Feedback",
    cell: ({ row }) => (
      <p className="text-xs text-muted-foreground line-clamp-3 max-w-[380px]">
        {row.original.comment || "No written review provided."}
      </p>
    ),
  },
  {
    id: "appointmentDate",
    accessorKey: "appointment.schedule.startDateTime",
    header: "Appointment",
    cell: ({ row }) => (
      <DateCell date={row.original.appointment?.schedule?.startDateTime} formatString="MMM dd, yyyy" />
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Submitted On",
    cell: ({ row }) => (
      <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
    ),
  },
]

const PatientReviewsTable = () => {
  const [reviewToEdit, setReviewToEdit] = useState<IReview | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState<IReview | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const queryClient = useQueryClient()

  const { data: reviewsRes, isLoading, isFetching } = useQuery({
    queryKey: ["my-reviews"],
    queryFn: getMyReviews,
  })

  const reviews = reviewsRes?.data ?? []

  const columns = [
    ...patientReviewsColumns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: { original: IReview } }) => {
        const review = row.original
        return (
          <div className="flex items-center gap-1.5">
            <Button
              size="xs"
              variant="ghost"
              className="gap-1 text-xs h-8"
              onClick={() => {
                setReviewToEdit(review)
                setIsEditModalOpen(true)
              }}
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </Button>
            <Button
              size="xs"
              variant="ghost"
              className="gap-1 text-xs h-8 text-destructive hover:text-destructive"
              onClick={() => {
                setReviewToDelete(review)
                setIsDeleteDialogOpen(true)
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        )
      },
    },
  ]

  const handleUpdate = async (reviewId: string, rating: number, comment: string) => {
    try {
      const res = await updateReviewAction(reviewId, { rating, comment: comment.trim() || undefined })

      if (res.success) {
        toast.success("Review updated successfully.")
        setIsEditModalOpen(false)
        queryClient.invalidateQueries({ queryKey: ["my-reviews"] })
        queryClient.invalidateQueries({ queryKey: ["my-appointments"] })
      } else {
        toast.error(res.message || "Failed to update review.")
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.")
    }
  }

  const handleDelete = async () => {
    if (!reviewToDelete) {
      return
    }

    try {
      const res = await deleteReviewAction(reviewToDelete.id)

      if (res.success) {
        toast.success("Review deleted successfully.")
        setIsDeleteDialogOpen(false)
        queryClient.invalidateQueries({ queryKey: ["my-reviews"] })
        queryClient.invalidateQueries({ queryKey: ["my-appointments"] })
      } else {
        toast.error(res.message || "Failed to delete review.")
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.")
    }
  }

  return (
    <>
      <DataTable
        data={reviews}
        columns={columns}
        isLoading={isLoading || isFetching}
        emptyMessage="You have not written any reviews yet."
      />

      {reviewToEdit && (
        <EditReviewModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          review={reviewToEdit}
          onSave={handleUpdate}
        />
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this review?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently remove your review for Dr. {reviewToDelete?.doctor?.name}.
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

interface EditReviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  review: IReview
  onSave: (reviewId: string, rating: number, comment: string) => Promise<void>
}

const EditReviewModal = ({ open, onOpenChange, review, onSave }: EditReviewModalProps) => {
  const [rating, setRating] = useState(review.rating)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState(review.comment ?? "")
  const [loading, setLoading] = useState(false)

  const selectableRating = hoveredRating || rating

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave(review.id, rating, comment)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit your review</DialogTitle>
          <DialogDescription>
            Update your rating and feedback for Dr. {review.doctor?.name}.
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-review-comment">Written review (optional)</Label>
            <Textarea
              id="edit-review-comment"
              rows={4}
              placeholder="Share details about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
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
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PatientReviewsTable
