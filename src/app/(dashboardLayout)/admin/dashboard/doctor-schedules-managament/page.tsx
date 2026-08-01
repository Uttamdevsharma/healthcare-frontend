import DoctorSchedulesTable from "@/components/modules/Admin/DoctorSchedulesManagement/DoctorSchedulesTable";
import { getAllDoctorSchedules } from "@/services/doctorSchedule.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const DoctorSchedulesManagementPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["all-doctor-schedules"],
    queryFn: getAllDoctorSchedules,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Doctor Schedules Management</h1>
          <p className="text-muted-foreground">
            Overview of doctor shift allocations and availability.
          </p>
        </div>
        <DoctorSchedulesTable />
      </div>
    </HydrationBoundary>
  );
};

export default DoctorSchedulesManagementPage;