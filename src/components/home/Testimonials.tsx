
import { useState } from "react";
import { Container } from "@/components/ui/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Lost 30lbs in 6 months",
      quote: "FitPlan changed my life. The personalized workouts kept me motivated and I've never felt better. It's not just about weight loss, but how I feel every day!",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Michael Chen",
      role: "Marathon Runner",
      quote: "As someone who's tried many fitness apps, FitPlan stands out with its adaptability. My training improved significantly, and I finally achieved my personal best in my last marathon.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "Emma Rodriguez",
      role: "Busy Mom of Three",
      quote: "Finding time to work out with three kids seemed impossible until FitPlan. The quick, effective workouts I can do at home have been a game-changer for my health and energy levels.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      name: "James Wilson",
      role: "Recovered from Injury",
      quote: "After my back injury, I was afraid to exercise again. FitPlan's adaptive workouts gradually rebuilt my strength and confidence. My physical therapist is amazed at my recovery!",
      image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80"
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Transforming Lives Every Day
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our community about how FitPlan has helped them achieve their fitness goals and improve their lives.
          </p>
        </div>
        
        <div className="relative px-4 sm:px-12">
          <Carousel 
            opts={{
              loop: true,
              align: "start"
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/3 pl-4">
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4 text-blue-600">
                        <Quote size={32} />
                      </div>
                      <blockquote className="flex-grow mb-6 italic text-gray-700">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-4">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-blue-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
