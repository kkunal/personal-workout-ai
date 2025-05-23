
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Dumbbell, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { WorkoutPlansList } from "@/components/workouts/WorkoutPlansList";
import { TrialAlert } from "@/components/subscription/TrialAlert";
import { SubscriptionCard } from "@/components/subscription/SubscriptionCard";

const Dashboard = () => {
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome{user?.user_metadata?.first_name ? `, ${user.user_metadata.first_name}` : ""}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's an overview of your fitness journey
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button asChild>
              <Link to="/plans">View All Plans</Link>
            </Button>
          </div>
        </div>

        <TrialAlert />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Current Plan</CardTitle>
              <CardDescription>Your active workout plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Dumbbell className="mr-2 h-5 w-5 text-blue-600" />
                  <span className="font-medium">No active plan</span>
                </div>
                <Button variant="outline" size="sm">
                  <Link to="/plans">View Plans</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Today's Workout</CardTitle>
              <CardDescription>What's on your schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                  <span className="font-medium">No workout scheduled</span>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Start
                </Button>
              </div>
            </CardContent>
          </Card>

          <SubscriptionCard />
        </div>

        <div className="mb-12">
          <WorkoutPlansList />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Get Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/onboarding">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    Create Your Profile
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Tell us about your fitness goals, experience, and preferences
                    so we can create the perfect workout plan for you.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/plans">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    Browse Plans
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Explore our recommended workout plans or create a custom plan
                    tailored to your specific needs and goals.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/pricing">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    View Subscription Plans
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Explore our subscription options and choose a plan that fits your needs.
                    Get access to premium features to enhance your fitness journey.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
