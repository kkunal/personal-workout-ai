
import { useState, useEffect, useRef } from "react";

// Types for our chat functionality
export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

// Initial messages shown to the user when they open the chat
export const initialMessages: ChatMessage[] = [
  {
    id: "1",
    content: "Hi there! I'm your fitness assistant. How can I help you today?",
    role: "assistant",
    timestamp: new Date(),
  },
];

// Simple responses based on keywords in the user's message
export function getSimpleResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("workout") && lowerMessage.includes("beginner")) {
    return "For beginners, I recommend starting with 2-3 full-body workouts per week. Focus on basic movements like squats, push-ups, and rows. Start with lighter weights and focus on form before increasing intensity.";
  }
  
  if (lowerMessage.includes("subscription") || lowerMessage.includes("pricing") || lowerMessage.includes("plan")) {
    return "We offer several subscription plans starting at $9.99/month. You can view all pricing details on our pricing page and choose the plan that best fits your needs.";
  }
  
  if (lowerMessage.includes("diet") || lowerMessage.includes("nutrition") || lowerMessage.includes("eat")) {
    return "Proper nutrition is key to reaching your fitness goals. I recommend a balanced diet with plenty of protein, complex carbs, healthy fats, and vegetables. For personalized advice, check out our nutrition plans.";
  }
  
  if (lowerMessage.includes("equipment") || lowerMessage.includes("gear")) {
    return "You don't need fancy equipment to start! For home workouts, a set of resistance bands, a few dumbbells, and a yoga mat can be enough. As you progress, you might want to add more equipment based on your specific goals.";
  }
  
  if (lowerMessage.includes("thank")) {
    return "You're welcome! Let me know if you have any other questions.";
  }

  // Default response
  return "I'm here to help with any fitness-related questions. Feel free to ask about workouts, nutrition, subscription plans, or anything else fitness-related!";
}

// Custom hook for managing chat state
export function useChatMessages() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  // Function to add a new user message
  const addUserMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    // Simulate assistant response after a delay
    setTimeout(() => {
      const responseContent = getSimpleResponse(content);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return { messages, isTyping, addUserMessage };
}
