
import React from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatTriggerProps {
  onClick: () => void;
}

export const ChatTrigger: React.FC<ChatTriggerProps> = ({ onClick }) => {
  return (
    <Button 
      className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-2 shadow-lg bg-primary hover:bg-primary/90 z-50"
      size="icon"
      aria-label="Open chat assistant"
      onClick={onClick}
    >
      <Bot size={24} />
    </Button>
  );
};
