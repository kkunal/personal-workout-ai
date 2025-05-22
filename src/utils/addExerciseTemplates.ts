
// This file contains a utility function to add exercise templates to the database
// It's meant to be run once manually via a script or admin panel
// For now, we'll just use it as reference for potential future implementation

import { supabase } from "@/integrations/supabase/client";

// Get the ID of the template by name
const getTemplateIdByName = async (name: string) => {
  const { data } = await supabase
    .from('workout_templates')
    .select('id')
    .eq('name', name)
    .single();
  
  return data?.id;
};

// Example function to add exercise templates
export const addExerciseTemplates = async () => {
  try {
    // Get template IDs
    const beginnerStrengthId = await getTemplateIdByName('Beginner Strength Foundation');
    const beginnerWeightLossId = await getTemplateIdByName('Beginner Weight Loss');

    if (!beginnerStrengthId || !beginnerWeightLossId) {
      console.error("Template not found");
      return;
    }

    // Beginner Strength Foundation Exercises
    const beginnerStrengthExercises = [
      // Monday - Upper Body
      {
        template_id: beginnerStrengthId,
        name: 'Push-ups',
        description: 'Basic chest, shoulder, and tricep exercise',
        sets: 3,
        reps: 10,
        rest_time: '60 seconds',
        equipment: 'bodyweight',
        day_of_week: 'Monday',
        order_in_workout: 1
      },
      {
        template_id: beginnerStrengthId,
        name: 'Dumbbell Rows',
        description: 'Back strengthening exercise',
        sets: 3,
        reps: 12,
        rest_time: '60 seconds',
        equipment: 'dumbbells',
        day_of_week: 'Monday',
        order_in_workout: 2
      },
      {
        template_id: beginnerStrengthId,
        name: 'Shoulder Press',
        description: 'Shoulder strengthening exercise',
        sets: 3,
        reps: 10,
        rest_time: '60 seconds',
        equipment: 'dumbbells',
        day_of_week: 'Monday',
        order_in_workout: 3
      },
      
      // Wednesday - Lower Body
      {
        template_id: beginnerStrengthId,
        name: 'Bodyweight Squats',
        description: 'Basic lower body exercise targeting quads, hamstrings, and glutes',
        sets: 3,
        reps: 15,
        rest_time: '60 seconds',
        equipment: 'bodyweight',
        day_of_week: 'Wednesday',
        order_in_workout: 1
      },
      {
        template_id: beginnerStrengthId,
        name: 'Lunges',
        description: 'Lower body exercise for legs and balance',
        sets: 2,
        reps: 10,
        rest_time: '60 seconds',
        equipment: 'bodyweight',
        day_of_week: 'Wednesday',
        order_in_workout: 2
      },
      {
        template_id: beginnerStrengthId,
        name: 'Calf Raises',
        description: 'Exercise to strengthen calves',
        sets: 3,
        reps: 15,
        rest_time: '45 seconds',
        equipment: 'bodyweight',
        day_of_week: 'Wednesday',
        order_in_workout: 3
      },
      
      // Friday - Full Body
      {
        template_id: beginnerStrengthId,
        name: 'Dumbbell Deadlifts',
        description: 'Full body exercise focusing on posterior chain',
        sets: 3,
        reps: 12,
        rest_time: '90 seconds',
        equipment: 'dumbbells',
        day_of_week: 'Friday',
        order_in_workout: 1
      },
      {
        template_id: beginnerStrengthId,
        name: 'Plank',
        description: 'Core stability exercise',
        sets: 3,
        duration: '30 seconds',
        rest_time: '45 seconds',
        equipment: 'bodyweight',
        day_of_week: 'Friday',
        order_in_workout: 2
      }
    ];

    // Beginner Weight Loss Exercises
    const beginnerWeightLossExercises = [
      // Monday - Cardio + Strength
      {
        template_id: beginnerWeightLossId,
        name: 'Jumping Jacks',
        description: 'Cardio warm-up exercise',
        duration: '3 minutes',
        equipment: 'bodyweight',
        day_of_week: 'Monday',
        order_in_workout: 1
      },
      {
        template_id: beginnerWeightLossId,
        name: 'Bodyweight Squats',
        description: 'Lower body exercise',
        sets: 3,
        reps: 15,
        rest_time: '30 seconds',
        equipment: 'bodyweight',
        day_of_week: 'Monday',
        order_in_workout: 2
      },
      {
        template_id: beginnerWeightLossId,
        name: 'Push-ups (Modified if needed)',
        description: 'Upper body pushing exercise',
        sets: 3,
        reps: 10,
        rest_time: '30 seconds',
        equipment: 'bodyweight',
        day_of_week: 'Monday',
        order_in_workout: 3
      },
      
      // Wednesday - HIIT
      {
        template_id: beginnerWeightLossId,
        name: 'High Knees',
        description: 'Cardio exercise',
        sets: 3,
        duration: '30 seconds',
        rest_time: '30 seconds',
        equipment: 'bodyweight',
        day_of_week: 'Wednesday',
        order_in_workout: 1
      },
      {
        template_id: beginnerWeightLossId,
        name: 'Mountain Climbers',
        description: 'Full body cardio exercise',
        sets: 3,
        duration: '30 seconds',
        rest_time: '30 seconds',
        equipment: 'bodyweight',
        day_of_week: 'Wednesday',
        order_in_workout: 2
      },
      {
        template_id: beginnerWeightLossId,
        name: 'Bodyweight Lunges',
        description: 'Lower body exercise',
        sets: 3,
        duration: '30 seconds',
        rest_time: '30 seconds',
        equipment: 'bodyweight',
        day_of_week: 'Wednesday',
        order_in_workout: 3
      },
      
      // Friday - Circuit Training
      {
        template_id: beginnerWeightLossId,
        name: 'Jumping Jacks',
        description: 'Cardio exercise',
        duration: '1 minute',
        equipment: 'bodyweight',
        day_of_week: 'Friday',
        order_in_workout: 1
      },
      {
        template_id: beginnerWeightLossId,
        name: 'Bodyweight Squats',
        description: 'Lower body exercise',
        sets: 1,
        reps: 15,
        equipment: 'bodyweight',
        day_of_week: 'Friday',
        order_in_workout: 2
      },
      {
        template_id: beginnerWeightLossId,
        name: 'Push-ups',
        description: 'Upper body exercise',
        sets: 1,
        reps: 10,
        equipment: 'bodyweight',
        day_of_week: 'Friday',
        order_in_workout: 3
      },
      {
        template_id: beginnerWeightLossId,
        name: 'Plank',
        description: 'Core exercise',
        sets: 1,
        duration: '30 seconds',
        equipment: 'bodyweight',
        day_of_week: 'Friday',
        order_in_workout: 4
      }
    ];

    // Insert all exercises
    const allExercises = [...beginnerStrengthExercises, ...beginnerWeightLossExercises];
    
    const { error } = await supabase
      .from('template_exercises')
      .insert(allExercises);

    if (error) {
      throw error;
    }

    console.log('Exercise templates added successfully');
    return true;
  } catch (error) {
    console.error('Error adding exercise templates:', error);
    return false;
  }
};
