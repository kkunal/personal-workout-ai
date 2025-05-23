
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/useSubscription";
import { Clock, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export function TrialAlert() {
  const { isTrialActive, isTrialExpired, isSubscribed, daysRemaining, trialEndDate } = useSubscription();

  if (isSubscribed) {
    return null; // Don't show any trial alerts for paid subscribers
  }

  if (isTrialExpired) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Your free trial has expired</AlertTitle>
        <AlertDescription className="flex flex-col gap-2">
          <p>Your free trial has ended. Subscribe now to continue using all features.</p>
          <Button asChild size="sm" className="w-fit">
            <Link to="/#pricing">View Plans</Link>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (isTrialActive && daysRemaining !== null && daysRemaining <= 3) {
    return (
      <Alert variant="default" className="bg-amber-100 text-amber-800 border-amber-300 mb-6">
        <Clock className="h-4 w-4" />
        <AlertTitle>Trial ending soon</AlertTitle>
        <AlertDescription className="flex flex-col gap-2">
          <p>
            Your free trial ends {daysRemaining === 0 ? "today" : `in ${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'}`}
            {trialEndDate && ` (${format(trialEndDate, 'PP')})`}. Subscribe to continue enjoying all features.
          </p>
          <Button asChild size="sm" variant="default" className="w-fit">
            <Link to="/#pricing">View Plans</Link>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Don't show anything if the trial is active and has more than 3 days remaining
  return null;
}
