"use client"

import ConsultationFilters, {
  APPOINTMENT_FEE_FILTER_KEY,
  SPECIALTIES_FILTER_KEY,
  countActiveConsultationFilters,
} from "@/components/modules/Consultation/ConsultationFilters"
import BookAppointmentModal from "@/components/modules/Patient/Appointments/BookAppointmentModal"
import DataTableSearch from "@/components/shared/table/DataTableSearch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable"
import {
  serverManagedFilter,
  useServerManagedDataTableFilters,
} from "@/hooks/useServerManagedDataTableFilters"
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch"
import { getAllSpecialties, getDoctors } from "@/services/doctor.services"
import { type IDoctor } from "@/types/doctor.types"
import { getProfileImageSrc, getProfilePhotoVersion, subscribeProfilePhotoVersion } from "@/lib/profileImage"
import { useQuery } from "@tanstack/react-query"
import { MapPin, SearchX, SlidersHorizontal, Star, Stethoscope } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useMemo, useState, useSyncExternalStore } from "react"

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 12

const CONSULTATION_ALLOWED_QUERY_KEYS = new Set([
  "page",
  "limit",
  "sortBy",
  "sortOrder",
  "searchTerm",
  "gender",
  SPECIALTIES_FILTER_KEY,
  `${APPOINTMENT_FEE_FILTER_KEY}[gte]`,
  `${APPOINTMENT_FEE_FILTER_KEY}[lte]`,
])

const CONSULTATION_FILTER_DEFINITIONS = [
  serverManagedFilter.single("gender"),
  serverManagedFilter.multi(SPECIALTIES_FILTER_KEY),
  serverManagedFilter.range(APPOINTMENT_FEE_FILTER_KEY),
]

const getSanitizedConsultationQueryString = (queryString: string) => {
  const currentParams = new URLSearchParams(queryString)
  const sanitizedParams = new URLSearchParams()

  currentParams.forEach((value, key) => {
    if (!CONSULTATION_ALLOWED_QUERY_KEYS.has(key)) {
      return
    }

    const normalizedValue = value.trim()
    if (!normalizedValue) {
      return
    }

    if (key === SPECIALTIES_FILTER_KEY) {
      sanitizedParams.append(key, normalizedValue)
      return
    }

    sanitizedParams.set(key, normalizedValue)
  })

  return sanitizedParams.toString()
}

const getDoctorInitials = (name: string) => {
  const parts = name.trim().split(/\s+/)
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "")
  return initials.join("") || "DR"
}

const Pagination = ({
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  isLoading: boolean
  onPageChange: (page: number) => void
}) => {
  if (totalPages <= 1) {
    return null
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isLoading || currentPage <= 1}
      >
        Prev
      </Button>

      {pageNumbers.map((page) => (
        <Button
          key={page}
          type="button"
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => onPageChange(page)}
          disabled={isLoading}
        >
          {page}
        </Button>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLoading || currentPage >= totalPages}
      >
        Next
      </Button>
    </div>
  )
}

