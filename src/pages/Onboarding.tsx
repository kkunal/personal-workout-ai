
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Container } from "@/components/ui/container";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData: any) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to complete onboarding",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save user profile data to Supabase
      const { error } = await supabase
        .from("user_profiles")
        .upsert({
          id: user.id,
          first_name: user.user_metadata?.first_name || "",
          last_name: user.user_metadata?.last_name || "",
          fitness_level: formData.fitnessLevel,
          fitness_goals: formData.fitnessGoals,
          preferred_exercises: formData.preferredExercises,
          available_equipment: formData.equipment
        });

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your fitness profile has been saved successfully."
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update your profile",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Let's Get Started</h1>
            <p className="mt-2 text-gray-600">
              Tell us about your fitness goals and preferences so we can create your personalized plan.
            </p>
          </div>
          <OnboardingForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        </div>
      </Container>
    </div>
  );
};

export default Onboarding;
