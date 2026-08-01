"use client";

import DataTable from "@/components/shared/table/DataTable";
import { getAllDoctorSchedules } from "@/services/doctorSchedule.services";
import { useQuery } from "@tanstack/react-query";
import { doctorSchedulesColumns } from "./doctorSchedulesColumns";

const DoctorSchedulesTable = () => {
  const { data: response, isLoading, isFetching } = useQuery({
    queryKey: ["all-doctor-schedules"],
    queryFn: getAllDoctorSchedules,
  });

  const schedules = response?.data ?? [];

  return (
    <DataTable
      data={schedules}
      columns={doctorSchedulesColumns}
      isLoading={isLoading || isFetching}
      emptyMessage="No doctor schedule allocations found."
    />
  );
};

export default DoctorSchedulesTable;
