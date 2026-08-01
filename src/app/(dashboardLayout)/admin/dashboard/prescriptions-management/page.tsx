import PrescriptionsTable from "@/components/modules/Admin/PrescriptionsManagement/PrescriptionsTable";
import { getAllPrescriptions } from "@/services/prescription.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const PrescriptionsManagementPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["all-prescriptions"],
    queryFn: getAllPrescriptions,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Prescriptions Management</h1>
          <p className="text-muted-foreground">
            Audit system-wide medical prescriptions issued by doctors.
          </p>
        </div>
        <PrescriptionsTable />
      </div>
    </HydrationBoundary>
  );
};

export default PrescriptionsManagementPage;