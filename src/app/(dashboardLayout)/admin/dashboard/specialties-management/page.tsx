import SpecialtiesTable from "@/components/modules/Admin/SpecialtiesManagement/SpecialtiesTable";
import { getAllSpecialties } from "@/services/specialty.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const SpecialtiesManagementPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["specialties"],
    queryFn: getAllSpecialties,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Specialties Management</h1>
          <p className="text-muted-foreground">
            Manage medical specialties available across doctor profiles.
          </p>
        </div>
        <SpecialtiesTable />
      </div>
    </HydrationBoundary>
  );
};

export default SpecialtiesManagementPage;