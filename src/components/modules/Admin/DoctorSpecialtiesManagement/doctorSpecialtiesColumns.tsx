import UserInfoCell from "@/components/shared/cell/UserInfoCell";
import { Badge } from "@/components/ui/badge";
import { IDoctor } from "@/types/doctor.types";
import { ColumnDef } from "@tanstack/react-table";

export const doctorSpecialtiesColumns: ColumnDef<IDoctor>[] = [
  {
    id: "doctor",
    accessorKey: "name",
    header: "Doctor Name",
    cell: ({ row }) => (
      <UserInfoCell
        name={row.original.name}
        email={row.original.email}
        profilePhoto={row.original.profilePhoto}
      />
    ),
  },
  {
    id: "designation",
    accessorKey: "designation",
    header: "Designation & Qualification",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">{row.original.designation}</span>
        <span className="text-xs text-muted-foreground">{row.original.qualification}</span>
      </div>
    ),
  },
  {
    id: "specialties",
    accessorKey: "specialties",
    header: "Assigned Specialties",
    cell: ({ row }) => {
      const specialties = row.original.specialties;
      if (!specialties || specialties.length === 0) {
        return <span className="text-xs text-muted-foreground">None assigned</span>;
      }
      return (
        <div className="flex flex-wrap gap-1">
          {specialties.map(({ specialty }, i) => (
            <Badge variant="secondary" key={i}>
              {specialty.title}
            </Badge>
          ))}
        </div>
      );
    },
  },
];
