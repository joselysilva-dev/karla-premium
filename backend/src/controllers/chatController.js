import { chatWithKarla } from "../services/geminiService.js";

export async function chatController(req, res) {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        error: "A mensagem é obrigatória.",
      });
    }

    if (!Array.isArray(history)) {
      return res.status(400).json({
        success: false,
        error: "O histórico da conversa é inválido.",
      });
    }

    console.log("===== NOVA MENSAGEM =====");
    console.log("Mensagem:", message);
    console.log("Mensagens no histórico:", history.length);

    const resposta = await chatWithKarla(message, history);

    return res.status(200).json({
      success: true,
      response: resposta,
    });
  } catch (error) {
    console.error("===== ERRO NO CHAT CONTROLLER =====");
    console.error(error);

    return res.status(500).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro interno ao processar a mensagem.",
    });
  }
}