import PaymentsTable from "@/components/modules/Admin/PaymentsManagement/PaymentsTable";
import { getPayments } from "@/services/payment.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const PaymentsManagementPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments Management</h1>
          <p className="text-muted-foreground">
            Track and manage patient payment histories and transaction logs.
          </p>
        </div>
        <PaymentsTable />
      </div>
    </HydrationBoundary>
  );
};

export default PaymentsManagementPage;