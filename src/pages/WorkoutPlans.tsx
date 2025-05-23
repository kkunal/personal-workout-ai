
import { Container } from "@/components/ui/container";
import { WorkoutPlansList } from "@/components/workouts/WorkoutPlansList";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GenerateWorkoutButton } from "@/components/workouts/GenerateWorkoutButton";
import { supabase } from "@/integrations/supabase/client";

const WorkoutPlans = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [hasPlans, setHasPlans] = useState(false);
  const [isCheckingPlans, setIsCheckingPlans] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    const checkForPlans = async () => {
      if (!user) return;
      
      try {
        const { count, error } = await supabase
          .from("workout_plans")
          .select("*", { count: 'exact', head: true });
        
        if (error) throw error;
        setHasPlans(count !== null && count > 0);
      } catch (error) {
        console.error("Error checking for plans:", error);
      } finally {
        setIsCheckingPlans(false);
      }
    };
    
    checkForPlans();
  }, [user]);

  const handleWorkoutGenerated = (planId: string) => {
    // Set hasPlans to true immediately to hide the button
    setHasPlans(true);
    // Refresh the plans list
    window.location.reload();
  };

  if (isLoading || isCheckingPlans) {
    return (
      <Container className="py-12">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Container>
    );
  }

  return (
    <div className="py-12">
      <Container>
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Workout Plans</h1>
            <p className="text-gray-600 mt-2">
              View and manage your personalized workout plans
            </p>
          </div>
          {!hasPlans && (
            <div className="mt-4 md:mt-0">
              <GenerateWorkoutButton onSuccess={handleWorkoutGenerated} />
            </div>
          )}
        </div>

        <WorkoutPlansList />
      </Container>
    </div>
  );
};

export default WorkoutPlans;
