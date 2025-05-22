
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "lucide-react";

export function OnboardingCTA() {
  return (
    <section className="py-16 bg-blue-50">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
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
        </div>
      </Container>
    </section>
  );
}
