"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyAppointments } from "@/services/appointment.services";
import { getMyPrescriptions } from "@/services/prescription.services";
import { getMyReviews } from "@/services/review.services";
import { useQuery } from "@tanstack/react-query";
import { Calendar, FileText, Star, User, Video } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DoctorDashboardContent = () => {
  const { data: appointmentsRes, isLoading: loadingAppointments } = useQuery({
    queryKey: ["my-appointments"],
    queryFn: getMyAppointments,
  });

  const { data: prescriptionsRes, isLoading: loadingPrescriptions } = useQuery({
    queryKey: ["my-prescriptions"],
    queryFn: getMyPrescriptions,
  });

  const { data: reviewsRes, isLoading: loadingReviews } = useQuery({
    queryKey: ["my-reviews"],
    queryFn: getMyReviews,
  });

  const appointments = appointmentsRes?.data ?? [];
  const prescriptions = prescriptionsRes?.data ?? [];
  const reviews = reviewsRes?.data ?? [];

  const upcomingAppointments = appointments.filter(
    (a) => a.status === "SCHEDULED" || a.status === "INPROGRESS"
  );

  const avgRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Doctor Portal</h1>
        <p className="text-muted-foreground">
          Welcome back! Here is your daily practice overview.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingAppointments ? "..." : appointments.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled & completed consultations</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Patients</CardTitle>
            <User className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingAppointments ? "..." : upcomingAppointments.length}</div>
            <p className="text-xs text-muted-foreground">Active pending visits</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issued Prescriptions</CardTitle>
            <FileText className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingPrescriptions ? "..." : prescriptions.length}</div>
            <p className="text-xs text-muted-foreground">Digital Rx records</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-amber-500 fill-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingReviews ? "..." : avgRating}</div>
            <p className="text-xs text-muted-foreground">Based on {reviews.length} patient reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Consultations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Upcoming Consultations</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/doctor/dashboard/appointments">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No upcoming appointments scheduled for today.
            </p>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.slice(0, 5).map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        {appointment.patient?.name || "Patient"}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {appointment.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" />
                      {appointment.schedule?.startDateTime
                        ? new Date(appointment.schedule.startDateTime).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                  {appointment.videoCallingId && (
                    <Button size="sm" className="gap-1.5" asChild>
                      <a href={`/video-call/${appointment.videoCallingId}`} target="_blank" rel="noreferrer">
                        <Video className="h-4 w-4" />
                        Join Call
                      </a>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboardContent;
