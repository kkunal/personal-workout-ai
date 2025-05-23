
import React from "react";
import { SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { Message } from "./chat-utils";

interface ChatContentProps {
  messages: Message[];
  onClose: () => void;
  onSendMessage: (message: string) => void;
}

export const ChatContent: React.FC<ChatContentProps> = ({ 
  messages, 
  onClose, 
  onSendMessage 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <SheetContent side={isMobile ? "bottom" : "right"} className={isMobile ? "h-[80vh]" : ""}>
      <div className="flex flex-col h-full">
        <ChatHeader onClose={onClose} />
        <ChatMessages messages={messages} />
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </SheetContent>
  );
};