const DoctorCard = ({
  doctor,
  isAuthenticated,
  viewerRole,
}: {
  doctor: IDoctor
  isAuthenticated: boolean
  viewerRole?: string | null
}) => {
  const photoVersion = useSyncExternalStore(subscribeProfilePhotoVersion, getProfilePhotoVersion)
  const specialtiesList = doctor.specialties?.map((item) => item.specialty.title) ?? []
  const rating = doctor.averageRating ?? 0
  const fee = doctor.appointmentFee

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
      <div className="h-1 w-full bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600" />

      <div className="flex h-full flex-col p-5">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <Avatar className="size-20 bg-muted/40 ring-4 ring-muted/40 transition group-hover:ring-primary/10">
              <AvatarImage src={getProfileImageSrc(doctor.profilePhoto, photoVersion)} alt={doctor.name} className="object-cover" />
              <AvatarFallback>{getDoctorInitials(doctor.name)}</AvatarFallback>
            </Avatar>
          </div>

          <div className="min-w-0 space-y-0.5 pt-0.5">
            <h3 className="truncate text-base font-semibold leading-tight">{doctor.name}</h3>
            <p className="truncate text-xs font-medium text-primary">
              {doctor.designation || "Medical Specialist"}
            </p>
            <p className="flex items-start gap-1 truncate text-xs text-muted-foreground">
              <MapPin className="mt-0.5 size-3 shrink-0" />
              <span className="truncate">{doctor.currentWorkingPlace || "Location not listed"}</span>
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 divide-x rounded-xl border bg-muted/30">
          <div className="px-2 py-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-sm font-semibold">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              {rating > 0 ? rating.toFixed(1) : "0.0"}
            </div>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Rating</p>
          </div>
          <div className="px-2 py-2.5 text-center">
            <p className="text-sm font-semibold">{doctor.experience ?? 0}y</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Experience</p>
          </div>
          <div className="px-2 py-2.5 text-center">
            <p className="text-sm font-semibold text-primary">
              {fee != null ? `$${fee.toFixed(0)}` : "—"}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Fee</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {specialtiesList.length > 0 ? (
            specialtiesList.slice(0, 3).map((title) => (
              <Badge key={`${doctor.id}-${title}`} variant="secondary" className="font-normal">
                {title}
              </Badge>
            ))
          ) : (
            <Badge variant="secondary">General Practitioner</Badge>
          )}
        </div>

        <div className="mt-auto grid gap-2 pt-5 sm:grid-cols-2">
          <BookAppointmentModal
            doctorId={String(doctor.id)}
            doctorName={doctor.name}
            isAuthenticated={isAuthenticated}
            viewerRole={viewerRole}
            triggerClassName="w-full"
            fullWidth
          />
          <Button asChild variant="outline" className="w-full">
            <Link href={`/consultation/doctor/${doctor.id}`}>View Profile</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}

