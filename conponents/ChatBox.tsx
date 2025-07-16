import { ChatMessage } from "./ChatMessage";
import { Message } from "../types/message";
import { useRef } from "react";
import { useScrollToBottom } from "../hooks/useScrollToBottom";

interface ChatBoxProps {
  history: Message[];
}

export const ChatBox = ({ history }: ChatBoxProps) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  useScrollToBottom(chatEndRef, [history]);

  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      {history.map((msg, idx) => (
        <ChatMessage key={idx} msg={msg} />
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};
