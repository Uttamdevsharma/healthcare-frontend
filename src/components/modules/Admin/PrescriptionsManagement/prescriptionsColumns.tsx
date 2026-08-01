import DateCell from "@/components/shared/cell/DateCell";
import { Button } from "@/components/ui/button";
import { IPrescription } from "@/types/prescription.types";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink, FileText, User } from "lucide-react";

export const prescriptionsColumns: ColumnDef<IPrescription>[] = [
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
    id: "instructions",
    accessorKey: "instructions",
    header: "Instructions",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground line-clamp-2 max-w-[250px]">
        {row.original.instructions}
      </span>
    ),
  },
  {
    id: "followUpDate",
    accessorKey: "followUpDate",
    header: "Follow Up",
    cell: ({ row }) => (
      <DateCell date={row.original.followUpDate} formatString="MMM dd, yyyy" />
    ),
  },
  {
    id: "pdfUrl",
    accessorKey: "pdfUrl",
    header: "PDF Prescription",
    cell: ({ row }) => {
      const pdfUrl = row.original.pdfUrl;
      if (!pdfUrl) {
        return <span className="text-xs text-muted-foreground">Not generated</span>;
      }

      return (
        <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
          <a href={pdfUrl} target="_blank" rel="noreferrer">
            <FileText className="h-3.5 w-3.5 text-primary" />
            Download PDF
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </Button>
      );
    },
  },
];
