import "dotenv/config";

import express from "express";
import cors from "cors";

import chatRoutes from "./routes/chatRoutes.js";

const requiredEnvironmentVariables = [
  "GEMINI_API_KEY",
  "FRONTEND_URL",
];

const missingEnvironmentVariables = requiredEnvironmentVariables.filter(
  (variableName) => !process.env[variableName]?.trim()
);

if (missingEnvironmentVariables.length > 0) {
  console.error(
    `Erro de configuração: defina ${missingEnvironmentVariables.join(", ")} antes de iniciar o servidor.`
  );
  process.exit(1);
}

const app = express();

function normalizeOrigin(origin) {
  return origin.trim().replace(/\/+$/, "");
}

const additionalAllowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map(normalizeOrigin)
  .filter(Boolean);

const allowedOrigins = new Set([
  normalizeOrigin(process.env.FRONTEND_URL),
  ...additionalAllowedOrigins,
]);

app.use(
  cors({
    origin(origin, callback) {
      // Clientes sem Origin são aceitos para health checks e ferramentas de teste.
      if (!origin || allowedOrigins.has(normalizeOrigin(origin))) {
        callback(null, true);
        return;
      }

      callback(new Error("Origem não autorizada."));
    },
  })
);
app.use(express.json({ limit: "20kb" }));

app.use("/api", chatRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "karla-premium-api",
  });
});

app.get("/", (req, res) => {
  res.send("API Karla Karolynne Online 🚀");
});

app.use((req, res) => {
  res.status(404).json({
    error: "Rota não encontrada.",
  });
});

function sanitizeErrorMessage(error) {
  const message =
    typeof error?.safeMessage === "string"
      ? error.safeMessage
      : typeof error?.message === "string"
        ? error.message
        : "Erro sem mensagem.";
  const apiKey = process.env.GEMINI_API_KEY;

  return message
    .replace(apiKey || /$^/, "[REDACTED]")
    .replace(/AIza[\w-]+/g, "[REDACTED]")
    .replace(/[\r\n\t]+/g, " ")
    .slice(0, 500);
}

app.use((error, req, res, next) => {
  console.error("Erro interno ao processar requisição.", {
    stage: error?.stage || "http_request",
    model: error?.model || null,
    providerCategory: error?.providerCategory || null,
    name: error?.name || "Error",
    code: error?.code ?? null,
    status: error?.status ?? error?.statusCode ?? null,
    message: sanitizeErrorMessage(error),
  });

  res.status(500).json({
    error: "Erro interno do servidor.",
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
