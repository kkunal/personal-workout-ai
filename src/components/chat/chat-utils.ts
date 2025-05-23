
// Predefined answers for common questions
export const PREDEFINED_ANSWERS: Record<string, string> = {
  "pricing": "FitPlan offers several pricing tiers starting at $9.99/month for the basic plan. Our premium plan is $19.99/month and includes personalized workout routines and nutrition guidance.",
  "subscription": "You can manage your subscription from the dashboard. We offer monthly and yearly billing cycles with a 20% discount for annual subscriptions.",
  "workout": "FitPlan creates personalized workout plans based on your fitness level, goals, and available equipment. Our AI analyzes your progress and adjusts your plan accordingly.",
  "nutrition": "While we primarily focus on workouts, our premium plan includes basic nutrition guidance tailored to complement your fitness goals.",
  "trial": "Yes, we offer a 7-day free trial for all new users. You can cancel anytime before the trial ends without being charged.",
  "cancel": "You can cancel your subscription anytime from your account settings. If you cancel, you'll still have access until the end of your billing period.",
  "equipment": "Many of our workout plans can be done with minimal or no equipment. We also offer gym-based plans if you have access to equipment."
};

// Default welcome message
export const WELCOME_MESSAGE = "Hello! 👋 I'm your FitPlan assistant. How can I help you with your fitness journey today?";

export interface Message {
  text: string;
  isUser: boolean;
}

// Generate a response based on user input
export const generateResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  // Check for keywords in predefined answers
  for (const [keyword, answer] of Object.entries(PREDEFINED_ANSWERS)) {
    if (lowerQuery.includes(keyword)) {
      return answer;
    }
  }
  
  // Default response if no keywords match
  return "I'm here to help with questions about FitPlan's features, pricing, and how our workouts can help you reach your fitness goals. Could you please provide more details about what you're looking for?";
};
