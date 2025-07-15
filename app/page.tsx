"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleAsk = async () => {
    if (!message.trim()) return;
    setLoading(true);

    const newHistory = [...history, { role: "user", content: message }];

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
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-2xl p-6 rounded-lg shadow-lg bg-white mt-10 mb-24">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">
          🩺 MedBot – Your Symptom Assistant
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
      <div className="fixed bottom-0 w-full bg-white border-t p-4">
        <div className="flex max-w-2xl mx-auto items-center space-x-2">
          <textarea
            rows={2}
            className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
              loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>
      </div>
    </main>
  );
}
