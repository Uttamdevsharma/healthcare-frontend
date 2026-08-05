import Image from "next/image";
import {
  CalendarCheck,
  MessagesSquare,
  Building2,
  HeartPulse,
  Info,
} from "lucide-react";
import { getAllSpecialties } from "@/services/doctor.services";
import { ISpecialty } from "@/types/specialty.types";
import HeroSearchBar from "./HeroSearchBar";

const fallbackSpecialties: ISpecialty[] = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Orthopedic",
].map((title, index) => ({ id: `fallback-${index}`, title }));

const quickAccessItems = [
  { icon: CalendarCheck, label: "Book Appointment", href: "/consultation" },
  { icon: MessagesSquare, label: "Talk to Doctors", href: "/consultation" },
  { icon: Building2, label: "Hospitals & Clinics", href: "/services" },
  { icon: Info, label: "About", href: "/about" },
  { icon: HeartPulse, label: "E-Pharmacy", href: "/services" },
  { icon: HeartPulse, label: "Health Plans", href: "/services" },
];

export async function Hero() {
  let specialties: ISpecialty[] = fallbackSpecialties;
  try {
    const response = await getAllSpecialties();
    const data = response?.data;
    if (Array.isArray(data) && data.length > 0) {
      specialties = data;
    }
  } catch {
    specialties = fallbackSpecialties;
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #fff 30%, #155DFC 100%)",
        }}
      />
      {/* Decorative Blobs */}
      <div className="pointer-events-none absolute -left-20 top-16 z-0 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 z-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      {/* Content Container */}
        <div className="relative z-20 px-4 pt-0 md:px-8 lg:px-16 lg:pt-0">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center lg:gap-8">
              {/* Left Column - Hero Content */}
              <div className="flex flex-col justify-start space-y-6 mt-0 lg:mt-0">
                {/* Heading */}
                <div className="space-y-2">
                  <h1 className="text-[44px] font-bold leading-[52px] tracking-tight text-foreground sm:text-[51px] sm:leading-[60px]">
                    Find Your Perfect
                  </h1>
                  <h1 className="text-[44px] font-bold leading-[52px] tracking-tight text-foreground sm:text-[51px] sm:leading-[60px]">
                    Doctor with{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
                      AI
                    </span>
                  </h1>
                </div>

                {/* Description */}
                <div className="space-y-1 text-[16px] leading-7 text-gray-600">
                  <p>
                    Our advanced AI technology analyzes your symptoms, medical
                  </p>
                  <p>
                    history, and preferences to match you with the best-fit
                    doctors
                  </p>
                  <p>in seconds.</p>
                </div>

                {/* Search Bar */}
                <div className="relative z-30">
                  <HeroSearchBar specialties={specialties} />
                </div>
              </div>

              {/* Right Column - Doctor Image */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/30 blur-3xl" />
                <div className="pointer-events-none absolute right-4 top-8 z-0 h-40 w-40 rounded-full bg-white/30 blur-2xl" />
                <div className="relative z-10 mt-16 lg:mt-20">
                  <Image
                    src="/hero-doctor.png"
                    alt="Doctor providing healthcare"
                    width={2965}
                    height={3810}
                    priority
                    className="w-auto object-contain sm:max-h-[520px] lg:max-h-[580px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Bottom Services Panel - Positioned relative to Hero with overlap */}
      <div className="relative z-20 px-4 pb-12 md:px-8 lg:px-16 mt-[-60px] lg:mt-[-80px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-2 gap-2 rounded-3xl bg-white/90 p-4 shadow-[0px_20px_50px_-12px_rgba(0,0,0,0.3)] backdrop-blur sm:grid-cols-3 lg:grid-cols-6 lg:gap-3 lg:p-5">
            {quickAccessItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center transition-colors hover:bg-blue-50"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 transition-colors group-hover:from-blue-600 group-hover:to-primary group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-[12.5px] font-medium leading-4 text-foreground">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
