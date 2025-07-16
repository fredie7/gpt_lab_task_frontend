"use client";

import Image from "next/image";
import med6 from "../images/med6.jpeg";
import { useState } from "react";
import { Message } from "../types/message";
import { useSessionId } from "../hooks/useSessionId";
import { fetchAssistantResponse } from "../utils/fetchAssistantResponse";
import { ChatBox } from "../components/ChatBox";
import { ChatInput } from "../components/ChatInput";

export default function Home() {
  const [history, setHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const sessionId = useSessionId();

  const handleAsk = async (message: string) => {
    setLoading(true);
    const newHistory = [...history, { role: "user", content: message }];

    try {
      const assistantResponse = await fetchAssistantResponse(message, sessionId);
      setHistory([...newHistory, { role: "assistant", content: assistantResponse }]);
    } catch {
      setHistory([
        ...newHistory,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        <Image src={med6} alt="Background" fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0 bg-black/50 -z-10 pointer-events-none" />

      <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg bg-white bg-opacity-90 mt-10 mb-24">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">
          <div className="text-indigo-700 bg-white rounded-xl shadow-[0_4px_20px_rgba(99,102,241,0.3)] px-6 py-3">
            SymptoCare
          </div>
          <div
            className="text-emerald-600 text-2xl mt-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {history.length === 0
              ? "How are you feeling today?"
              : "Let's keep the conversation going..."}
          </div>
        </h1>

        <ChatBox history={history} />
      </div>

      <ChatInput loading={loading} onSend={handleAsk} />
    </main>
  );
}
