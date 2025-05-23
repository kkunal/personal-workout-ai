
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

interface WorkoutPlanCardProps {
  plan: {
    id: string;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
  };
}

export function WorkoutPlanCard({ plan }: WorkoutPlanCardProps) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const formattedStartDate = format(parseISO(plan.start_date), 'MMM d, yyyy');
  const formattedEndDate = format(parseISO(plan.end_date), 'MMM d, yyyy');

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleViewDetails = () => {
    navigate(`/plans/${plan.id}`);
  };

  return (
    <Card 
      className={`transition-all ${expanded ? 'shadow-lg' : 'shadow'} hover:shadow-md cursor-pointer`}
      onClick={handleViewDetails}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg md:text-xl flex items-center">
              <Dumbbell className="mr-2 h-5 w-5 text-blue-600" />
              {plan.name}
              {plan.is_active && (
                <Badge className="ml-2 bg-green-500" variant="default">Active</Badge>
              )}
            </CardTitle>
            <CardDescription className="pt-1">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-1" /> 
                {formattedStartDate} - {formattedEndDate}
              </div>
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleExpanded}
            className="h-8 w-8 p-0 rounded-full"
          >
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      </CardHeader>
      
      {expanded && (
        <CardContent>
          <p className="text-sm text-gray-600">{plan.description}</p>
        </CardContent>
      )}
      
      <CardFooter className="pt-2">
        <Button variant="outline" className="w-full" onClick={handleViewDetails}>
          View Workout Details
        </Button>
      </CardFooter>
    </Card>
  );
}
