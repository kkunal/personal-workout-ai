
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
      className="h-12 w-12 rounded-full shadow-lg"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="sr-only">Open chat</span>
    </Button>
  );
}
