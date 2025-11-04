# 🔧 Troubleshooting - Page Not Found no Netlify

## ⚠️ Problema: "Page not found"

Se você está vendo "Page not found" após fazer deploy no Netlify, siga estas soluções:

## ✅ Soluções

### 1. Verificar Configuração do Netlify

No painel do Netlify, vá em **"Site settings"** > **"Build & deploy"** > **"Build settings"**:

**Build command:**
```
npm run build
```

**Publish directory:**
```
Deixe vazio ou remova completamente
```
⚠️ **IMPORTANTE**: O plugin `@netlify/plugin-nextjs` cuida automaticamente do diretório de publicação. Não defina manualmente!

### 2. Verificar Plugin Next.js

O plugin `@netlify/plugin-nextjs` deve estar instalado automaticamente. Se não estiver:

1. No Netlify, vá em **"Site settings"** > **"Build & deploy"** > **"Plugins"**
2. Clique em **"Add plugin"**
3. Procure por **"@netlify/plugin-nextjs"**
4. Clique em **"Install"**

### 3. Verificar Variáveis de Ambiente

Certifique-se de que todas as variáveis estão configuradas:

- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `NEXTAUTH_URL` (deve ser a URL do seu site no Netlify)
- ✅ `NEXTAUTH_SECRET`
- ✅ `GOOGLE_CLIENT_ID`
- ✅ `GOOGLE_CLIENT_SECRET`

### 4. Verificar Logs de Build

No Netlify, vá em **"Deploys"** e clique no último deploy. Veja os logs para identificar erros.

### 5. Limpar Cache e Rebuild

1. No Netlify, vá em **"Deploys"**
2. Clique nos três pontos do último deploy
3. Selecione **"Clear cache and deploy site"**
4. Aguarde o novo deploy

### 6. Verificar Arquivo netlify.toml

O arquivo `netlify.toml` deve estar assim:

```toml
[build]
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

**NÃO inclua:**
- ❌ `publish = ".next"` (o plugin cuida disso)
- ❌ Redirects manuais (o plugin cuida disso)

### 7. Verificar se o Build Passou

Se o build falhou, o site não vai funcionar. Verifique:
- ✅ Build completou com sucesso
- ✅ Sem erros de TypeScript
- ✅ Sem erros de dependências
- ✅ Sem erros de variáveis de ambiente

### 8. Testar URL Direta

Tente acessar diretamente:
- `https://seu-site.netlify.app/` (página inicial)
- `https://seu-site.netlify.app/api/auth/signin` (página de login)

Se essas páginas funcionarem mas outras não, pode ser problema de rotas.

### 9. Verificar NEXTAUTH_URL

O `NEXTAUTH_URL` deve ser **exatamente** a URL do seu site no Netlify:

```
NEXTAUTH_URL=https://seu-site.netlify.app
```

**NÃO use:**
- ❌ `http://` (deve ser `https://`)
- ❌ Com barra no final (`https://seu-site.netlify.app/`)
- ❌ URL errada

### 10. Rebuild Completo

Se nada funcionar, tente fazer um rebuild completo:

1. No Netlify, vá em **"Deploys"**
2. Clique em **"Trigger deploy"** > **"Clear cache and deploy site"**
3. Aguarde o deploy completar
4. Verifique se o site está funcionando

## 🔍 Verificações Adicionais

### Verificar se o arquivo app/page.tsx existe

O erro "Page not found" pode ocorrer se a página inicial não existir. Verifique:
- ✅ `app/page.tsx` existe
- ✅ `app/layout.tsx` existe
- ✅ Arquivos estão no repositório

### Verificar Console do Navegador

Abra o console do navegador (F12) e veja se há erros:
- Erros de JavaScript
- Erros de rede
- Erros de autenticação

### Verificar Network Tab

No DevTools, vá em **"Network"** e veja:
- Quais requisições estão falhando
- Status codes das requisições
- Se as rotas estão sendo chamadas corretamente

## 📝 Checklist de Verificação

- [ ] Build passou com sucesso no Netlify
- [ ] Plugin `@netlify/plugin-nextjs` está instalado
- [ ] Publish directory está vazio no Netlify
- [ ] Todas as variáveis de ambiente estão configuradas
- [ ] `NEXTAUTH_URL` está correto (URL do Netlify)
- [ ] Arquivo `netlify.toml` está correto
- [ ] Cache foi limpo e rebuild feito
- [ ] Logs de build não mostram erros

## 🆘 Se Nada Funcionar

1. **Verifique os logs de build** no Netlify
2. **Teste localmente** primeiro: `npm run build` deve funcionar
3. **Verifique se o repositório está atualizado** no GitHub
4. **Entre em contato com o suporte do Netlify** se necessário

## 💡 Dica

Se o problema persistir, tente fazer deploy na Vercel primeiro para verificar se o problema é do código ou da configuração do Netlify. A Vercel tem suporte nativo para Next.js e geralmente funciona "out of the box".

---

**Última atualização**: Configuração corrigida para remover redirects manuais e publish directory, permitindo que o plugin Next.js cuide automaticamente das rotas.

