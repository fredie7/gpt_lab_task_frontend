import { useState } from "react";

interface ChatInputProps {
  loading: boolean;
  onSend: (message: string) => void;
}

export const ChatInput = ({ loading, onSend }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="fixed bottom-0 w-full bg-black border-t border-gray-700 p-4">
      <div className="flex max-w-2xl mx-auto items-stretch space-x-2">
        <textarea
          rows={1}
          className="flex-1 bg-white text-black border border-gray-300 rounded-lg resize-none px-3 py-2 h-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Describe your symptoms..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className={`h-12 px-5 rounded-lg text-white font-semibold transition ${
            loading ? "bg-gray-600" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Wait a second..." : "Talk to me"}
        </button>
      </div>
    </div>
  );
};
