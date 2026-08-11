# Fase 5 — autenticação e perfil do aluno

## Arquitetura

- Supabase Auth mantém cadastro, login, recuperação e sessão persistente.
- O frontend usa somente `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`.
- O backend valida todos os bearer tokens com `auth.getUser()`.
- `requireAuth` protege `/api/me` e `/api/auth/claim-visitor`.
- `requireAdmin` consulta `profiles.role`; nenhuma role enviada pelo navegador é aceita.
- A secret key permanece somente no backend.

## Rotas do frontend

- `/login`: login de cliente.
- `/cadastro`: cadastro por e-mail e senha.
- `/recuperar-senha`: solicitação e definição de nova senha.
- `/conta`: perfil protegido do aluno.
- `/admin/login`, `/admin`, `/admin/clientes`, `/admin/clientes/:id` e `/admin/conversas`: administração protegida.

## Endpoints

Todos os endpoints abaixo exigem `Authorization: Bearer <access_token>`:

| Método | Endpoint | Função |
| --- | --- | --- |
| GET | `/api/me` | Retorna somente o profile autenticado |
| PATCH | `/api/me` | Atualiza campos permitidos do próprio profile |
| POST | `/api/auth/claim-visitor` | Associa o histórico visitante ao usuário |

`role` nunca é aceito no PATCH. Alteração de e-mail atualiza o usuário Auth pelo backend e o espelho em `profiles.email`.

## Claim visitante → usuário

Após login ou cadastro com sessão ativa, o frontend lê `karla-premium-visitor-id` do `localStorage` e chama `/api/auth/claim-visitor`. O backend calcula SHA-256 e executa a função transacional `claim_visitor_client`.

Se o usuário ainda não tiver client, o registro visitante recebe `user_id`. Se já existir outro client do usuário, as conversas são movidas para ele e o registro visitante redundante é removido. Mensagens permanecem ligadas às mesmas conversas e não são copiadas.

Depois do claim, o chat autenticado prioriza `clients.user_id` e `conversations.user_id`. Visitantes continuam usando somente o hash do UUID local.

## Memória personalizada

Para uma requisição autenticada, o backend carrega somente o profile do UUID validado no bearer token:

- `full_name`
- `goal`
- `height_cm`
- `weight_kg`
- `restrictions`
- `injuries`
- `experience_level`

Esses dados são adicionados apenas ao contexto transitório da chamada atual. Não são salvos como mensagens, não alteram o prompt base e não são retornados como dados técnicos.

## Migration e RLS

Aplicar `202608080004_phase_5_client_auth_profile.sql` depois das migrations anteriores. Ela:

- converte role `user` para `client`;
- limita roles a `client/admin`;
- adiciona os campos do aluno e constraints numéricas/experiência;
- sincroniza e indexa e-mail;
- atualiza o trigger de novos usuários;
- garante no máximo um client por usuário;
- cria o claim transacional acessível somente por `service_role`;
- restringe update direto do profile aos campos seguros, excluindo `role` e `email`.

As policies anteriores continuam limitando profile, clients, conversations e messages pelo `auth.uid()`. Administração ocorre via backend depois de `requireAdmin`.

## Configuração manual do Supabase Auth

1. Em **Authentication > Providers > Email**, habilite cadastro por e-mail.
2. Mantenha confirmação de e-mail habilitada para produção.
3. Em **URL Configuration**, configure a Site URL da produção.
4. Adicione às Redirect URLs:
   - `https://SEU_FRONTEND/conta`
   - `https://SEU_FRONTEND/recuperar-senha`
   - URLs locais equivalentes para desenvolvimento.
5. Aplique a migration:

```bash
npx supabase link --project-ref <PROJECT_REF>
npx supabase db push
```

## Primeiro admin

Crie a conta da Karla normalmente pelo Supabase Auth ou Dashboard. Copie o UUID e execute no SQL Editor com credenciais administrativas:

```sql
update public.profiles
set role = 'admin'
where id = '<UUID_DA_KARLA>';
```

Não existe cadastro público de admin e nenhuma senha é armazenada no código.

## Validação manual necessária

Após aplicar a migration:

1. cadastrar um cliente e confirmar o e-mail;
2. fazer login e editar `/conta`;
3. conversar anonimamente, entrar e confirmar que o histórico permanece;
4. tentar abrir `/admin` como client e confirmar o bloqueio;
5. entrar com o primeiro admin e validar clientes e conversas;
6. confirmar que alteração de `role` via Data API é rejeitada.
