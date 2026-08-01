"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { getAdmins } from "@/services/admin.services";
import { IAdmin } from "@/types/admin.types";
import { useQuery } from "@tanstack/react-query";
import CreateAdminFormModal from "./CreateAdminFormModal";
import DeleteAdminConfirmationDialog from "./DeleteAdminConfirmationDialog";
import ViewAdminProfileDialog from "./ViewAdminProfileDialog";
import { adminsColumns } from "./adminsColumns";

const AdminsTable = () => {
  const {
    viewingItem,
    deletingItem,
    isViewDialogOpen,
    isDeleteDialogOpen,
    onViewOpenChange,
    onDeleteOpenChange,
    tableActions,
  } = useRowActionModalState<IAdmin>({ enableEdit: false });

  const { data: adminsResponse, isLoading, isFetching } = useQuery({
    queryKey: ["admins"],
    queryFn: getAdmins,
  });

  const admins = adminsResponse?.data ?? [];

  return (
    <>
      <DataTable
        data={admins}
        columns={adminsColumns}
        isLoading={isLoading || isFetching}
        emptyMessage="No admins found."
        toolbarAction={<CreateAdminFormModal />}
        actions={tableActions}
      />

      <DeleteAdminConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        admin={deletingItem}
      />

      <ViewAdminProfileDialog
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        admin={viewingItem}
      />
    </>
  );
};

export default AdminsTable;
