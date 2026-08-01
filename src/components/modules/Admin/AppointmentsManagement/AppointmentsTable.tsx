"use client";

import DataTable from "@/components/shared/table/DataTable";
import { changeAppointmentStatus, getAllAppointments } from "@/services/appointment.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { appointmentsColumns } from "./appointmentsColumns";

const AppointmentsTable = () => {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: appointmentsResponse, isLoading, isFetching } = useQuery({
    queryKey: ["all-appointments"],
    queryFn: getAllAppointments,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      changeAppointmentStatus(id, status),
    onMutate: ({ id }) => setUpdatingId(id),
    onSuccess: (_, { status }) => {
      toast.success(`Appointment status updated to ${status}.`);
      queryClient.invalidateQueries({ queryKey: ["all-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Failed to update appointment status.");
    },
    onSettled: () => setUpdatingId(null),
  });

  const appointments = appointmentsResponse?.data ?? [];

  const columns = appointmentsColumns.map((column) => {
    if (column.id === "status") {
      return {
        ...column,
        cell: ({ row }: { row: { original: (typeof appointments)[number] } }) => {
          const appointment = row.original;
          const isUpdating = updatingId === appointment.id;

          return (
            <select
              value={appointment.status ?? "SCHEDULED"}
              onChange={(e) => {
                if (!e.target.value) {
                  return;
                }
                statusMutation.mutate({ id: appointment.id, status: e.target.value });
              }}
              disabled={isUpdating}
              className="h-8 rounded-md border bg-background px-2 text-xs focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
            >
              <option value="SCHEDULED">SCHEDULED</option>
              <option value="INPROGRESS">INPROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELED">CANCELED</option>
            </select>
          );
        },
      };
    }

    return column;
  });

  return (
    <DataTable
      data={appointments}
      columns={columns}
      isLoading={isLoading || isFetching}
      emptyMessage="No appointments scheduled."
    />
  );
};

export default AppointmentsTable;
