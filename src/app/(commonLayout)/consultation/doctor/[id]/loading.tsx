import { Skeleton } from "@/components/ui/skeleton";

export default function ConsultationDoctorLoading() {
  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <Skeleton className="h-9 w-40" />

      <div className="relative overflow-hidden rounded-2xl border bg-linear-to-r from-sky-50 via-white to-cyan-50 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <Skeleton className="size-24 shrink-0 rounded-full shadow-sm" />
          <div className="relative space-y-3">
            <Skeleton className="h-8 w-56 sm:h-9" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-52" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <Skeleton className="h-6 w-28 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="mt-1 h-10 w-44" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }, (_, cardIndex) => (
          <div key={cardIndex} className="rounded-2xl border bg-card p-5 shadow-sm">
            <Skeleton className="h-5 w-44" />
            <div className="mt-3 space-y-2.5">
              {Array.from({ length: 4 }, (_, rowIndex) => (
                <Skeleton key={rowIndex} className="h-4 w-3/4" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border bg-card p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="rounded-xl border bg-muted/20 p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="mt-2 h-4 w-1/2" />
              <Skeleton className="mt-3 h-3 w-20" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-5 shadow-sm">
        <Skeleton className="h-5 w-40" />
        <div className="mt-3 space-y-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="rounded-md border p-3">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="mt-2 h-4 w-2/3" />
              <Skeleton className="mt-2 h-3 w-28" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}