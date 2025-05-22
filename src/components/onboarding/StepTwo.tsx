
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface StepTwoProps {
  form: UseFormReturn<any>;
}

export function StepTwo({ form }: StepTwoProps) {
  const workoutTypeOptions = [
    { id: "strength", label: "Strength training" },
    { id: "cardio", label: "Cardio (running, HIIT, cycling)" },
    { id: "yoga", label: "Yoga or stretching" },
    { id: "functional", label: "Functional training" },
    { id: "sports", label: "Sports-based workouts (e.g., boxing, martial arts)" },
    { id: "low-impact", label: "Low-impact (e.g., walking, pilates)" }
  ];

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Your Workout Preferences</h2>

        <FormField
          control={form.control}
          name="workoutTime"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>How much time can you dedicate to each workout session?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="15-30" />
                    </FormControl>
                    <FormLabel className="font-normal">15–30 minutes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="30-45" />
                    </FormControl>
                    <FormLabel className="font-normal">30–45 minutes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="45-60" />
                    </FormControl>
                    <FormLabel className="font-normal">45–60 minutes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="60+" />
                    </FormControl>
                    <FormLabel className="font-normal">60+ minutes</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="daysPerWeek"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>How many days per week do you want to work out?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="1-2" />
                    </FormControl>
                    <FormLabel className="font-normal">1–2 days</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="3-4" />
                    </FormControl>
                    <FormLabel className="font-normal">3–4 days</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="5-6" />
                    </FormControl>
                    <FormLabel className="font-normal">5–6 days</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="7" />
                    </FormControl>
                    <FormLabel className="font-normal">Every day</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferredExercises"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>What types of workouts are you interested in? (Select all that apply)</FormLabel>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {workoutTypeOptions.map((option) => (
                  <FormField
                    key={option.id}
                    control={form.control}
                    name="preferredExercises"
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
