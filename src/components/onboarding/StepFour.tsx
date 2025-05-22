
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface StepFourProps {
  form: UseFormReturn<any>;
}

export function StepFour({ form }: StepFourProps) {
  return (
    <>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Final Preferences</h2>

        <FormField
          control={form.control}
          name="preferredFormat"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you prefer guided workouts or written plans?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="video" />
                    </FormControl>
                    <FormLabel className="font-normal">Video-guided sessions</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="written" />
                    </FormControl>
                    <FormLabel className="font-normal">Written instructions with images</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="both" />
                    </FormControl>
                    <FormLabel className="font-normal">Both</FormLabel>
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

        <FormField
          control={form.control}
          name="additionalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Any specific goals, preferences, or constraints we should know about?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="E.g., avoid jumping, low-intensity only, postpartum workouts, time of day preference, etc."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
