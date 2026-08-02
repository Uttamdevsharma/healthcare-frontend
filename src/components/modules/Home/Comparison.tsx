import { Check, X } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Comparison = () => {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">Why Choose Kalinga Health?</h2>
          <p className="text-muted-foreground text-lg">
            See how our AI-powered healthcare platform compares to traditional medical experiences.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-none shadow-xl bg-background">
            <div className="grid grid-cols-3 bg-muted/50 p-6 border-b">
              <div className="col-span-1 font-bold text-muted-foreground">Features</div>
              <div className="col-span-1 text-center font-bold text-foreground">Traditional Healthcare</div>
              <div className="col-span-1 text-center font-bold text-primary">Kalinga Health AI Platform</div>
            </div>

            <div className="divide-y">
              {[
                { feature: "Doctor Matching", traditional: "Trial & Error", ai: "AI Precision Matching" },
                { feature: "Appointment Booking", traditional: "Phone Calls & Waiting", ai: "Instant 24/7 Digital Booking" },
                { feature: "Wait Times", traditional: "Weeks to Months", ai: "Same-Day Availability" },
                { feature: "Consultation Type", traditional: "In-person Only", ai: "In-person & HD Video" },
                { feature: "Records Management", traditional: "Scattered & Paper-based", ai: "Centralized Digital Vault" },
                { feature: "Prescriptions", traditional: "Paper Slips", ai: "Instant Digital Routing" }
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 p-6 hover:bg-muted/10 transition-colors items-center">
                  <div className="col-span-1 font-medium text-foreground">{row.feature}</div>
                  <div className="col-span-1 text-center text-muted-foreground flex flex-col items-center gap-2">
                    <X className="text-destructive/50" size={20} />
                    <span className="text-sm">{row.traditional}</span>
                  </div>
                  <div className="col-span-1 text-center font-semibold text-primary flex flex-col items-center gap-2">
                    <Check className="text-primary" size={20} />
                    <span className="text-sm">{row.ai}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
