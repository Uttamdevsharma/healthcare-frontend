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

const getDoctorInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("") || "DR";
};

const getDoctorSpecialty = (doctor: IDoctor) => {
  const titles = doctor.specialties?.map((item) => item.specialty.title) ?? [];
  return titles[0] ?? doctor.designation ?? "Medical Specialist";
};

const DoctorCard = ({ doctor }: { doctor: IDoctor }) => {
  const reviewCount = doctor._count?.reviews ?? 0;
  const rating = doctor.averageRating > 0 ? doctor.averageRating.toFixed(1) : "0.0";

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10">
      
      {/* Top Header Decorator */}
      <CardHeader className="relative flex flex-col items-center bg-gradient-to-b from-primary/10 via-primary/5 to-transparent p-6 pb-2">
        {/* Verified Badge Icon (Optional Design Touch) */}
        <div className="absolute right-4 top-4 text-primary/80" title="Verified Specialist">
          <ShieldCheck size={20} />
        </div>

        {/* Avatar */}
        <div className="relative mt-2">
          <Avatar className="size-28 border-4 border-background shadow-lg transition-transform duration-300 group-hover:scale-105">
            <AvatarImage src={doctor.profilePhoto} alt={doctor.name} className="object-cover" />
            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
              {getDoctorInitials(doctor.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-6 pt-2 text-center">
        {/* Specialty Badge */}
        <Badge variant="secondary" className="mb-3 font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
          {getDoctorSpecialty(doctor)}
        </Badge>

        {/* Doctor Name */}
        <h3 className="text-xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {doctor.name}
        </h3>

        {/* Designation / Qualifications (if available) */}
        {doctor.qualification && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
            {doctor.qualification}
          </p>
        )}

        {/* Rating and Reviews */}
        <div className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-muted/50 py-1.5 px-3 w-max mx-auto text-sm">
          <Star className="size-4 text-amber-500 fill-amber-500" />
          <span className="font-bold text-foreground">{rating}</span>
          <span className="text-muted-foreground text-xs">
            ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
          </span>
        </div>
      </CardContent>

      {/* Footer Action Buttons */}
      <CardFooter className="grid grid-cols-2 gap-3 p-5 pt-0">
        <Button asChild variant="outline" className="rounded-xl font-medium border-border/80 hover:bg-muted">
          <Link href={`/consultation/doctor/${doctor.id}`}>View Profile</Link>
        </Button>
        <Button asChild className="rounded-xl font-medium shadow-md shadow-primary/20">
          <Link href={`/consultation/doctor/${doctor.id}`}>Book Now</Link>
        </Button>
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