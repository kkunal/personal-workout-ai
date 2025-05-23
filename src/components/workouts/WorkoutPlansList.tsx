
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { WorkoutPlanCard } from "./WorkoutPlanCard";
import { useNavigate } from "react-router-dom";

export function WorkoutPlansList() {
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchWorkoutPlans = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("workout_plans")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setPlans(data || []);
    } catch (error: any) {
      console.error("Error fetching workouts:", error);
      toast({
        title: "Failed to load workouts",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkoutPlans();
  }, []);

  const handleViewPlanDetails = (planId: string) => {
    navigate(`/plans/${planId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Workouts</h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plans.map((plan) => (
            <WorkoutPlanCard 
              key={plan.id} 
              plan={plan} 
              onViewDetails={handleViewPlanDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <h3 className="text-lg font-medium text-gray-900">No workouts yet</h3>
          <p className="text-gray-600 mt-1 mb-4">
            Generate your first personalized workout based on your profile
          </p>
        </div>
      )}
    </div>
  );
}
