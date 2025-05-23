
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Calendar, Dumbbell, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";
import { WorkoutDetailsList } from "@/components/workouts/WorkoutDetailsList";
import { useToast } from "@/hooks/use-toast";

const PlanDetails = () => {
  const { planId } = useParams();
  const { user, isLoading: authLoading } = useAuth();
  const [plan, setPlan] = useState<any | null>(null);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        setIsLoading(true);
        if (!planId) return;

        // Fetch the plan details
        const { data: planData, error: planError } = await supabase
          .from("workout_plans")
          .select("*")
          .eq("id", planId)
          .maybeSingle();

        if (planError) throw planError;
        if (!planData) {
          toast({
            title: "Plan not found",
            description: "The workout plan you're looking for doesn't exist",
            variant: "destructive",
          });
          navigate("/plans");
          return;
        }

        setPlan(planData);

        // Fetch the workouts for this plan
        const { data: workoutsData, error: workoutsError } = await supabase
          .from("workouts")
          .select(`
            *,
            exercises:exercises(*)
          `)
          .eq("plan_id", planId)
          .order("day_of_week");

        if (workoutsError) throw workoutsError;
        setWorkouts(workoutsData || []);

      } catch (error: any) {
        console.error("Error fetching plan details:", error);
        toast({
          title: "Failed to load plan details",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanDetails();
  }, [planId, navigate, toast]);

  const handleGoBack = () => {
    navigate("/plans");
  };

  if (authLoading || isLoading) {
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
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="gap-1" 
            onClick={handleGoBack}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Plans
          </Button>
        </div>

        {plan && (
          <>
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{plan.name}</h1>
                  <div className="flex items-center mt-2 text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {format(parseISO(plan.start_date), "MMM d, yyyy")} - {format(parseISO(plan.end_date), "MMM d, yyyy")}
                    </span>
                    {plan.is_active && (
                      <Badge variant="success" className="ml-2">Active</Badge>
                    )}
                  </div>
                  {plan.description && (
                    <p className="mt-2 text-gray-600">{plan.description}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
              {workouts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {workouts.map((workout) => (
                    <WorkoutDetailsList 
                      key={workout.id}
                      workout={workout}
                    />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-10">
                  <CardContent>
                    <p className="text-gray-500">No workouts found in this plan.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default PlanDetails;
