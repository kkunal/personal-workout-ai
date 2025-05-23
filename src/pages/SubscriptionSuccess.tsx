
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "@/hooks/use-toast";

const SubscriptionSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const { refresh, isSubscribed } = useSubscription();
  const [isUpdating, setIsUpdating] = useState(true);
  const [refreshAttempts, setRefreshAttempts] = useState(0);
  const maxRefreshAttempts = 5;

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
      return;
    }
    
    // Immediately refresh subscription status after successful payment
    const updateSubscriptionStatus = async () => {
      try {
        setIsUpdating(true);
        console.log("Updating subscription status after successful payment...");
        
        // First refresh attempt
        await refresh();
        console.log("First refresh attempt complete, subscription status:", { isSubscribed });
        
        // Set a short timeout before checking status again
        setTimeout(async () => {
          console.log("Second attempt at refreshing subscription status...");
          await refresh();
          
          if (!isSubscribed && refreshAttempts < maxRefreshAttempts) {
            console.log(`Subscription status not updated yet. Attempt ${refreshAttempts + 1} of ${maxRefreshAttempts}`);
            setRefreshAttempts(prev => prev + 1);
          } else {
            console.log("Subscription status updated:", { isSubscribed });
            setIsUpdating(false);
            
            if (isSubscribed) {
              toast({
                title: "Subscription activated",
                description: "Thank you for subscribing! You now have access to all premium features.",
                variant: "default",
              });
            }
          }
        }, 2000);
      } catch (error) {
        console.error("Error updating subscription status:", error);
        setIsUpdating(false);
        
        toast({
          title: "Warning",
          description: "There was an issue verifying your subscription. Please check the subscription page in a moment.",
          variant: "destructive",
        });
      }
    };
    
    updateSubscriptionStatus();
  }, [sessionId, navigate, refresh, isSubscribed, refreshAttempts]);

  // Make additional attempts if needed
  useEffect(() => {
    if (refreshAttempts > 0 && refreshAttempts < maxRefreshAttempts && !isSubscribed) {
      const timer = setTimeout(async () => {
        console.log(`Making additional attempt (${refreshAttempts + 1} of ${maxRefreshAttempts}) to refresh subscription status...`);
        try {
          await refresh();
          if (isSubscribed) {
            toast({
              title: "Subscription activated",
              description: "Thank you for subscribing! You now have access to all premium features.",
              variant: "default",
            });
            setIsUpdating(false);
          }
        } catch (error) {
          console.error("Error during refresh attempt:", error);
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    } else if (refreshAttempts >= maxRefreshAttempts && !isSubscribed) {
      console.log("Max refresh attempts reached. Will stop trying.");
      setIsUpdating(false);
      toast({
        title: "Subscription status check",
        description: "Your payment was successful, but we're still updating your subscription status. Please check again in a moment.",
        variant: "default",
      });
    }
  }, [refreshAttempts, isSubscribed, refresh, maxRefreshAttempts]);

  return (
    <Container className="py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Thank you for subscribing to our service. You now have access to all premium features.
        </p>
        
        {isUpdating ? (
          <div className="flex items-center justify-center mb-6">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Updating your subscription status...</span>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/subscription">
              <Button size="lg" className="min-w-[150px]">
                View Subscription
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="min-w-[150px]">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
};

export default SubscriptionSuccess;
