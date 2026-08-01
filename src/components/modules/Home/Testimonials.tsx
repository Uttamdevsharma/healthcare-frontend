import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import samplePhoto from "../../../assets/doctor-cardiologist.jpg";

const testimonials = [
  {
    name: "Robert Fox",
    role: "Patient",
    image: samplePhoto,
    quote:
      "The care and professionalism I received were outstanding. The AI matching found the perfect cardiologist for my specific condition in minutes. The video consultation was flawless.",
    rating: 5,
  },
  {
    name: "Jane Cooper",
    role: "Patient",
    image: samplePhoto,
    quote:
      "A seamless experience from booking an appointment to the consultation. The use of technology for prescriptions and follow-ups is incredibly convenient for my busy schedule.",
    rating: 5,
  },
  {
    name: "Wade Warren",
    role: "Patient",
    image: samplePhoto,
    quote:
      "I highly recommend their services. The specialists are top-notch, and the secure access to all my medical records in one place has greatly improved my healthcare journey.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-background py-24 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-muted/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Patient Success Stories
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Don't just take our word for it. Here is what our patients have to say about their experience with our AI-powered platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-300 relative group">
              <CardContent className="p-8">
                <Quote
                  className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors"
                  size={64}
                />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="text-yellow-400 fill-current mr-1"
                          size={18}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed italic mb-8">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  
                  <div className="flex items-center pt-6 border-t border-muted">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                       {/* Note: since samplePhoto might not be a valid avatar for patients, we could just render initials or the image */}
                       <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-muted-foreground text-sm font-medium text-primary">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
