"use client";

import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../types";

export function useChat() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    let id = localStorage.getItem("session_id");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("session_id", id);
    }
    setSessionId(id);
  }, []);

  const handleAsk = async () => {
    if (!message.trim()) return;
    setLoading(true);
    const newHistory: Message[] = [...history, { role: "user", content: message }];

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          session_id: sessionId,
        }),
      });
      const data = await res.json();

      setHistory([
        ...newHistory,
        { role: "assistant", content: data.response || "No response." },
      ]);
      setMessage("");
    } catch (error) {
      setHistory([
        ...newHistory,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    message,
    setMessage,
    history,
    loading,
    inputRef,
    chatEndRef,
    handleAsk,
  };
}
