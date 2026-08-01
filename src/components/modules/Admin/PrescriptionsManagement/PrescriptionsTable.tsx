"use client";

import DataTable from "@/components/shared/table/DataTable";
import { getAllPrescriptions } from "@/services/prescription.services";
import { useQuery } from "@tanstack/react-query";
import { prescriptionsColumns } from "./prescriptionsColumns";

const PrescriptionsTable = () => {
  const { data: prescriptionsResponse, isLoading, isFetching } = useQuery({
    queryKey: ["all-prescriptions"],
    queryFn: getAllPrescriptions,
  });

  const prescriptions = prescriptionsResponse?.data ?? [];

  return (
    <DataTable
      data={prescriptions}
      columns={prescriptionsColumns}
      isLoading={isLoading || isFetching}
      emptyMessage="No prescriptions record found."
    />
  );
};

export default PrescriptionsTable;
