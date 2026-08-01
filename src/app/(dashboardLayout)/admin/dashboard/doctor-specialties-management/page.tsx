import DoctorSpecialtiesTable from "@/components/modules/Admin/DoctorSpecialtiesManagement/DoctorSpecialtiesTable";
import { getDoctors } from "@/services/doctor.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const DoctorSpecialtiesManagementPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["doctors", ""],
    queryFn: () => getDoctors(""),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Doctor Specialties Mapping</h1>
          <p className="text-muted-foreground">
            View assigned medical specialties by doctor profile.
          </p>
        </div>
        <DoctorSpecialtiesTable />
      </div>
    </HydrationBoundary>
  );
};

export default DoctorSpecialtiesManagementPage;