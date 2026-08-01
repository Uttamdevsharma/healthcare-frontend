import PatientReviewsTable from "@/components/modules/Patient/PatientReviews/PatientReviewsTable"
import { getMyReviews } from "@/services/review.services"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

const MyReviewsPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["my-reviews"],
    queryFn: getMyReviews,
    staleTime: 1000 * 60 * 5,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Reviews</h1>
          <p className="text-muted-foreground">
            View, edit, or remove the reviews you have shared for your consultations.
          </p>
        </div>
        <PatientReviewsTable />
      </div>
    </HydrationBoundary>
  )
}

export default MyReviewsPage
