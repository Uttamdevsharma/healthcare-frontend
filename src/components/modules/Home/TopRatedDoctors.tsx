"use client";

import {
  Star,
  ArrowRight,
  MapPin,
  GraduationCap,
  CalendarCheck,
  MessageCircle,
  UserRound,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UserStatus, type IDoctor } from "@/types/doctor.types";
import Link from "next/link";
import { getTopRatedDoctors } from "@/services/doctor.services";
import {
  getProfileImageSrc,
  getProfilePhotoVersion,
  subscribeProfilePhotoVersion,
} from "@/lib/profileImage";
import { useQuery } from "@tanstack/react-query";
import { useSyncExternalStore } from "react";
import DoctorWishlistButton from "./DoctorWishlistButton";

const getDoctorSpecialty = (doctor: IDoctor) => {
  const titles = doctor.specialties?.map((item) => item.specialty.title) ?? [];
  return titles[0] ?? doctor.designation ?? "Medical Specialist";
};

const DoctorCard = ({ doctor }: { doctor: IDoctor }) => {
  const photoVersion = useSyncExternalStore(subscribeProfilePhotoVersion, getProfilePhotoVersion);
  const reviewCount = doctor._count?.reviews ?? 0;
  const rating = doctor.averageRating > 0 ? doctor.averageRating.toFixed(1) : "0.0";
  const specialty = getDoctorSpecialty(doctor);
  const fee = doctor.appointmentFee;
  const location = doctor.currentWorkingPlace?.trim() || doctor.address?.trim();
  const isAvailable = doctor.user?.status === UserStatus.ACTIVE;
  const doctorProfileHref = `/consultation/doctor/${doctor.id}`;

  return (
    <Card className="group relative flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-border/10 bg-card p-0 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-muted/40">
        <div className="size-full overflow-hidden scale-[1.12]">
          <Avatar className="size-full rounded-none">
            <AvatarImage
              src={getProfileImageSrc(doctor.profilePhoto, photoVersion)}
              alt={doctor.name}
              className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            />
          <AvatarFallback className="rounded-none bg-transparent">
            <div className="flex size-full items-center justify-center">
              <UserRound className="size-20 text-muted-foreground/30" />
            </div>
          </AvatarFallback>
        </Avatar>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/15 to-transparent" />

        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-amber-500 shadow-md shadow-black/10 backdrop-blur">
          <Star className="size-3.5 fill-amber-500 text-amber-500" />
          {rating}
        </div>

        <DoctorWishlistButton doctorName={doctor.name} />
      </div>

      <CardContent className="flex-1 p-5 pb-4">
        <div className="flex items-center justify-between gap-2">
          <span className="line-clamp-1 text-xs font-semibold uppercase tracking-wide text-primary sm:text-sm">
            {specialty}
          </span>

          {isAvailable && (
            <Badge className="shrink-0 border-0 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Available
            </Badge>
          )}
        </div>

        <h3 className="mt-2 text-lg font-bold leading-snug text-foreground line-clamp-1 transition-colors group-hover:text-primary">
          {doctor.name}
        </h3>

        {(location || doctor.qualification || reviewCount > 0) && (
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            {location && (
              <span className="inline-flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3.5 shrink-0" />
                <span className="line-clamp-1">{location}</span>
              </span>
            )}

            {doctor.qualification && (
              <span className="inline-flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
                <GraduationCap className="size-3.5 shrink-0" />
                <span className="line-clamp-1">{doctor.qualification}</span>
              </span>
            )}

            {reviewCount > 0 && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <MessageCircle className="size-3.5 shrink-0" />
                {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
              </span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="mt-auto items-center justify-between gap-3 border-t border-border/10 px-5 py-4">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Consultation Fees
          </p>
          <p className="mt-0.5 text-lg font-extrabold leading-none text-foreground">
            {fee > 0 ? `$${fee.toFixed(0)}` : "—"}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full border border-primary/40 bg-transparent px-4 py-2.5 text-sm font-medium text-primary shadow-sm transition-all duration-200 hover:border-primary/60 hover:bg-primary/5 hover:shadow-md active:scale-[0.98]"
          >
            <Link href={doctorProfileHref}>View Profile</Link>
          </Button>

          <Button
            asChild
            size="icon"
            className="size-11 rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/20 transition-all duration-200 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]"
            aria-label="Book Now"
            title="Book Now"
          >
            <Link href={doctorProfileHref}>
              <CalendarCheck className="size-5" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const DoctorCardSkeleton = () => (
  <Card className="group relative flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-border/60 bg-card p-0 transition-all duration-300">
    <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-muted/40">
      <Skeleton className="size-full" />
    </div>
    <CardContent className="flex-1 p-5 pb-4">
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="mt-2 h-5 w-3/4" />
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-28" />
      </div>
    </CardContent>
    <CardFooter className="mt-auto items-center justify-between gap-3 border-t border-border/60 px-5 py-4">
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Consultation Fees</p>
        <Skeleton className="mt-0.5 h-6 w-16" />
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Skeleton className="h-9 w-24 rounded-full" />
        <Skeleton className="size-10 rounded-full" />
      </div>
    </CardFooter>
  </Card>
);

interface TopRatedDoctorsProps {
  initialDoctors?: IDoctor[];
}

const TopRatedDoctors = ({ initialDoctors = [] }: TopRatedDoctorsProps) => {
  const { data: doctorsResponse, isLoading } = useQuery({
    queryKey: ["top-rated-doctors"],
    queryFn: () => getTopRatedDoctors(),
    initialData: {
      success: true,
      message: "",
      data: initialDoctors,
    },
  });

  const doctors = doctorsResponse?.data ?? [];

  if (isLoading && doctors.length === 0) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-background to-slate-50/80 dark:from-background dark:via-muted/20 dark:to-background py-20 lg:py-28">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="mx-auto h-8 w-64" />
            <Skeleton className="mx-auto mt-4 h-4 w-96 max-w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
            {Array.from({ length: 6 }, (_, i) => (
              <DoctorCardSkeleton key={i} />
            ))}
          </div>

          <div className="text-center mt-14">
            <Skeleton className="mx-auto h-11 w-48 rounded-full" />
          </div>
        </div>
      </section>
    );
  }

  if (doctors.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-background to-slate-50/80 dark:from-background dark:via-muted/20 dark:to-background py-20 lg:py-28">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            Meet Our Top Rated Doctors
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Access to experienced medical experts from various specialties, ready to provide you with personalized and top-notch medical care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {doctors.map((doctor) => (
            <DoctorCard key={String(doctor.id)} doctor={doctor} />
          ))}
        </div>

        <div className="text-center mt-14">
          <Button asChild size="lg" className="rounded-full px-8 gap-2 font-semibold shadow-lg shadow-primary/20 hover:gap-3 transition-all">
            <Link href="/consultation">
              View All Doctors
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;
