
import React from "react";
import { Bot, UserCircle } from "lucide-react";
import { Message } from "./chat-utils";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
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
  );
};
