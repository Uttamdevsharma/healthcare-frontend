"use client";

import DataTable from "@/components/shared/table/DataTable";
import { getPayments } from "@/services/payment.services";
import { useQuery } from "@tanstack/react-query";
import { paymentsColumns } from "./paymentsColumns";

const PaymentsTable = () => {
  const { data: paymentsResponse, isLoading, isFetching } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });

  const payments = paymentsResponse?.data ?? [];

  return (
    <DataTable
      data={payments}
      columns={paymentsColumns}
      isLoading={isLoading || isFetching}
      emptyMessage="No payment transactions recorded."
    />
  );
};

export default PaymentsTable;
