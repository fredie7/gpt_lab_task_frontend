import { useEffect, RefObject } from "react";

export const useScrollToBottom = (ref: RefObject<HTMLDivElement>, deps: any[]) => {
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, deps);
};
