import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MyProfileLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-56" />
        <Skeleton className="mt-2 h-4 w-80 max-w-full" />
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <Skeleton className="size-24 rounded-full border-4 border-primary/20" />
            <div className="flex-1 space-y-3 text-center md:text-left">
              <Skeleton className="h-8 w-48" />
              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Skeleton className="h-5 w-5 rounded-md" />
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className={index === 2 ? "flex items-center gap-3 md:col-span-2" : "flex items-center gap-3"}
            >
              <Skeleton className="h-4 w-4 shrink-0" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 shrink-0" />
            <Skeleton className="h-4 w-32" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Skeleton className="h-5 w-5 rounded-md" />
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className={index >= 5 ? "md:col-span-3" : ""}>
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-1.5 h-4 w-32" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}