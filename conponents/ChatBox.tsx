// components/ChatBox.tsx
"use client";

import { useState } from "react";
import { initProfile, sendQuestion } from "../lib/api";

export default function ChatBox() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [knownConditions, setKnownConditions] = useState("");
  const [profileSet, setProfileSet] = useState(false);
  const [chat, setChat] = useState<{ user: string; bot: string }[]>([]);
  const [question, setQuestion] = useState("");

  const handleProfileSubmit = async () => {
    try {
      await initProfile({
        age: parseInt(age),
        gender,
        known_conditions: knownConditions.split(",").map((s) => s.trim()),
      });
      setProfileSet(true);
    } catch (err) {
      alert("Error submitting profile");
    }
  };

  const handleSend = async () => {
    if (!question) return;
    const userMessage = question;
    setQuestion("");

    const newChat = [...chat, { user: userMessage, bot: "..." }];
    setChat(newChat);

    const response = await sendQuestion(userMessage);
    newChat[newChat.length - 1].bot = response;
    setChat([...newChat]);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {!profileSet ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Enter Your Health Profile</h2>
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border"
          />
          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border"
          />
          <input
            type="text"
            placeholder="Known Conditions (comma-separated)"
            value={knownConditions}
            onChange={(e) => setKnownConditions(e.target.value)}
            className="w-full p-2 border"
          />
          <button
            onClick={handleProfileSubmit}
            className="px-4 py-2 bg-blue-500 text-white"
          >
            Submit Profile
          </button>
        </div>
      ) : (
        <div>
          <div className="space-y-2 mb-4">
            {chat.map((msg, i) => (
              <div key={i}>
                <p className="font-semibold">You: {msg.user}</p>
                <p className="text-gray-700">Assistant: {msg.bot}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your symptoms..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-2 border"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-green-600 text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
