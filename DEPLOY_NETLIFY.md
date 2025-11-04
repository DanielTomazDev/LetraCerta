# 🚀 Guia de Deploy no Netlify

Este guia vai te ajudar a fazer deploy do LetraCerta no Netlify.

## 📋 Pré-requisitos

1. ✅ Conta no [Netlify](https://www.netlify.com) (grátis)
2. ✅ Projeto no GitHub ([https://github.com/DanielTomazDev/LetraCerta](https://github.com/DanielTomazDev/LetraCerta))
3. ✅ Supabase configurado
4. ✅ Google OAuth configurado

## 🚀 Passo a Passo

### Passo 1: Conectar Repositório no Netlify

1. Acesse [https://app.netlify.com](https://app.netlify.com)
2. Faça login com sua conta (GitHub, GitLab, Bitbucket ou email)
3. Clique em **"Add new site"** > **"Import an existing project"**
4. Escolha **"GitHub"** e autorize o Netlify
5. Selecione o repositório **"LetraCerta"**

### Passo 2: Configurar Build Settings

O Netlify deve detectar automaticamente que é um projeto Next.js. As configurações devem ser:

**Build command:**
```
npm run build
```

**Publish directory:**
```
DEIXE VAZIO OU REMOVA COMPLETAMENTE
```
⚠️ **IMPORTANTE**: O plugin `@netlify/plugin-nextjs` cuida automaticamente do diretório de publicação. Não defina manualmente!

**Plugin:**
- `@netlify/plugin-nextjs` (será instalado automaticamente)

### Passo 3: Configurar Variáveis de Ambiente

No Netlify, vá em **"Site settings"** > **"Environment variables"** e adicione:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-key-aqui
NEXTAUTH_URL=https://seu-site.netlify.app
NEXTAUTH_SECRET=seu-nextauth-secret-aqui
GOOGLE_CLIENT_ID=seu-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=seu-google-client-secret
```

⚠️ **IMPORTANTE**: 
- `NEXTAUTH_URL` deve ser a URL do seu site no Netlify (você verá após o primeiro deploy)
- Se mudar o domínio depois, atualize o `NEXTAUTH_URL`

### Passo 4: Atualizar Google OAuth (URIs de Produção)

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Vá em **"APIs & Services"** > **"Credentials"**
3. Clique na sua credencial OAuth
4. Em **"Authorized JavaScript origins"**, adicione:
   ```
   https://seu-site.netlify.app
   ```
5. Em **"Authorized redirect URIs"**, adicione:
   ```
   https://seu-site.netlify.app/api/auth/callback/google
   ```
6. Clique em **"Save"**

### Passo 5: Fazer Deploy

1. No Netlify, clique em **"Deploy site"**
2. Aguarde o build completar (pode levar alguns minutos)
3. Se tudo der certo, você verá **"Site is live"** ✅

### Passo 6: Verificar Deploy

1. Acesse a URL fornecida pelo Netlify (ex: `https://letracerta.netlify.app`)
2. Teste o login com Google
3. Teste as funcionalidades principais

## ⚠️ Problemas Comuns

### Erro: "authOptions is not a valid Route export field"

✅ **Já corrigido!** O `authOptions` foi movido para `lib/auth.ts`

### Erro: "NEXTAUTH_URL is not set"

- Verifique se adicionou a variável de ambiente no Netlify
- Certifique-se de usar a URL correta do seu site

### Erro: "redirect_uri_mismatch"

- Verifique se adicionou a URL do Netlify no Google Cloud Console
- Certifique-se de que a URL está exatamente como aparece no Netlify

### Build falha com erro de dependências

- O Netlify deve instalar automaticamente as dependências
- Se falhar, verifique se o `package.json` está correto

## 🔧 Configurações Adicionais

### Custom Domain (Opcional)

1. No Netlify, vá em **"Domain settings"**
2. Clique em **"Add custom domain"**
3. Siga as instruções para configurar seu domínio

### Environment Variables por Branch (Opcional)

Você pode ter diferentes variáveis para desenvolvimento e produção:
- No Netlify, ao adicionar variáveis de ambiente, escolha o **"Scope"** (Production, Preview, ou Development)

## 📝 Checklist de Deploy

- [ ] Repositório conectado no Netlify
- [ ] Build settings configuradas automaticamente
- [ ] Variáveis de ambiente adicionadas
- [ ] Google OAuth atualizado com URL do Netlify
- [ ] Deploy realizado com sucesso
- [ ] Site funcionando corretamente
- [ ] Login com Google testado

## 🎯 Próximos Passos Após Deploy

1. ✅ Teste todas as funcionalidades
2. ✅ Verifique se o login funciona
3. ✅ Teste a busca de músicas
4. ✅ Teste o modo performance
5. ✅ Compartilhe o link com outras pessoas!

## 📚 Recursos

- [Documentação Netlify](https://docs.netlify.com/)
- [Next.js no Netlify](https://docs.netlify.com/integrations/frameworks/nextjs/)
- [Netlify Plugin para Next.js](https://github.com/netlify/netlify-plugin-nextjs)

---

**Dica**: Se precisar atualizar o site, basta fazer `git push` para o GitHub. O Netlify fará deploy automático! 🚀

