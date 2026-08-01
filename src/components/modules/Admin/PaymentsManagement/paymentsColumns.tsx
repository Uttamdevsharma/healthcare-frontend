import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { IPayment, PaymentStatus } from "@/types/payment.types";
import { ColumnDef } from "@tanstack/react-table";
import { CreditCard, DollarSign } from "lucide-react";

export const paymentsColumns: ColumnDef<IPayment>[] = [
  {
    id: "transactionId",
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 font-mono text-xs">
        <CreditCard className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="truncate max-w-[150px]">{row.original.transactionId}</span>
      </div>
    ),
  },
  {
    id: "patient",
    accessorKey: "appointment.patient.name",
    header: "Patient",
    cell: ({ row }) => {
      const patient = row.original.appointment?.patient;
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{patient?.name || "N/A"}</span>
          <span className="text-xs text-muted-foreground">{patient?.email || ""}</span>
        </div>
      );
    },
  },
  {
    id: "doctor",
    accessorKey: "appointment.doctor.name",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = row.original.appointment?.doctor;
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">Dr. {doctor?.name || "N/A"}</span>
          <span className="text-xs text-muted-foreground">{doctor?.email || ""}</span>
        </div>
      );
    },
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="flex items-center font-semibold text-emerald-600 dark:text-emerald-400">
        <DollarSign className="h-4 w-4" />
        <span>{row.original.amount.toFixed(2)}</span>
      </div>
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={status === PaymentStatus.PAID ? "default" : "destructive"}
          className={status === PaymentStatus.PAID ? "bg-emerald-600 hover:bg-emerald-700" : ""}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy HH:mm" />
    ),
  },
];
