"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAppointmentByVideoCallId } from "@/services/appointment.services"
import { useQuery } from "@tanstack/react-query"
import {
  CalendarClock,
  Loader2,
  Mic,
  MicOff,
  MonitorUp,
  PhoneOff,
  ShieldCheck,
  Video,
  VideoOff,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface VideoCallRoomProps {
  videoCallingId: string
}

const getInitials = (name?: string) => {
  if (!name) {
    return "?"
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((item) => item[0]?.toUpperCase() ?? "")
    .join("")
}

const formatDateTime = (value?: string | Date | null) => {
  if (!value) {
    return "N/A"
  }

  const dateValue = new Date(value)
  if (Number.isNaN(dateValue.getTime())) {
    return "N/A"
  }

  return dateValue.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

const VideoCallRoom = ({ videoCallingId }: VideoCallRoomProps) => {
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)

  const { data, isLoading, isError } = useQuery({
    queryKey: ["video-call", videoCallingId],
    queryFn: () => getAppointmentByVideoCallId(videoCallingId),
    retry: false,
    staleTime: 1000 * 60 * 5,
  })

  const hasError = data && !data.success
  const appointment = data && data.success ? data.data : null

  const otherPartyName = appointment?.doctor
    ? appointment.doctor.name || "Doctor"
    : appointment?.patient?.name || "Patient"
  const doctorName = appointment?.doctor?.name
    ? `Dr. ${appointment.doctor.name}`
    : appointment?.patient?.name || "Video Consultation"

  const getConnectionState = () => {
    if (isLoading) {
      return {
        label: "Connecting to the consultation room...",
        tone: "text-muted-foreground",
      }
    }

    if (isError || hasError) {
      return {
        label: "Unable to join this consultation. The link may be invalid or expired.",
        tone: "text-destructive",
      }
    }

    if (appointment?.status === "CANCELED") {
      return {
        label: "This consultation was canceled.",
        tone: "text-destructive",
      }
    }

    return {
      label: "You are connected. Video will start shortly.",
      tone: "text-emerald-600 dark:text-emerald-400",
    }
  }

  const connection = getConnectionState()

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/90">
            <Video className="size-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">Secure Video Consultation</p>
            <p className="text-xs text-white/50">End-to-end encrypted</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-emerald-500/40 bg-emerald-500/10 text-emerald-300">
            <ShieldCheck className="size-3" />
            Encrypted
          </Badge>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 flex-col items-center justify-center gap-6 p-4 sm:p-6">
        {(isLoading || isError || hasError || !appointment) && (
          <Card className="w-full max-w-md border-white/10 bg-white/5 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-white">Video Consultation Room</CardTitle>
              <CardDescription className="text-white/60">
                {connection.label}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              {isLoading ? (
                <Loader2 className="size-8 animate-spin text-white/60" />
              ) : (
                <Button asChild variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                  <Link href="/dashboard/my-appointments">Back to Appointments</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {!isLoading && !isError && !hasError && appointment && (
          <>
            {/* Participant tile */}
            <div className="relative flex aspect-video w-full max-w-3xl items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
              {!isCameraOff ? (
                <div className="flex flex-col items-center gap-4 p-8 text-center">
                  <Avatar className="size-28 ring-4 ring-primary/30">
                    <AvatarImage
                      src={appointment.doctor?.profilePhoto || appointment.patient?.profilePhoto}
                      alt={otherPartyName}
                    />
                    <AvatarFallback className="bg-primary/20 text-3xl font-bold text-primary">
                      {getInitials(otherPartyName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xl font-semibold">{otherPartyName}</p>
                    <p className="text-sm text-white/50">{doctorName}</p>
                  </div>
                  <p className={cn("text-sm", connection.tone)}>{connection.label}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-white/60">
                  <VideoOff className="size-12" />
                  <p className="text-sm">Camera is off</p>
                </div>
              )}

              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-black/40 px-2 py-1 text-xs text-white/70">
                <CalendarClock className="size-3.5" />
                {formatDateTime(appointment.schedule?.startDateTime)}
              </div>

              <div className="absolute bottom-3 right-3 rounded-md bg-black/40 px-2 py-1 text-xs text-white/70">
                {appointment.status || "SCHEDULED"}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMuted((value) => !value)}
                className={cn(
                  "flex size-12 items-center justify-center rounded-full transition-colors",
                  isMuted ? "bg-white/20 text-white" : "bg-white/10 text-white hover:bg-white/20",
                )}
                aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
              >
                {isMuted ? <MicOff className="size-5" /> : <Mic className="size-5" />}
              </button>

              <button
                type="button"
                onClick={() => setIsCameraOff((value) => !value)}
                className={cn(
                  "flex size-12 items-center justify-center rounded-full transition-colors",
                  isCameraOff ? "bg-white/20 text-white" : "bg-white/10 text-white hover:bg-white/20",
                )}
                aria-label={isCameraOff ? "Turn camera on" : "Turn camera off"}
              >
                {isCameraOff ? <VideoOff className="size-5" /> : <Video className="size-5" />}
              </button>

              <Button
                asChild
                size="lg"
                className="size-14 rounded-full bg-red-500 p-0 hover:bg-red-600"
                aria-label="Leave call"
              >
                <Link href="/dashboard/my-appointments">
                  <PhoneOff className="size-6" />
                </Link>
              </Button>
            </div>

            <p className="text-center text-xs text-white/40">
              Consultation ID: <span className="font-mono text-white/60">{videoCallingId}</span>
            </p>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-3 text-center text-xs text-white/40">
        <p className="flex items-center justify-center gap-1.5">
          <MonitorUp className="size-3.5" />
          This is a simulated video consultation room. Connect your camera and microphone to begin.
        </p>
      </footer>
    </div>
  )
}

export default VideoCallRoom
