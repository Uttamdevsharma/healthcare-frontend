import { Skeleton } from "@/components/ui/skeleton";
import SkeletonTable from "@/components/shared/skeletons/SkeletonTable";

export default function AdminsDoctorSchedulesManagementLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-72" />
        <Skeleton className="mt-2 h-4 w-96 max-w-full" />
      </div>
      <SkeletonTable columns={4} rows={6} />
    </div>
  );
}