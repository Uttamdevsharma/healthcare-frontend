import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { IDoctorSchedule } from "@/types/doctorSchedule.types";
import { ColumnDef } from "@tanstack/react-table";

export const doctorSchedulesColumns: ColumnDef<IDoctorSchedule>[] = [
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
    id: "startDateTime",
    accessorKey: "schedule.startDateTime",
    header: "Start Time",
    cell: ({ row }) => (
      <DateCell
        date={row.original.schedule?.startDateTime as string ?? ""}
        formatString="MMM dd, yyyy HH:mm"
      />
    ),
  },
  {
    id: "endDateTime",
    accessorKey: "schedule.endDateTime",
    header: "End Time",
    cell: ({ row }) => (
      <DateCell
        date={row.original.schedule?.endDateTime as string ?? ""}
        formatString="MMM dd, yyyy HH:mm"
      />
    ),
  },
  {
    id: "isBooked",
    accessorKey: "isBooked",
    header: "Booking Status",
    cell: ({ row }) => {
      const isBooked = row.original.isBooked;
      return (
        <Badge variant={isBooked ? "destructive" : "default"} className={!isBooked ? "bg-emerald-600 hover:bg-emerald-700" : ""}>
          {isBooked ? "Booked" : "Available"}
        </Badge>
      );
    },
  },
];
