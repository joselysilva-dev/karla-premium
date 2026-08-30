<div align="center">

# Karla Premium

### Plataforma Full Stack para conteúdos, experiências e acessos premium

Aplicação web com ambiente público, autenticação, área protegida da aluna,  
controle de acesso premium e painel administrativo.

![React](https://img.shields.io/badge/React-2A1835?style=for-the-badge&logo=react&logoColor=F4B8E4)
![TypeScript](https://img.shields.io/badge/TypeScript-2A1835?style=for-the-badge&logo=typescript&logoColor=C7A0FF)
![Node.js](https://img.shields.io/badge/Node.js-2A1835?style=for-the-badge&logo=nodedotjs&logoColor=F4B8E4)
![Express](https://img.shields.io/badge/Express-2A1835?style=for-the-badge&logo=express&logoColor=C7A0FF)
![Supabase](https://img.shields.io/badge/Supabase-2A1835?style=for-the-badge&logo=supabase&logoColor=F4B8E4)

</div>

---

## Sobre o projeto

A **Karla Premium** é uma plataforma Full Stack desenvolvida para reunir a apresentação pública da profissional, conteúdos exclusivos e recursos destinados às alunas.

O projeto possui uma área pública, autenticação de usuários, ambiente protegido para alunas e uma estrutura administrativa exclusiva para gerenciamento de acessos e conteúdos premium.

A aplicação também integra recursos de inteligência artificial por meio de uma API própria.

> **Status:** projeto em desenvolvimento e refinamento.

---

## Objetivo

O objetivo da plataforma é oferecer uma experiência digital organizada e segura para:

- apresentar os serviços e conteúdos da profissional;
- permitir o cadastro e a autenticação de usuárias;
- disponibilizar um ambiente exclusivo para alunas;
- controlar quem possui acesso premium;
- organizar módulos e conteúdos protegidos;
- administrar convites e permissões;
- integrar recursos de inteligência artificial;
- preparar a plataforma para futuras evoluções.

---

## Principais funcionalidades

### Área pública

- Página inicial responsiva
- Apresentação da profissional
- Apresentação dos serviços
- Conteúdos institucionais
- Navegação para desktop e dispositivos móveis
- Páginas de Termos de Uso
- Política de Privacidade
- Direcionamento para autenticação

### Autenticação

- Cadastro de usuárias
- Login
- Gerenciamento de sessão
- Recuperação de senha
- Validação de usuária autenticada
- Redirecionamento para rotas protegidas

### Área da aluna

- Ambiente privado
- Validação de acesso premium
- Organização de módulos e conteúdos
- Tratamento de acesso pendente
- Proteção de páginas restritas
- Experiência personalizada conforme o perfil da usuária

### Administração

- Área administrativa protegida
- Gerenciamento de acessos
- Controle de perfis e permissões
- Sistema de convites
- Consulta de usuárias
- Liberação de acesso premium
- Estrutura preparada para gerenciamento de conteúdos

### Inteligência artificial

- Integração com API de inteligência artificial
- Endpoint dedicado para conversas
- Comunicação segura entre frontend e backend
- Tratamento de erros do provedor
- Proteção das chaves por variáveis de ambiente

---

## Arquitetura

O projeto está organizado em duas aplicações principais:

```text
karla-premium/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── styles/
│   ├── .env.example
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
└── README.md
```

### Frontend

Responsável pela interface, navegação, autenticação, experiência da aluna e administração.

### Backend

Responsável pela API, validação de acesso, rotas administrativas, integração com inteligência artificial e comunicação segura com os serviços externos.

### Supabase

Utilizado no projeto para autenticação, gerenciamento de usuárias, armazenamento das informações necessárias à aplicação e controle de acesso.

---

## Tecnologias

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React
- Swiper
- Supabase JavaScript Client
- ESLint

### Backend

- Node.js
- Express
- JavaScript
- Supabase JavaScript Client
- CORS
- dotenv
- Nodemon
- Node Test Runner

### Inteligência artificial

- Google Gemini
- Estrutura preparada para integração com OpenAI

---

## Segurança

O projeto aplica fundamentos importantes de segurança:

- rotas protegidas;
- validação de sessão;
- controle de perfis e permissões;
- restrição de acesso administrativo;
- configuração de CORS;
- lista de origens permitidas;
- variáveis de ambiente;
- chaves privadas mantidas somente no backend;
- limite para o tamanho das requisições;
- tratamento centralizado de erros;
- ocultação de informações sensíveis nos registros;
- políticas de Row Level Security utilizadas na estrutura do projeto.

> As chaves e credenciais reais não devem ser adicionadas ao GitHub.

---

## Rotas da API

A API possui rotas organizadas para:

```text
/api/health
/api/me
/api/chat
/api/admin
```

### Exemplos

| Rota | Finalidade |
|---|---|
| `/api/health` | Verificar se a API está funcionando |
| `/api/me` | Consultar informações da usuária autenticada |
| `/api/chat` | Processar interações com inteligência artificial |
| `/api/admin` | Disponibilizar operações administrativas protegidas |

---

## Executando localmente

### Pré-requisitos

Antes de iniciar, instale:

- Node.js
- npm
- Git

Também será necessário configurar um projeto no Supabase e uma chave válida para o provedor de inteligência artificial utilizado.

---

## Clonando o repositório

```bash
git clone https://github.com/joselysilva-dev/karla-premium.git
```

```bash
cd karla-premium
```

---

## Configurando o frontend

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` com base em `.env.example`:

```env
VITE_API_URL=http://localhost:3001/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Inicie o frontend:

```bash
npm run dev
```

A aplicação estará disponível normalmente em:

```text
http://localhost:5173
```

---

## Configurando o backend

Em outro terminal, entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` com base em `.env.example`:

```env
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3.1-flash-lite
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=
PORT=3001
NODE_ENV=development
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=
```

Inicie o backend em desenvolvimento:

```bash
npm run dev
```

Ou execute em modo normal:

```bash
npm start
```

A API estará disponível em:

```text
http://localhost:3001
```

---

## Scripts disponíveis

### Frontend

| Comando | Finalidade |
|---|---|
| `npm run dev` | Iniciar o servidor de desenvolvimento |
| `npm run build` | Validar o TypeScript e gerar a versão de produção |
| `npm run lint` | Executar a análise do código |
| `npm run preview` | Visualizar localmente a versão de produção |

### Backend

| Comando | Finalidade |
|---|---|
| `npm run dev` | Iniciar a API com Nodemon |
| `npm start` | Iniciar a API com Node.js |
| `npm test` | Executar os testes do backend |

---

## Aprendizados aplicados

Durante o desenvolvimento deste projeto, foram praticados:

- organização de uma aplicação Full Stack;
- separação entre frontend e backend;
- desenvolvimento de API REST;
- autenticação e gerenciamento de sessão;
- proteção de rotas;
- controle de perfis e permissões;
- integração com Supabase;
- configuração de variáveis de ambiente;
- integração com inteligência artificial;
- tratamento de erros;
- comunicação entre frontend e API;
- criação de ambientes público, privado e administrativo;
- responsividade e experiência do usuário;
- versionamento com Git e GitHub.

---

## Próximos passos

- Finalizar o fluxo de acesso premium
- Refinar o painel administrativo
- Concluir a organização dos módulos
- Ampliar os testes do backend
- Revisar as políticas de segurança
- Melhorar mensagens de carregamento e erro
- Validar toda a jornada da aluna
- Preparar a versão final para publicação

---

## Autora

**Josely Silva Lima**

Estudante do 2º semestre de Engenharia de Software  
Desenvolvedora Backend e Full Stack em formação  
Fundadora da Luara Digital

[![GitHub](https://img.shields.io/badge/GitHub-2A1835?style=for-the-badge&logo=github&logoColor=F4B8E4)](https://github.com/joselysilva-dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-7C5CFC?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/joselysilvadev)
[![E-mail](https://img.shields.io/badge/E--mail-D65DB1?style=for-the-badge&logo=gmail&logoColor=white)](mailto:joselysilvadev@gmail.com)

---

<div align="center">

Desenvolvido com estratégia, tecnologia e atenção aos detalhes.

</div>
