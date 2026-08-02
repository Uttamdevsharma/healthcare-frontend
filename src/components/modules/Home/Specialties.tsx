import { HeartPulse, Brain, Bone, Baby, Eye, Ear, Stethoscope, Activity, Scissors, Syringe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const SPECIALTIES_FILTER_KEY = 'specialties.specialty.title';

const getSpecialtyHref = (title: string) => {
  const query = new URLSearchParams();
  query.append(SPECIALTIES_FILTER_KEY, title);
  return `/consultation?${query.toString()}`;
};

const specialists = [
  {
    name: 'Cardiology',
    icon: HeartPulse,
    description: 'Expert care for your heart and cardiovascular system.',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-500',
  },
  {
    name: 'Neurology',
    icon: Brain,
    description: 'Advanced treatments for brain and nervous system disorders.',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-500',
  },
  {
    name: 'Orthopedic',
    icon: Bone,
    description: 'Comprehensive care for bones, joints, and muscles.',
    bgColor: 'bg-pink-100',
    iconColor: 'text-pink-500',
  },
  {
    name: 'Pediatrics',
    icon: Baby,
    description: 'Specialized healthcare for infants, children, and adolescents.',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-500',
  },
  {
    name: 'Ophthalmology',
    icon: Eye,
    description: 'Complete eye care, vision correction, and eye surgery.',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-500',
  },
  {
    name: 'Dermatology',
    icon: Scissors, // Using Scissors as a proxy for surgery/dermatology
    description: 'Expert treatments for skin, hair, and nail conditions.',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-500',
  },
  {
    name: 'General Medicine',
    icon: Stethoscope,
    description: 'Primary care and comprehensive health management.',
    bgColor: 'bg-teal-100',
    iconColor: 'text-teal-500',
  },
  {
    name: 'Psychiatry',
    icon: Activity,
    description: 'Mental health evaluation, therapy, and counseling.',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-500',
  }
];

const Specialities = () => {
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
          {specialists.map((specialist) => (
            <Link
              key={specialist.name}
              href={getSpecialtyHref(specialist.name)}
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
                      specialist.bgColor
                    )}
                  >
                    <specialist.icon
                      className={cn(specialist.iconColor)}
                      size={32}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {specialist.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {specialist.description}
                  </p>
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
