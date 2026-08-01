"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { getPatients } from "@/services/patient.services";
import { IPatient } from "@/types/patient.types";
import { useQuery } from "@tanstack/react-query";
import DeletePatientConfirmationDialog from "./DeletePatientConfirmationDialog";
import ViewPatientProfileDialog from "./ViewPatientProfileDialog";
import { patientsColumns } from "./patientsColumns";

const PatientsTable = () => {
  const {
    viewingItem,
    deletingItem,
    isViewDialogOpen,
    isDeleteDialogOpen,
    onViewOpenChange,
    onDeleteOpenChange,
    tableActions,
  } = useRowActionModalState<IPatient>({ enableEdit: false });

  const { data: patientsResponse, isLoading, isFetching } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  const patients = patientsResponse?.data ?? [];

  return (
    <>
      <DataTable
        data={patients}
        columns={patientsColumns}
        isLoading={isLoading || isFetching}
        emptyMessage="No patients registered."
        actions={tableActions}
      />

      <DeletePatientConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        patient={deletingItem}
      />

      <ViewPatientProfileDialog
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        patient={viewingItem}
      />
    </>
  );
};

export default PatientsTable;
