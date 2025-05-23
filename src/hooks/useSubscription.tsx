
import { useState, useEffect, useCallback } from "react";
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
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  const fetchSubscriptionStatus = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      
      console.log("Checking subscription status...");
      
      // First try to verify with Stripe via our edge function
      const { data: stripeData, error: stripeError } = await supabase.functions.invoke("check-subscription", {});
      
      if (stripeError) {
        console.error("Error checking subscription with Stripe:", stripeError);
        // Fall back to database data if Stripe check fails
      } else if (stripeData) {
        // If Stripe check succeeds, use that data
        console.log("Received subscription data from Stripe check:", stripeData);
        
        // Get updated DB data after the function has updated it
        const { data: dbData, error: dbError } = await supabase
          .from("user_subscription_status")
          .select("*")
          .eq("user_id", user.id)
          .limit(1)
          .maybeSingle();
          
        if (dbError) {
          console.error("Error fetching updated subscription status from DB:", dbError);
        }
        
        const endDate = dbData?.trial_end_date ? new Date(dbData.trial_end_date) : null;
        const now = new Date();
        
        const remaining = endDate 
          ? Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 3600 * 24))) 
          : null;

        setIsTrialActive(!stripeData.is_trial_expired && !stripeData.has_subscription);
        setIsTrialExpired(stripeData.is_trial_expired && !stripeData.has_subscription);
        setIsSubscribed(stripeData.has_subscription);
        setTrialEndDate(endDate);
        setDaysRemaining(remaining);
        setSubscriptionType(stripeData.subscription_type);
        setIsLoading(false);
        console.log("Subscription status updated from Stripe check:", {
          isSubscribed: stripeData.has_subscription,
          isTrialExpired: stripeData.is_trial_expired,
          subscriptionType: stripeData.subscription_type
        });
        return;
      }

      // If Stripe check failed or didn't return data, use database data as fallback
      const { data: dbData, error: dbError } = await supabase
        .from("user_subscription_status")
        .select("*")
        .eq("user_id", user.id)
        .limit(1)
        .maybeSingle();

      if (dbError) {
        console.error("Error fetching subscription status from DB:", dbError);
        throw dbError;
      }

      if (!dbData) {
        console.log("No subscription data found. User may need to refresh or revisit after logging in.");
        setIsLoading(false);
        return;
      }

      const endDate = dbData.trial_end_date ? new Date(dbData.trial_end_date) : null;
      const now = new Date();
      
      const remaining = endDate 
        ? Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 3600 * 24))) 
        : null;

      setIsTrialActive(!dbData.is_trial_expired && !dbData.has_subscription);
      setIsTrialExpired(dbData.is_trial_expired && !dbData.has_subscription);
      setIsSubscribed(dbData.has_subscription);
      setTrialEndDate(endDate);
      setDaysRemaining(remaining);
      setSubscriptionType(dbData.subscription_type);
      
      console.log("Subscription status updated from DB:", {
        isSubscribed: dbData.has_subscription,
        isTrialExpired: dbData.is_trial_expired,
        subscriptionType: dbData.subscription_type
      });
    } catch (error: any) {
      console.error("Error fetching subscription status:", error);
      toast({
        title: "Error",
        description: "Failed to load subscription status. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const refresh = useCallback(async () => {
    console.log("Manual refresh of subscription status requested");
    await fetchSubscriptionStatus();
    setLastRefresh(Date.now());
  }, [fetchSubscriptionStatus]);

  // Initialize subscription status when user changes
  useEffect(() => {
    fetchSubscriptionStatus();
  }, [user, fetchSubscriptionStatus]);
  
  // Check subscription status when navigating to subscription page or after payment
  useEffect(() => {
    const currentPath = window.location.pathname;
    
    // Re-check status when on subscription page or coming from success page
    if (currentPath === '/subscription' || currentPath === '/success') {
      console.log("On subscription page or coming from success page, refreshing status...");
      fetchSubscriptionStatus();
    }
    
    // Also set up periodic refresh every 10 seconds when on subscription-related pages
    let intervalId: number | undefined;
    if (currentPath === '/subscription' || currentPath === '/success') {
      intervalId = window.setInterval(() => {
        console.log("Periodic refresh of subscription status");
        fetchSubscriptionStatus();
      }, 10000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [fetchSubscriptionStatus]);

  return {
    isLoading,
    isTrialActive,
    isTrialExpired,
    isSubscribed,
    trialEndDate,
    daysRemaining,
    subscriptionType,
    refresh,
  };
}
