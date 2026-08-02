# Karla Premium API

Backend Node.js/Express responsável pelo endpoint de conversa com a Karla Premium.

## Instalação

```bash
npm install
```

Copie `.env.example` para `.env` e preencha as variáveis necessárias. O arquivo `.env` real não deve ser versionado.

## Variáveis de ambiente

- `GEMINI_API_KEY`: chave da API Gemini (obrigatória).
- `FRONTEND_URL`: origem autorizada pelo CORS, por exemplo `http://localhost:5173` (obrigatória).
- `PORT`: porta HTTP do servidor (opcional; padrão `3001`).
- `NODE_ENV`: use `production` no ambiente de produção.

## Execução

Desenvolvimento com reinicialização automática:

```bash
npm run dev
```

Produção:

```bash
npm start
```

## Endpoints

### `GET /api/health`

Retorna o estado da API:

```json
{
  "status": "ok",
  "service": "karla-premium-api"
}
```

### `POST /api/chat`

Recebe uma mensagem e o histórico opcional da conversa:

```json
{
  "message": "Olá",
  "history": []
}
```

Resposta de sucesso:

```json
{
  "success": true,
  "response": "Resposta da Karla"
}
```
