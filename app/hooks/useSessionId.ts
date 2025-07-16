import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const useSessionId = () => {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    let id = localStorage.getItem("session_id");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("session_id", id);
    }
    setSessionId(id);
  }, []);

  return sessionId;
};
