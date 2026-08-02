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
const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = new Set([
  process.env.FRONTEND_URL.trim().replace(/\/$/, ""),
  ...(!isProduction ? ["http://localhost:5173"] : []),
]);

app.use(
  cors({
    origin(origin, callback) {
      // Clientes sem Origin são aceitos para health checks e ferramentas de teste.
      if (!origin || allowedOrigins.has(origin.replace(/\/$/, ""))) {
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

app.use((_error, req, res, next) => {
  console.error("Erro interno ao processar requisição.");

  res.status(500).json({
    error: "Erro interno do servidor.",
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
