import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getMyAppointments } from "@/services/appointment.services"
import { getUserInfo } from "@/services/auth.services"
import { CalendarClock, ClipboardList, Stethoscope, Wallet } from "lucide-react"
import Link from "next/link"

const formatDateTime = (value?: string | Date | null) => {
  if (!value) return "N/A"
  const dateValue = new Date(value)
  if (Number.isNaN(dateValue.getTime())) return "N/A"
  return dateValue.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

const PatientDashboardPage = async () => {
  const userInfo = await getUserInfo()
  const appointmentsResponse = await getMyAppointments()
  const appointments = appointmentsResponse.data || []

  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.status !== "CANCELED" &&
      appointment.schedule?.startDateTime &&
      new Date(appointment.schedule.startDateTime) >= new Date(),
  ).length

  const unpaidAppointments = appointments.filter(
    (appointment) => appointment.paymentStatus !== "PAID" && appointment.status !== "CANCELED",
  ).length

  const nextAppointment = appointments
    .filter(
      (appointment) =>
        appointment.status !== "CANCELED" &&
        appointment.schedule?.startDateTime &&
        new Date(appointment.schedule.startDateTime) >= new Date(),
    )
    .sort(
      (left, right) =>
        new Date(left.schedule!.startDateTime!).getTime() -
        new Date(right.schedule!.startDateTime!).getTime(),
    )[0]

  const patientName = userInfo?.patient?.name || userInfo?.name || "Patient"

  const stats = [
    {
      title: "Total Appointments",
      value: appointments.length,
      icon: CalendarClock,
    },
    {
      title: "Upcoming",
      value: upcomingAppointments,
      icon: ClipboardList,
    },
    {
      title: "Needs Payment",
      value: unpaidAppointments,
      icon: Wallet,
    },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border bg-linear-to-r from-cyan-50 via-white to-blue-50 p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back, {patientName}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your appointments, payments, and health records from one place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-2xl border bg-muted/20 p-3">
                <stat.icon className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-semibold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Next Appointment</CardTitle>
            <CardDescription>Your nearest scheduled consultation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {nextAppointment ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="font-medium">
                      {nextAppointment.doctor?.name || "Doctor appointment"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {nextAppointment.doctor?.designation || "Consultation"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline">{nextAppointment.status || "SCHEDULED"}</Badge>
                    <Badge
                      variant={
                        nextAppointment.paymentStatus === "PAID" ? "secondary" : "outline"
                      }
                    >
                      {nextAppointment.paymentStatus || "UNPAID"}
                    </Badge>
                  </div>
                </div>
                <p className="rounded-2xl border bg-muted/20 p-4 text-sm font-medium">
                  {formatDateTime(nextAppointment.schedule?.startDateTime)}
                </p>
                <Button asChild variant="outline">
                  <Link href="/dashboard/my-appointments">View all appointments</Link>
                </Button>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                You don&apos;t have any upcoming appointments. Book one to get started.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can do from here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/dashboard/book-appointments">
                <CalendarClock className="size-4" />
                Book Appointment
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/my-appointments">
                <ClipboardList className="size-4" />
                My Appointments
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/consultation">
                <Stethoscope className="size-4" />
                Browse Doctors
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PatientDashboardPage
