
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface SubscriptionStatus {
  isLoading: boolean;
  isTrialActive: boolean;
  isTrialExpired: boolean;
  isSubscribed: boolean;
  trialEndDate: Date | null;
  daysRemaining: number | null;
  subscriptionType: string | null;
  refresh: () => Promise<void>;
}

export function useSubscription(): SubscriptionStatus {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [isTrialExpired, setIsTrialExpired] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [trialEndDate, setTrialEndDate] = useState<Date | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [subscriptionType, setSubscriptionType] = useState<string | null>(null);

  const fetchSubscriptionStatus = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      
      // Fix: Use .eq("user_id", user.id).limit(1) to ensure we only get one row
      // and use .single() to get a single record
      const { data: dbData, error: dbError } = await supabase
        .from("user_subscription_status")
        .select("*")
        .eq("user_id", user.id)
        .limit(1)
        .single();

      if (dbError) {
        console.error("Error fetching subscription status from DB:", dbError);
        // Continue to check with Stripe as fallback
      }

      // Then try to verify with Stripe via our edge function
      try {
        const { data: stripeData, error: stripeError } = await supabase.functions.invoke("check-subscription", {});
        
        if (stripeError) {
          console.error("Error checking subscription with Stripe:", stripeError);
          // Fall back to database data if Stripe check fails
        } else if (stripeData) {
          // If Stripe check succeeds, use that data
          const endDate = dbData?.trial_end_date ? new Date(dbData.trial_end_date) : null;
          const now = new Date();
          
          const remaining = endDate 
            ? Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 3600 * 24))) 
            : null;

          setIsTrialActive(!stripeData.is_trial_expired && !stripeData.has_subscription);
          setIsTrialExpired(stripeData.is_trial_expired);
          setIsSubscribed(stripeData.has_subscription);
          setTrialEndDate(endDate);
          setDaysRemaining(remaining);
          setSubscriptionType(stripeData.subscription_type);
          setIsLoading(false);
          return;
        }
      } catch (stripeCheckError) {
        console.error("Error invoking check-subscription function:", stripeCheckError);
        // Continue with database data
      }

      // If we get here, we're using database data
      if (dbData) {
        const endDate = dbData.trial_end_date ? new Date(dbData.trial_end_date) : null;
        const now = new Date();
        
        const remaining = endDate 
          ? Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 3600 * 24))) 
          : null;

        setIsTrialActive(!dbData.is_trial_expired && !dbData.has_subscription);
        setIsTrialExpired(dbData.is_trial_expired);
        setIsSubscribed(dbData.has_subscription);
        setTrialEndDate(endDate);
        setDaysRemaining(remaining);
        setSubscriptionType(dbData.subscription_type);
      } else {
        // Default to trial active if no record exists yet
        setIsTrialActive(true);
        setIsTrialExpired(false);
        setIsSubscribed(false);
        
        // Set default trial end date (14 days from now)
        const defaultEndDate = new Date();
        defaultEndDate.setDate(defaultEndDate.getDate() + 14);
        setTrialEndDate(defaultEndDate);
        setDaysRemaining(14);
      }
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      toast({
        title: "Error",
        description: "Failed to load subscription status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
    
    // Refresh subscription status every 5 minutes
    const intervalId = setInterval(fetchSubscriptionStatus, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [user]);

  return {
    isLoading,
    isTrialActive,
    isTrialExpired,
    isSubscribed,
    trialEndDate,
    daysRemaining,
    subscriptionType,
    refresh: fetchSubscriptionStatus,
  };
}
