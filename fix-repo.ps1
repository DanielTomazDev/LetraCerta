# Script para corrigir o repositório Git - manter apenas LetraCerta

# Navegar para a pasta pai (Programação)
$parentPath = Split-Path -Parent $PSScriptRoot
Set-Location $parentPath

# Verificar se está em um repositório Git
if (Test-Path .git) {
    Write-Host "Removendo outras pastas do Git..."
    
    # Remover outras pastas do índice Git (mas manter no disco)
    git rm -r --cached Portfolio 2>$null
    git rm -r --cached "Projeto de HTML e CSS" 2>$null
    git rm --cached README.md 2>$null
    git rm -r --cached Readme 2>$null
    
    # Adicionar o .gitignore
    git add .gitignore
    
    Write-Host "Pastas removidas do Git. Faça commit e push."
} else {
    Write-Host "Não é um repositório Git nesta pasta"
}

