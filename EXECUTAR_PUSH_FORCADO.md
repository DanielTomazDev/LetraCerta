# 🚀 Executar Push Forçado - Instruções

Devido a problemas de encoding com o caractere "ã" no PowerShell, execute os comandos abaixo **manualmente** no PowerShell do Windows.

## 📋 Comandos para Executar

Abra o PowerShell e execute os comandos na ordem:

```powershell
# 1. Navegar até a pasta LetraCerta
cd "D:\Programação\LetraCerta"

# 2. Verificar se já existe um repositório Git
if (Test-Path .git) {
    Remove-Item -Path .git -Recurse -Force
    Write-Host "Repositório Git antigo removido"
}

# 3. Inicializar novo repositório Git
git init

# 4. Adicionar remote
git remote add origin https://github.com/DanielTomazDev/LetraCerta.git

# 5. Adicionar todos os arquivos
git add .

# 6. Fazer commit
git commit -m "feat: Projeto LetraCerta completo - plataforma de letras e cifras para músicos"

# 7. Criar branch main
git branch -M main

# 8. Fazer push forçado (substitui o repositório remoto)
git push -u origin main --force
```

## ⚠️ Importante

- O `--force` vai **substituir completamente** o conteúdo do repositório no GitHub
- Isso é seguro se você quer limpar o repositório e deixar apenas os arquivos do LetraCerta
- **Certifique-se** de estar na pasta correta antes de executar

## ✅ Após Executar

O repositório no GitHub terá apenas:
- ✅ Pastas e arquivos do LetraCerta
- ❌ Sem as outras pastas (Portfolio, Projeto de HTML e CSS, etc.)

## 🔄 Alternativa: Usar o Script

Se preferir, você pode executar o script `setup-git-repo.ps1` que foi criado:

```powershell
cd "D:\Programação\LetraCerta"
.\setup-git-repo.ps1
```

---

**Nota**: Se o PowerShell ainda tiver problemas com o caminho, tente:
- Abrir o PowerShell diretamente na pasta LetraCerta (Shift + Botão Direito > "Abrir janela PowerShell aqui")
- Ou usar o caminho completo: `Set-Location "D:\Programa[ã]o\LetraCerta"` (sem aspas extras)

