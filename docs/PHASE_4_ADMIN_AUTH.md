# Fase 4 — autenticação, administração e memória

## Arquitetura

- O frontend público continua sendo React/Vite e acessa `POST /api/chat`.
- O frontend administrativo usa Supabase Auth apenas com a chave publicável.
- O backend valida cada bearer token com `supabase.auth.getUser()` e consulta `profiles.role` antes de executar qualquer rota administrativa.
- O cliente Supabase com `SUPABASE_SECRET_KEY` existe somente no backend.
- Visitantes do chat recebem UUIDs aleatórios persistidos no `localStorage`; somente o SHA-256 desse identificador é salvo no banco.

## Variáveis

Backend:

```text
SUPABASE_URL
SUPABASE_SECRET_KEY
GEMINI_API_KEY
GEMINI_MODEL
FRONTEND_URL
ALLOWED_ORIGINS
```

Frontend:

```text
VITE_API_URL
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

Nunca configure `SUPABASE_SECRET_KEY` em uma variável `VITE_*`.

## Autenticação e autorização

O login em `/admin/login` usa e-mail e senha pelo Supabase Auth. A sessão é persistida pelo SDK no navegador. Recuperação de senha usa `resetPasswordForEmail`; configure a URL de produção `/admin/login` nas Redirect URLs do Supabase.

O frontend não oferece cadastro. Ausência de formulário não substitui a configuração do Supabase: em **Authentication > Providers > Email**, desative novos cadastros públicos. O backend não possui endpoint de cadastro.

Toda rota `/api/admin/*` exige `Authorization: Bearer <access_token>`. O middleware:

1. valida o token diretamente no Supabase Auth;
2. carrega o profile pelo UUID autenticado;
3. exige `role = 'admin'`;
4. devolve 401 para sessão ausente/inválida e 403 para usuário comum.

## Primeiro admin

1. Desative cadastro público no Supabase Auth.
2. No Dashboard, abra **Authentication > Users > Add user**.
3. Crie a conta da Karla com uma senha temporária forte e confirmação automática somente se apropriado.
4. Copie o UUID do usuário.
5. Confirme que o trigger criou o profile:

```sql
select id, full_name, role
from public.profiles
where id = '<UUID>';
```

6. Promova somente esse UUID no SQL Editor:

```sql
update public.profiles
set role = 'admin'
where id = '<UUID>';
```

7. Faça login em `/admin/login` e troque a senha temporária pelo fluxo de recuperação, se necessário.

Não automatize esse processo e não armazene senha no repositório.

## Endpoints administrativos

| Método | Endpoint | Uso |
| --- | --- | --- |
| GET | `/api/admin/me` | Validação da sessão e role administrativa |
| GET | `/api/admin/dashboard` | Totais, últimos contatos e status |
| GET | `/api/admin/clients` | Lista paginada e pesquisa |
| GET | `/api/admin/clients/:id` | Detalhe do cliente |
| PATCH | `/api/admin/clients/:id` | Dados básicos e ativo/inativo |
| GET | `/api/admin/conversations` | Lista paginada, filtro `clientId` |
| GET | `/api/admin/conversations/:id` | Histórico limitado a 200 mensagens |
| GET | `/api/admin/settings` | Configurações do site |
| PATCH | `/api/admin/settings` | Atualização em lote |

## Persistência e memória do chat

O frontend mantém `visitorId` e `conversationId` no `localStorage`. A cada mensagem o backend:

1. normaliza ou cria o UUID do visitante;
2. busca/cria `clients` pelo hash do UUID;
3. valida ou cria a conversa associada;
4. recupera as 20 mensagens recentes em ordem cronológica;
5. salva a mensagem `user`;
6. chama o Gemini com a persona existente e o histórico recuperado;
7. salva `assistant` somente se o Gemini responder com sucesso;
8. atualiza `last_contact_at`.

Não há embeddings nem busca vetorial nesta fase.

## Banco, RLS e grants

A migration `202608070003_phase_4_admin_auth_memory.sql`:

- adiciona `profiles.role` com valores `user`/`admin`;
- permite clientes e conversas públicas sem vincular um usuário Auth;
- adiciona hashes de visitante, status do cliente e último contato;
- cria índices para sessão, listagens e histórico recente;
- remove update amplo em `profiles`;
- concede ao usuário autenticado update apenas de `full_name`, `avatar_url` e `phone`;
- concede ao `service_role` o acesso usado pelo backend.

Visitantes não consultam as tabelas diretamente. Usuários comuns continuam limitados pelas policies existentes e não conseguem alterar `role`. A administração lê dados com service role somente após o middleware validar o admin.

Aplicação:

```bash
npx supabase link --project-ref <PROJECT_REF>
npx supabase db push
```

## Deploy e validação

1. Aplique a migration antes de publicar o backend.
2. Confirme as variáveis do backend e frontend.
3. Adicione `/admin/login` às Redirect URLs do Supabase.
4. Publique backend e frontend pelos fluxos existentes.
5. Valide `/api/health`, `/api/health/database`, login, dashboard e uma conversa pública.

Comandos locais:

```bash
cd backend && npm test
cd frontend && npm run lint && npm run build
git diff --check
```
