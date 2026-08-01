import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { IAppointment } from "@/types/appointment.types";
import { ColumnDef } from "@tanstack/react-table";
import { Calendar, User } from "lucide-react";

export const appointmentsColumns: ColumnDef<IAppointment>[] = [
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
    id: "doctor",
    accessorKey: "doctor.name",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = row.original.doctor;
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">Dr. {doctor?.name || "N/A"}</span>
          <span className="text-xs text-muted-foreground">{doctor?.email || ""}</span>
        </div>
      );
    },
  },
  {
    id: "schedule",
    accessorKey: "schedule.startDateTime",
    header: "Scheduled Time",
    cell: ({ row }) => {
      const schedule = row.original.schedule;
      return (
        <div className="flex items-center gap-2 text-xs">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          <span>
            {schedule?.startDateTime
              ? new Date(schedule.startDateTime).toLocaleString()
              : "N/A"}
          </span>
        </div>
      );
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Appointment Status",
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
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Booked On",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return (
        <DateCell date={createdAt} formatString="MMM dd, yyyy" />
      );
    },
  },
];
