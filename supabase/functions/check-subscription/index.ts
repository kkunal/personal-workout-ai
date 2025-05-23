
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for enhanced debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    // Initialize Supabase client with anon key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Check if user already has a subscription status record
    const { data: subscriptionData } = await supabaseClient
      .from("user_subscription_status")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    // If no record exists, create default entry
    if (!subscriptionData) {
      const defaultTrialEnd = new Date();
      defaultTrialEnd.setDate(defaultTrialEnd.getDate() + 14); // 14 days from now
      
      const { error: insertError } = await supabaseClient
        .from("user_subscription_status")
        .insert({
          user_id: user.id,
          trial_start_date: new Date().toISOString(),
          trial_end_date: defaultTrialEnd.toISOString(),
          is_trial_expired: false,
          has_subscription: false
        });
        
      if (insertError) throw new Error(`Failed to create subscription record: ${insertError.message}`);
      logStep("Created new subscription status record");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No Stripe customer found, updating status");
      
      // Update status (calculated field) via a trigger
      await supabaseClient
        .from("user_subscription_status")
        .update({ updated_at: new Date().toISOString() })
        .eq("user_id", user.id);
        
      return new Response(JSON.stringify({ 
        has_subscription: false,
        is_trial_expired: subscriptionData?.is_trial_expired || false,
        trial_end_date: subscriptionData?.trial_end_date,
        subscription_type: null
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    // Check for active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });
    
    const hasActiveSub = subscriptions.data.length > 0;
    let subscriptionType = null;

    if (hasActiveSub) {
      const subscription = subscriptions.data[0];
      logStep("Active subscription found", { subscriptionId: subscription.id });
      
      // Determine subscription tier based on price
      if (subscription.items.data.length > 0) {
        const price = subscription.items.data[0].price;
        subscriptionType = price.product.toString().includes("Monthly") ? "Monthly" : "Annual";
      } else {
        subscriptionType = "Premium";
      }
      
      logStep("Determined subscription type", { subscriptionType });

      // Update the subscription status in database
      await supabaseClient
        .from("user_subscription_status")
        .update({
          has_subscription: true,
          subscription_type: subscriptionType,
          updated_at: new Date().toISOString()
        })
        .eq("user_id", user.id);
    } else {
      // No active subscription, just update the timestamp to trigger trial expiry check
      await supabaseClient
        .from("user_subscription_status")
        .update({ 
          has_subscription: false,
          subscription_type: null,
          updated_at: new Date().toISOString() 
        })
        .eq("user_id", user.id);
    }

    // Get the updated status
    const { data: updatedStatus, error: fetchError } = await supabaseClient
      .from("user_subscription_status")
      .select("*")
      .eq("user_id", user.id)
      .single();
      
    if (fetchError) throw new Error(`Failed to fetch updated status: ${fetchError.message}`);
    
    logStep("Returning subscription status", { 
      has_subscription: updatedStatus.has_subscription,
      is_trial_expired: updatedStatus.is_trial_expired,
      subscription_type: updatedStatus.subscription_type
    });

    return new Response(JSON.stringify({
      has_subscription: updatedStatus.has_subscription,
      is_trial_expired: updatedStatus.is_trial_expired,
      trial_end_date: updatedStatus.trial_end_date,
      subscription_type: updatedStatus.subscription_type
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
