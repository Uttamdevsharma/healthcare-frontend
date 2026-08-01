import { ShieldCheck, Lock, Award, FileCheck } from 'lucide-react';

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description: "Every doctor on our platform goes through a rigorous multi-step verification process to ensure highest medical standards."
  },
  {
    icon: Lock,
    title: "HIPAA Compliant",
    description: "Your health data and personal information are encrypted and protected by enterprise-grade security protocols."
  },
  {
    icon: Award,
    title: "Top-Tier Healthcare",
    description: "Partnering with leading hospitals and clinics to bring you award-winning medical expertise."
  },
  {
    icon: FileCheck,
    title: "Transparent Reviews",
    description: "100% authentic patient reviews and ratings help you make informed decisions about your healthcare."
  }
];

const TrustIndicators = () => {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Your Health & Privacy Are Our Priority</h2>
          <p className="text-primary-foreground/80 text-lg">
            We've built a platform that puts your safety first, combining cutting-edge technology with strict medical compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-primary-foreground/10 rounded-2xl backdrop-blur-sm border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all">
              <div className="w-16 h-16 rounded-full bg-primary-foreground text-primary flex items-center justify-center mb-6">
                <item.icon size={32} />
              </div>
              <h3 className="font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
