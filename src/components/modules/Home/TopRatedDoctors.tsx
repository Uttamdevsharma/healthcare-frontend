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
import { UserStatus, type IDoctor } from "@/types/doctor.types";
import Link from "next/link";
import { getTopRatedDoctors } from "@/services/doctor.services";
import DoctorWishlistButton from "./DoctorWishlistButton";

const getDoctorSpecialty = (doctor: IDoctor) => {
  const titles = doctor.specialties?.map((item) => item.specialty.title) ?? [];
  return titles[0] ?? doctor.designation ?? "Medical Specialist";
};

const DoctorCard = ({ doctor }: { doctor: IDoctor }) => {
  const reviewCount = doctor._count?.reviews ?? 0;
  const rating = doctor.averageRating > 0 ? doctor.averageRating.toFixed(1) : "0.0";
  const specialty = getDoctorSpecialty(doctor);
  const fee = doctor.appointmentFee;
  const location = doctor.currentWorkingPlace?.trim() || doctor.address?.trim();
  const isAvailable = doctor.user?.status === UserStatus.ACTIVE;
  const doctorProfileHref = `/consultation/doctor/${doctor.id}`;

  return (
    <Card className="group relative flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-border/60 bg-card p-0 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10">
      {/* Image Header */}
       <div className="relative h-56 overflow-hidden rounded-t-2xl bg-muted/60 sm:h-64">
         <Avatar className="size-full rounded-none">
           <AvatarImage
             src={doctor.profilePhoto}
             alt={doctor.name}
             className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
           />
          <AvatarFallback className="rounded-none bg-transparent">
            <UserRound className="size-20 text-muted-foreground/30" />
          </AvatarFallback>
        </Avatar>

        {/* Rating Badge */}
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-1 text-xs font-bold text-white shadow-md shadow-black/10">
          <Star className="size-3.5 fill-white text-white" />
          {rating}
        </div>

        {/* Wishlist Button */}
        <DoctorWishlistButton doctorName={doctor.name} />
      </div>

      {/* Middle Content */}
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

      {/* Bottom Action & Pricing Area */}
      <CardFooter className="mt-auto items-center justify-between gap-3 border-t border-border/60 px-5 py-4">
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
            className="rounded-full font-medium"
          >
            <Link href={doctorProfileHref}>View Profile</Link>
          </Button>

          <Button
            asChild
            size="icon"
            className="size-10 rounded-full shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
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

const TopRatedDoctors = async () => {
  let doctors: IDoctor[] = [];

  try {
    const response = await getTopRatedDoctors();
    doctors = response.data ?? [];
  } catch (error) {
    console.error("Error fetching top rated doctors:", error);
  }

  if (doctors.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-background to-slate-50/80 dark:from-background dark:via-muted/20 dark:to-background py-20 lg:py-28">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="outline" className="px-3 py-1 text-xs uppercase tracking-wider text-primary border-primary/30">
            Qualified Healthcare Professionals
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Meet Our Top Rated Doctors
          </h2>
          
          <p className="text-muted-foreground text-base leading-relaxed">
            Access to experienced medical experts from various specialties, ready to provide you with personalized and top-notch medical care.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {doctors.map((doctor) => (
            <DoctorCard key={String(doctor.id)} doctor={doctor} />
          ))}
        </div>

        {/* Bottom CTA Button */}
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