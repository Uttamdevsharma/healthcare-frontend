import SkeletonStatsCard from "@/components/shared/skeletons/SkeletonStatsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AdminsDashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <SkeletonStatsCard />
        <SkeletonStatsCard />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <Skeleton className="h-5 w-40" />
          </CardHeader>
          <CardContent className="flex h-75 items-end gap-3">
            {Array.from({ length: 8 }, (_, index) => (
              <Skeleton
                key={index}
                className="w-full rounded-t-md"
                style={{
                  height: `${60 + ((index * 37) % 80)}px`,
                }}
              />
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="flex h-75 items-center justify-center">
            <Skeleton className="size-40 rounded-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}