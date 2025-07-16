export const fetchAssistantResponse = async (
  message: string,
  sessionId: string
): Promise<string> => {
  const res = await fetch("http://localhost:8000/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, session_id: sessionId }),
  });

  const data = await res.json();
  return data.response || "No response.";
};
