import { createPortal } from "react-dom";
export const Portal = ({ children }: { children: React.ReactNode }) => {
  const body = document.querySelector("body");
  if (!body) return;
  return createPortal(children, body as HTMLBodyElement);
};
