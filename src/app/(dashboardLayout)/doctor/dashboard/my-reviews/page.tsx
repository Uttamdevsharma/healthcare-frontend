import DoctorReviewsTable from "@/components/modules/Doctor/DoctorReviews/DoctorReviewsTable";
import { getMyReviews } from "@/services/review.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const DoctorsMyReviewsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["my-reviews"],
    queryFn: getMyReviews,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Patient Feedback & Reviews</h1>
          <p className="text-muted-foreground">
            Ratings and reviews provided by patients after completed consultations.
          </p>
        </div>
        <DoctorReviewsTable />
      </div>
    </HydrationBoundary>
  );
};

export default DoctorsMyReviewsPage;