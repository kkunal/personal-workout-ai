
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

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
  const { user } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (plan: typeof plans[0]) => {
    try {
      setLoadingPlan(plan.name);
      
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { plan },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.url) {
        // Direct redirection to the Stripe checkout URL
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Error",
        description: error instanceof Error ? error.message : "Failed to start checkout process",
        variant: "destructive",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

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
                  {user ? (
                    <Button 
                      className={`w-full ${
                        plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""
                      }`}
                      onClick={() => handleCheckout(plan)}
                      disabled={loadingPlan === plan.name}
                    >
                      {loadingPlan === plan.name ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Select Plan"
                      )}
                    </Button>
                  ) : (
                    <Link to="/auth">
                      <Button
                        className={`w-full ${
                          plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""
                        }`}
                      >
                        Start Free Trial
                      </Button>
                    </Link>
                  )}
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
      </Container>
    </section>
  );
}
