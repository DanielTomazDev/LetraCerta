# 🔐 Configurar Google OAuth 2.0

Este guia explica como configurar o Google OAuth 2.0 para permitir login no LetraCerta.

## 📋 Pré-requisitos

- Uma conta Google
- Acesso ao [Google Cloud Console](https://console.cloud.google.com/)

## 🚀 Passo a Passo

### 1. Criar um Projeto no Google Cloud Console

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Clique em **"Selecionar um projeto"** no topo
3. Clique em **"Novo Projeto"**
4. Dê um nome ao projeto (ex: "LetraCerta")
5. Clique em **"Criar"**

### 2. Configurar a Tela de Consentimento OAuth

1. No menu lateral, vá em **"APIs e Serviços"** > **"Tela de consentimento OAuth"**
2. Selecione **"Externo"** e clique em **"Criar"**
3. Preencha as informações:
   - **Nome do app**: LetraCerta
   - **Email de suporte do usuário**: Seu email
   - **Email do desenvolvedor**: Seu email
4. Clique em **"Salvar e continuar"** nas próximas telas
5. Na tela **"Escopos"**, clique em **"Salvar e continuar"**
6. Na tela **"Usuários de teste"**, adicione seu email (importante para desenvolvimento)
7. Clique em **"Voltar ao painel"**

### 3. Criar Credenciais OAuth 2.0

1. No menu lateral, vá em **"APIs e Serviços"** > **"Credenciais"**
2. Clique em **"+ Criar credenciais"** > **"ID do cliente OAuth"**
3. Selecione **"Aplicativo da Web"**
4. Configure:
   - **Nome**: LetraCerta Web Client
   - **URIs de redirecionamento autorizados**: Adicione os seguintes URIs:

#### Para Desenvolvimento (Local):
```
http://localhost:3000/api/auth/callback/google
```

#### Para Produção (Netlify):
```
https://letracerta.netlify.app/api/auth/callback/google
```

5. Clique em **"Criar"**
6. **Copie o ID do cliente** e **o Segredo do cliente**

### 4. Configurar Variáveis de Ambiente

#### No arquivo `.env.local` (desenvolvimento):

```env
GOOGLE_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=seu-client-secret-aqui
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua-chave-secreta-aqui
```

#### No Netlify (produção):

1. Acesse seu projeto no Netlify
2. Vá em **"Site settings"** > **"Environment variables"**
3. Adicione as variáveis de ambiente:
   - **`NEXTAUTH_URL`**: Configure com a URL completa do seu site
     - **Valor**: `https://letracerta.netlify.app`
     - **OU** deixe em branco e o sistema detectará automaticamente usando a variável `URL` do Netlify
   - **`NEXTAUTH_SECRET`**: A mesma chave secreta usada no desenvolvimento
   - **`GOOGLE_CLIENT_ID`**: O mesmo Client ID do Google
   - **`GOOGLE_CLIENT_SECRET`**: O mesmo Client Secret do Google

**Nota**: O sistema agora detecta automaticamente a URL do Netlify se você não definir `NEXTAUTH_URL`. Mas é recomendado definir explicitamente para garantir que funcione corretamente.

### 5. Gerar NEXTAUTH_SECRET

Execute no terminal:

```bash
openssl rand -base64 32
```

Ou use este comando no PowerShell:

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### 6. Reiniciar o Servidor

Após configurar as variáveis de ambiente:

```bash
npm run dev
```

## ✅ Verificação

1. Acesse `http://localhost:3000`
2. Clique em **"Entrar com Google"**
3. Você deve ser redirecionado para o Google para fazer login
4. Após autorizar, deve voltar ao site logado

## ⚠️ Problemas Comuns

### "redirect_uri_mismatch"

**Causa**: O URI de redirecionamento não está registrado no Google Cloud Console.

**Solução**:
1. Verifique se adicionou corretamente os URIs no passo 3
2. Certifique-se de que o `NEXTAUTH_URL` no `.env.local` corresponde ao URI registrado
3. Aguarde alguns minutos após adicionar novos URIs (pode levar tempo para propagar)

### "access_denied"

**Causa**: O app ainda está em modo de teste e seu email não está na lista de usuários de teste.

**Solução**:
1. Adicione seu email em **"APIs e Serviços"** > **"Tela de consentimento OAuth"** > **"Usuários de teste"**
2. Ou publique o app (pode levar alguns dias para revisão do Google)

### Erro 400: "invalid_client"

**Causa**: `GOOGLE_CLIENT_ID` ou `GOOGLE_CLIENT_SECRET` estão incorretos.

**Solução**:
1. Verifique se copiou corretamente do Google Cloud Console
2. Certifique-se de que não há espaços extras
3. Reinicie o servidor após alterar as variáveis

## 📝 Notas Importantes

- **Desenvolvimento**: Use `http://localhost:3000` como `NEXTAUTH_URL` no `.env.local`
- **Produção**: 
  - **Opção 1**: Configure `NEXTAUTH_URL` com a URL completa do seu site no Netlify (recomendado)
  - **Opção 2**: Deixe `NEXTAUTH_URL` em branco e o sistema detectará automaticamente usando a variável `URL` do Netlify
- **URIs de Redirecionamento**: Devem corresponder exatamente (incluindo `http` vs `https`)
- **Segurança**: Nunca commite o arquivo `.env.local` no Git
- **Detecção Automática**: O sistema agora detecta automaticamente a URL em produção (Netlify/Vercel), mas é recomendado definir explicitamente para evitar problemas

## 🔗 Links Úteis

- [Google Cloud Console](https://console.cloud.google.com/)
- [Documentação do NextAuth.js](https://next-auth.js.org/providers/google)
- [Guia do Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)


