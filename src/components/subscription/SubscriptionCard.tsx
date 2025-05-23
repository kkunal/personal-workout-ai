
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSubscription } from "@/hooks/useSubscription";
import { Loader2 } from "lucide-react";

export function SubscriptionCard() {
  const { isLoading, isTrialActive, isTrialExpired, isSubscribed, daysRemaining, subscriptionType } = useSubscription();

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Subscription</CardTitle>
          <CardDescription>Loading status...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-2">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isSubscribed) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Subscription</CardTitle>
          <CardDescription>Your active subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-green-700">{subscriptionType || "Premium"} Plan</span>
              <div className="text-sm text-gray-500">Active</div>
            </div>
            <Button variant="outline" size="sm">
              <Link to="/subscription">Manage</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isTrialExpired) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-red-800">Subscription</CardTitle>
          <CardDescription className="text-red-700">Trial expired</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-red-800">Trial Expired</span>
              <div className="text-sm text-red-700">Subscribe to continue</div>
            </div>
            <Button variant="default" size="sm">
              <Link to="/pricing">View Plans</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Subscription</CardTitle>
        <CardDescription>Your free trial</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium">Free Trial</span>
            <div className="text-sm text-gray-500">
              {daysRemaining === 0 ? "Ends today" : `${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'} remaining`}
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Link to="/subscription">Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
