import { chatWithKarla } from "../services/geminiService.js";

export async function chatController(req, res, next) {
  try {
    const { message, history = [] } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "A mensagem é obrigatória.",
      });
    }

    const historyIsValid =
      Array.isArray(history) &&
      history.every(
        (item) =>
          item &&
          (item.role === "user" || item.role === "assistant") &&
          typeof item.content === "string"
      );

    if (!historyIsValid) {
      return res.status(400).json({
        error: "O histórico da conversa é inválido.",
      });
    }

    const resposta = await chatWithKarla(message.trim(), history);

    return res.status(200).json({
      success: true,
      response: resposta,
    });
  } catch (error) {
    next(error);
  }
}
