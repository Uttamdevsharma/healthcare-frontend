import {
  Video,
  CalendarCheck,
  FileText,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  Mic,
  MicOff,
  PhoneOff,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const features = [
  {
    title: "Instant Video Consultations",
    description: "Connect with certified doctors face-to-face via encrypted, high-definition video calls.",
    icon: Video,
  },
  {
    title: "Easy Appointment Scheduling",
    description: "Book or reschedule visits in seconds and sync seamlessly with your favorite calendar.",
    icon: CalendarCheck,
  },
  {
    title: "Digital Prescriptions",
    description: "Receive instant electronic prescriptions right after your visit, ready for pharmacy pickup.",
    icon: FileText,
  },
  {
    title: "Post-Consultation Care",
    description: "Continuous care and follow-ups with your provider for long-term wellness monitoring.",
    icon: Stethoscope,
  }
];

const ConsultationFeatures = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-background via-slate-50/50 to-background dark:via-muted/10">
      
      {/* Decorative Background Blur Elements */}
      <div className="absolute top-1/3 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content & Features */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="px-3 py-1 text-xs uppercase tracking-wider text-primary border-primary/30 bg-primary/5">
                Modern Healthcare Solutions
              </Badge>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                Seamless Appointments & <br />
                <span className="bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent">
                  Virtual Consultations
                </span>
              </h2>
              
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                Experience healthcare designed around your lifestyle. Our encrypted platform brings top-tier medical specialists directly to your screen—no waiting rooms required.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-5 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <feature.icon size={22} />
                  </div>
                  <h3 className="font-bold text-base text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 gap-2 font-semibold shadow-lg shadow-primary/20 hover:gap-3 transition-all">
                <Link href="/consultation">
                  Book a Consultation Now
                  <ArrowRight size={18} />
                </Link>
              </Button>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground px-2">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>100% HIPAA Compliant & Secure</span>
              </div>
            </div>
          </div>

          {/* Right Column - Modern Telehealth Interactive Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Card Wrapper */}
              <div className="relative rounded-3xl border border-border/80 bg-gradient-to-br from-card to-muted/40 p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
                
                {/* Status Bar Header */}
                <div className="flex items-center justify-between pb-4 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Live HD Call
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-background/80 px-2.5 py-1 rounded-full border border-border/50">
                    <Clock size={12} />
                    <span>14:25</span>
                  </div>
                </div>

                {/* Main Video Call Frame */}
                <div className="relative my-4 aspect-[4/3] rounded-2xl bg-slate-900 overflow-hidden shadow-inner flex flex-col justify-between p-4 border border-white/10">
                  
                  {/* Doctor Profile Overlay */}
                  <div className="relative z-10 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-white/10 w-max">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-teal-400 p-0.5">
                      <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xs">
                        DR
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Dr. Sarah Jenkins</p>
                      <p className="text-[10px] text-slate-300">Cardiologist • Online</p>
                    </div>
                  </div>

                  {/* Center Placeholder Graphic */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <Stethoscope size={120} className="text-white" />
                  </div>

                  {/* Patient Floating Self-View (PIP) */}
                  <div className="absolute bottom-4 right-4 w-24 h-32 rounded-xl bg-slate-800 border-2 border-white/20 shadow-lg overflow-hidden flex items-center justify-center">
                    <div className="text-center p-2">
                      <div className="w-8 h-8 rounded-full bg-primary/30 text-primary mx-auto flex items-center justify-center text-xs font-bold mb-1">
                        You
                      </div>
                      <span className="text-[9px] text-slate-400 block">Connected</span>
                    </div>
                  </div>

                  {/* Call Controls Toolbar */}
                  <div className="relative z-10 flex items-center gap-3 justify-center bg-slate-900/80 backdrop-blur-md py-2 px-4 rounded-full border border-white/10 w-max mx-auto">
                    <button className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors">
                      <Mic size={16} />
                    </button>
                    <button className="w-11 h-11 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors">
                      <PhoneOff size={18} />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors">
                      <Video size={16} />
                    </button>
                  </div>
                </div>

                {/* Floating Prescription Badge Overlay */}
                <div className="absolute -bottom-6 -left-6 bg-card border border-border/80 shadow-xl rounded-2xl p-3.5 flex items-center gap-3 hidden sm:flex animate-bounce-slow">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Digital Rx Generated</p>
                    <p className="text-[10px] text-muted-foreground">Ready for Instant Download</p>
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