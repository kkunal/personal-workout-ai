
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/useSubscription";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { CheckCircle, Clock, AlertTriangle, Loader2 } from "lucide-react";
import { ManageSubscriptionButton } from "@/components/subscription/ManageSubscriptionButton";

const SubscriptionPage = () => {
  const { 
    isLoading, 
    isTrialActive, 
    isTrialExpired, 
    isSubscribed, 
    trialEndDate,
    daysRemaining,
    subscriptionType,
    refresh
  } = useSubscription();

  if (isLoading) {
    return (
      <Container className="py-12">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Subscription Status</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {isSubscribed ? (
                <span className="flex items-center text-green-700">
                  <CheckCircle className="mr-2 h-6 w-6" />
                  {subscriptionType || "Premium"} Subscription
                </span>
              ) : isTrialExpired ? (
                <span className="flex items-center text-red-700">
                  <AlertTriangle className="mr-2 h-6 w-6" />
                  Trial Expired
                </span>
              ) : (
                <span className="flex items-center text-blue-700">
                  <Clock className="mr-2 h-6 w-6" />
                  Free Trial
                </span>
              )}
            </CardTitle>
            <CardDescription>
              {isSubscribed
                ? "Your account is currently subscribed to our premium service."
                : isTrialExpired
                  ? "Your free trial has expired. Subscribe to continue using all features."
                  : `Your free trial ${daysRemaining === 0 ? "ends today" : `has ${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'} remaining`}.`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isTrialActive && trialEndDate && (
              <div>
                <p className="font-medium">Trial End Date</p>
                <p>{format(trialEndDate, "PPP")}</p>
              </div>
            )}
            
            {isSubscribed && (
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Subscription Plan</p>
                  <p>{subscriptionType || "Premium"}</p>
                </div>
                
                <div>
                  <p className="font-medium">Subscription Benefits</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Unlimited workout plans</li>
                    <li>Advanced analytics</li>
                    <li>Priority support</li>
                    <li>Nutrition guidance</li>
                  </ul>
                </div>
              </div>
            )}
            
            <div className="pt-2">
              <Button onClick={refresh} variant="outline" size="sm">
                Refresh Status
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {isSubscribed ? (
              <>
                <ManageSubscriptionButton />
                <Button variant="outline" asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild>
                  <Link to="/#pricing">View Plans</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/dashboard">Continue to Dashboard</Link>
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
};

export default SubscriptionPage;
