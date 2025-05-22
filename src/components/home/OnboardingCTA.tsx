
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRight, CheckCircle } from "lucide-react";

interface OnboardingCTAProps {
  completed?: boolean | null;
}

export function OnboardingCTA({ completed = false }: OnboardingCTAProps) {
  return (
    <section className="py-16 bg-blue-50">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          {completed ? (
            <>
              <div className="flex justify-center mb-4">
                <CheckCircle className="text-green-500 h-12 w-12" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Profile Complete
              </h2>
              <p className="text-gray-600 mb-6">
                Your profile and preferences are set up. Check out your personalized workout plan!
              </p>
              <Button asChild size="lg">
                <Link to="/dashboard">
                  View Your Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Complete Your Profile
              </h2>
              <p className="text-gray-600 mb-6">
                Take our quick onboarding questionnaire to help us create a personalized workout plan that's perfect for your goals and preferences.
              </p>
              <Button asChild size="lg">
                <Link to="/onboarding">
                  Start Questionnaire <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
