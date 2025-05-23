
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExerciseItem } from "./ExerciseItem";
import { Dumbbell } from "lucide-react";

interface WorkoutDetailsListProps {
  workout: {
    id: string;
    name: string;
    description: string | null;
    day_of_week: string;
    exercises: Array<{
      id: string;
      name: string;
      sets?: number | null;
      reps?: number | null;
      duration?: string | null;
      rest_time?: string | null;
      equipment?: string | null;
      description?: string | null;
    }>;
  };
}

export function WorkoutDetailsList({ workout }: WorkoutDetailsListProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              <Badge className="mr-2">{workout.day_of_week}</Badge>
              {workout.name}
            </CardTitle>
            {workout.description && (
              <p className="text-sm text-gray-500 mt-1">{workout.description}</p>
            )}
          </div>
          <Dumbbell className="h-5 w-5 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent>
        {workout.exercises && workout.exercises.length > 0 ? (
          <div className="space-y-3">
            {workout.exercises.map((exercise, index) => (
              <div key={exercise.id}>
                {index > 0 && <Separator className="my-2" />}
                <ExerciseItem exercise={exercise} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500 italic">
            No exercises found for this workout.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
