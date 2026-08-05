"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updatePrescription } from "@/services/prescription.services"
import type { IPrescription } from "@/types/prescription.types"
import { useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface EditPrescriptionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  prescription: IPrescription | null
}

const EditPrescriptionModal = ({
  open,
  onOpenChange,
  prescription,
}: EditPrescriptionModalProps) => {
  const [instructions, setInstructions] = useState("")
  const [followUpDate, setFollowUpDate] = useState("")
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (open && prescription) {
      setInstructions(prescription.instructions ?? "")
      setFollowUpDate(prescription.followUpDate ? prescription.followUpDate.split("T")[0] : "")
    }
  }, [open, prescription])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prescription || !instructions || !followUpDate) {
      toast.error("Please fill in all prescription details.")
      return
    }

    setLoading(true)
    try {
      const res = await updatePrescription(prescription.id, {
        instructions,
        followUpDate,
      })

      if (res.success) {
        toast.success("Prescription updated and sent to patient email!")
        onOpenChange(false)
        queryClient.invalidateQueries({ queryKey: ["my-prescriptions"] })
        queryClient.invalidateQueries({ queryKey: ["my-appointments"] })
      } else {
        toast.error(res.message || "Failed to update prescription.")
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Edit Prescription for {prescription?.patient?.name || "Patient"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="edit-instructions">Prescription Instructions & Dosage</Label>
            <Textarea
              id="edit-instructions"
              required
              rows={5}
              placeholder="e.g. Paracetamol 500mg - 1 tablet every 8 hours for 5 days after meals."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-followUpDate">Follow Up Date</Label>
            <Input
              id="edit-followUpDate"
              type="date"
              required
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Updating Rx...
                </>
              ) : (
                "Update & Send Rx"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditPrescriptionModal
