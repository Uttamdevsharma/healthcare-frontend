import DateCell from "@/components/shared/cell/DateCell";
import StatusBadgeCell from "@/components/shared/cell/StatusBadgeCell";
import UserInfoCell from "@/components/shared/cell/UserInfoCell";
import { IAdmin } from "@/types/admin.types";
import { UserStatus } from "@/types/doctor.types";
import { ColumnDef } from "@tanstack/react-table";

export const adminsColumns: ColumnDef<IAdmin>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Admin",
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
    header: "Joined On",
    cell: ({ row }) => {
      return (
        <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
      );
    },
  },
];
