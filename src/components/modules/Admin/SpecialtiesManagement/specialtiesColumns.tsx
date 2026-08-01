import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ISpecialty } from "@/types/specialty.types";
import { ColumnDef } from "@tanstack/react-table";
import { Stethoscope } from "lucide-react";

export const specialtiesColumns: ColumnDef<ISpecialty>[] = [
  {
    id: "icon",
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => (
      <Avatar className="h-10 w-10 border">
        <AvatarImage src={row.original.icon} alt={row.original.title} />
        <AvatarFallback>
          <Stethoscope className="h-5 w-5 text-primary" />
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    id: "title",
    accessorKey: "title",
    header: "Specialty Title",
    cell: ({ row }) => (
      <span className="font-semibold text-sm">{row.original.title}</span>
    ),
  },
];
