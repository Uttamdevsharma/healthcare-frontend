"use client";

import DataTable from "@/components/shared/table/DataTable";
import DateCell from "@/components/shared/cell/DateCell";
import { getMyReviews } from "@/services/review.services";
import { IReview } from "@/types/review.types";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Star, User } from "lucide-react";

const doctorReviewsColumns: ColumnDef<IReview>[] = [
  {
    id: "patient",
    accessorKey: "patient.name",
    header: "Patient",
    cell: ({ row }) => {
      const patient = row.original.patient;
      return (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{patient?.name || "Anonymous Patient"}</span>
            <span className="text-xs text-muted-foreground">{patient?.email || ""}</span>
          </div>
        </div>
      );
    },
  },
  {
    id: "rating",
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <span className="text-sm font-semibold">{row.original.rating.toFixed(1)}</span>
      </div>
    ),
  },
  {
    id: "comment",
    accessorKey: "comment",
    header: "Patient Feedback",
    cell: ({ row }) => (
      <p className="text-xs text-muted-foreground line-clamp-3 max-w-[400px]">
        {row.original.comment || "No written review provided."}
      </p>
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Submitted On",
    cell: ({ row }) => (
      <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
    ),
  },
];

const DoctorReviewsTable = () => {
  const { data: reviewsRes, isLoading, isFetching } = useQuery({
    queryKey: ["my-reviews"],
    queryFn: getMyReviews,
  });

  const reviews = reviewsRes?.data ?? [];

  return (
    <DataTable
      data={reviews}
      columns={doctorReviewsColumns}
      isLoading={isLoading || isFetching}
      emptyMessage="No patient feedback received yet."
    />
  );
};

export default DoctorReviewsTable;
