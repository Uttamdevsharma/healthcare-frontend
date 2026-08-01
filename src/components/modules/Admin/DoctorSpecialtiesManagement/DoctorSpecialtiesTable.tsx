"use client";

import DataTable from "@/components/shared/table/DataTable";
import { getDoctors } from "@/services/doctor.services";
import { useQuery } from "@tanstack/react-query";
import { doctorSpecialtiesColumns } from "./doctorSpecialtiesColumns";

const DoctorSpecialtiesTable = () => {
  const { data: response, isLoading, isFetching } = useQuery({
    queryKey: ["doctors", ""],
    queryFn: () => getDoctors(""),
  });

  const doctors = response?.data ?? [];

  return (
    <DataTable
      data={doctors}
      columns={doctorSpecialtiesColumns}
      isLoading={isLoading || isFetching}
      emptyMessage="No doctors found."
    />
  );
};

export default DoctorSpecialtiesTable;
