import { chatWithKarla } from "../services/geminiService.js";

export async function chatController(req, res, next) {
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

    const resposta = await chatWithKarla(message, history);

    return res.status(200).json({
      success: true,
      response: resposta,
    });
  } catch (error) {
    next(error);
  }
}
