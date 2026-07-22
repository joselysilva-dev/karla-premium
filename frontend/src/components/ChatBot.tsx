import { useState } from "react";
import Chat from "./Chat";
import { sendMessage } from "../services/api";

type Message = {
  author: string;
  text: string;
};

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      author: "Karla",
      text: "Olá! Sou a assistente virtual da Karla. Como posso ajudar você hoje?",
    },
  ]);

  async function handleSend() {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        author: "Você",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const resposta = await sendMessage(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          author: "Karla",
          text: resposta,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          author: "Sistema",
          text: "Erro ao consultar a IA.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h2
        style={{
          color: "#000",
          margin: 0,
        }}
      >
        Chat Karla
      </h2>

      <Chat messages={messages} />

      <input
        type="text"
        value={message}
        placeholder="Digite sua mensagem..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          color: "#000",
          background: "#fff",
        }}
      />

      <button
        onClick={handleSend}
        disabled={loading}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          background: "#e91e63",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </div>
  );
}