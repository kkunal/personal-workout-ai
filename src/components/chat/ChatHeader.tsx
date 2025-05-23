
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-lg">FitPlan Assistant</h3>
      <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
        <X size={18} />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
};
