
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("Missing Stripe secret key");
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    const { plan } = await req.json();
    
    // Determine price based on selected plan
    const priceData = {
      currency: "usd",
      product_data: {
        name: `FitTracker ${plan.name} Plan`,
        description: plan.description,
      },
      unit_amount: plan.name === "Monthly" ? 1499 : 14999, // $14.99 or $149.99
    };
    
    // Get auth header
    const authHeader = req.headers.get("Authorization");
    let customerEmail = null;

    // If user is authenticated, get their email
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2.38.4");
      
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? "",
        { auth: { persistSession: false } }
      );
      
      try {
        const { data, error } = await supabase.auth.getUser(token);
        if (!error && data.user) {
          customerEmail = data.user.email;
        }
      } catch (error) {
        console.error("Error getting user:", error);
      }
    }
    
    // Create the checkout session with appropriate configuration for each plan type
    const sessionConfig = {
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: plan.name === "Monthly" 
            ? {
                ...priceData,
                recurring: { interval: "month" },
              } 
            : priceData, // For annual plan (one-time payment), no recurring property
          quantity: 1,
        },
      ],
      mode: plan.name === "Monthly" ? "subscription" : "payment",
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/#pricing`,
      customer_email: customerEmail,
    };

    console.log("Creating checkout session with config:", JSON.stringify(sessionConfig));
    const session = await stripe.checkout.sessions.create(sessionConfig);
    console.log("Checkout session created:", session.id, "URL:", session.url);

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating checkout session:", errorMessage);
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