const DoctorCardSkeleton = () => {
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

const DoctorsList = ({
  initialQueryString,
  isAuthenticated,
  viewerRole,
}: {
  initialQueryString: string
  isAuthenticated: boolean
  viewerRole?: string | null
}) => {
  const searchParams = useSearchParams()
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const {
    queryStringFromUrl,
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handleSortingChange,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: DEFAULT_PAGE,
    defaultLimit: DEFAULT_LIMIT,
  })

  const queryString = useMemo(() => {
    return getSanitizedConsultationQueryString(queryStringFromUrl || initialQueryString)
  }, [initialQueryString, queryStringFromUrl])

  const {
    searchTermFromUrl,
    handleDebouncedSearchChange,
  } = useServerManagedDataTableSearch({
    searchParams,
    updateParams,
  })

  const {
    filterValues,
    handleFilterChange,
    clearAllFilters,
  } = useServerManagedDataTableFilters({
    searchParams,
    definitions: CONSULTATION_FILTER_DEFINITIONS,
    updateParams,
  })

  const { data: doctorsResponse, isLoading, isFetching } = useQuery({
    queryKey: ["doctors", queryString],
    queryFn: () => getDoctors(queryString),
  })

  const { data: specialtiesResponse } = useQuery({
    queryKey: ["specialties"],
    queryFn: getAllSpecialties,
    staleTime: 1000 * 60 * 60 * 6,
    gcTime: 1000 * 60 * 60 * 24,
  })

  const doctors = doctorsResponse?.data ?? []
  const meta = doctorsResponse?.meta
  const specialties = useMemo(() => specialtiesResponse?.data ?? [], [specialtiesResponse?.data])

  const totalActiveFilters = useMemo(
    () => countActiveConsultationFilters(filterValues),
    [filterValues],
  )

  const isBusy = isLoading || isFetching || isRouteRefreshPending

  const handleResetAll = () => {
    updateParams((params) => {
      CONSULTATION_ALLOWED_QUERY_KEYS.forEach((key) => params.delete(key))
    }, { resetPage: true })
  }

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border bg-linear-to-br from-primary/10 via-background to-secondary/20 p-6 sm:p-8">
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/10 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 size-36 rounded-full bg-secondary/30 blur-2xl" />
        <div className="relative max-w-3xl space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Stethoscope className="size-5" />
            </span>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Consult With Our Specialists
            </h1>
          </div>
          <p className="text-sm text-muted-foreground sm:text-base">
            Discover trusted doctors, compare experience and fees, and open detailed profiles to find
            the right specialist.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
        <aside className="hidden lg:block">
          <div className="sticky top-6 space-y-5 rounded-2xl border bg-card p-5 shadow-sm">
            <ConsultationFilters
              specialties={specialties}
              filterValues={filterValues}
              onFilterChange={handleFilterChange}
              onClearAll={clearAllFilters}
              isLoading={isBusy}
            />
          </div>
        </aside>

        <div className="min-w-0 space-y-5">
          <div className="space-y-3 rounded-2xl border bg-card p-4 shadow-sm">
            <DataTableSearch
              key={searchTermFromUrl}
              initialValue={searchTermFromUrl}
              placeholder="Search doctor by name, qualification, email..."
              debounceMs={700}
              onDebouncedChange={handleDebouncedSearchChange}
              isLoading={isBusy}
            />

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="hidden text-sm text-muted-foreground sm:inline">Sort</span>
                <Select
                  value={
                    optimisticSortingState[0]?.id
                      ? `${optimisticSortingState[0]?.id}:${optimisticSortingState[0]?.desc ? "desc" : "asc"}`
                      : "default"
                  }
                  onValueChange={(value) => {
                    if (value === "default") {
                      handleSortingChange([])
                      return
                    }

                    const [sortBy, sortOrder] = value.split(":")
                    handleSortingChange([{ id: sortBy, desc: sortOrder === "desc" }])
                  }}
                >
                  <SelectTrigger className="w-full sm:w-52" disabled={isBusy}>
                    <SelectValue placeholder="Sort doctors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="averageRating:desc">Rating (High to Low)</SelectItem>
                    <SelectItem value="appointmentFee:asc">Fee (Low to High)</SelectItem>
                    <SelectItem value="experience:desc">Experience (High to Low)</SelectItem>
                    <SelectItem value="createdAt:desc">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="button"
                variant="outline"
                className="lg:hidden"
                onClick={() => setIsFiltersOpen(true)}
              >
                <SlidersHorizontal className="size-4" />
                Filters
                {totalActiveFilters > 0 && (
                  <Badge variant="secondary" className="ml-0.5">
                    {totalActiveFilters}
                  </Badge>
                )}
              </Button>

              {meta && (
                <span className="ml-auto text-sm text-muted-foreground">
                  {meta.total} doctor{meta.total === 1 ? "" : "s"}
                </span>
              )}
            </div>
          </div>

          {isBusy && doctors.length === 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <DoctorCardSkeleton key={index} />
              ))}
            </div>
          ) : doctors.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border bg-card px-6 py-16 text-center shadow-sm">
              <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
                <SearchX className="size-6 text-muted-foreground" />
              </div>
              <h3 className="text-base font-semibold">No doctors found</h3>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                We couldn&apos;t find any doctors matching your current search or filters. Try
                adjusting your criteria.
              </p>
              <Button type="button" variant="outline" className="mt-5" onClick={handleResetAll}>
                Clear all filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {doctors.map((doctor: IDoctor) => (
                  <DoctorCard
                    key={String(doctor.id)}
                    doctor={doctor}
                    isAuthenticated={isAuthenticated}
                    viewerRole={viewerRole}
                  />
                ))}
              </div>

              <div className="space-y-3 pt-1">
                <Pagination
                  currentPage={optimisticPaginationState.pageIndex + 1}
                  totalPages={meta?.totalPages ?? 1}
                  isLoading={isBusy}
                  onPageChange={(page) => {
                    handlePaginationChange({
                      pageIndex: page - 1,
                      pageSize: optimisticPaginationState.pageSize,
                    })
                  }}
                />

                <p className="text-center text-sm text-muted-foreground">
                  Total {meta?.total ?? doctors.length} doctors
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <SheetContent side="left" className="w-full gap-0 p-0 sm:max-w-md">
          <SheetHeader className="border-b px-5 py-4">
            <SheetTitle>Refine Results</SheetTitle>
            <SheetDescription>
              Narrow down doctors by specialty, gender and consultation fee.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <ConsultationFilters
              hideHeader
              specialties={specialties}
              filterValues={filterValues}
              onFilterChange={handleFilterChange}
              onClearAll={clearAllFilters}
              isLoading={isBusy}
            />
          </div>

          <SheetFooter className="border-t px-5 py-4">
            <Button type="button" className="w-full" onClick={() => setIsFiltersOpen(false)}>
              Show {meta?.total ?? 0} doctor{meta?.total === 1 ? "" : "s"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default DoctorsList
