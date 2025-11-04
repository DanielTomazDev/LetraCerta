# 🔐 Como Configurar Google OAuth para NextAuth.js

Este guia vai te ajudar a configurar o Google OAuth para autenticação no LetraCerta.

## 📋 Passo a Passo Completo

### Passo 1: Criar Projeto no Google Cloud Console

1. **Acesse o Google Cloud Console**
   - Vá para: https://console.cloud.google.com/
   - Faça login com sua conta Google

2. **Criar um Novo Projeto**
   - Clique no menu de projetos (no topo, ao lado de "Google Cloud")
   - Clique em **"New Project"**
   - Dê um nome ao projeto (ex: "LetraCerta")
   - Clique em **"Create"**
   - Aguarde alguns segundos até o projeto ser criado

3. **Selecionar o Projeto**
   - Certifique-se de que o projeto recém-criado está selecionado

### Passo 2: Habilitar a Google+ API

1. **Acessar a Biblioteca de APIs**
   - No menu lateral, vá em **"APIs & Services"** > **"Library"**
   - Ou acesse diretamente: https://console.cloud.google.com/apis/library

2. **Habilitar Google+ API**
   - Na barra de busca, digite: **"Google+ API"**
   - Clique no resultado **"Google+ API"**
   - Clique no botão **"Enable"** (Habilitar)
   - Aguarde alguns segundos

   **NOTA:** A Google+ API foi descontinuada, mas ainda é necessária para OAuth. Alternativamente, você pode usar apenas "Google OAuth2 API" que já vem habilitada.

### Passo 3: Criar Credenciais OAuth 2.0

1. **Acessar Credenciais**
   - No menu lateral, vá em **"APIs & Services"** > **"Credentials"**
   - Ou acesse diretamente: https://console.cloud.google.com/apis/credentials

2. **Criar Tela de Consentimento OAuth**
   - Primeiro, você precisa configurar a tela de consentimento
   - Clique em **"OAuth consent screen"** no menu lateral
   - Escolha **"External"** (para usuários externos) e clique em **"Create"**
   - Preencha os campos:
     - **App name**: `LetraCerta` (ou qualquer nome)
     - **User support email**: Seu email
     - **Developer contact information**: Seu email
   - Clique em **"Save and Continue"**
   - Na próxima tela (Scopes), clique em **"Save and Continue"** sem adicionar nada
   - Na tela de Test users, clique em **"Save and Continue"** sem adicionar nada
   - Na tela de Summary, clique em **"Back to Dashboard"**

3. **Criar Credenciais OAuth**
   - Volte para **"Credentials"**
   - Clique no botão **"+ CREATE CREDENTIALS"** (no topo)
   - Selecione **"OAuth client ID"**

4. **Configurar OAuth Client ID**
   - **Application type**: Selecione **"Web application"**
   - **Name**: Dê um nome (ex: "LetraCerta Web Client")
   - **Authorized JavaScript origins**:
     - Clique em **"+ ADD URI"**
     - Adicione: `http://localhost:3000`
     - **IMPORTANTE**: Se você vai fazer deploy na Vercel, adicione também sua URL de produção (ex: `https://seu-projeto.vercel.app`)
   - **Authorized redirect URIs**:
     - Clique em **"+ ADD URI"**
     - Adicione: `http://localhost:3000/api/auth/callback/google`
     - **IMPORTANTE**: Se você vai fazer deploy, adicione também: `https://seu-projeto.vercel.app/api/auth/callback/google`
   - Clique em **"Create"**

5. **Copiar as Credenciais**
   - Uma janela popup aparecerá com suas credenciais
   - **Copie o Client ID** e o **Client Secret**
   - ⚠️ **IMPORTANTE**: Guarde essas credenciais em local seguro!
   - Você pode fechar a janela popup

### Passo 4: Adicionar Credenciais ao Projeto

1. **Editar o arquivo `.env.local`**
   - Abra o arquivo `.env.local` no seu projeto
   - Se não existir, copie do `env.example`:
     ```bash
     copy env.example .env.local
     ```

