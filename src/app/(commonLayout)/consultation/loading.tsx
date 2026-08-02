import { Skeleton } from "@/components/ui/skeleton"

const LoadingCard = () => {
  return (
    <div className="flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <Skeleton className="size-16 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2 pt-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>

      <Skeleton className="mt-4 h-16 w-full rounded-xl" />

      <div className="mt-4 flex gap-1.5">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>

      <div className="mt-auto grid gap-2 pt-5 sm:grid-cols-2">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  )
}

export default function ConsultationLoading() {
  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <Skeleton className="h-36 w-full rounded-2xl sm:h-44" />

      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
        <aside className="hidden lg:block">
          <div className="space-y-5 rounded-2xl border bg-card p-5 shadow-sm">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </aside>

        <div className="min-w-0 space-y-5">
          <div className="space-y-3 rounded-2xl border bg-card p-4 shadow-sm">
            <Skeleton className="h-9 w-full" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-full sm:w-52" />
              <Skeleton className="ml-auto h-4 w-24" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
