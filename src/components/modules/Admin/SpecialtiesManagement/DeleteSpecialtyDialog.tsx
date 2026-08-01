"use client";

import { deleteSpecialtyAction } from "@/app/(dashboardLayout)/admin/dashboard/specialties-management/_action";
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
import { ISpecialty } from "@/types/specialty.types";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteSpecialtyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  specialty: ISpecialty | null;
}

const DeleteSpecialtyDialog = ({
  open,
  onOpenChange,
  specialty,
}: DeleteSpecialtyDialogProps) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (!specialty) return;
    setLoading(true);

    try {
      const res = await deleteSpecialtyAction(specialty.id);
      if (res.success) {
        toast.success("Specialty deleted successfully!");
        onOpenChange(false);
        queryClient.invalidateQueries({ queryKey: ["specialties"] });
      } else {
        toast.error(res.message || "Failed to delete specialty");
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
            This action will delete the specialty <strong className="text-foreground">{specialty?.title}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? "Deleting..." : "Delete Specialty"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSpecialtyDialog;
