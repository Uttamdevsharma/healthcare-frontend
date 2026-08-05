import SkeletonTable from "@/components/shared/skeletons/SkeletonTable";
import { Skeleton } from "@/components/ui/skeleton";

export default function DoctorMySchedulesLoading() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-5">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        <div className="rounded-2xl border bg-card p-3 shadow-sm sm:p-4">
          <SkeletonTable columns={6} rows={6} search filters={1} action pagination />
        </div>
      </div>
    </section>
  );
}