
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <div>
        <h3 className="font-medium">Fitness Assistant</h3>
        <p className="text-xs text-muted-foreground">
          Ask me any fitness questions
        </p>
      </div>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
}
