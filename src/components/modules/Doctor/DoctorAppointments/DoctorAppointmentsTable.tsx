"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import DataTable from "@/components/shared/table/DataTable";
import { changeAppointmentStatus, getMyAppointments } from "@/services/appointment.services";
import { IAppointment } from "@/types/appointment.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import IssuePrescriptionModal from "./IssuePrescriptionModal";
import ViewHealthRecordsModal from "./ViewHealthRecordsModal";
import { getDoctorAppointmentsColumns } from "./doctorAppointmentsColumns";

const DoctorAppointmentsTable = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<IAppointment | null>(null);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [healthRecordsAppointment, setHealthRecordsAppointment] = useState<IAppointment | null>(null);
  const [isHealthRecordsOpen, setIsHealthRecordsOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: appointmentsRes, isLoading, isFetching } = useQuery({
    queryKey: ["my-appointments"],
    queryFn: getMyAppointments,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      changeAppointmentStatus(id, status),
    onMutate: ({ id }) => setUpdatingId(id),
    onSuccess: (_, { status }) => {
      toast.success(`Appointment status updated to ${status}.`);
      queryClient.invalidateQueries({ queryKey: ["my-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Failed to update appointment status.");
    },
    onSettled: () => setUpdatingId(null),
  });

  const appointments = appointmentsRes?.data ?? [];

  const handleIssuePrescription = (appointment: IAppointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleViewHealthRecords = (appointment: IAppointment) => {
    setHealthRecordsAppointment(appointment);
    setIsHealthRecordsOpen(true);
  };

  const handleStatusChange = (appointment: IAppointment, status: string) => {
    if (status === "CANCELED") {
      setAppointmentToCancel(appointment);
      setIsCancelDialogOpen(true);
      return;
    }

    statusMutation.mutate({ id: appointment.id, status });
  };

  const handleCancelConfirm = () => {
    if (!appointmentToCancel) {
      return;
    }

    setIsCancelDialogOpen(false);
    statusMutation.mutate({ id: appointmentToCancel.id, status: "CANCELED" });
    setAppointmentToCancel(null);
  };

  const columns = getDoctorAppointmentsColumns(
    handleIssuePrescription,
    handleStatusChange,
    (id) => updatingId === id,
    handleViewHealthRecords,
  );

  return (
    <>
      <DataTable
        data={appointments}
        columns={columns}
        isLoading={isLoading || isFetching}
        emptyMessage="No patient appointments scheduled."
      />

      <IssuePrescriptionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        appointment={selectedAppointment}
      />

      <ViewHealthRecordsModal
        open={isHealthRecordsOpen}
        onOpenChange={setIsHealthRecordsOpen}
        appointment={healthRecordsAppointment}
      />

      <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this appointment?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to cancel the appointment with patient{" "}
              <strong className="text-foreground">
                {appointmentToCancel?.patient?.name || "the patient"}
              </strong>{" "}
              scheduled for{" "}
              <strong className="text-foreground">
                {appointmentToCancel?.schedule?.startDateTime
                  ? new Date(appointmentToCancel.schedule.startDateTime).toLocaleString()
                  : "the scheduled time"}
              </strong>
              . The slot will be released for other patients.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Cancel Appointment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DoctorAppointmentsTable;
