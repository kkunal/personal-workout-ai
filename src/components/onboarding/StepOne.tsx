
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface StepOneProps {
  form: UseFormReturn<any>;
}

export function StepOne({ form }: StepOneProps) {
  const fitnessGoalOptions = [
    { id: "weight-loss", label: "Lose weight" },
    { id: "build-muscle", label: "Build muscle" },
    { id: "improve-endurance", label: "Improve endurance" },
    { id: "increase-flexibility", label: "Increase flexibility/mobility" },
    { id: "improve-health", label: "Improve overall health" },
    { id: "train-event", label: "Train for an event (e.g., marathon, sport)" }
  ];

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">About Your Fitness Journey</h2>

        <FormField
          control={form.control}
          name="fitnessLevel"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>What is your current fitness level?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="beginner" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Beginner (little to no experience)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="intermediate" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Intermediate (work out occasionally or semi-regularly)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="advanced" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Advanced (regular and consistent training)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fitnessGoals"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>What is your primary fitness goal? (Select all that apply)</FormLabel>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {fitnessGoalOptions.map((option) => (
                  <FormField
                    key={option.id}
                    control={form.control}
                    name="fitnessGoals"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={option.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(option.id)}
                              onCheckedChange={(checked) => {
                                const currentValues = field.value || [];
                                return checked
                                  ? field.onChange([...currentValues, option.id])
                                  : field.onChange(
                                      currentValues.filter(
                                        (value: string) => value !== option.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage className="mt-2" />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
