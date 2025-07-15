"use client"
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    const res = await fetch("http://localhost:8000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });

    const data = await res.json();
    setResponse(data.response);
    setHistory([...history, { role: "user", content: message }, { role: "assistant", content: data.response }]);
    setMessage("");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl mb-4">🩺 Medical Assistant</h1>
      <textarea
        className="border p-2 w-full max-w-xl"
        placeholder="Describe your symptom..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleAsk}
      >
        Ask
      </button>
      <div className="mt-6 w-full max-w-xl space-y-4">
        {history.map((msg, idx) => (
          <div key={idx} className={msg.role === "user" ? "text-right" : "text-left"}>
            <p><strong>{msg.role === "user" ? "You" : "Assistant"}:</strong> {msg.content}</p>
          </div>
        ))}
        {response && (
          <div className="mt-4 text-green-700">
            <strong>Assistant:</strong> {response}
          </div>
        )}
      </div>
    </main>
  );
}
