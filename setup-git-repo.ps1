# Script para criar repositório Git apenas para LetraCerta e fazer push forçado

# Navegar para a pasta LetraCerta usando o caminho do workspace
$workspacePath = "D:\Programação\LetraCerta"

# Verificar se o diretório existe
if (Test-Path $workspacePath) {
    Set-Location $workspacePath
    Write-Host "Diretório atual: $(Get-Location)"
    
    # Remover .git se existir
    if (Test-Path .git) {
        Write-Host "Removendo repositório Git existente..."
        Remove-Item -Path .git -Recurse -Force
    }
    
    # Inicializar novo repositório Git
    Write-Host "Inicializando novo repositório Git..."
    git init
    
    # Adicionar remote
    Write-Host "Adicionando remote..."
    git remote remove origin 2>$null
    git remote add origin https://github.com/DanielTomazDev/LetraCerta.git
    
    # Adicionar todos os arquivos
    Write-Host "Adicionando arquivos..."
    git add .
    
    # Fazer commit
    Write-Host "Fazendo commit..."
    git commit -m "feat: Projeto LetraCerta completo - plataforma de letras e cifras para músicos"
    
    # Criar branch main
    Write-Host "Criando branch main..."
    git branch -M main
    
    # Fazer push forçado
    Write-Host "Fazendo push forçado para o GitHub..."
    git push -u origin main --force
    
    Write-Host "`n✅ Repositório configurado com sucesso!"
    Write-Host "Agora o repositório contém apenas os arquivos do LetraCerta."
} else {
    Write-Host "Erro: Diretório não encontrado: $workspacePath"
    Write-Host "Por favor, execute este script da pasta LetraCerta ou ajuste o caminho."
}

