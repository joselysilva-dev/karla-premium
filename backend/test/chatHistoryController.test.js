import assert from "node:assert/strict";
import test from "node:test";
import { createChatHistoryControllers } from "../src/controllers/chatHistoryController.js";

function response() { return { statusCode: 200, body: null, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; } }; }

test("lists conversations ordered by the service", async () => {
  const expected = [{ id: "conversation-2" }, { id: "conversation-1" }];
  const controllers = createChatHistoryControllers({ list: async (visitor) => { assert.equal(visitor, "visitor"); return expected; } });
  const res = response();
  await controllers.listChatConversations({ get: () => "visitor", query: {} }, res, assert.fail);
  assert.deepEqual(res.body, expected);
});

test("returns a conversation history", async () => {
  const expected = [{ role: "user", conteudo: "Olá", created_at: "2026-08-07T12:00:00Z" }];
  const controllers = createChatHistoryControllers({ history: async (visitor, conversation) => { assert.equal(visitor, "visitor"); assert.equal(conversation, "conversation"); return expected; } });
  const res = response();
  await controllers.getChatHistory({ get: () => "visitor", query: {}, params: { conversationId: "conversation" } }, res, assert.fail);
  assert.deepEqual(res.body, expected);
});
