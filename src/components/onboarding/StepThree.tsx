
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface StepThreeProps {
  form: UseFormReturn<any>;
}

export function StepThree({ form }: StepThreeProps) {
  const equipmentOptions = [
    { id: "none", label: "None (bodyweight only)" },
    { id: "dumbbells", label: "Dumbbells" },
    { id: "resistance-bands", label: "Resistance bands" },
    { id: "kettlebells", label: "Kettlebells" },
    { id: "yoga-mat", label: "Yoga mat" },
    { id: "pull-up-bar", label: "Pull-up bar" },
    { id: "cardio-machine", label: "Treadmill/bike" },
    { id: "gym", label: "Gym access" }
  ];

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Your Health and Equipment</h2>

        <FormField
          control={form.control}
          name="healthConditions.hasConditions"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Do you have any health conditions or injuries we should be aware of?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value === "yes");
                    if (value === "no") {
                      form.setValue("healthConditions.description", "");
                    }
                  }}
                  defaultValue={field.value ? "yes" : "no"}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("healthConditions.hasConditions") && (
          <FormField
            control={form.control}
            name="healthConditions.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please describe your health conditions or injuries:</FormLabel>
                <FormControl>
                  <Input placeholder="E.g., back pain, knee issues, asthma, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="equipment"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>What equipment do you have access to? (Select all that apply)</FormLabel>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {equipmentOptions.map((option) => (
                  <FormField
                    key={option.id}
                    control={form.control}
                    name="equipment"
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="workoutLocation"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Where do you prefer to work out?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="home" />
                    </FormControl>
                    <FormLabel className="font-normal">At home</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="gym" />
                    </FormControl>
                    <FormLabel className="font-normal">At the gym</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="outdoors" />
                    </FormControl>
                    <FormLabel className="font-normal">Outdoors</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no-preference" />
                    </FormControl>
                    <FormLabel className="font-normal">No preference</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
