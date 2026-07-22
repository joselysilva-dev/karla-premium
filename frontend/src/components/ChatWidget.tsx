import { useState } from "react";
import ChatBot from "./ChatBot";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "350px",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "15px",
            boxShadow: "0 4px 12px rgba(0,0,0,.2)",
            zIndex: 9999,
          }}
        >
          <ChatBot />
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "none",
          background: "#e91e63",
          color: "#fff",
          fontSize: "28px",
          cursor: "pointer",
          zIndex: 9999,
        }}
      >
        💬
      </button>
    </>
  );
}