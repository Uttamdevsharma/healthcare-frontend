"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import DataTable from "@/components/shared/table/DataTable";
import DateCell from "@/components/shared/cell/DateCell";
import { Button } from "@/components/ui/button";
import { deletePrescription, getMyPrescriptions } from "@/services/prescription.services";
import { IPrescription } from "@/types/prescription.types";
import { downloadPrescription } from "@/utils/downloadPrescription";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { FileText, Pencil, Trash2, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import EditPrescriptionModal from "./EditPrescriptionModal";

const getDoctorPrescriptionsColumns = (
  onEdit: (prescription: IPrescription) => void,
  onDelete: (prescription: IPrescription) => void,
): ColumnDef<IPrescription>[] => [
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
    id: "instructions",
    accessorKey: "instructions",
    header: "Prescription Details",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground line-clamp-2 max-w-[300px]">
        {row.original.instructions}
      </span>
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
    header: "PDF Rx Document",
    cell: ({ row }) => {
      const pdfUrl = row.original.pdfUrl;
      if (!pdfUrl) {
        return <span className="text-xs text-muted-foreground">Not generated</span>;
      }

      return (
        <Button
          variant="ghost"
          size="sm"
          type="button"
          className="gap-1 text-xs"
          onClick={(e) => {
            e.preventDefault();
            downloadPrescription(row.original.id).catch(() => {});
          }}
        >
          <FileText className="h-3.5 w-3.5 text-primary" />
          Download PDF
        </Button>
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Issued Date",
    cell: ({ row }) => (
      <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const prescription = row.original;
      return (
        <div className="flex items-center gap-1.5">
          <Button
            size="xs"
            variant="ghost"
            className="gap-1 text-xs h-8"
            onClick={() => onEdit(prescription)}
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
          <Button
            size="xs"
            variant="ghost"
            className="gap-1 text-xs h-8 text-destructive hover:text-destructive"
            onClick={() => onDelete(prescription)}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </Button>
        </div>
      );
    },
  },
];

const DoctorPrescriptionsTable = () => {
  const [prescriptionToEdit, setPrescriptionToEdit] = useState<IPrescription | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [prescriptionToDelete, setPrescriptionToDelete] = useState<IPrescription | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: prescriptionsRes, isLoading, isFetching } = useQuery({
    queryKey: ["my-prescriptions"],
    queryFn: getMyPrescriptions,
  });

  const prescriptions = prescriptionsRes?.data ?? [];

  const handleDelete = async () => {
    if (!prescriptionToDelete) {
      return;
    }

    try {
      const res = await deletePrescription(prescriptionToDelete.id);

      if (res.success) {
        toast.success("Prescription deleted successfully.");
        setIsDeleteDialogOpen(false);
        queryClient.invalidateQueries({ queryKey: ["my-prescriptions"] });
        queryClient.invalidateQueries({ queryKey: ["my-appointments"] });
      } else {
        toast.error(res.message || "Failed to delete prescription.");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const columns = getDoctorPrescriptionsColumns(
    (prescription) => {
      setPrescriptionToEdit(prescription);
      setIsEditModalOpen(true);
    },
    (prescription) => {
      setPrescriptionToDelete(prescription);
      setIsDeleteDialogOpen(true);
    },
  );

  return (
    <>
      <DataTable
        data={prescriptions}
        columns={columns}
        isLoading={isLoading || isFetching}
        emptyMessage="No prescriptions issued yet."
      />

      <EditPrescriptionModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        prescription={prescriptionToEdit}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this prescription?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently remove the prescription for patient{" "}
              <strong className="text-foreground">
                {prescriptionToDelete?.patient?.name || "the patient"}
              </strong>{" "}
              and its PDF document. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DoctorPrescriptionsTable;
