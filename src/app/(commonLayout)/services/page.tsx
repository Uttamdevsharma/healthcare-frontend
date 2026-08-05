"use client";
import { useState } from "react";
import { CalendarCheck, Clock, CheckCircle, ArrowRight, Star, Heart, Activity, Stethoscope, Pill, Beaker, Users, Shield, Smartphone, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const services = [
  {
    icon: Stethoscope,
    title: "Primary Care",
    description: "Comprehensive primary healthcare services including routine check-ups, preventive care, and chronic disease management.",
    features: ["Annual physical exams", "Vaccinations", "Chronic disease monitoring", "Health counseling"],
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    icon: Heart,
    title: "Cardiology",
    description: "Expert cardiological care including heart disease prevention, cardiac rehabilitation, and advanced cardiac diagnostics.",
    features: ["EKG monitoring", "Stress tests", "Cardiac rehab", "Heart health counseling"],
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    icon: Activity,
    title: "Diagnostic Imaging",
    description: "State-of-the-art diagnostic imaging including X-rays, MRI, CT scans, and ultrasound services.",
    features: ["Digital X-ray", "MRI scans", "CT imaging", "Ultrasound"],
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    icon: Pill,
    title: "E-Pharmacy",
    description: "Comprehensive online pharmacy with prescription services, medication management, and health supplements.",
    features: ["24/7 prescription refills", "Medication reminders", "Health supplements", "Bulk ordering"],
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    icon: Beaker,
    title: "Lab Testing",
    description: "Comprehensive laboratory services including blood tests, DNA testing, and specialized health screenings.",
    features: ["Complete blood count", "Diabetes testing", "COVID-19 tests", "DNA analysis"],
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    icon: Users,
    title: "Telemedicine",
    description: "Secure video consultations with licensed healthcare providers from the comfort of your home.",
    features: ["Video consultations", "Secure messaging", "Digital prescriptions", "Follow-up care"],
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
  },
];

const serviceCategories = [
  { title: "Primary Care", count: "500+ services", icon: Stethoscope },
  { title: "Specialty Care", count: "200+ specialists", icon: Heart },
  { title: "Diagnostics", count: "1000+ tests", icon: Beaker },
  { title: "Pharmacy", count: "2000+ medications", icon: Pill },
  { title: "Telemedicine", count: "24/7 available", icon: Smartphone },
  { title: "Wellness", count: "Complete packages", icon: Shield },
];

export default function ServicesPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-20 lg:py-28">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 90%, #fff 30%, #155DFC 100%)",
          }}
        />
        <div className="pointer-events-none absolute -left-20 top-16 z-0 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 z-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 px-4 pb-28 pt-8 md:px-8 lg:px-16 lg:pt-12">
          <div className="mx-auto max-w-[1200px] text-center">
            <Badge
              variant="outline"
              className="mb-6 px-4 py-1.5 text-xs uppercase tracking-wider text-primary border-primary/30 bg-primary/5"
            >
              Our Services
            </Badge>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Comprehensive Healthcare
              <span className="bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
                {" "}Solutions
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Experience the future of healthcare with our complete range of medical services, all designed to put your health and convenience first.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-muted/50 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
              Complete Healthcare Services
            </h2>
            <p className="text-muted-foreground text-lg mt-4">
              From routine check-ups to specialized treatments, we have you covered.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {serviceCategories.map((category, index) => (
              <Card
                key={index}
                className="group border-transparent hover:border-primary/20 hover:shadow-xl transition-all duration-300 overflow-hidden bg-card"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 mx-auto">
                    <category.icon size={24} />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.count}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge
              variant="outline"
              className="mb-4 px-3 py-1 text-xs uppercase tracking-wider text-primary border-primary/30 bg-primary/5"
            >
              Service Details
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
              Our Healthcare Services
            </h2>
            <p className="text-muted-foreground text-lg mt-4">
              Discover our comprehensive range of medical services designed for your health and well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`group border ${service.borderColor} ${service.bgColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden cursor-pointer ${hoveredService === index ? 'ring-2 ring-primary/30' : ''}`}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}> 
                    <service.icon size={32} />
                  </div>

                  <h3 className="font-bold text-xl text-foreground mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                          <CheckCircle size={12} />
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/60">
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Getting the care you need is simple with our streamlined process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Book Appointment", icon: CalendarCheck, desc: "Choose your service and schedule online" },
              { step: 2, title: "Consult", icon: Clock, desc: "Meet with our healthcare professionals" },
              { step: 3, title: "Get Treated", icon: Stethoscope, desc: "Receive personalized care and treatment" },
              { step: 4, title: "Follow-up", icon: CheckCircle, desc: "Stay connected with ongoing care" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary-foreground/10 border-2 border-primary-foreground/20 flex items-center justify-center mb-6 relative">
                  <item.icon size={28} />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-primary-foreground/80 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-muted/10 relative overflow-hidden">
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge
                variant="outline"
                className="mb-4 px-3 py-1 text-xs uppercase tracking-wider text-primary border-primary/30 bg-primary/5"
              >
                Why Choose Us
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-6">
                Your Health, Our Priority
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                We're committed to providing exceptional healthcare services with compassion, expertise, and cutting-edge technology.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Star, title: "Quality Care", desc: "Accredited doctors and advanced medical technology" },
                  { icon: Shield, title: "Secure Platform", desc: "HIPAA-compliant with enterprise-grade security" },
                  { icon: Award, title: "Proven Track Record", desc: "Serving over 50,000+ patients successfully" },
                  { icon: Users, title: "Expert Team", desc: "Board-certified specialists and healthcare professionals" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <feature.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/hero-doctor.png"
                  alt="Healthcare professional"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              <div className="absolute -top-6 -left-6 w-48 h-48 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Experience Better Healthcare?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
              Join thousands of satisfied patients who trust DocCare for their healthcare needs. Book your appointment today and start your journey to better health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                <Link href="/register">Get Started Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg font-semibold transition-all"
              >
                <Link href="/consultation">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
