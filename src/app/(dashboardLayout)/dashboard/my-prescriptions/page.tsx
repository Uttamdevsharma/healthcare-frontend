import PatientPrescriptionsTable from "@/components/modules/Patient/PatientPrescriptions/PatientPrescriptionsTable";
import { getMyPrescriptions } from "@/services/prescription.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const PatientPrescriptionsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["my-prescriptions"],
    queryFn: getMyPrescriptions,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Prescriptions</h1>
          <p className="text-muted-foreground">
            Access and download digital prescriptions issued by your doctors.
          </p>
        </div>
        <PatientPrescriptionsTable />
      </div>
    </HydrationBoundary>
  );
};

export default PatientPrescriptionsPage;
