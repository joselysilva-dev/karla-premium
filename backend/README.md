# Karla Premium API

Backend Node.js/Express responsável pelo endpoint de conversa com a Karla Premium.

## Instalação

```bash
npm install
```

Copie `.env.example` para `.env` e preencha as variáveis necessárias. O arquivo `.env` real não deve ser versionado.

## Variáveis de ambiente

- `GEMINI_API_KEY`: chave da API Gemini (obrigatória).
- `GEMINI_MODEL`: identificador do modelo usado nas conversas (opcional; padrão `gemini-3.1-flash-lite`). O backend usa somente este modelo e não faz fallback automático.
- `FRONTEND_URL`: origem principal autorizada pelo CORS, por exemplo `https://karla-premium.vercel.app` (obrigatória).
- `ALLOWED_ORIGINS`: origens adicionais autorizadas pelo CORS, separadas por vírgulas (opcional). Exemplo: `http://localhost:5173,https://preview.example.com`.
- `PORT`: porta HTTP do servidor (opcional; padrão `3001`).
- `NODE_ENV`: use `production` no ambiente de produção.
- `SUPABASE_URL`: URL do projeto Supabase (obrigatória).
- `SUPABASE_SECRET_KEY`: chave secreta do Supabase, usada somente no backend (obrigatória). Nunca exponha esta chave no frontend.

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

### `GET /api/health/database`

Verifica se o backend consegue consultar o Supabase. Em caso de sucesso, retorna HTTP `200` com `database: "connected"`. Se a conexão ou consulta falhar, retorna HTTP `503` com `database: "unavailable"`, sem expor detalhes do provedor.

### `POST /api/chat`

Recebe uma mensagem e o histórico opcional da conversa:

```json
{
  "message": "Olá",
  "history": []
}
```

O backend persiste a conversa no Supabase e devolve também `visitorId` e
`conversationId`. O frontend deve reutilizar esses identificadores nas mensagens
seguintes para manter a memória da sessão.

## Administração

As rotas sob `/api/admin` exigem um access token Supabase de um profile com
`role = 'admin'`. Consulte [`../docs/PHASE_4_ADMIN_AUTH.md`](../docs/PHASE_4_ADMIN_AUTH.md)
para endpoints, segurança, migration e criação do primeiro administrador.

## Área do aluno

Autenticação, profile, claim do histórico visitante e memória personalizada estão
documentados em [`../docs/PHASE_5_CLIENT_AUTH.md`](../docs/PHASE_5_CLIENT_AUTH.md).

Resposta de sucesso:

```json
{
  "success": true,
  "response": "Resposta da Karla"
}
```

## Banco de dados

A migration inicial está em `../supabase/migrations/202608050001_initial_schema.sql`. Aplique-a pelo Supabase CLI ou pelo SQL Editor antes de usar o health check. Ela cria as tabelas, índices, triggers, RLS e policies da aplicação.
