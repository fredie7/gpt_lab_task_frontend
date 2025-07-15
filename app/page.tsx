"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import med6 from "../images/med6.jpeg";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleAsk = async () => {
    if (!message.trim()) return;
    setLoading(true);

    const newHistory: Message[] = [...history, { role: "user", content: message }];

    const res = await fetch("http://localhost:8000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });

    const data = await res.json();

    setHistory([
      ...newHistory,
      { role: "assistant", content: data.response },
    ]);
    setMessage("");
    setLoading(false);
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={med6}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark Transparent Overlay */}
      <div className="absolute inset-0 bg-black/75 -z-10 pointer-events-none" />

      <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg bg-white bg-opacity-90 mt-10 mb-24">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">
            <div className="text-indigo-700 bg-white rounded-xl shadow-[0_4px_20px_rgba(99,102,241,0.3)] px-6 py-3 text-4xl font-bold text-center">
              SymptoCare
            </div>

        <div
          className="text-emerald-600 text-2xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          How are you feeling today?
        </div>

        </h1>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {history.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
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
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Sticky Input Bar */}
      <div className="fixed bottom-0 w-full bg-black border-t border-gray-700 p-4">
      <div className="flex max-w-2xl mx-auto items-stretch space-x-2">
        <textarea
          rows={1}
          className="flex-1 bg-white text-black border border-gray-300 rounded-lg resize-none px-3 py-2 h-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Describe your symptoms..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAsk();
            }
          }}
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className={`h-12 px-5 rounded-lg text-white font-semibold transition ${
            loading ? "bg-gray-600" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
    </div>
    </main>
  );
}
