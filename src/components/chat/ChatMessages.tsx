
import React, { useRef, useEffect } from "react";
import { ChatMessage as ChatMessageType } from "@/utils/chat-utils";
import { ChatMessage } from "./ChatMessage";

interface ChatMessagesProps {
  messages: ChatMessageType[];
  isTyping?: boolean;
}

export function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex items-center p-4">
            <div className="flex space-x-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0.2s" }}></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
