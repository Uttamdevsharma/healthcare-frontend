import { Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { type ISpecialty } from "@/types/specialty.types";

const SPECIALTIES_FILTER_KEY = "specialties.specialty.title";
const CACHE_TAG = "landing-specialties";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const FALLBACK_BG_COLORS = [
  "bg-red-100 text-red-500",
  "bg-blue-100 text-blue-500",
  "bg-pink-100 text-pink-500",
  "bg-green-100 text-green-500",
  "bg-purple-100 text-purple-500",
  "bg-yellow-100 text-yellow-500",
  "bg-teal-100 text-teal-500",
  "bg-orange-100 text-orange-500",
];

const getSpecialtyHref = (title: string) => {
  const query = new URLSearchParams();
  query.append(SPECIALTIES_FILTER_KEY, title);
  return `/consultation?${query.toString()}`;
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
  const specialties = await getSpecialties();

  if (specialties.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Available Medical Specialties</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Our platform provides access to top-rated medical experts across all major specialties, ensuring you receive specialized care for your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((specialty, index) => (
            <Link
              key={specialty.id}
              href={getSpecialtyHref(specialty.title)}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl"
            >
              <Card
                className={cn(
                  'text-center transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-2 border-transparent hover:border-primary/20',
                )}
              >
                <CardContent className="p-8">
                   <div
                    className={cn(
                      'w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6',
                      FALLBACK_BG_COLORS[index % FALLBACK_BG_COLORS.length]
                    )}
                  >
                    {specialty.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={specialty.icon}
                        alt={specialty.title}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <Stethoscope size={32} />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {specialty.title}
                  </h3>
                  {specialty.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {specialty.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialities;
