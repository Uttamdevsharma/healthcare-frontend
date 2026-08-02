import Image from "next/image";
import Link from "next/link";
import { CalendarCheck2, HeartPulse, ShieldCheck, Sparkles, Star, Video } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Care",
    description: "Smart symptom analysis and instant guidance, powered by medical AI.",
  },
  {
    icon: Video,
    title: "24/7 Video Consultations",
    description: "Connect with verified specialists from the comfort of your home.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Specialists",
    description: "Every doctor is licensed, vetted, and rated by real patients.",
  },
];

const AuthShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh w-full bg-background">
      {/* Branding panel */}
      <aside className="relative hidden w-[44%] shrink-0 overflow-hidden lg:flex lg:flex-col xl:w-[46%]">
        <div className="absolute inset-0 bg-primary">
          <Image
            src="/hero-doctor.jpg"
            alt=""
            fill
            priority
            sizes="46vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/85 to-primary/95" />
          <div className="absolute -top-24 -right-24 size-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 size-96 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-between p-10 text-primary-foreground xl:p-14">
          <Link href="/" className="flex w-fit items-center gap-2.5" aria-label="Kalinga Health — Home">
            <span className="flex size-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
              <HeartPulse className="size-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight">Kalinga</span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-white/70">Health</span>
            </span>
          </Link>

          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20">
                <Sparkles className="size-3.5" />
                Trusted by 50,000+ patients
              </span>
              <h1 className="text-3xl font-bold leading-tight tracking-tight xl:text-[2.5rem] xl:leading-[1.15]">
                Healthcare that cares, whenever you need it.
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-primary-foreground/80">
                Book appointments, consult specialists online, and manage your health records — all in one place.
              </p>
            </div>

            <ul className="space-y-5">
              {features.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20">
                    <Icon className="size-4.5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-sm leading-relaxed text-primary-foreground/70">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <figure className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur-sm">
            <div className="flex gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-3 text-sm leading-relaxed text-primary-foreground/90">
              &ldquo;I booked a specialist consultation in under two minutes and got a follow-up the same day. Kalinga has made healthcare genuinely effortless.&rdquo;
            </blockquote>
            <figcaption className="mt-3 flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-full bg-white/15 text-xs font-bold">
                PM
              </span>
              <span className="text-sm font-medium">Priya Mehta</span>
              <span className="hidden text-xs text-primary-foreground/60 sm:inline">· Patient since 2024</span>
            </figcaption>
          </figure>
        </div>
      </aside>

      {/* Form panel */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="mb-8 flex items-center gap-2.5 lg:hidden"
          aria-label="Kalinga Health — Home"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
            <HeartPulse className="size-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight">Kalinga</span>
            <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Health</span>
          </span>
        </Link>

        <div className="w-full max-w-[420px]">{children}</div>

        <p className="mt-8 flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarCheck2 className="size-3.5" />
          © {new Date().getFullYear()} Kalinga Health. All rights reserved.
        </p>
      </main>
    </div>
  );
};

export default AuthShell;