2. **Adicionar as Credenciais**
   - Substitua as linhas:
     ```env
     GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
     GOOGLE_CLIENT_SECRET=your-google-client-secret
     ```
   
   Por:
     ```env
     GOOGLE_CLIENT_ID=SEU_CLIENT_ID_AQUI
     GOOGLE_CLIENT_SECRET=SEU_CLIENT_SECRET_AQUI
     ```

3. **Exemplo de arquivo `.env.local` completo**:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://qzpsoxymczikdjetsumb.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-aqui

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=BRs+ISIh43mtF0MmgpdrPHgbYpybJ9y7yIo3UVS3+Gw=

   # Google OAuth
   GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
   ```

### Passo 5: Testar a Autenticação

1. **Iniciar o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

2. **Acessar a aplicação**
   - Abra: http://localhost:3000
   - Clique no botão **"Entrar"** ou **"Login"**
   - Você deve ser redirecionado para o Google OAuth
   - Faça login com sua conta Google
   - Aceite as permissões
   - Você será redirecionado de volta para a aplicação

3. **Verificar se funcionou**
   - Você deve estar logado!
   - O nome e foto do Google devem aparecer na navbar

## 🔧 Configuração para Produção (Vercel)

Quando fizer deploy na Vercel, você precisa:

1. **Adicionar URLs de Produção no Google Cloud Console**
   - Volte em **"Credentials"** > Sua credencial OAuth
   - Clique em **"Edit"**
   - Em **"Authorized JavaScript origins"**, adicione:
     - `https://seu-projeto.vercel.app`
   - Em **"Authorized redirect URIs"**, adicione:
     - `https://seu-projeto.vercel.app/api/auth/callback/google`
   - Clique em **"Save"**

2. **Adicionar Variáveis de Ambiente na Vercel**
   - No dashboard da Vercel, vá em **Settings** > **Environment Variables**
   - Adicione todas as variáveis do `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXTAUTH_URL` (use a URL do seu site: `https://seu-projeto.vercel.app`)
     - `NEXTAUTH_SECRET`
     - `GOOGLE_CLIENT_ID`
     - `GOOGLE_CLIENT_SECRET`

## ⚠️ Problemas Comuns e Soluções

### Erro: "redirect_uri_mismatch"

**Causa**: A URL de redirecionamento não está configurada corretamente no Google Cloud Console.

**Solução**:
- Verifique se você adicionou exatamente: `http://localhost:3000/api/auth/callback/google`
- Certifique-se de que não há espaços extras ou barras no final
- Se estiver em produção, use `https://` em vez de `http://`

### Erro: "invalid_client"

**Causa**: Client ID ou Client Secret incorretos.

**Solução**:
- Verifique se copiou corretamente as credenciais
- Certifique-se de que não há espaços extras
- Verifique se está usando as credenciais do tipo "Web application"

### Erro: "access_denied"

**Causa**: O app ainda está em modo de teste e você não está na lista de test users.

**Solução**:
- Em "OAuth consent screen", adicione seu email em "Test users"
- Ou publique o app (mas isso requer verificação se você pedir permissões sensíveis)

### A tela de consentimento pede verificação

**Causa**: Se você pedir permissões sensíveis (como email, perfil público), o Google pode exigir verificação.

**Solução**:
- Para desenvolvimento, você pode usar apenas "Test users"
- Para produção, você precisará verificar o app no Google
- Isso geralmente não é necessário para apps básicos

## ✅ Checklist Final

- [ ] Projeto criado no Google Cloud Console
- [ ] Google+ API habilitada
- [ ] Tela de consentimento OAuth configurada
- [ ] Credenciais OAuth criadas (Client ID e Client Secret)
- [ ] URLs de redirecionamento configuradas (localhost e produção)
- [ ] Credenciais adicionadas ao `.env.local`
- [ ] Testado localmente e funcionando

## 🎯 Próximos Passos

Após configurar o Google OAuth:

1. ✅ Teste o login localmente
2. ✅ Configure as URLs de produção no Google Cloud Console
3. ✅ Adicione as variáveis de ambiente na Vercel
4. ✅ Faça deploy e teste em produção

## 📚 Recursos Adicionais

- [Documentação NextAuth.js](https://next-auth.js.org/providers/google)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)

---

**Dica**: Guarde suas credenciais em local seguro! Nunca commite o arquivo `.env.local` no Git.

