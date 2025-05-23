
import { useState } from "react";
import { Sheet } from "@/components/ui/sheet";
import { ChatTrigger } from "./ChatTrigger";
import { ChatContent } from "./ChatContent";
import { Message, WELCOME_MESSAGE, generateResponse } from "./chat-utils";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: WELCOME_MESSAGE, isUser: false }
  ]);

  console.log("ChatBot rendering, isOpen:", isOpen);

  const handleSendMessage = (inputValue: string) => {
    // Add user message to chat
    const userMessage = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    // Process and respond
    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
    }, 500);
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <ChatTrigger onClick={handleOpen} />
      <ChatContent 
        messages={messages}
        onClose={handleClose}
        onSendMessage={handleSendMessage}
      />
    </Sheet>
  );
};
