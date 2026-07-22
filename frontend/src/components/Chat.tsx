type Message = {
  author: string;
  text: string;
};

type ChatProps = {
  messages: Message[];
};

export default function Chat({ messages }: ChatProps) {
  return (
    <div
      style={{
        height: "250px",
        overflowY: "auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
    >
      {messages.length === 0 ? (
        <p>Nenhuma mensagem.</p>
      ) : (
        messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "12px",
              textAlign: msg.author === "Você" ? "right" : "left",
            }}
          >
            <strong>{msg.author}</strong>
            <div>{msg.text}</div>
          </div>
        ))
      )}
    </div>
  );
}