"use client";

import DataTable from "@/components/shared/table/DataTable";
import DateCell from "@/components/shared/cell/DateCell";
import { Button } from "@/components/ui/button";
import { getMyPrescriptions } from "@/services/prescription.services";
import { IPrescription } from "@/types/prescription.types";
import { downloadPrescription } from "@/utils/downloadPrescription";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { FileText, Stethoscope } from "lucide-react";

const patientPrescriptionsColumns: ColumnDef<IPrescription>[] = [
  {
    id: "doctor",
    accessorKey: "doctor.name",
    header: "Prescribing Doctor",
    cell: ({ row }) => {
      const doctor = row.original.doctor;
      return (
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-primary" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Dr. {doctor?.name || "Doctor"}</span>
            <span className="text-xs text-muted-foreground">{doctor?.designation || doctor?.qualification || ""}</span>
          </div>
        </div>
      );
    },
  },
  {
    id: "instructions",
    accessorKey: "instructions",
    header: "Medication Instructions",
    cell: ({ row }) => (
      <p className="text-xs text-muted-foreground line-clamp-3 max-w-[350px]">
        {row.original.instructions}
      </p>
    ),
  },
  {
    id: "followUpDate",
    accessorKey: "followUpDate",
    header: "Follow-Up Date",
    cell: ({ row }) => (
      <DateCell date={row.original.followUpDate} formatString="MMM dd, yyyy" />
    ),
  },
  {
    id: "pdfUrl",
    accessorKey: "pdfUrl",
    header: "Prescription PDF",
    cell: ({ row }) => {
      const pdfUrl = row.original.pdfUrl;
      if (!pdfUrl) {
        return <span className="text-xs text-muted-foreground">Pending PDF</span>;
      }

      return (
        <Button
          variant="outline"
          size="sm"
          type="button"
          className="gap-1.5 text-xs"
          onClick={(e) => {
            e.preventDefault();
            downloadPrescription(row.original.id).catch(() => {});
          }}
        >
          <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          Download Rx PDF
        </Button>
      );
    },
  },
];

const PatientPrescriptionsTable = () => {
  const { data: prescriptionsRes, isLoading, isFetching } = useQuery({
    queryKey: ["my-prescriptions"],
    queryFn: getMyPrescriptions,
  });

  const prescriptions = prescriptionsRes?.data ?? [];

  return (
    <DataTable
      data={prescriptions}
      columns={patientPrescriptionsColumns}
      isLoading={isLoading || isFetching}
      emptyMessage="You have no medical prescriptions recorded yet."
    />
  );
};

export default PatientPrescriptionsTable;
