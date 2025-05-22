
import { Container } from "@/components/ui/container";
import { Dumbbell, Calendar, Heart, Settings, Clock, BarChart3 } from "lucide-react";

const features = [
  {
    title: "Personalized Workouts",
    description: "Workouts tailored specifically to your goals, fitness level and available equipment.",
    icon: <Dumbbell className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Weekly Planning",
    description: "Structured weekly plans to keep you consistent and motivated throughout your journey.",
    icon: <Calendar className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Health Focused",
    description: "Plans designed with your overall health and well-being in mind.",
    icon: <Heart className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Customizable",
    description: "Easily adjust your workouts as your fitness level improves or your goals change.",
    icon: <Settings className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Time Efficient",
    description: "Workouts designed to maximize results in the time you have available.",
    icon: <Clock className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Progress Tracking",
    description: "Monitor your improvements and stay motivated with visual progress tracking.",
    icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Everything You Need for Your Fitness Journey
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our platform provides all the tools you need to achieve your fitness goals, no matter your experience level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
