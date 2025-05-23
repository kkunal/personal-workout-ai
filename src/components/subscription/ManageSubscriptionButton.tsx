
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ManageSubscriptionButtonProps {
  variant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function ManageSubscriptionButton({ 
  variant = "default", 
  size = "default",
  className = ""
}: ManageSubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleManageSubscription = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.functions.invoke("customer-portal", {});

      if (error) {
        throw new Error(error.message || "Failed to open subscription portal");
      }

      if (!data?.url) {
        throw new Error("No portal URL received");
      }

      // Open the customer portal in a new tab
      window.open(data.url, "_blank");
    } catch (error) {
      console.error("Error opening customer portal:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to open subscription management portal",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleManageSubscription} 
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        "Manage Subscription"
      )}
    </Button>
  );
}
