import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { verifyAppointmentPayment } from "@/services/appointment.services"
import { CheckCircle2, CircleAlert, Loader2 } from "lucide-react"
import Link from "next/link"

const getErrorMessage = (error: unknown) => {
  if (error && typeof error === "object" && "response" in error) {
    return (
      (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
      "Request failed"
    )
  }

  if (error instanceof Error) {
    return error.message
  }

  return "Request failed"
}

const PaymentSuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; appointment_id?: string; payment_id?: string }>
}) => {
  const params = await searchParams
  const appointmentId = params.appointment_id?.trim() ?? ""

  let status: "paid" | "pending" | "nosession" | "unknown" = "unknown"
  let message = ""
  let errorDetail = ""

  if (appointmentId) {
    try {
      const result = await verifyAppointmentPayment(appointmentId)
      if (result.success && result.data) {
        status = "paid"
        message = result.message || ""
      }
    } catch (error: unknown) {
      const detail = getErrorMessage(error)
      if (detail.includes("not completed")) {
        status = "pending"
        message = "Payment confirmation is still processing."
      } else if (detail.includes("No Stripe payment session")) {
        status = "nosession"
        message = "No Stripe payment session was found for this appointment."
      } else {
        status = "unknown"
        errorDetail = detail
        message = "We could not confirm your payment right now."
      }
    }
  } else {
    status = "unknown"
    message = "No appointment was found in the payment redirect."
  }

  const isPaid = status === "paid"

  return (
    <section className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            {isPaid ? (
              <CheckCircle2 className="size-8 text-green-500" />
            ) : (
              <CircleAlert className="size-8 text-amber-500" />
            )}
            <div className="space-y-1">
              <CardTitle>
                {isPaid ? "Payment Successful" : "Payment Pending"}
              </CardTitle>
              <CardDescription>{message}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant={isPaid ? "default" : "default"}>
            {isPaid ? <CheckCircle2 className="size-4" /> : <CircleAlert className="size-4" />}
            <AlertTitle>
              {isPaid
                ? "Your appointment is confirmed and paid."
                : status === "pending"
                  ? "Payment confirmation is still processing"
                  : status === "nosession"
                    ? "No payment session was started for this appointment"
                    : "Payment status could not be confirmed"}
            </AlertTitle>
            <AlertDescription>
              {isPaid
                ? "You can view the appointment details from your appointments list."
                : status === "pending"
                  ? "It may take a moment for Stripe to confirm the payment. Check your appointments shortly."
                  : status === "nosession"
                    ? "Return to your appointments and complete payment to finish the booking."
                    : errorDetail
                      ? `Details: ${errorDetail}`
                      : "It may take a moment for Stripe to confirm the payment. Check your appointments shortly."}
            </AlertDescription>
          </Alert>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/dashboard/my-appointments">My Appointments</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default PaymentSuccessPage
