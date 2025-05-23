
import React from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useChatMessages } from "@/utils/chat-utils";

interface ChatContentProps {
  onClose: () => void;
}

export function ChatContent({ onClose }: ChatContentProps) {
  const { messages, isTyping, addUserMessage } = useChatMessages();

  return (
    <div className="flex flex-col h-full">
      <ChatHeader onClose={onClose} />
      <ChatMessages messages={messages} isTyping={isTyping} />
      <ChatInput onSendMessage={addUserMessage} disabled={isTyping} />
    </div>
  );
}
