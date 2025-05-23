
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface ChatTriggerProps {
  onClick: () => void;
}

export function ChatTrigger({ onClick }: ChatTriggerProps) {
  return (
    <Button
      onClick={onClick}
      className="h-12 px-4 rounded-full shadow-lg flex items-center gap-2"
    >
      <MessageCircle className="h-5 w-5" />
      <span>Chat with us</span>
    </Button>
  );
}
