import { Message } from "../types/message";

interface ChatMessageProps {
  msg: Message;
}

export const ChatMessage = ({ msg }: ChatMessageProps) => {
  return (
    <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] p-3 rounded-2xl text-sm ${
          msg.role === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        <p>{msg.content}</p>
      </div>
    </div>
  );
};
