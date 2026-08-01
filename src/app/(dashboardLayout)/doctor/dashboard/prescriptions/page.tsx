import DoctorPrescriptionsTable from "@/components/modules/Doctor/DoctorPrescriptions/DoctorPrescriptionsTable";
import { getMyPrescriptions } from "@/services/prescription.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const DoctorPrescriptionsPage = async () => {
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
          <h1 className="text-2xl font-bold tracking-tight">Issued Prescriptions</h1>
          <p className="text-muted-foreground">
            Review and download medical prescriptions issued to your patients.
          </p>
        </div>
        <DoctorPrescriptionsTable />
      </div>
    </HydrationBoundary>
  );
};

export default DoctorPrescriptionsPage;