import { chatWithKarla } from "../services/geminiService.js";
import {
  getOrCreateChatContext,
  loadRecentHistory,
  loadProfileMemory,
  saveChatMessage,
  touchClient,
} from "../services/chatPersistenceService.js";

export function createChatController(dependencies = {}) {
  const {
    createContext = getOrCreateChatContext,
    loadHistory = loadRecentHistory,
    loadMemory = loadProfileMemory,
    saveMessage = saveChatMessage,
    updateClientContact = touchClient,
    generateReply = chatWithKarla,
  } = dependencies;

  return async function chatControllerHandler(req, res, next) {
  try {
    const {
      message,
      visitorId,
      conversationId,
      contact = {},
    } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "A mensagem é obrigatória.",
      });
    }

    if (!contact || typeof contact !== "object" || Array.isArray(contact)) {
      return res.status(400).json({
        error: "Os dados de contato são inválidos.",
      });
    }

    const context = await createContext({
      visitorId,
      conversationId,
      contact,
      userId: req.user?.id,
    });
    const history = await loadHistory(
      context.supabase,
      context.conversation.id
    );
    const profile = await loadMemory(req.user?.id);
    const personalizedHistory = profile
      ? [{
          role: "user",
          content: `Contexto cadastral da aluna (use apenas para personalizar a resposta atual): ${JSON.stringify(profile)}`,
        }, ...history]
      : history;

    await saveMessage(
      context.supabase,
      context.conversation.id,
      "user",
      message.trim()
    );

    const resposta = await generateReply(message.trim(), personalizedHistory);

    await saveMessage(
      context.supabase,
      context.conversation.id,
      "assistant",
      resposta
    );
    await updateClientContact(context.supabase, context.client.id);

    return res.status(200).json({
      success: true,
      response: resposta,
      visitorId: context.visitorId,
      conversationId: context.conversation.id,
    });
  } catch (error) {
    next(error);
  }
  };
}

export const chatController = createChatController();
