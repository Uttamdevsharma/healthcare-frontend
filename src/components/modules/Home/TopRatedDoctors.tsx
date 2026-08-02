import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getTopRatedDoctors } from "@/services/doctor.services";
import { type IDoctor } from "@/types/doctor.types";

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

  return (
    <Card className="text-center overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-blue-50/50 items-center p-6">
        <Avatar className="size-24 border-4 border-white shadow-md">
          <AvatarImage src={doctor.profilePhoto} alt={doctor.name} />
          <AvatarFallback className="text-2xl font-semibold">
            {getDoctorInitials(doctor.name)}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-lg">{doctor.name}</CardTitle>
        <p className="text-primary font-medium mt-1">{getDoctorSpecialty(doctor)}</p>
        <div className="flex items-center justify-center my-3 text-sm">
          <Star className="text-yellow-400 fill-current" size={16} />
          <span className="ml-2 text-foreground font-semibold">
            {doctor.averageRating > 0 ? doctor.averageRating.toFixed(1) : "0.0"}
          </span>
          <span className="ml-2 text-muted-foreground">
            ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
          </span>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
        <Button asChild variant="outline">
          <Link href={`/consultation/doctor/${doctor.id}`}>View Profile</Link>
        </Button>
        <Button asChild>
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
    console.log("Error fetching top rated doctors:", error);
  }

  if (doctors.length === 0) {
    return null;
  }

  return (
    <section className="bg-blue-50/50 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">
            Our Top Rated Doctor
          </h2>
          <p className="text-muted-foreground mt-4">
            Access to medical experts from various specialities, ready to
            provide you with top-notch medical services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {doctors.map((doctor) => (
            <DoctorCard key={String(doctor.id)} doctor={doctor} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/consultation">View All Doctors</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;
