import { chatWithKarla } from "../services/geminiService.js";

export async function chatController(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "A mensagem é obrigatória."
      });
    }

    const resposta = await chatWithKarla(message);

    return res.json({
      success: true,
      response: resposta
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Erro ao consultar a IA."
    });
  }
}