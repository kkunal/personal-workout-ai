import { useState } from "react";
import { Bot, X, Send, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample predefined answers for common questions
const PREDEFINED_ANSWERS: Record<string, string> = {
  "pricing": "FitPlan offers several pricing tiers starting at $9.99/month for the basic plan. Our premium plan is $19.99/month and includes personalized workout routines and nutrition guidance.",
  "subscription": "You can manage your subscription from the dashboard. We offer monthly and yearly billing cycles with a 20% discount for annual subscriptions.",
  "workout": "FitPlan creates personalized workout plans based on your fitness level, goals, and available equipment. Our AI analyzes your progress and adjusts your plan accordingly.",
  "nutrition": "While we primarily focus on workouts, our premium plan includes basic nutrition guidance tailored to complement your fitness goals.",
  "trial": "Yes, we offer a 7-day free trial for all new users. You can cancel anytime before the trial ends without being charged.",
  "cancel": "You can cancel your subscription anytime from your account settings. If you cancel, you'll still have access until the end of your billing period.",
  "equipment": "Many of our workout plans can be done with minimal or no equipment. We also offer gym-based plans if you have access to equipment."
};

// Default welcome message
const WELCOME_MESSAGE = "Hello! 👋 I'm your FitPlan assistant. How can I help you with your fitness journey today?";

interface Message {
  text: string;
  isUser: boolean;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: WELCOME_MESSAGE, isUser: false }
  ]);
  const [inputValue, setInputValue] = useState("");
  const { isMobile } = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    // Process and respond
    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
    }, 500);

    setInputValue("");
  };

  const generateResponse = (query: string): string => {
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

  // Use Drawer for mobile and Dialog for desktop
  const ChatComponent = isMobile ? (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button 
          className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-2 shadow-lg"
          aria-label="Open chat assistant"
        >
          <Bot size={24} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <div className="p-4 flex flex-col h-full">
          <ChatInterface 
            messages={messages} 
            inputValue={inputValue} 
            setInputValue={setInputValue} 
            handleSubmit={handleSubmit} 
            onClose={() => setIsOpen(false)} 
          />
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-2 shadow-lg"
          aria-label="Open chat assistant"
        >
          <Bot size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <ChatInterface 
          messages={messages} 
          inputValue={inputValue} 
          setInputValue={setInputValue} 
          handleSubmit={handleSubmit} 
          onClose={() => setIsOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );

  return ChatComponent;
};

interface ChatInterfaceProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const ChatInterface = ({ 
  messages, 
  inputValue, 
  setInputValue, 
  handleSubmit,
  onClose
}: ChatInterfaceProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">FitPlan Assistant</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X size={18} />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      
      <div className="flex-grow overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="flex-shrink-0 h-8 w-8">
                {message.isUser ? (
                  <UserCircle className="h-8 w-8 text-blue-500" />
                ) : (
                  <Bot className="h-8 w-8 text-green-500" />
                )}
              </div>
              <div 
                className={`rounded-lg p-3 ${
                  message.isUser 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about workouts, pricing, etc..."
          className="flex-grow border rounded-md px-3 py-2 text-sm"
        />
        <Button type="submit" size="icon" disabled={!inputValue.trim()}>
          <Send size={18} />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </>
  );
};
