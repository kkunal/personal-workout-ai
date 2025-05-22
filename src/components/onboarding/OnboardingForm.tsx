
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepFour } from "./StepFour";
import { CheckCircle } from "lucide-react";

const formSchema = z.object({
  fitnessLevel: z.enum(["beginner", "intermediate", "advanced"]),
  fitnessGoals: z.array(z.string()).min(1, "Select at least one fitness goal"),
  workoutTime: z.enum(["15-30", "30-45", "45-60", "60+"]),
  daysPerWeek: z.enum(["1-2", "3-4", "5-6", "7"]),
  preferredExercises: z.array(z.string()).min(1, "Select at least one type of workout"),
  healthConditions: z.object({
    hasConditions: z.boolean(),
    description: z.string().optional(),
  }),
  equipment: z.array(z.string()),
  workoutLocation: z.enum(["home", "gym", "outdoors", "no-preference"]),
  preferredFormat: z.enum(["video", "written", "both", "no-preference"]),
  additionalNotes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface OnboardingFormProps {
  onSubmit: (data: FormValues) => void;
  isSubmitting: boolean;
}

export function OnboardingForm({ onSubmit, isSubmitting }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fitnessLevel: "beginner",
      fitnessGoals: [],
      workoutTime: "30-45",
      daysPerWeek: "3-4",
      preferredExercises: [],
      healthConditions: {
        hasConditions: false,
        description: "",
      },
      equipment: [],
      workoutLocation: "no-preference",
      preferredFormat: "no-preference",
      additionalNotes: "",
    },
  });

  const nextStep = async () => {
    const fieldsToValidate = getFieldsToValidateForStep(step);
    
    const result = await form.trigger(fieldsToValidate as any[]);
    if (result) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const getFieldsToValidateForStep = (currentStep: number): string[] => {
    switch (currentStep) {
      case 1:
        return ["fitnessLevel", "fitnessGoals"];
      case 2:
        return ["workoutTime", "daysPerWeek", "preferredExercises"];
      case 3:
        return ["healthConditions", "equipment", "workoutLocation"];
      case 4:
        return ["preferredFormat"];
      default:
        return [];
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center ${
                index + 1 < step ? "text-blue-600" : 
                index + 1 === step ? "text-blue-500" : "text-gray-400"
              }`}
            >
              <div className={`relative w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                index + 1 < step ? "border-blue-600 bg-blue-50" : 
                index + 1 === step ? "border-blue-500" : "border-gray-300"
              }`}>
                {index + 1 < step ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
                {index < totalSteps - 1 && (
                  <div className={`absolute top-1/2 left-full w-full h-0.5 -translate-y-1/2 ${
                    index + 1 < step ? "bg-blue-600" : "bg-gray-300"
                  }`}></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {step === 1 && <StepOne form={form} />}
          {step === 2 && <StepTwo form={form} />}
          {step === 3 && <StepThree form={form} />}
          {step === 4 && <StepFour form={form} />}

          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            {step < totalSteps ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Complete"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
