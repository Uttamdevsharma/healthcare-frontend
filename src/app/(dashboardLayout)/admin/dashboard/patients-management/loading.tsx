import { Skeleton } from "@/components/ui/skeleton";
import SkeletonTable from "@/components/shared/skeletons/SkeletonTable";

export default function AdminsPatientsManagementLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-2 h-4 w-96 max-w-full" />
      </div>
      <SkeletonTable columns={6} rows={6} action />
    </div>
  );
}