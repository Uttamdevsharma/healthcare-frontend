import Image from "next/image";
import {
  Bone,
  Brain,
  HeartPulse,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { type IDoctor } from "@/types/doctor.types";
import { type ISpecialty } from "@/types/specialty.types";

const SPECIALTIES_FILTER_KEY = "specialties.specialty.title";
const CACHE_TAG = "landing-specialties";
const DOCTORS_CACHE_TAG = "landing-doctors";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface SpecialtyVisual {
  image?: string;
  icon: LucideIcon;
  fallbackBg: string;
}

const FALLBACK_BG_COLORS = [
  "bg-gradient-to-br from-red-400 to-red-600",
  "bg-gradient-to-br from-blue-400 to-blue-600",
  "bg-gradient-to-br from-pink-400 to-pink-600",
  "bg-gradient-to-br from-green-400 to-green-600",
  "bg-gradient-to-br from-purple-400 to-purple-600",
  "bg-gradient-to-br from-yellow-400 to-yellow-600",
  "bg-gradient-to-br from-teal-400 to-teal-600",
  "bg-gradient-to-br from-orange-400 to-orange-600",
];

const getSpecialtyVisual = (
  title: string,
  index: number
): SpecialtyVisual => {
  const normalized = title.toLowerCase();

  if (normalized.includes("cardio")) {
    return { image: "/specialities/cardiology.jpg", icon: HeartPulse, fallbackBg: FALLBACK_BG_COLORS[0] };
  }
  if (normalized.includes("ortho")) {
    return { image: "/specialities/orthopedic.jpg", icon: Bone, fallbackBg: FALLBACK_BG_COLORS[1] };
  }
  if (normalized.includes("neuro") || normalized.includes("brain")) {
    return { image: "/specialities/neurology.jpg", icon: Brain, fallbackBg: FALLBACK_BG_COLORS[2] };
  }
  if (normalized.includes("derm") || normalized.includes("skin")) {
    return { image: "/specialities/dermetology.jpg", icon: Sparkles, fallbackBg: FALLBACK_BG_COLORS[3] };
  }
  if (
    normalized.includes("medicine") ||
    normalized.includes("physician") ||
    normalized.includes("internal")
  ) {
    return { image: "/specialities/medicine.jpg", icon: Stethoscope, fallbackBg: FALLBACK_BG_COLORS[4] };
  }

  return {
    icon: Stethoscope,
    fallbackBg: FALLBACK_BG_COLORS[index % FALLBACK_BG_COLORS.length],
  };
};

const getDoctorsLabel = (
  specialty: ISpecialty,
  doctorCounts: Map<string, number>
): string => {
  const key = specialty.title.trim().toLowerCase();
  const count = doctorCounts.get(key) ?? 0;
  return `${count} Doctor${count === 1 ? "" : "s"}`;
};

const getSpecialtyHref = (title: string) => {
  const query = new URLSearchParams();
  query.append(SPECIALTIES_FILTER_KEY, title);
  return `/consultation?${query.toString()}`;
};

interface IDoctorsApiResponse {
  success: boolean;
  message: string;
  data?: IDoctor[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const getAllDoctors = async (): Promise<IDoctor[]> => {
  if (!API_BASE_URL) {
    return [];
  }

  const doctors: IDoctor[] = [];

  try {
    let page = 1;
    let totalPages = 1;

    do {
      const response = await fetch(
        `${API_BASE_URL}/doctors?page=${page}&limit=100`,
        { next: { revalidate: 3600, tags: [DOCTORS_CACHE_TAG] } }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch doctors (${response.status})`);
      }

      const payload = (await response.json()) as IDoctorsApiResponse;
      doctors.push(...(payload.data ?? []));
      totalPages = payload.meta?.totalPages ?? 1;
      page += 1;
    } while (page <= totalPages);
  } catch (error) {
    console.error("Error fetching doctors:", error);
  }

  return doctors;
};

const getDoctorCountBySpecialty = (doctors: IDoctor[]): Map<string, number> => {
  const counts = new Map<string, number>();

  for (const doctor of doctors) {
    for (const entry of doctor.specialties ?? []) {
      const title = entry.specialty?.title?.trim().toLowerCase();
      if (!title) {
        continue;
      }
      counts.set(title, (counts.get(title) ?? 0) + 1);
    }
  }

  return counts;
};

const getSpecialties = async (): Promise<ISpecialty[]> => {
  if (!API_BASE_URL) {
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/specialties`, {
      next: { revalidate: 3600, tags: [CACHE_TAG] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch specialties (${response.status})`);
    }

    const payload = (await response.json()) as { data?: ISpecialty[] };
    return payload.data ?? [];
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return [];
  }
};

const Specialities = async () => {
  const [specialties, doctors] = await Promise.all([
    getSpecialties(),
    getAllDoctors(),
  ]);

  if (specialties.length === 0) {
    return null;
  }

  const doctorCounts = getDoctorCountBySpecialty(doctors);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            Available Medical Specialties
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Our platform provides access to top-rated medical experts across all
            major specialties, ensuring you receive specialized care for your
            specific needs.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 xl:grid-cols-5">
          {specialties.map((specialty, index) => {
            const visual = getSpecialtyVisual(specialty.title, index);
            const Icon = visual.icon;

            return (
              <Link
                key={specialty.id}
                href={getSpecialtyHref(specialty.title)}
                className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted">
                  {visual.image ? (
                    <Image
                      src={visual.image}
                      alt={specialty.title}
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className={cn(
                        "flex h-full w-full items-center justify-center",
                        visual.fallbackBg
                      )}
                    >
                      <Icon className="size-12 text-white/90" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/25" />

                  <div className="absolute left-1/2 top-1/2 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-white/20 sm:size-16">
                    <Icon className="size-7 text-primary sm:size-8" />
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <h3 className="text-base font-bold text-foreground sm:text-lg">
                    {specialty.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {getDoctorsLabel(specialty, doctorCounts)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Specialities;
