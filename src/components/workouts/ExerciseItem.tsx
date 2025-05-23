
import { Clock, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ExerciseItemProps {
  exercise: {
    id: string;
    name: string;
    sets?: number | null;
    reps?: number | null;
    duration?: string | null;
    rest_time?: string | null;
    equipment?: string | null;
    description?: string | null;
  };
}

export function ExerciseItem({ exercise }: ExerciseItemProps) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <h3 className="font-medium">{exercise.name}</h3>
          {exercise.description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{exercise.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {exercise.equipment && (
          <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
            {exercise.equipment}
          </span>
        )}
      </div>

      <div className="mt-1 text-sm text-gray-600 flex flex-wrap gap-2">
        {exercise.sets && exercise.reps && (
          <span>{exercise.sets} sets × {exercise.reps} reps</span>
        )}
        {exercise.duration && !exercise.sets && (
          <span>{exercise.duration}</span>
        )}
        {exercise.duration && exercise.sets && (
          <span>{exercise.sets} sets × {exercise.duration}</span>
        )}
        {exercise.rest_time && (
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {exercise.rest_time} rest
          </span>
        )}
      </div>
    </div>
  );
}
