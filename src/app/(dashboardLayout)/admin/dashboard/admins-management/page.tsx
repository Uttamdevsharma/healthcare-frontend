import AdminsTable from "@/components/modules/Admin/AdminsManagement/AdminsTable";
import { getAdmins } from "@/services/admin.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const AdminsManagementPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admins"],
    queryFn: getAdmins,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admins Management</h1>
          <p className="text-muted-foreground">
            Manage system administrative accounts and permissions.
          </p>
        </div>
        <AdminsTable />
      </div>
    </HydrationBoundary>
  );
};

export default AdminsManagementPage;