import PatientsTable from "@/components/modules/Admin/PatientsManagement/PatientsTable";
import { getPatients } from "@/services/patient.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const PatientsManagementPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Patients Management</h1>
          <p className="text-muted-foreground">
            View registered patients, medical reports, health records, and status.
          </p>
        </div>
        <PatientsTable />
      </div>
    </HydrationBoundary>
  );
};

export default PatientsManagementPage;