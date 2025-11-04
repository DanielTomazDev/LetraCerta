# 🚀 Quick Start - Google OAuth (5 Minutos)

## ⚡ Resumo Rápido

1. **Google Cloud Console** → Criar projeto
2. **OAuth Consent Screen** → Configurar (tipo "External")
3. **Credentials** → Criar OAuth Client ID (tipo "Web application")
4. **Adicionar URLs de redirecionamento**
5. **Copiar Client ID e Secret** → Adicionar ao `.env.local`

## 📝 Passos Detalhados

### 1. Acesse o Google Cloud Console
https://console.cloud.google.com/

### 2. Criar Projeto
- Clique no seletor de projetos (topo)
- **"New Project"**
- Nome: `LetraCerta`
- **"Create"**

### 3. Configurar OAuth Consent Screen
- Menu lateral: **"APIs & Services"** > **"OAuth consent screen"**
- Tipo: **"External"** → **"Create"**
- Preencha:
  - **App name**: `LetraCerta`
  - **User support email**: Seu email
  - **Developer contact**: Seu email
- **"Save and Continue"** (3x até voltar ao dashboard)

### 4. Criar Credenciais OAuth
- Menu lateral: **"APIs & Services"** > **"Credentials"**
- **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
- **Application type**: **"Web application"**
- **Name**: `LetraCerta Web Client`

#### Authorized JavaScript origins:
```
http://localhost:3000
```

#### Authorized redirect URIs:
```
http://localhost:3000/api/auth/callback/google
```

- **"Create"**
- **Copie o Client ID e Client Secret** (guarde bem!)

### 5. Adicionar ao Projeto

Edite o arquivo `.env.local`:

```env
GOOGLE_CLIENT_ID=SEU_CLIENT_ID_AQUI.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=SEU_CLIENT_SECRET_AQUI
```

### 6. Testar

```bash
npm run dev
```

Acesse: http://localhost:3000
Clique em **"Entrar"** → Login com Google deve funcionar! ✅

## 🎯 Para Produção (Vercel)

Quando fizer deploy, adicione também no Google Cloud Console:

**Authorized JavaScript origins:**
```
https://seu-projeto.vercel.app
```

**Authorized redirect URIs:**
```
https://seu-projeto.vercel.app/api/auth/callback/google
```

E adicione as variáveis de ambiente na Vercel (Settings > Environment Variables).

## ❌ Erro Comum: "redirect_uri_mismatch"

**Solução**: Verifique se a URL está EXATAMENTE assim:
- ✅ `http://localhost:3000/api/auth/callback/google`
- ❌ `http://localhost:3000/api/auth/callback/google/` (sem barra no final)
- ❌ `http://localhost:3000/api/auth/callback/Google` (G maiúsculo)

## 📚 Guia Completo

Para mais detalhes, veja: `CONFIGURAR_GOOGLE_OAUTH.md`

