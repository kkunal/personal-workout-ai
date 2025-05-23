
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8'
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { userId } = await req.json()
    
    if (!userId) {
      throw new Error('User ID is required')
    }

    // Create a Supabase client with the Auth context of the logged in user
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || ''
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

    // Get the user profile to determine fitness level and goals
    const { data: profileData, error: profileError } = await supabaseClient
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (profileError) {
      throw profileError
    }

    // Generate a new workout plan
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(startDate.getDate() + 28) // 4 weeks plan

    const { data: planData, error: planError } = await supabaseClient
      .from('workout_plans')
      .insert({
        user_id: userId,
        name: `${profileData?.fitness_level || 'Custom'} Workout Plan`,
        description: 'Generated based on your fitness profile',
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        is_active: true
      })
      .select()
      .single()
    
    if (planError) {
      throw planError
    }

    // Create some sample workouts for the plan
    const daysOfWeek = ['Monday', 'Wednesday', 'Friday']
    
    for (const day of daysOfWeek) {
      // Create workout for the day
      const { data: workoutData, error: workoutError } = await supabaseClient
        .from('workouts')
        .insert({
          plan_id: planData.id,
          name: `${day} Workout`,
          description: `Workout for ${day}`,
          day_of_week: day
        })
        .select()
        .single()
      
      if (workoutError) {
        console.error(`Error creating workout for ${day}:`, workoutError)
        continue
      }
      
      // Add some exercises to the workout
      const exercises = [
        {
          name: 'Push-ups',
          description: 'Standard push-ups',
          sets: 3,
          reps: 12,
          rest_time: '60 seconds',
          equipment: 'bodyweight'
        },
        {
          name: 'Squats',
          description: 'Bodyweight squats',
          sets: 3,
          reps: 15,
          rest_time: '60 seconds',
          equipment: 'bodyweight'
        },
        {
          name: 'Plank',
          description: 'Standard plank position',
          duration: '30 seconds',
          sets: 3,
          rest_time: '45 seconds',
          equipment: 'bodyweight'
        }
      ]
      
      // Add exercises to the workout
      for (const exercise of exercises) {
        await supabaseClient
          .from('exercises')
          .insert({
            ...exercise,
            workout_id: workoutData.id
          })
      }
    }

    return new Response(
      JSON.stringify(planData.id),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error generating workout plan:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
