import DateCell from "@/components/shared/cell/DateCell";
import StatusBadgeCell from "@/components/shared/cell/StatusBadgeCell";
import UserInfoCell from "@/components/shared/cell/UserInfoCell";
import { UserStatus } from "@/types/doctor.types";
import { IPatient } from "@/types/patient.types";
import { ColumnDef } from "@tanstack/react-table";

export const patientsColumns: ColumnDef<IPatient>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Patient",
    cell: ({ row }) => (
      <UserInfoCell
        name={row.original.name}
        email={row.original.email}
        profilePhoto={row.original.profilePhoto}
      />
    ),
  },
  {
    id: "contactNumber",
    accessorKey: "contactNumber",
    header: "Contact Number",
    cell: ({ row }) => (
      <span className="text-sm">{row.original?.contactNumber || "N/A"}</span>
    ),
  },
  {
    id: "address",
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <span className="text-sm truncate max-w-[200px] block">{row.original?.address || "N/A"}</span>
    ),
  },
  {
    id: "status",
    accessorKey: "user.status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <StatusBadgeCell status={row.original.user?.status as UserStatus ?? UserStatus.ACTIVE} />
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Registered On",
    cell: ({ row }) => {
      return (
        <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
      );
    },
  },
];
