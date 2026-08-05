"use client"

import { initiateAppointmentPaymentAction } from "@/app/_actions/appointment.actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { type IAppointment } from "@/types/appointment.types"
import { useMutation } from "@tanstack/react-query"
import { format } from "date-fns"
import {
  AlertCircle,
  CalendarClock,
  CircleDollarSign,
  CreditCard,
  Loader2,
  Star,
  Video,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import CancelAppointmentConfirmationDialog from "./CancelAppointmentConfirmationDialog"
import GiveReviewModal from "../Reviews/GiveReviewModal"

interface PatientAppointmentsListProps {
  appointments: IAppointment[]
  feedbackType?: "success" | "error"
  feedbackMessage?: string
}

const formatDateTime = (value?: string | Date | null) => {
  if (!value) {
    return "N/A"
  }

  const dateValue = new Date(value)
  if (Number.isNaN(dateValue.getTime())) {
    return "N/A"
  }

  return format(dateValue, "MMM dd, yyyy • hh:mm a")
}

const PatientAppointmentsList = ({
  appointments,
  feedbackType,
  feedbackMessage,
}: PatientAppointmentsListProps) => {
  const initiatePaymentMutation = useMutation({
    mutationFn: initiateAppointmentPaymentAction,
  })

  const [appointmentToCancel, setAppointmentToCancel] = useState<IAppointment | null>(null)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [appointmentToReview, setAppointmentToReview] = useState<IAppointment | null>(null)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const sortedAppointments = useMemo(() => {
    return [...appointments].sort((left, right) => {
      const leftValue = new Date(left.schedule?.startDateTime ?? left.createdAt ?? 0).getTime()
      const rightValue = new Date(right.schedule?.startDateTime ?? right.createdAt ?? 0).getTime()
      return rightValue - leftValue
    })
  }, [appointments])

  const paidCount = appointments.filter((item) => item.paymentStatus === "PAID").length
  const unpaidCount = appointments.filter((item) => item.paymentStatus !== "PAID").length

  const handlePayNow = async (appointmentId: string) => {
    const result = await initiatePaymentMutation.mutateAsync(appointmentId)

    if (!result.success) {
      toast.error(result.message || "Failed to initiate payment")
      return
    }

    if (!result.data.paymentUrl) {
      toast.error("Payment link is unavailable right now")
      return
    }

    window.location.assign(result.data.paymentUrl)
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border bg-linear-to-r from-cyan-50 via-white to-blue-50 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">My Appointments</h1>
            <p className="text-sm text-muted-foreground">
              Review upcoming and past appointments, and finish payment for unpaid bookings.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <Badge variant="secondary">Total: {appointments.length}</Badge>
            <Badge variant="secondary">Paid: {paidCount}</Badge>
            <Badge variant="secondary">Unpaid: {unpaidCount}</Badge>
          </div>
        </div>
      </div>

      {feedbackType && feedbackMessage && (
        <Alert variant={feedbackType === "error" ? "destructive" : "default"}>
          <AlertCircle className="size-4" />
          <AlertTitle>{feedbackType === "error" ? "Payment update" : "Appointment update"}</AlertTitle>
          <AlertDescription>{feedbackMessage}</AlertDescription>
        </Alert>
      )}

      {sortedAppointments.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No appointments yet</CardTitle>
            <CardDescription>
              Start by choosing a doctor and selecting an available time slot.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href="/consultation">Browse Doctors</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {sortedAppointments.map((appointment) => {
            const canPayNow =
              appointment.paymentStatus !== "PAID" && appointment.status !== "CANCELED"
            const canCancel =
              appointment.status === "SCHEDULED" && appointment.paymentStatus !== "PAID"
            const canJoinCall = Boolean(
              appointment.videoCallingId &&
                (appointment.status === "SCHEDULED" || appointment.status === "INPROGRESS"),
            )
            const canReview =
              appointment.status === "COMPLETED" &&
              appointment.paymentStatus === "PAID" &&
              !appointment.review

            return (
              <Card key={appointment.id} className="gap-4">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <CardTitle>{appointment.doctor?.name || "Doctor appointment"}</CardTitle>
                      <CardDescription>
                        {appointment.doctor?.designation || "Consultation"}
                      </CardDescription>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <Badge variant="outline">{appointment.status || "SCHEDULED"}</Badge>
                      <Badge variant={appointment.paymentStatus === "PAID" ? "secondary" : "outline"}>
                        {appointment.paymentStatus || "UNPAID"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border bg-muted/20 p-4 text-sm">
                      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                        <CalendarClock className="size-4" />
                        Schedule
                      </div>
                      <p className="font-medium">{formatDateTime(appointment.schedule?.startDateTime)}</p>
                      <p className="text-muted-foreground">Ends {formatDateTime(appointment.schedule?.endDateTime)}</p>
                    </div>

                    <div className="rounded-2xl border bg-muted/20 p-4 text-sm">
                      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                        <CircleDollarSign className="size-4" />
                        Payment
                      </div>
                      <p className="font-medium">৳{appointment.doctor?.appointmentFee?.toFixed(2) ?? appointment.payment?.amount?.toFixed(2) ?? "0.00"}</p>
                      <p className="text-muted-foreground">Transaction {appointment.payment?.transactionId || "Pending"}</p>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Appointment ID: <span className="font-medium text-foreground">{appointment.id}</span>
                  </div>
                </CardContent>

                <CardFooter className="flex-wrap justify-between gap-3">
                  <Button asChild variant="outline">
                    <Link href={`/consultation/doctor/${appointment.doctorId || appointment.doctor?.id || ""}`}>
                      View Doctor
                    </Link>
                  </Button>

                  <div className="flex flex-wrap items-center gap-2">
                    {canJoinCall && appointment.videoCallingId && (
                      <Button asChild size="sm" variant="secondary">
                        <a href={`/video-call/${appointment.videoCallingId}`} target="_blank" rel="noreferrer">
                          <Video className="size-4" />
                          Join Call
                        </a>
                      </Button>
                    )}

                    {canReview && (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setAppointmentToReview(appointment)
                          setIsReviewModalOpen(true)
                        }}
                      >
                        <Star className="size-4 text-amber-500" />
                        Write Review
                      </Button>
                    )}

                    {canCancel && (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          setAppointmentToCancel(appointment)
                          setIsCancelDialogOpen(true)
                        }}
                      >
                        <XCircle className="size-4" />
                        Cancel
                      </Button>
                    )}

                    {canPayNow ? (
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => void handlePayNow(appointment.id)}
                        disabled={initiatePaymentMutation.isPending}
                      >
                        {initiatePaymentMutation.isPending ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <CreditCard className="size-4" />
                        )}
                        {initiatePaymentMutation.isPending ? "Redirecting..." : "Pay Now"}
                      </Button>
                    ) : (
                      appointment.paymentStatus === "PAID" &&
                      appointment.status !== "COMPLETED" && (
                        <Button type="button" size="sm" variant="secondary" disabled>
                          Paid
                        </Button>
                      )
                    )}
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}

      <CancelAppointmentConfirmationDialog
        open={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
        appointment={appointmentToCancel}
      />

      <GiveReviewModal
        open={isReviewModalOpen}
        onOpenChange={setIsReviewModalOpen}
        appointment={appointmentToReview}
      />
    </div>
  )
}

export default PatientAppointmentsList