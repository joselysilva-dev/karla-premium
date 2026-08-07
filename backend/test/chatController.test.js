import assert from "node:assert/strict";
import test from "node:test";
import { createChatController } from "../src/controllers/chatController.js";

function response() { return { statusCode: 200, body: null, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; } }; }

test("chat persists user and assistant messages in order", async () => {
  const saved = []; const res = response();
  const controller = createChatController({
    createContext: async () => ({ supabase: {}, visitorId: "visitor", client: { id: "client" }, conversation: { id: "conversation" } }),
    loadHistory: async () => [{ role: "assistant", content: "Anterior" }],
    saveMessage: async (_client, _id, role, content) => saved.push({ role, content }),
    updateClientContact: async () => {},
    generateReply: async (_message, history) => { assert.equal(history.length, 1); return "Resposta"; },
  });
  await controller({ body: { message: "Olá" } }, res, assert.fail);
  assert.equal(res.statusCode, 200);
  assert.deepEqual(saved, [{ role: "user", content: "Olá" }, { role: "assistant", content: "Resposta" }]);
});

test("chat does not persist an assistant message when Gemini fails", async () => {
  const saved = []; let forwarded;
  const controller = createChatController({
    createContext: async () => ({ supabase: {}, visitorId: "visitor", client: { id: "client" }, conversation: { id: "conversation" } }),
    loadHistory: async () => [],
    saveMessage: async (_client, _id, role) => saved.push(role),
    updateClientContact: async () => {},
    generateReply: async () => { throw new Error("provider failure"); },
  });
  await controller({ body: { message: "Olá" } }, response(), (error) => { forwarded = error; });
  assert.deepEqual(saved, ["user"]); assert.equal(forwarded.message, "provider failure");
});
