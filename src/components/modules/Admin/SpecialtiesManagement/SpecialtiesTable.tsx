"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { getAllSpecialties } from "@/services/specialty.services";
import { ISpecialty } from "@/types/specialty.types";
import { useQuery } from "@tanstack/react-query";
import CreateSpecialtyModal from "./CreateSpecialtyModal";
import DeleteSpecialtyDialog from "./DeleteSpecialtyDialog";
import { specialtiesColumns } from "./specialtiesColumns";

const SpecialtiesTable = () => {
  const {
    deletingItem,
    isDeleteDialogOpen,
    onDeleteOpenChange,
    tableActions,
  } = useRowActionModalState<ISpecialty>();

  const { data: specialtiesResponse, isLoading, isFetching } = useQuery({
    queryKey: ["specialties"],
    queryFn: getAllSpecialties,
  });

  const specialties = specialtiesResponse?.data ?? [];

  return (
    <>
      <DataTable
        data={specialties}
        columns={specialtiesColumns}
        isLoading={isLoading || isFetching}
        emptyMessage="No medical specialties found."
        toolbarAction={<CreateSpecialtyModal />}
        actions={{ onDelete: tableActions.onDelete }}
      />

      <DeleteSpecialtyDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        specialty={deletingItem}
      />
    </>
  );
};

export default SpecialtiesTable;
