import { Search, ClipboardList, CalendarCheck, ShieldCheck, FileText, Video, CreditCard, HeartPulse } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const steps = [
  { icon: Search, title: 'AI Symptom Analysis', description: 'Enter your symptoms and medical history securely.' },
  { icon: ClipboardList, title: 'AI Matching Algorithm', description: 'Our AI analyzes your data to find the perfect specialist.' },
  { icon: CalendarCheck, title: 'Review & Select', description: 'Compare doctor profiles, ratings, and available slots.' },
  { icon: ShieldCheck, title: 'Book Appointment', description: 'Securely schedule with your matched healthcare provider.' },
  { icon: Video, title: 'Virtual Consultation', description: 'Connect via our secure, high-definition video platform.' },
  { icon: HeartPulse, title: 'Personalized Care', description: 'Receive tailored treatment plans and digital prescriptions.' },
];

const StepCard = ({ icon: Icon, title, description, index }: { icon: React.ElementType, title: string, description: string, index: number }) => {
    return (
        <Card className="group border-transparent hover:border-primary/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden bg-background">
            {/* Number indicator */}
            <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-primary/5 flex items-end justify-start p-4 text-2xl font-black text-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                {index + 1}
            </div>
            
            <CardContent className="p-6">
                 <div className="flex flex-col space-y-4">
                    <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit group-hover:scale-110 transition-transform">
                        <Icon size={32} />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-foreground mb-2">{title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};


const Steps = () => {
  return (
    <section className="py-24 bg-muted/10 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">How Our AI Process Works</h2>
          <p className="text-muted-foreground text-lg">
            Experience the future of healthcare. Our intelligent matching process ensures you find exactly the right care when you need it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
                <StepCard key={index} {...step} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
