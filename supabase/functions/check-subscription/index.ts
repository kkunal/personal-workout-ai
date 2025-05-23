
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

    // Initialize Supabase client with SERVICE ROLE key to bypass RLS
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
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

    // Fetch existing subscription status
    const { data: subscriptionStatus, error: queryError } = await supabaseClient
      .from("user_subscription_status")
      .select("*")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle();
      
    if (queryError) {
      logStep("Error fetching subscription data", { error: queryError.message });
    }

    // If no record exists, create default entry using service role to bypass RLS
    if (!subscriptionStatus) {
      logStep("No subscription record found, creating default");
      const defaultTrialEnd = new Date();
      defaultTrialEnd.setDate(defaultTrialEnd.getDate() + 14); // 14 days from now
      
      const { data: newRecord, error: insertError } = await supabaseClient
        .from("user_subscription_status")
        .insert({
          user_id: user.id,
          trial_start_date: new Date().toISOString(),
          trial_end_date: defaultTrialEnd.toISOString(),
          is_trial_expired: false,
          has_subscription: false
        })
        .select("*")
        .single();
        
      if (insertError) {
        logStep("Error creating subscription record", { error: insertError.message });
        throw new Error(`Failed to create subscription record: ${insertError.message}`);
      }
      logStep("Created new subscription status record", { recordId: newRecord.id });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No Stripe customer found, returning status based on db data");
      
      // Return current status from database if no stripe customer exists
      const { data: currentStatus, error: statusError } = await supabaseClient
        .from("user_subscription_status")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
        
      if (statusError) {
        logStep("Error getting status", { error: statusError.message });
        throw new Error(`Error getting status: ${statusError.message}`);
      }
      
      return new Response(JSON.stringify({ 
        has_subscription: false,
        is_trial_expired: currentStatus?.is_trial_expired || false,
        trial_end_date: currentStatus?.trial_end_date,
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
      limit: 100, // Increase limit to ensure we get all subscriptions
    });
    
    const hasActiveSub = subscriptions.data.length > 0;
    let subscriptionType = null;

    if (hasActiveSub) {
      const subscription = subscriptions.data[0];
      logStep("Active subscription found", { 
        subscriptionId: subscription.id,
        status: subscription.status,
        items: subscription.items.data.length
      });
      
      // Determine subscription tier based on price
      if (subscription.items.data.length > 0) {
        const priceId = subscription.items.data[0].price.id;
        subscriptionType = priceId.includes("monthly") ? "Monthly" : "Annual";
        logStep("Determined subscription type", { subscriptionType, priceId });
      } else {
        subscriptionType = "Premium";
      }

      // Log full subscription details for debugging
      logStep("Full subscription details", { 
        subscription: JSON.stringify(subscription)
      });

      // Update the subscription status in database
      const { error: updateError } = await supabaseClient
        .from("user_subscription_status")
        .update({
          has_subscription: true,
          subscription_type: subscriptionType,
          updated_at: new Date().toISOString()
        })
        .eq("user_id", user.id);
        
      if (updateError) {
        logStep("Failed to update subscription status", { error: updateError.message });
        throw new Error(`Failed to update subscription status: ${updateError.message}`);
      }
      
      // Retrieve updated record
      const { data: updatedData, error: fetchError } = await supabaseClient
        .from("user_subscription_status")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
        
      if (fetchError) {
        logStep("Failed to fetch updated status", { error: fetchError.message });
      } else {
        logStep("Updated subscription status", { 
          hasSubscription: true,
          subscriptionType
        });
      }
      
      return new Response(JSON.stringify({
        has_subscription: true,
        is_trial_expired: updatedData?.is_trial_expired || false,
        trial_end_date: updatedData?.trial_end_date,
        subscription_type: subscriptionType
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      logStep("No active subscription found");
      
      // No active subscription, update the record
      const { error: updateError } = await supabaseClient
        .from("user_subscription_status")
        .update({ 
          has_subscription: false,
          subscription_type: null,
          updated_at: new Date().toISOString() 
        })
        .eq("user_id", user.id);
        
      if (updateError) {
        logStep("Failed to update status", { error: updateError.message });
        throw new Error(`Failed to update status: ${updateError.message}`);
      }
      
      // Retrieve updated record
      const { data: updatedData, error: fetchError } = await supabaseClient
        .from("user_subscription_status")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
        
      if (fetchError) {
        logStep("Failed to fetch updated status", { error: fetchError.message });
      } else {
        logStep("Updated no-subscription status", { record: updatedData });
      }
      
      return new Response(JSON.stringify({
        has_subscription: false,
        is_trial_expired: updatedData?.is_trial_expired || false,
        trial_end_date: updatedData?.trial_end_date,
        subscription_type: null
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
