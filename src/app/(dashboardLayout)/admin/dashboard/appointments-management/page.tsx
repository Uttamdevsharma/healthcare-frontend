import AppointmentsTable from "@/components/modules/Admin/AppointmentsManagement/AppointmentsTable";
import { getAllAppointments } from "@/services/appointment.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const AppointmentsManagementPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["all-appointments"],
    queryFn: getAllAppointments,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Appointments Management</h1>
          <p className="text-muted-foreground">
            Overview and status monitoring for all patient-doctor appointments.
          </p>
        </div>
        <AppointmentsTable />
      </div>
    </HydrationBoundary>
  );
};

export default AppointmentsManagementPage;