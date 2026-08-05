"use client";

import { deletePatientAction } from "@/app/(dashboardLayout)/admin/dashboard/patients-management/_action";
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
import { IPatient } from "@/types/patient.types";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeletePatientConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: IPatient | null;
}

const DeletePatientConfirmationDialog = ({
  open,
  onOpenChange,
  patient,
}: DeletePatientConfirmationDialogProps) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (!patient) return;
    setLoading(true);

    try {
      const res = await deletePatientAction(patient.id);
      if (res.success) {
        toast.success("Patient deleted successfully!");
        onOpenChange(false);
        queryClient.invalidateQueries({ queryKey: ["patients"] });
      } else {
        toast.error(res.message || "Failed to delete patient");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will soft-delete patient <strong className="text-foreground">{patient?.name}</strong> and block account access.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Patient"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePatientConfirmationDialog;
