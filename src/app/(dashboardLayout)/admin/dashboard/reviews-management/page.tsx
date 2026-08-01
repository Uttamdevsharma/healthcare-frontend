import ReviewsTable from "@/components/modules/Admin/ReviewsManagement/ReviewsTable";
import { getAllReviews } from "@/services/review.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const ReviewsManagementPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["all-reviews"],
    queryFn: getAllReviews,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reviews Management</h1>
          <p className="text-muted-foreground">
            Monitor doctor ratings and feedback submitted by patients.
          </p>
        </div>
        <ReviewsTable />
      </div>
    </HydrationBoundary>
  );
};

export default ReviewsManagementPage;