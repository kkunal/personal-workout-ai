
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Monthly",
    price: "$14.99",
    period: "/month",
    description: "Perfect for short-term fitness goals",
    features: [
      "Personalized workout plans",
      "Weekly plan adjustments",
      "Exercise tutorials",
      "Progress tracking",
      "Support chat",
    ],
  },
  {
    name: "Annual",
    price: "$149.99",
    period: "/year",
    description: "Best value for long-term fitness journey",
    features: [
      "Everything in Monthly plan",
      "2 months free",
      "Priority support",
      "Advanced analytics",
      "Nutrition tips",
    ],
    popular: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Start with a 14-day free trial. No credit card required.
            Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg overflow-hidden border ${
                plan.popular ? "border-blue-500 shadow-lg" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white text-center py-1">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="ml-1 text-xl text-gray-500">{plan.period}</span>
                </div>
                <p className="mt-2 text-gray-600">{plan.description}</p>

                <div className="mt-6">
                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""
                    }`}
                    asChild
                  >
                    <Link to="/pricing">View Details</Link>
                  </Button>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button size="lg" variant="default" asChild>
            <Link to="/pricing">See All Plans</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
