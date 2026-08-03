# Karla Premium API

Backend Node.js/Express responsável pelo endpoint de conversa com a Karla Premium.

## Instalação

```bash
npm install
```

Copie `.env.example` para `.env` e preencha as variáveis necessárias. O arquivo `.env` real não deve ser versionado.

## Variáveis de ambiente

- `GEMINI_API_KEY`: chave da API Gemini (obrigatória).
- `FRONTEND_URL`: origem principal autorizada pelo CORS, por exemplo `https://karla-premium.vercel.app` (obrigatória).
- `ALLOWED_ORIGINS`: origens adicionais autorizadas pelo CORS, separadas por vírgulas (opcional). Exemplo: `http://localhost:5173,https://preview.example.com`.
- `PORT`: porta HTTP do servidor (opcional; padrão `3001`).
- `NODE_ENV`: use `production` no ambiente de produção.

As origens são comparadas sem barras finais. Requisições sem o cabeçalho `Origin`, como health checks, também são aceitas. Não use `*` nessas variáveis.

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
