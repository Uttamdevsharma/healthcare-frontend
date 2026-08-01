import { Button } from '@/components/ui/button';
import Link from 'next/link';

const JoinProviders = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-background/10 backdrop-blur-md rounded-3xl p-8 md:p-16 border border-primary-foreground/20 text-center max-w-4xl mx-auto shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            Are You a Healthcare Professional?
          </h2>
          <p className="text-primary-foreground/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join our network of top-rated doctors and modern clinics. Reach more patients, streamline your scheduling, and deliver exceptional care through our advanced AI platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?role=doctor">
              <Button size="lg" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-6 rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
                Join as a Doctor
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 rounded-full font-bold transition-all">
                Partner with Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinProviders;
