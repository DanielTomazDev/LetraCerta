# LetraCerta

Uma plataforma moderna de letras e cifras voltada para músicos. Encontre letras, visualize acordes, ajuste o tom e toque ao vivo com modo performance, tudo em um só lugar.

##  Funcionalidades

- **Busca Inteligente**: Procure músicas por nome, artista ou trecho da letra
-  **Visualização de Letras e Acordes**: Veja letras e cifras sincronizadas
- **Transposição de Tom**: Ajuste o tom automaticamente com controles simples
- **Modo Performance**: 
  - Letras grandes e legíveis
  - Auto-scroll configurável
  - Layout limpo e sem distrações
  - Controle de BPM
-  **Autenticação**: Login com Google usando NextAuth.js
- **Biblioteca Pessoal**: 
  - Favoritar músicas
  - Criar playlists/repertórios
  - Upload de músicas próprias
- **Modo Escuro**: Interface moderna com tema escuro
-  **Responsivo**: Funciona perfeitamente em mobile, tablet e desktop

##  Stack Tecnológica

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animações)
- **Supabase** (PostgreSQL gratuito)
- **NextAuth.js** (autenticação com Google)
- **Zustand** (estado global)
- **Axios** (requisições HTTP)
- **React Hook Form** (formulários)
- **Zod** (validação)

## 🚀 Configuração

### Pré-requisitos

- Node.js 18+ instalado
- Conta no [Supabase](https://supabase.com/)
- Conta no Google (para OAuth)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/DanielTomazDev/LetraCerta.git
cd LetraCerta
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `env.example` para `.env.local`
- Preencha as variáveis necessárias (veja `env.example` para referência)

4. Configure o Supabase:
- Crie um projeto no [Supabase](https://supabase.com/)
- Execute o SQL em `lib/supabase/schema.sql` no SQL Editor do Supabase
- Copie a URL e a chave anônima para o `.env.local`

5. Configure o Google OAuth:
- **⚠️ IMPORTANTE**: Siga o guia completo em [`CONFIGURAR_GOOGLE_OAUTH.md`](./CONFIGURAR_GOOGLE_OAUTH.md)
- Você precisa registrar os URIs de redirecionamento no Google Cloud Console:
  - Desenvolvimento: `http://localhost:3000/api/auth/callback/google`
  - Produção: `https://seu-dominio.netlify.app/api/auth/callback/google`

6. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

7. Acesse `http://localhost:3000` no navegador

## 📚 Documentação Adicional

- [Configurar Google OAuth 2.0](./CONFIGURAR_GOOGLE_OAUTH.md) - Guia completo para configurar o login com Google



