
import { useState, useEffect } from "react";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Pricing } from "@/components/home/Pricing";
import { OnboardingCTA } from "@/components/home/OnboardingCTA";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Home = () => {
  const { user } = useAuth();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkOnboardingStatus() {
      if (!user) {
        setHasCompletedOnboarding(null);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("fitness_level")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error checking onboarding status:", error);
          setHasCompletedOnboarding(false);
        } else {
          setHasCompletedOnboarding(data && data.fitness_level !== null);
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        setHasCompletedOnboarding(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkOnboardingStatus();
  }, [user]);

  return (
    <>
      <Hero />
      <Features />
      {user && !isLoading && (
        <OnboardingCTA completed={hasCompletedOnboarding} />
      )}
      <Pricing />
    </>
  );
};

export default Home;
