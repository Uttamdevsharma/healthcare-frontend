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
import {
  getAppointmentByVideoCallId,
  getVideoCallToken,
} from "@/services/appointment.services"
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
import {
  Room,
  RoomEvent,
  Track,
  type LocalTrackPublication,
  type RemoteParticipant,
  type RemoteTrack,
  type RemoteTrackPublication,
  type TrackPublication,
} from "livekit-client"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
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

type ConnectionState = "idle" | "connecting" | "connected" | "disconnected"

const VideoCallRoom = ({ videoCallingId }: VideoCallRoomProps) => {
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)
  const [connectionState, setConnectionState] = useState<ConnectionState>("idle")
  const [connectError, setConnectError] = useState<string | null>(null)
  const [remoteParticipant, setRemoteParticipant] = useState<RemoteParticipant | null>(null)
  const [remoteCameraPub, setRemoteCameraPub] = useState<RemoteTrackPublication | null>(null)
  const [remoteCamEnabled, setRemoteCamEnabled] = useState(false)
  const [remoteAudioPub, setRemoteAudioPub] = useState<RemoteTrackPublication | null>(null)
  const [remoteAudioEnabled, setRemoteAudioEnabled] = useState(false)
  const [localCamActive, setLocalCamActive] = useState(false)

  const roomRef = useRef<Room | null>(null)
  const localVideoRef = useRef<HTMLVideoElement | null>(null)
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null)
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null)

  const { data, isLoading, isError } = useQuery({
    queryKey: ["video-call", videoCallingId],
    queryFn: () => getAppointmentByVideoCallId(videoCallingId),
    retry: false,
    staleTime: 1000 * 60 * 5,
  })

  const tokenQuery = useQuery({
    queryKey: ["video-call-token", videoCallingId],
    queryFn: () => getVideoCallToken(videoCallingId),
    retry: false,
    staleTime: 1000 * 60 * 5,
  })

  const hasError = data && !data.success
  const appointment = data && data.success ? data.data : null
  const tokenData = tokenQuery.data && tokenQuery.data.success ? tokenQuery.data.data : null
  const tokenFailed =
    tokenQuery.isError || (tokenQuery.data !== undefined && !tokenQuery.data.success)

  const otherPartyName = appointment?.doctor
    ? appointment.doctor.name || "Doctor"
    : appointment?.patient?.name || "Patient"
  const doctorName = appointment?.doctor?.name
    ? `Dr. ${appointment.doctor.name}`
    : appointment?.patient?.name || "Video Consultation"
  const otherPartyPhoto = appointment?.doctor?.profilePhoto

  const isBusy = connectionState === "connecting"
  const isJoined = connectionState === "connected"
  const canJoinAppointment =
    appointment?.status === "SCHEDULED" || appointment?.status === "INPROGRESS"
  const canJoin = (connectionState === "idle" || connectionState === "disconnected") && canJoinAppointment

  const leavePath =
    tokenData?.role === "DOCTOR"
      ? "/doctor/dashboard/appointments"
      : "/dashboard/my-appointments"

  // Attach the local camera track to the local preview whenever it changes.
  useEffect(() => {
    const el = localVideoRef.current
    const room = roomRef.current
    if (!el || !room || connectionState !== "connected") return

    const publication = room.localParticipant.getTrackPublication(Track.Source.Camera)
    const track = publication?.track

    if (track && !isCameraOff && localCamActive) {
      track.attach(el)
    } else {
      el.srcObject = null
    }
  }, [connectionState, isCameraOff, localCamActive])

  // Attach the remote camera track to the remote video whenever it changes.
  useEffect(() => {
    const el = remoteVideoRef.current
    if (!el || connectionState !== "connected") return

    const track = remoteCameraPub?.track

    if (track && remoteCamEnabled) {
      track.attach(el)
    } else {
      el.srcObject = null
    }
  }, [connectionState, remoteCameraPub, remoteCamEnabled])

  // Attach the remote microphone track to the audio element so it can play.
  useEffect(() => {
    const el = remoteAudioRef.current
    if (!el || connectionState !== "connected") return

    const track = remoteAudioPub?.track

    if (track && remoteAudioEnabled) {
      track.attach(el)
      el.play().catch(() => {
        // Autoplay may be blocked; it will be resumed on the next user gesture.
      })
    } else {
      el.srcObject = null
    }
  }, [connectionState, remoteAudioPub, remoteAudioEnabled])

  // Cleanup the LiveKit connection when the room unmounts.
  useEffect(() => {
    return () => {
      roomRef.current?.disconnect()
      roomRef.current = null
    }
  }, [])

  const joinCall = useCallback(async () => {
    if (!tokenData || isBusy || isJoined) return

    setConnectError(null)
    setConnectionState("connecting")

    const room = new Room({ adaptiveStream: true, dynacast: true })
    roomRef.current = room

    room
      .on(
        RoomEvent.TrackSubscribed,
        (track: RemoteTrack, publication: RemoteTrackPublication) => {
          if (publication.source === Track.Source.Camera) {
            setRemoteCameraPub(publication)
            setRemoteCamEnabled(!publication.isMuted)
          }
          if (publication.source === Track.Source.Microphone) {
            setRemoteAudioPub(publication)
            setRemoteAudioEnabled(!publication.isMuted)
            room.startAudio().catch(() => {})
          }
        },
      )
      .on(
        RoomEvent.TrackUnsubscribed,
        (track: Track, publication: TrackPublication) => {
          if (publication.source === Track.Source.Camera) {
            setRemoteCameraPub(null)
            setRemoteCamEnabled(false)
          }
          if (publication.source === Track.Source.Microphone) {
            setRemoteAudioPub(null)
            setRemoteAudioEnabled(false)
          }
        },
      )
      .on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
        setRemoteParticipant(participant)
      })
      .on(RoomEvent.ParticipantDisconnected, () => {
        setRemoteParticipant(null)
        setRemoteCameraPub(null)
        setRemoteCamEnabled(false)
        setRemoteAudioPub(null)
        setRemoteAudioEnabled(false)
      })
      .on(RoomEvent.TrackMuted, (publication: TrackPublication) => {
        if (publication.source === Track.Source.Camera && !publication.isLocal) {
          setRemoteCamEnabled(false)
        }
        if (publication.source === Track.Source.Microphone && !publication.isLocal) {
          setRemoteAudioEnabled(false)
        }
      })
      .on(RoomEvent.TrackUnmuted, (publication: TrackPublication) => {
        if (publication.source === Track.Source.Camera && !publication.isLocal) {
          setRemoteCamEnabled(true)
        }
        if (publication.source === Track.Source.Microphone && !publication.isLocal) {
          setRemoteAudioEnabled(true)
        }
      })
      .on(RoomEvent.LocalTrackPublished, (publication: LocalTrackPublication) => {
        if (publication.source === Track.Source.Camera) {
          setLocalCamActive(true)
        }
      })
      .on(RoomEvent.LocalTrackUnpublished, (publication: LocalTrackPublication) => {
        if (publication.source === Track.Source.Camera) {
          setLocalCamActive(false)
        }
      })
      .on(RoomEvent.Disconnected, () => {
        setConnectionState("disconnected")
        setRemoteParticipant(null)
        setRemoteCameraPub(null)
        setRemoteCamEnabled(false)
        setRemoteAudioPub(null)
        setRemoteAudioEnabled(false)
        setLocalCamActive(false)
      })

    try {
      await room.connect(tokenData.url, tokenData.token, { autoSubscribe: true })
      setConnectionState("connected")

      // Resuming audio inside this user gesture is required to satisfy the
      // browser autoplay policy so remote participants can be heard.
      room.startAudio().catch(() => {})

      await room.localParticipant.setCameraEnabled(true).catch(() => {
        setIsCameraOff(true)
      })
      await room.localParticipant.setMicrophoneEnabled(true).catch(() => {
        setIsMuted(true)
      })
    } catch (error) {
      console.error("Failed to join the LiveKit consultation room:", error)
      setConnectError(
        "Unable to join the consultation. Check your camera and microphone permissions, then try again.",
      )
      setConnectionState("disconnected")
      room.disconnect()
      roomRef.current = null
    }
  }, [tokenData, isBusy, isJoined])

  const toggleMute = () => {
    const room = roomRef.current
    if (!room || connectionState !== "connected") return

    const next = !isMuted
    setIsMuted(next)
    room.localParticipant.setMicrophoneEnabled(!next).catch(() => {
      setIsMuted(!next)
    })
  }

  const toggleCamera = () => {
    const room = roomRef.current
    if (!room || connectionState !== "connected") return

    const next = !isCameraOff
    setIsCameraOff(next)
    room.localParticipant.setCameraEnabled(!next).catch(() => {
      setIsCameraOff(!next)
    })
  }

  const leaveCall = useCallback(() => {
    roomRef.current?.disconnect()
    roomRef.current = null
    window.location.href = leavePath
  }, [leavePath])

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

    if (appointment?.status === "COMPLETED") {
      return {
        label: "This consultation has been completed.",
        tone: "text-muted-foreground",
      }
    }

    if (tokenFailed || connectError) {
      return {
        label: connectError ?? "Unable to join this consultation. The link may be invalid or expired.",
        tone: "text-destructive",
      }
    }

    if (isBusy) {
      return {
        label: "Connecting to the secure video server...",
        tone: "text-muted-foreground",
      }
    }

    if (isJoined) {
      return {
        label: "You are connected. The consultation is live.",
        tone: "text-emerald-600 dark:text-emerald-400",
      }
    }

    return {
      label: "Ready to join. Click Join Consultation to start the video call.",
      tone: "text-muted-foreground",
    }
  }

  const connection = getConnectionState()
  const remoteVideoVisible = isJoined && remoteCameraPub?.track != null && remoteCamEnabled

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
              {isJoined ? (
                <>
                  <audio
                    ref={remoteAudioRef}
                    autoPlay
                    playsInline
                    className="hidden"
                  />

                  {remoteVideoVisible && (
                    <video
                      ref={remoteVideoRef}
                      autoPlay
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}

                  {!remoteVideoVisible && (
                    <div className="flex flex-col items-center gap-4 p-8 text-center">
                      <Avatar className="size-28 ring-4 ring-primary/30">
                        <AvatarImage
                          src={otherPartyPhoto}
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
                      {remoteParticipant && !remoteCamEnabled ? (
                        <p className="flex items-center gap-1.5 text-sm text-white/50">
                          <VideoOff className="size-4" />
                          Camera is off
                        </p>
                      ) : (
                        <p className="text-sm text-white/50">
                          Waiting for the other participant to join...
                        </p>
                      )}
                    </div>
                  )}

                  {/* Local video */}
                  <div className="absolute bottom-3 left-3 flex h-28 w-40 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-black/60">
                    <video
                      ref={localVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className="h-full w-full object-cover"
                    />
                    {(!localCamActive || isCameraOff) && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/50 text-white/60">
                        <VideoOff className="size-5" />
                        <span className="text-[10px]">Camera off</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4 p-8 text-center">
                  <Avatar className="size-28 ring-4 ring-primary/30">
                    <AvatarImage
                      src={otherPartyPhoto}
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
                  {isBusy && <Loader2 className="size-8 animate-spin text-white/60" />}
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
              {canJoin && (
                <Button
                  size="lg"
                  className="gap-2"
                  onClick={joinCall}
                  disabled={tokenQuery.isLoading || tokenFailed || !tokenData}
                >
                  {tokenQuery.isLoading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <Video className="size-5" />
                  )}
                  {tokenQuery.isLoading ? "Preparing room..." : "Join Consultation"}
                </Button>
              )}

              {isBusy && (
                <Button size="lg" className="gap-2" disabled>
                  <Loader2 className="size-5 animate-spin" />
                  Connecting...
                </Button>
              )}

              {isJoined && (
                <>
                  <button
                    type="button"
                    onClick={toggleMute}
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
                    onClick={toggleCamera}
                    className={cn(
                      "flex size-12 items-center justify-center rounded-full transition-colors",
                      isCameraOff ? "bg-white/20 text-white" : "bg-white/10 text-white hover:bg-white/20",
                    )}
                    aria-label={isCameraOff ? "Turn camera on" : "Turn camera off"}
                  >
                    {isCameraOff ? <VideoOff className="size-5" /> : <Video className="size-5" />}
                  </button>

                  <Button
                    size="lg"
                    className="size-14 rounded-full bg-red-500 p-0 hover:bg-red-600"
                    aria-label="Leave call"
                    onClick={leaveCall}
                  >
                    <PhoneOff className="size-6" />
                  </Button>
                </>
              )}
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
          Secure video consultation powered by LiveKit.
        </p>
      </footer>
    </div>
  )
}

export default VideoCallRoom
