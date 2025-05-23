
import React, { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ChatTrigger } from "./ChatTrigger";
import { ChatContent } from "./ChatContent";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <ChatTrigger onClick={handleOpen} />
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-md p-0">
          <div className="flex flex-col h-full">
            <ChatContent onClose={handleClose} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
