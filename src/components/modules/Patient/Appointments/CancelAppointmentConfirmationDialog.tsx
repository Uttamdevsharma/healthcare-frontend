"use client"

import { changeAppointmentStatus } from "@/services/appointment.services"
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
import type { IAppointment } from "@/types/appointment.types"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

interface CancelAppointmentConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  appointment: IAppointment | null
}

const CancelAppointmentConfirmationDialog = ({
  open,
  onOpenChange,
  appointment,
}: CancelAppointmentConfirmationDialogProps) => {
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const handleCancel = async () => {
    if (!appointment) {
      return
    }

    setLoading(true)
    try {
      const res = await changeAppointmentStatus(appointment.id, "CANCELED")

      if (res.success) {
        toast.success("Appointment canceled successfully.")
        onOpenChange(false)
        queryClient.invalidateQueries({ queryKey: ["my-appointments"] })
        queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] })
      } else {
        toast.error(res.message || "Failed to cancel appointment.")
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel this appointment?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to cancel your appointment with{" "}
            <strong className="text-foreground">
              Dr. {appointment?.doctor?.name || "the doctor"}
            </strong>{" "}
            on{" "}
            <strong className="text-foreground">
              {appointment?.schedule?.startDateTime
                ? new Date(appointment.schedule.startDateTime).toLocaleString()
                : "the scheduled time"}
            </strong>
            . This action cannot be undone and the slot will be released for other patients.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Keep Appointment</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancel}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? "Canceling..." : "Yes, Cancel Appointment"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CancelAppointmentConfirmationDialog
