
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface GenerateWorkoutButtonProps {
  onSuccess?: (planId: string) => void;
}

export function GenerateWorkoutButton({ onSuccess }: GenerateWorkoutButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const generateWorkoutPlan = async () => {
    setIsGenerating(true);

    try {
      if (!user) {
        throw new Error("You must be logged in to generate a workout plan");
      }

      const { data, error } = await supabase.rpc('generate_workout_plan', {
        user_id: user.id
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: "Workout plan generated!",
        description: "Your personalized workout plan is now ready.",
      });
      
      if (onSuccess && data) {
        onSuccess(data as string);
      }
    } catch (error: any) {
      console.error("Error generating workout plan:", error);
      toast({
        title: "Error generating workout plan",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button 
      onClick={generateWorkoutPlan} 
      disabled={isGenerating}
      className="w-full md:w-auto"
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
        </>
      ) : (
        "Generate Workout Plan"
      )}
    </Button>
  );
}
