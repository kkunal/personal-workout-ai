
import { Container } from "@/components/ui/container";
import { WorkoutPlansList } from "@/components/workouts/WorkoutPlansList";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const WorkoutPlans = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Workout Plans</h1>
          <p className="text-gray-600 mt-2">
            View and manage your personalized workout plans
          </p>
        </div>

        <WorkoutPlansList />
      </Container>
    </div>
  );
};

export default WorkoutPlans;
