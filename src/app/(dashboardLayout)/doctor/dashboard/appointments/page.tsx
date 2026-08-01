import DoctorAppointmentsTable from "@/components/modules/Doctor/DoctorAppointments/DoctorAppointmentsTable";
import { getMyAppointments } from "@/services/appointment.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const DoctorAppointmentsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["my-appointments"],
    queryFn: getMyAppointments,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Patient Appointments</h1>
          <p className="text-muted-foreground">
            Manage your patient schedule, join video consultations, and issue medical prescriptions.
          </p>
        </div>
        <DoctorAppointmentsTable />
      </div>
    </HydrationBoundary>
  );
};

export default DoctorAppointmentsPage;