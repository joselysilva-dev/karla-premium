import {
  getVisitorConversationHistory,
  listVisitorConversations,
} from "../services/chatPersistenceService.js";

function visitorId(req) {
  return req.get("x-visitor-id") || req.query.visitorId;
}

function handleError(error, res, next) {
  if (Number.isInteger(error?.status) && error.status >= 400 && error.status < 500) {
    return res.status(error.status).json({ error: error.safeMessage || "Requisição inválida." });
  }
  return next(error);
}

export function createChatHistoryControllers(dependencies = {}) {
  const list = dependencies.list || listVisitorConversations;
  const history = dependencies.history || getVisitorConversationHistory;

  return {
    async listChatConversations(req, res, next) {
      try {
        const id = visitorId(req);
        if (!id) return res.status(200).json([]);
        return res.status(200).json(await list(id));
      } catch (error) { return handleError(error, res, next); }
    },
    async getChatHistory(req, res, next) {
      try {
        return res.status(200).json(
          await history(visitorId(req), req.params.conversationId)
        );
      } catch (error) { return handleError(error, res, next); }
    },
  };
}

export const { listChatConversations, getChatHistory } =
  createChatHistoryControllers();
