import {
  HeartPulse,
  Users,
  ShieldCheck,
  Sparkles,
  Target,
  Lightbulb,
  Award,
  Clock,
  Star,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const missionValues = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To democratize healthcare access through intelligent technology, connecting every patient with the right care at the right time.",
  },
  {
    icon: Lightbulb,
    title: "Our Vision",
    description:
      "A future where AI-powered healthcare eliminates barriers, making personalized medical care accessible to everyone, everywhere.",
  },
  {
    icon: HeartPulse,
    title: "Our Values",
    description:
      "Empathy, innovation, integrity, and excellence guide everything we build. We put patients and providers first in every decision.",
  },
];

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Matching",
    description:
      "Our intelligent algorithm analyzes your symptoms and medical history to match you with the most suitable healthcare professionals.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Compliant",
    description:
      "Enterprise-grade security with full HIPAA compliance ensures your health data is always protected and private.",
  },
  {
    icon: Clock,
    title: "Instant Access",
    description:
      "Book appointments in seconds, consult with doctors via video, and receive prescriptions — all from one platform.",
  },
  {
    icon: Award,
    title: "Verified Experts",
    description:
      "Every doctor on our platform undergoes rigorous verification, ensuring you receive care from qualified professionals.",
  },
];

const stats = [
  { value: "500+", label: "Verified Doctors", icon: Users },
  { value: "50K+", label: "Patients Served", icon: HeartPulse },
  { value: "98%", label: "Satisfaction Rate", icon: Star },
  { value: "24/7", label: "Support Available", icon: ShieldCheck },
];

const team = [
  {
    name: "Dr. Amara Chen",
    role: "Chief Medical Officer",
    image: "/hero-doctor.png",
    bio: "Leading our medical strategy with over 15 years of clinical experience.",
  },
  {
    name: "Raj Patel",
    role: "Head of Engineering",
    image: "/hero-doctor.png",
    bio: "Driving our AI platform development with a focus on scalability and reliability.",
  },
  {
    name: "Sarah Mitchell",
    role: "Director of Operations",
    image: "/hero-doctor.png",
    bio: "Ensuring seamless operations and the best possible experience for every user.",
  },
  {
    name: "James Okafor",
    role: "Head of Product",
    image: "/hero-doctor.png",
    bio: "Crafting intuitive healthcare experiences that put patients first.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden">
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
              About DocCare
            </Badge>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Building the Future of
              <span className="bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
                {" "}
                Healthcare
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              DocCare is an AI-powered healthcare platform designed to connect
              patients with the right doctors instantly. We combine cutting-edge
              technology with compassionate care to make healthcare simpler,
              faster, and more accessible.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-muted/10 relative overflow-hidden">
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
              Who We Are
            </h2>
            <p className="text-muted-foreground text-lg mt-4">
              We are a team of healthcare professionals and technologists
              passionate about transforming the patient experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionValues.map((item, index) => (
              <Card
                key={index}
                className="group border-transparent hover:border-primary/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden bg-card"
              >
                <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-primary/5 flex items-end justify-start p-4 text-2xl font-black text-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  {index + 1}
                </div>
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <item.icon size={28} />
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-muted/50 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge
              variant="outline"
              className="mb-4 px-3 py-1 text-xs uppercase tracking-wider text-primary border-primary/30 bg-primary/5"
            >
              Why DocCare
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
              What Sets Us Apart
            </h2>
            <p className="text-muted-foreground text-lg mt-4">
              We combine the power of AI with a human touch to deliver
              healthcare that truly cares.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <feature.icon size={22} />
                </div>
                <h3 className="font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Impact by the Numbers
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Delivering measurable results in healthcare accessibility and
              patient satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-primary-foreground/10 rounded-2xl backdrop-blur-sm border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-primary-foreground text-primary flex items-center justify-center mb-4">
                  <stat.icon size={28} />
                </div>
                <div className="text-3xl lg:text-4xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/80 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 bg-muted/10 relative overflow-hidden">
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge
              variant="outline"
              className="mb-4 px-3 py-1 text-xs uppercase tracking-wider text-primary border-primary/30 bg-primary/5"
            >
              Our Leadership
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground text-lg mt-4">
              Dedicated professionals driving innovation in healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="group border-transparent hover:border-primary/20 hover:shadow-xl transition-all duration-300 overflow-hidden bg-card"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mx-auto mb-4 overflow-hidden border-2 border-primary/10 group-hover:border-primary/30 transition-colors">
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-teal-100 flex items-center justify-center text-primary font-bold text-lg">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed">
              Join thousands of patients who have already experienced the future
              of healthcare with DocCare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                <Link href="/register">Get Started</Link>
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

      {/* Contact Info */}
      <section className="py-16 bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <MapPin size={22} />
              </div>
              <h4 className="font-semibold text-foreground">Our Office</h4>
              <p className="text-sm text-muted-foreground">
                123 Medical Innovation Lane
                <br />
                Health City, HC 12345
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Phone size={22} />
              </div>
              <h4 className="font-semibold text-foreground">Call Us</h4>
              <p className="text-sm text-muted-foreground">
                +1 (555) 123-4567
                <br />
                support@doccare.com
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Mail size={22} />
              </div>
              <h4 className="font-semibold text-foreground">Email Us</h4>
              <p className="text-sm text-muted-foreground">
                hello@doccare.com
                <br />
                We respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}