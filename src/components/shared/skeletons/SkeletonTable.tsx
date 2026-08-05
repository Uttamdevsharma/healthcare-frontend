import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonTableProps {
  columns?: number;
  rows?: number;
  search?: boolean;
  filters?: number;
  action?: boolean;
  pagination?: boolean;
}

const SkeletonTable = ({
  columns = 5,
  rows = 6,
  search = false,
  filters = 0,
  action = false,
  pagination = false,
}: SkeletonTableProps) => {
  const showToolbar = search || filters > 0 || action;

  return (
    <div>
      {showToolbar && (
        <div className="mb-4 flex flex-wrap items-start gap-3">
          {search && <Skeleton className="h-9 w-full md:max-w-sm" />}
          {filters > 0 &&
            Array.from({ length: filters }, (_, index) => (
              <Skeleton key={index} className="h-9 w-28" />
            ))}
          {action && <Skeleton className="ml-auto h-9 w-36" />}
        </div>
      )}

      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/40">
                {Array.from({ length: columns }, (_, index) => (
                  <th key={index} className="px-4 py-3 text-left">
                    <Skeleton className="h-4 w-24" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rows }, (_, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b last:border-0"
                >
                  {Array.from({ length: columns }, (_, colIndex) => (
                    <td key={colIndex} className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {colIndex === 0 ? (
                          <>
                            <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
                            <div className="hidden min-w-0 flex-1 space-y-2 sm:block">
                              <Skeleton className="h-3.5 w-28" />
                              <Skeleton className="h-3 w-20" />
                            </div>
                          </>
                        ) : (
                          <Skeleton className="h-3.5 w-full max-w-[7rem]" />
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination && (
          <div className="flex flex-col items-center justify-between gap-3 border-t px-4 py-3 md:flex-row">
            <Skeleton className="h-4 w-24" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkeletonTable;