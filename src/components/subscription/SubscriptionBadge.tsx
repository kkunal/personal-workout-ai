
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/hooks/useSubscription";

export function SubscriptionBadge() {
  const { isTrialActive, isTrialExpired, isSubscribed, subscriptionType, daysRemaining } = useSubscription();

  if (isSubscribed) {
    return (
      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
        {subscriptionType || "Premium"} Plan
      </Badge>
    );
  }

  if (isTrialExpired) {
    return (
      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
        Trial Expired
      </Badge>
    );
  }

  if (isTrialActive) {
    return (
      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
        Trial{daysRemaining ? ` (${daysRemaining}d)` : ""}
      </Badge>
    );
  }

  return null;
}
