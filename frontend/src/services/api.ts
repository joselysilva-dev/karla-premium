const API_URL = "http://localhost:3001/api";

export async function sendMessage(message: string): Promise<string> {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data: { response?: string; error?: string } = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao consultar a IA.");
  }

  return data.response ?? "";
}