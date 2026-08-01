import { Video, CalendarCheck, FileText, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const features = [
  {
    title: "Instant Video Consultations",
    description: "Connect with your doctor face-to-face from anywhere in the world using our high-quality, secure video platform.",
    icon: Video,
  },
  {
    title: "Easy Appointment Scheduling",
    description: "Book, reschedule, or cancel appointments with just a few clicks. Sync with your calendar effortlessly.",
    icon: CalendarCheck,
  },
  {
    title: "Digital Prescriptions",
    description: "Receive digital prescriptions instantly after your consultation. Send them directly to your preferred pharmacy.",
    icon: FileText,
  },
  {
    title: "Post-Consultation Follow-ups",
    description: "Stay in touch with your healthcare provider for post-consultation care and health monitoring.",
    icon: Stethoscope,
  }
];

const ConsultationFeatures = () => {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Seamless Appointments & <br />
                <span className="text-primary">Virtual Consultations</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Experience healthcare that fits your lifestyle. Our platform combines intuitive scheduling with high-definition video consultations, bringing the doctor's office to your living room.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col space-y-2 p-4 rounded-2xl bg-muted/50 border border-transparent hover:border-primary/20 transition-all">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="font-bold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            <Button className="mt-4 bg-primary text-primary-foreground px-8 py-6 rounded-full text-lg hover:shadow-lg hover:scale-105 transition-all">
              Book a Consultation Now
            </Button>
          </div>

          <div className="lg:w-1/2 relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            {/* We'll use a gradient placeholder instead of an image since we don't have a specific asset */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-teal-400/20 mix-blend-multiply z-10" />
            <div className="absolute inset-0 bg-secondary/10 flex items-center justify-center">
               <div className="relative w-full h-full bg-gradient-to-tr from-primary/80 to-secondary/80 flex items-center justify-center p-8">
                  <div className="w-full max-w-sm bg-background rounded-2xl shadow-xl overflow-hidden p-6 animate-pulse">
                      <div className="flex justify-between items-center mb-6">
                         <div className="w-12 h-12 bg-muted rounded-full" />
                         <div className="w-24 h-8 bg-muted rounded-full" />
                      </div>
                      <div className="w-full h-48 bg-muted rounded-xl mb-4 flex items-center justify-center">
                          <Video className="text-muted-foreground opacity-20" size={48} />
                      </div>
                      <div className="flex gap-4 justify-center">
                         <div className="w-12 h-12 bg-red-100 rounded-full" />
                         <div className="w-12 h-12 bg-muted rounded-full" />
                         <div className="w-12 h-12 bg-muted rounded-full" />
                      </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationFeatures;
