import { Hero } from "@/components/modules/Home/Hero";
import Specialities from "@/components/modules/Home/Specialties";
import Steps from "@/components/modules/Home/Steps";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopRatedDoctors from "@/components/modules/Home/TopRatedDoctors";
import ConsultationFeatures from "@/components/modules/Home/ConsultationFeatures";
import TrustIndicators from "@/components/modules/Home/TrustIndicators";
import Comparison from "@/components/modules/Home/Comparison";
import JoinProviders from "@/components/modules/Home/JoinProviders";
import { getTopRatedDoctors } from "@/services/doctor.services";
import { type IDoctor } from "@/types/doctor.types";
import Head from "next/head";

export default async function Home() {
  let topRatedDoctors: IDoctor[] = [];

  try {
    const response = await getTopRatedDoctors();
    topRatedDoctors = response.data ?? [];
  } catch (error) {
    console.error("Error fetching top rated doctors:", error);
  }

  return (
    <>
      <Head>
        <title>AI-Powered Healthcare - Find Your Perfect Doctor</title>
        <meta
          name="description"
          content="Discover top-rated doctors tailored to your needs with our AI-powered healthcare platform. Get personalized recommendations and book appointments effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <Specialities />
        <TopRatedDoctors initialDoctors={topRatedDoctors} />
        <TrustIndicators />
        <Steps />
        <ConsultationFeatures />
        <Comparison />
        <Testimonials />
        <JoinProviders />
      </main>
    </>
  );
}
