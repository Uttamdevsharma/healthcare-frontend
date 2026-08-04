import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IAppointment } from "@/types/appointment.types";
import { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircle2,
  ChevronDown,
  Circle,
  FilePlus,
  HeartPulse,
  PlayCircle,
  User,
  Video,
  XCircle,
} from "lucide-react";

export const getDoctorAppointmentsColumns = (
  onIssuePrescription: (appointment: IAppointment) => void,
  onStatusChange: (appointment: IAppointment, status: string) => void,
  isStatusUpdating: (appointmentId: string) => boolean,
  onViewHealthRecords: (appointment: IAppointment) => void,
): ColumnDef<IAppointment>[] => [
  {
    id: "patient",
    accessorKey: "patient.name",
    header: "Patient",
    cell: ({ row }) => {
      const patient = row.original.patient;
      return (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{patient?.name || "N/A"}</span>
            <span className="text-xs text-muted-foreground">{patient?.email || ""}</span>
          </div>
        </div>
      );
    },
  },
  {
    id: "schedule",
    accessorKey: "schedule.startDateTime",
    header: "Appointment Time",
    cell: ({ row }) => {
      const schedule = row.original.schedule;
      return (
        <DateCell
          date={schedule?.startDateTime}
          formatString="MMM dd, yyyy hh:mm a"
        />
      );
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const getVariant = () => {
        switch (status) {
          case "COMPLETED": return "default";
          case "INPROGRESS": return "secondary";
          case "SCHEDULED": return "outline";
          case "CANCELED": return "destructive";
          default: return "outline";
        }
      };
      return <Badge variant={getVariant()}>{status}</Badge>;
    },
  },
  {
    id: "paymentStatus",
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => {
      const paymentStatus = row.original.paymentStatus;
      return (
        <Badge variant={paymentStatus === "PAID" ? "default" : "destructive"}>
          {paymentStatus}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const appointment = row.original;
      const status = appointment.status;
      const isTerminal = status === "COMPLETED" || status === "CANCELED";
      const isUpdating = isStatusUpdating(appointment.id);

      return (
        <div className="flex items-center gap-2">
          {appointment.videoCallingId && (
            <Button size="xs" variant="outline" className="gap-1 text-xs h-8" asChild>
              <a
                href={`/video-call/${appointment.videoCallingId}`}
                target="_blank"
                rel="noreferrer"
              >
                <Video className="h-3.5 w-3.5 text-blue-500" />
                Call
              </a>
            </Button>
          )}

          <Button
            size="xs"
            variant="outline"
            className="gap-1 text-xs h-8"
            onClick={() => onViewHealthRecords(appointment)}
          >
            <HeartPulse className="h-3.5 w-3.5 text-primary" />
            Records
          </Button>

          <Button
            size="xs"
            variant="outline"
            className="gap-1 text-xs h-8"
            onClick={() => onIssuePrescription(appointment)}
            disabled={isTerminal}
          >
            <FilePlus className="h-3.5 w-3.5" />
            Issue Rx
          </Button>

          {!isTerminal && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="xs"
                  variant="outline"
                  className="gap-1 text-xs h-8"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Circle className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                  Update
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Change status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {status === "SCHEDULED" && (
                  <>
                    <DropdownMenuItem
                      onClick={() => onStatusChange(appointment, "INPROGRESS")}
                      className="gap-2"
                    >
                      <PlayCircle className="h-4 w-4 text-emerald-500" />
                      Start (In Progress)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onStatusChange(appointment, "CANCELED")}
                      className="gap-2 text-destructive focus:text-destructive"
                    >
                      <XCircle className="h-4 w-4" />
                      Cancel Appointment
                    </DropdownMenuItem>
                  </>
                )}
                {status === "INPROGRESS" && (
                  <DropdownMenuItem
                    onClick={() => onStatusChange(appointment, "COMPLETED")}
                    className="gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Mark as Completed
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    },
  },
];
