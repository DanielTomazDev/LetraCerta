# 🔧 Como Corrigir o Repositório Git

O repositório Git está na pasta pai "Programação", então está versionando todos os projetos. Vamos corrigir para mostrar apenas o LetraCerta.

## ⚠️ Problema Atual

O repositório está mostrando:
- LetraCerta ✅
- Portfolio ❌
- Projeto de HTML e CSS ❌
- Readme ❌
- README.md ❌

## ✅ Solução

### Opção 1: Criar repositório Git apenas para LetraCerta (Recomendado)

1. **Navegue até a pasta LetraCerta**:
   ```powershell
   cd "d:\Programação\LetraCerta"
   ```

2. **Inicialize um novo repositório Git**:
   ```powershell
   git init
   ```

3. **Adicione o remote**:
   ```powershell
   git remote add origin https://github.com/DanielTomazDev/LetraCerta.git
   ```

4. **Adicione todos os arquivos**:
   ```powershell
   git add .
   ```

5. **Faça commit**:
   ```powershell
   git commit -m "feat: Adiciona projeto LetraCerta completo"
   ```

6. **Force push (substitui o repositório remoto)**:
   ```powershell
   git push -u origin main --force
   ```

### Opção 2: Limpar o repositório atual (mantém histórico)

1. **Navegue até a pasta pai "Programação"**:
   ```powershell
   cd "d:\Programação"
   ```

2. **Remova as outras pastas do Git (mas mantenha no disco)**:
   ```powershell
   git rm -r --cached Portfolio
   git rm -r --cached "Projeto de HTML e CSS"
   git rm --cached README.md
   git rm -r --cached Readme
   ```

3. **Adicione o .gitignore** (já criado):
   ```powershell
   git add .gitignore
   ```

4. **Faça commit**:
   ```powershell
   git commit -m "chore: Remove outras pastas do repositório, mantém apenas LetraCerta"
   ```

5. **Faça push**:
   ```powershell
   git push origin main
   ```

## 📝 .gitignore na pasta pai

O arquivo `.gitignore` já foi criado na pasta pai com o seguinte conteúdo:

```
# Ignorar tudo exceto a pasta LetraCerta
*

# Mas incluir a pasta LetraCerta
!LetraCerta/
!LetraCerta/**

# Ignorar o .gitignore na pasta LetraCerta (se tiver)
!.gitignore
```

## 🎯 Recomendação

**Recomendo a Opção 1** porque:
- ✅ Repositório mais limpo
- ✅ Apenas arquivos do LetraCerta
- ✅ Estrutura mais organizada
- ✅ Fácil de fazer deploy na Vercel

A Opção 2 mantém o histórico, mas o repositório ainda terá a estrutura de pastas com outros projetos.

## ⚠️ Importante

Se escolher a **Opção 1**, você precisará usar `--force` no push porque vai substituir o repositório remoto. Isso é seguro se você quiser limpar o repositório completamente.

Qual opção você prefere?

