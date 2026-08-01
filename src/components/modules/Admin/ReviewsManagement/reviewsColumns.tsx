import DateCell from "@/components/shared/cell/DateCell";
import { IReview } from "@/types/review.types";
import { ColumnDef } from "@tanstack/react-table";
import { Star, User } from "lucide-react";

export const reviewsColumns: ColumnDef<IReview>[] = [
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
    header: "Doctor Reviewed",
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
    id: "rating",
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <span className="text-sm font-semibold">{row.original.rating.toFixed(1)}</span>
      </div>
    ),
  },
  {
    id: "comment",
    accessorKey: "comment",
    header: "Review Comment",
    cell: ({ row }) => (
      <p className="text-xs text-muted-foreground line-clamp-2 max-w-[300px]">
        {row.original.comment || "No written feedback provided."}
      </p>
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Submitted On",
    cell: ({ row }) => (
      <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
    ),
  },
];
