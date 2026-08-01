"use client";

import DataTable from "@/components/shared/table/DataTable";
import { getAllReviews } from "@/services/review.services";
import { useQuery } from "@tanstack/react-query";
import { reviewsColumns } from "./reviewsColumns";

const ReviewsTable = () => {
  const { data: reviewsResponse, isLoading, isFetching } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: getAllReviews,
  });

  const reviews = reviewsResponse?.data ?? [];

  return (
    <DataTable
      data={reviews}
      columns={reviewsColumns}
      isLoading={isLoading || isFetching}
      emptyMessage="No patient reviews found."
    />
  );
};

export default ReviewsTable;
